import React, { useState } from 'react';
import {
  FolderCheck,
  UploadCloud,
  FileSpreadsheet,
  Download,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Plus,
  RefreshCw,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Eye,
  Zap,
  Play,
} from 'lucide-react';
import { DogProduct } from '../types';
import { MONTHLY_SCHEDULE_28_DAYS, DaySchedule, getProductsForDay } from '../services/marketSchedule';
import {
  ensureVaultRootFolder,
  ensureBrandFolder,
  uploadImageUrlToDrive,
  generateDriveFileNames,
} from '../services/driveService';
import { exportToGoogleSheet, updateOrCreateDaySheet } from '../services/sheetsExport';
import { downloadProductsAsCSV } from '../services/csvExport';

interface OrchestrationDashboardProps {
  products: DogProduct[];
  accessToken: string | null;
  onSignInRequired: () => void;
  onUpdateProduct: (updatedProduct: DogProduct) => void;
}

export const OrchestrationDashboard: React.FC<OrchestrationDashboardProps> = ({
  products,
  accessToken,
  onSignInRequired,
  onUpdateProduct,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isSyncingDrive, setIsSyncingDrive] = useState<boolean>(false);
  const [isExportingSheet, setIsExportingSheet] = useState<boolean>(false);
  const [isRescrapingDay, setIsRescrapingDay] = useState<boolean>(false);
  const [isAutomatedRunning, setIsAutomatedRunning] = useState<boolean>(false);
  const [automationStep, setAutomationStep] = useState<string>('');
  const [vaultRootId, setVaultRootId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'info' | 'success' | 'error' } | null>(null);
  const [activeSegmentTab, setActiveSegmentTab] = useState<'All' | 'Dry Food' | 'Wet Food' | 'Dental Chews' | 'Treats'>('All');
  
  // Custom manual URL input modal / inline editor
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [editItemImageUrl, setEditItemImageUrl] = useState<string>('');
  const [editIngredientsImageUrl, setEditIngredientsImageUrl] = useState<string>('');

  const currentSchedule: DaySchedule =
    MONTHLY_SCHEDULE_28_DAYS.find((s) => s.day === selectedDay) || MONTHLY_SCHEDULE_28_DAYS[0];

  // Robust filtering of products for the selected day using getProductsForDay helper
  const dayProducts = getProductsForDay(currentSchedule, products);

  const displayedProducts =
    activeSegmentTab === 'All'
      ? dayProducts
      : dayProducts.filter((p) => p.productType === activeSegmentTab);

  // Statistics for selected day
  const totalDayCount = dayProducts.length;
  const withPackImg = dayProducts.filter((p) => Boolean(p.itemImageUrl)).length;
  const withLabelImg = dayProducts.filter((p) => Boolean(p.ingredientsImageUrl)).length;
  const withDrivePack = dayProducts.filter((p) => Boolean(p.drivePackImageUrl)).length;
  const withDriveLabel = dayProducts.filter((p) => Boolean(p.driveIngredientsImageUrl)).length;

  /**
   * Helper: Core Drive Sync logic that can be run standalone or chained in automation.
   * Returns updated products array.
   */
  const executeDriveSync = async (
    token: string,
    currentProducts: DogProduct[],
    rootIdParam?: string
  ): Promise<{ updatedItems: DogProduct[]; uploadedCount: number; rootFolderId: string }> => {
    const rootId = rootIdParam || vaultRootId || (await ensureVaultRootFolder(token));
    if (!vaultRootId) setVaultRootId(rootId);

    let uploadedCount = 0;
    const updatedMap = new Map<string, DogProduct>();
    for (const p of currentProducts) {
      updatedMap.set(p.id, { ...p });
    }

    for (const brand of currentSchedule.brands) {
      const brandFolderName = `${String(selectedDay).padStart(2, '0')}_${brand.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const brandFolderId = await ensureBrandFolder(token, rootId, brandFolderName);
      const brandItems = currentProducts.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());

      for (const item of brandItems) {
        const { frontFileName, ingredientsFileName } = generateDriveFileNames(
          item.brand,
          item.flavor,
          item.packageSize
        );

        let current = updatedMap.get(item.id) || { ...item };
        let changed = false;

        // Upload front pack image if verified and not yet on Drive
        if (current.itemImageUrl && !current.drivePackImageUrl) {
          try {
            const res = await uploadImageUrlToDrive(
              token,
              brandFolderId,
              current.itemImageUrl,
              frontFileName
            );
            current.drivePackImageUrl = res.webViewLink;
            changed = true;
            uploadedCount++;
          } catch (e) {
            console.warn(`Could not upload pack image for ${current.flavor}:`, e);
          }
        }

        // Upload ingredients label image if verified and not yet on Drive
        if (current.ingredientsImageUrl && !current.driveIngredientsImageUrl) {
          try {
            const res = await uploadImageUrlToDrive(
              token,
              brandFolderId,
              current.ingredientsImageUrl,
              ingredientsFileName
            );
            current.driveIngredientsImageUrl = res.webViewLink;
            changed = true;
            uploadedCount++;
          } catch (e) {
            console.warn(`Could not upload ingredients label for ${current.flavor}:`, e);
          }
        }

        if (changed) {
          updatedMap.set(item.id, current);
          onUpdateProduct(current);
        }
      }
    }

    return {
      updatedItems: Array.from(updatedMap.values()),
      uploadedCount,
      rootFolderId: rootId,
    };
  };

  /**
   * Action: Rescrape live market data for a day on demand.
   * Replaces old data with new data, but NEVER wipes or erases old data if no new data was returned.
   */
  const handleRescrapeDay = async (targetProducts = dayProducts): Promise<DogProduct[]> => {
    setIsRescrapingDay(true);
    setStatusMessage({
      text: `Live AI market audit started for Day ${selectedDay} (${currentSchedule.brands.join(', ')})...`,
      type: 'info',
    });

    const updatedList: DogProduct[] = [];

    try {
      const response = await fetch('/api/ai/rescrape-day-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day: selectedDay,
          brands: currentSchedule.brands,
          products: targetProducts.map((p) => ({
            id: p.id,
            flavor: p.flavor,
            brand: p.brand,
            productLine: p.productLine,
            packageSize: p.packageSize,
            productType: p.productType,
          })),
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Batch scrape failed: HTTP ${response.status}`);
      }

      const data = await response.json();
      let updatedCount = 0;

      for (const item of targetProducts) {
        const scrapeResult = data.results?.find((r: any) => r.productId === item.id);
        if (scrapeResult && scrapeResult.success && scrapeResult.scrapedData) {
          const sc = scrapeResult.scrapedData;
          // Non-destructive update: ONLY replace if new scraped value is present and truthy
          const updated: DogProduct = {
            ...item,
            officialProductUrl: sc.officialProductUrl || item.officialProductUrl,
            skroutzUrl: sc.skroutzUrl || item.skroutzUrl,
            bestPriceUrl: sc.bestPriceUrl || item.bestPriceUrl,
            itemImageUrl: sc.itemImageUrl || item.itemImageUrl,
            ingredientsImageUrl: sc.ingredientsImageUrl || item.ingredientsImageUrl,
            eanBarcode: sc.eanBarcode || item.eanBarcode,
            ingredients: (sc.ingredientsList && sc.ingredientsList.length > 0) ? sc.ingredientsList : item.ingredients,
            additives: sc.additives || item.additives,
            allergens: (sc.allergens && sc.allergens.length > 0) ? sc.allergens : item.allergens,
            msrpEuros: sc.msrpEuros && sc.msrpEuros > 0 ? sc.msrpEuros : item.msrpEuros,
            animalProteinPercent: sc.animalProteinPercent && sc.animalProteinPercent > 0 ? sc.animalProteinPercent : item.animalProteinPercent,
            greeceRetailers: (sc.greeceRetailers && sc.greeceRetailers.length > 0) ? sc.greeceRetailers : item.greeceRetailers,
            isRealLifeVerified: true,
            verificationMethod: sc.verificationMethod || item.verificationMethod || 'Audited from brand official technical specs & Greek retail distribution listings.',
            verificationSourceUrl: sc.verificationSourceUrl || sc.officialProductUrl || item.verificationSourceUrl || item.officialProductUrl,
            verificationDate: new Date().toISOString().split('T')[0],
            verificationSourceType: 'Brand Official Portal',
            nutritionalValues: {
              ...item.nutritionalValues,
              crudeProteinPercent: sc.crudeProteinPercent ?? item.nutritionalValues.crudeProteinPercent,
              crudeFatPercent: sc.crudeFatPercent ?? item.nutritionalValues.crudeFatPercent,
              crudeFiberPercent: sc.crudeFiberPercent ?? item.nutritionalValues.crudeFiberPercent,
              crudeAshPercent: sc.crudeAshPercent ?? item.nutritionalValues.crudeAshPercent,
              moisturePercent: sc.moisturePercent ?? item.nutritionalValues.moisturePercent,
              caloricContentKcalKg: sc.caloricContentKcalKg ?? item.nutritionalValues.caloricContentKcalKg,
            },
          };
          onUpdateProduct(updated);
          updatedList.push(updated);
          updatedCount++;
        } else {
          // Keep existing product intact (never erase)
          updatedList.push(item);
        }
      }

      setStatusMessage({
        text: `Rescrape completed for Day ${selectedDay}: ${updatedCount} products refreshed with verified data; old data preserved.`,
        type: 'success',
      });
      return updatedList;
    } catch (err: any) {
      console.error('Error during rescrape:', err);
      setStatusMessage({ text: err.message || 'Failed to rescrape day products', type: 'error' });
      return targetProducts;
    } finally {
      setIsRescrapingDay(false);
    }
  };

  /**
   * AUTOMATED MASTER PIPELINE:
   * 1. Auto Live Scrape with Google Search grounding
   * 2. Auto Setup Drive folders & sync images
   * 3. Auto Export/Update Google Sheet in place (replacing old data with new)
   */
  const handleRunAutomatedPipeline = async () => {
    if (!accessToken) {
      onSignInRequired();
      return;
    }

    setIsAutomatedRunning(true);
    setAutomationStep('Step 1/3: Scraping verified market data...');
    setStatusMessage({
      text: `[1/3] Automated workflow initiated: Scraping Day ${selectedDay} (${currentSchedule.brands.join(', ')})...`,
      type: 'info',
    });

    try {
      // Step 1: Scrape & non-destructive replace
      const scrapedProducts = await handleRescrapeDay(dayProducts);

      // Step 2: Auto Drive Folders Setup & Sync
      setAutomationStep('Step 2/3: Creating Drive folders & syncing images...');
      setStatusMessage({
        text: `[2/3] Scraping complete! Setting up Drive folders and syncing packaging photos for Day ${selectedDay}...`,
        type: 'info',
      });
      const driveSyncRes = await executeDriveSync(accessToken, scrapedProducts);

      // Step 3: Auto Export / Update Google Sheet
      setAutomationStep('Step 3/3: Updating Google Sheet in place...');
      setStatusMessage({
        text: `[3/3] Drive sync complete (${driveSyncRes.uploadedCount} uploaded). Updating Day ${selectedDay} Google Sheet...`,
        type: 'info',
      });

      const sheetRes = await updateOrCreateDaySheet(
        accessToken,
        selectedDay,
        currentSchedule.brands,
        driveSyncRes.updatedItems
      );

      setStatusMessage({
        text: `Automated Pipeline for Day ${selectedDay} finished successfully! Scraped -> Synced to Drive -> Updated Google Sheet: ${sheetRes.spreadsheetUrl}`,
        type: 'success',
      });
      window.open(sheetRes.spreadsheetUrl, '_blank');
    } catch (err: any) {
      console.error('Pipeline error:', err);
      setStatusMessage({
        text: `Automated pipeline stopped: ${err.message || 'Unknown error occurred'}`,
        type: 'error',
      });
    } finally {
      setIsAutomatedRunning(false);
      setAutomationStep('');
    }
  };

  /**
   * Action 1: Create or test the root Google Drive Vault and Brand Folders
   */
  const handleTestDriveConnection = async () => {
    if (!accessToken) {
      onSignInRequired();
      return;
    }
    try {
      setStatusMessage({ text: 'Checking Google Drive for "Greece Pet Food Vault"...', type: 'info' });
      const rootId = await ensureVaultRootFolder(accessToken);
      setVaultRootId(rootId);

      // Create folders for today's brands
      for (const brand of currentSchedule.brands) {
        const folderName = `${String(selectedDay).padStart(2, '0')}_${brand.replace(/[^a-zA-Z0-9]/g, '_')}`;
        await ensureBrandFolder(accessToken, rootId, folderName);
      }

      setStatusMessage({
        text: `Connected to Google Drive! Root folder "Greece Pet Food Vault" and brand folders ready for ${currentSchedule.brands.join(' & ')}.`,
        type: 'success',
      });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ text: err.message || 'Failed to initialize Drive folders', type: 'error' });
    }
  };

  /**
   * Action 2: Batch upload verified images to Google Drive
   */
  const handleBatchSyncToDrive = async () => {
    if (!accessToken) {
      onSignInRequired();
      return;
    }

    setIsSyncingDrive(true);
    setStatusMessage({ text: 'Starting Google Drive sync for verified images...', type: 'info' });

    try {
      const res = await executeDriveSync(accessToken, dayProducts);
      setStatusMessage({
        text: `Drive sync complete: ${res.uploadedCount} image(s) stored in Google Drive.`,
        type: 'success',
      });
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ text: err.message || 'Error during Drive sync', type: 'error' });
    } finally {
      setIsSyncingDrive(false);
    }
  };

  /**
   * Action 3: Export the day's products to Google Sheets (including Drive links)
   */
  const handleExportToSheet = async () => {
    if (!accessToken) {
      onSignInRequired();
      return;
    }

    setIsExportingSheet(true);
    setStatusMessage({ text: 'Updating/creating formatted Google Sheet with Drive links...', type: 'info' });

    try {
      const res = await updateOrCreateDaySheet(
        accessToken,
        selectedDay,
        currentSchedule.brands,
        dayProducts
      );
      setStatusMessage({
        text: `Google Sheet updated/created successfully! Link: ${res.spreadsheetUrl}`,
        type: 'success',
      });
      window.open(res.spreadsheetUrl, '_blank');
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ text: err.message || 'Failed to export to Google Sheets', type: 'error' });
    } finally {
      setIsExportingSheet(false);
    }
  };

  /**
   * Action 4: Download CSV for Claude Code
   */
  const handleDownloadCsvForClaude = () => {
    const filename = `day_${selectedDay}_${currentSchedule.brands.join('_')}_claude_wordpress_feed.csv`
      .toLowerCase()
      .replace(/[^a-z0-9_.]/g, '_');
    downloadProductsAsCSV(dayProducts, filename);
    setStatusMessage({
      text: `Downloaded CSV: "${filename}". Claude Code can now ingest this file to generate WordPress draft posts with Drive images.`,
      type: 'success',
    });
  };

  /**
   * Save manual image URLs for a specific product
   */
  const handleSaveProductUrls = (p: DogProduct) => {
    const updated: DogProduct = {
      ...p,
      itemImageUrl: editItemImageUrl.trim(),
      ingredientsImageUrl: editIngredientsImageUrl.trim(),
      // Reset drive links if URL changed
      drivePackImageUrl: editItemImageUrl.trim() === p.itemImageUrl ? p.drivePackImageUrl : undefined,
      driveIngredientsImageUrl: editIngredientsImageUrl.trim() === p.ingredientsImageUrl ? p.driveIngredientsImageUrl : undefined,
    };
    onUpdateProduct(updated);
    setEditingProductId(null);
    setStatusMessage({
      text: `Updated image URLs for "${p.flavor}". Click "Sync Verified to Drive" to upload them to your Google Drive folder.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Control Center & 28-Day Schedule */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Monthly Ingestion & Drive Vault
              </span>
              <span className="text-xs text-zinc-400">1–2 Brands / Day (45 Brands Total)</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Day {selectedDay}: {currentSchedule.brands.join(' & ')}
            </h2>
            <p className="text-sm text-zinc-400 mt-0.5">
              Focus: <span className="text-zinc-200">{currentSchedule.focusNotes}</span> • {totalDayCount} Canonical Flavor SKUs
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 1-Click Master Automation Pipeline */}
            <button
              onClick={handleRunAutomatedPipeline}
              disabled={isAutomatedRunning || isRescrapingDay || isSyncingDrive || isExportingSheet}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md inline-flex items-center gap-2 transition disabled:opacity-50"
              title="Runs complete automated workflow: Live Scrape -> Drive Folders & Image Sync -> Google Sheets Export (Replaces old data without erasing)"
            >
              {isAutomatedRunning ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              )}
              <span>{isAutomatedRunning ? automationStep || 'Running Pipeline...' : 'Run Auto Pipeline'}</span>
            </button>

            {/* On-Demand Rescrape for Selected Day */}
            <button
              onClick={() => handleRescrapeDay()}
              disabled={isRescrapingDay || isAutomatedRunning}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white inline-flex items-center gap-1.5 transition disabled:opacity-50"
              title="Rescrape live manufacturer & retail data for this day on demand (Preserves old data if no new data found)"
            >
              {isRescrapingDay ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Rescrape Day {selectedDay}
            </button>

            <button
              onClick={handleTestDriveConnection}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 inline-flex items-center gap-1.5 transition"
              title="Ensure Google Drive folders exist"
            >
              <FolderOpen className="w-4 h-4 text-amber-400" />
              Setup Folders
            </button>

            <button
              onClick={handleBatchSyncToDrive}
              disabled={isSyncingDrive || isAutomatedRunning}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-emerald-700 hover:bg-emerald-600 text-white inline-flex items-center gap-1.5 transition disabled:opacity-50"
              title="Upload verified images to Google Drive"
            >
              {isSyncingDrive ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
              Sync Drive
            </button>

            <button
              onClick={handleExportToSheet}
              disabled={isExportingSheet || isAutomatedRunning}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center gap-1.5 transition disabled:opacity-50"
              title="Export or update Day Google Sheet with Drive links"
            >
              {isExportingSheet ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
              Export Sheet
            </button>

            <button
              onClick={handleDownloadCsvForClaude}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-purple-600 hover:bg-purple-500 text-white inline-flex items-center gap-1.5 transition"
              title="Download CSV for Claude Code WordPress generator"
            >
              <Download className="w-4 h-4" />
              CSV for Claude
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-700 text-emerald-300'
                : statusMessage.type === 'error'
                ? 'bg-rose-950/40 border border-rose-700 text-rose-300'
                : 'bg-zinc-800/80 border border-zinc-700 text-zinc-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            ) : (
              <Clock className="w-4 h-4 shrink-0 text-amber-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* 28-Day Calendar Selector Bar */}
        <div className="mt-4 pt-3 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Monthly Audit Schedule (Days 1–28)
            </span>
            <span className="text-[11px] text-zinc-500">
              Select any day to inspect or rescrape that brand slice on demand
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {MONTHLY_SCHEDULE_28_DAYS.map((s) => {
              const isCurrent = s.day === selectedDay;
              return (
                <button
                  key={s.day}
                  onClick={() => setSelectedDay(s.day)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                    isCurrent
                      ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                  title={`${s.brands.join(', ')} - ${s.focusNotes}`}
                >
                  <span className="text-[10px] block opacity-75">Day {s.day}</span>
                  <span>{s.brands[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Metrics & Integrity Audit Cards for Selected Day */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Flavor SKUs (Day {selectedDay})
          </span>
          <p className="text-2xl font-bold text-zinc-100 mt-1">{totalDayCount}</p>
          <span className="text-[11px] text-zinc-500">Deduplicated canonical items</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Verified Pack Photos
          </span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {withPackImg} <span className="text-xs text-zinc-500 font-normal">/ {totalDayCount}</span>
          </p>
          <span className="text-[11px] text-zinc-500">
            {totalDayCount - withPackImg} pending physical photo
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Verified Label Photos
          </span>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {withLabelImg} <span className="text-xs text-zinc-500 font-normal">/ {totalDayCount}</span>
          </p>
          <span className="text-[11px] text-zinc-500">
            {totalDayCount - withLabelImg} pending physical photo
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Google Drive Vault
          </span>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {withDrivePack + withDriveLabel}{' '}
            <span className="text-xs text-zinc-500 font-normal">files synced</span>
          </p>
          <span className="text-[11px] text-zinc-500">Max 2 images / flavor</span>
        </div>
      </div>

      {/* 4-Segment Slices Filter & Product List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-zinc-100">
              Day {selectedDay} Catalog Breakdown ({displayedProducts.length} Items)
            </h3>
          </div>

          {/* Filter segment tabs */}
          <div className="flex flex-wrap gap-1.5">
            {(['All', 'Dry Food', 'Wet Food', 'Dental Chews', 'Treats'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSegmentTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeSegmentTab === tab
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Table / Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-400 bg-zinc-950/60 border-b border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Brand & Product Line</th>
                <th className="py-2.5 px-3">Flavor SKU</th>
                <th className="py-2.5 px-3">Type & Age</th>
                <th className="py-2.5 px-3">MSRP (€)</th>
                <th className="py-2.5 px-3">Verified Image URLs</th>
                <th className="py-2.5 px-3">Drive Links</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {displayedProducts.map((p) => {
                const isExpanded = expandedProductId === p.id;
                const isEditing = editingProductId === p.id;

                return (
                  <React.Fragment key={p.id}>
                    <tr className="hover:bg-zinc-800/30 transition">
                      <td className="py-3 px-3">
                        <span className="font-semibold text-zinc-200 block">{p.brand}</span>
                        <span className="text-[11px] text-zinc-400">{p.productLine}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-zinc-200 block">{p.flavor}</span>
                        <span className="text-[11px] text-zinc-500">{p.packageSize}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 inline-block mr-1">
                          {p.productType}
                        </span>
                        <span className="text-[11px] text-zinc-400">{p.petAgeGroup}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-emerald-400">€{p.msrpEuros.toFixed(2)}</span>
                        <span className="text-[10px] text-zinc-500 block">€{p.pricePerKg.toFixed(2)}/kg</span>
                      </td>
                      <td className="py-3 px-3 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              p.itemImageUrl ? 'bg-emerald-400' : 'bg-zinc-600'
                            }`}
                          />
                          <span className="text-[11px] text-zinc-300">
                            Pack Photo:{' '}
                            {p.itemImageUrl ? (
                              <a
                                href={p.itemImageUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                              >
                                View <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="text-zinc-500 italic">None</span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              p.ingredientsImageUrl ? 'bg-amber-400' : 'bg-zinc-600'
                            }`}
                          />
                          <span className="text-[11px] text-zinc-300">
                            Label Photo:{' '}
                            {p.ingredientsImageUrl ? (
                              <a
                                href={p.ingredientsImageUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-amber-400 hover:underline inline-flex items-center gap-0.5"
                              >
                                View <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="text-zinc-500 italic">None</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              p.drivePackImageUrl ? 'bg-blue-400' : 'bg-zinc-600'
                            }`}
                          />
                          <span className="text-[11px] text-zinc-300">
                            Drive Pack:{' '}
                            {p.drivePackImageUrl ? (
                              <a
                                href={p.drivePackImageUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-400 hover:underline inline-flex items-center gap-0.5"
                              >
                                Drive <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="text-zinc-500 italic">Pending</span>
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              p.driveIngredientsImageUrl ? 'bg-blue-400' : 'bg-zinc-600'
                            }`}
                          />
                          <span className="text-[11px] text-zinc-300">
                            Drive Label:{' '}
                            {p.driveIngredientsImageUrl ? (
                              <a
                                href={p.driveIngredientsImageUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-400 hover:underline inline-flex items-center gap-0.5"
                              >
                                Drive <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="text-zinc-500 italic">Pending</span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (isEditing) {
                              setEditingProductId(null);
                            } else {
                              setEditingProductId(p.id);
                              setEditItemImageUrl(p.itemImageUrl || '');
                              setEditIngredientsImageUrl(p.ingredientsImageUrl || '');
                            }
                          }}
                          className="px-2.5 py-1 text-[11px] rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium transition mr-1.5"
                        >
                          {isEditing ? 'Close' : 'Set URLs'}
                        </button>
                        <button
                          onClick={() => setExpandedProductId(isExpanded ? null : p.id)}
                          className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                          title="Toggle details"
                        >
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Inline Image URL Editor */}
                    {isEditing && (
                      <tr className="bg-zinc-950/80">
                        <td colSpan={7} className="p-4 border-t border-b border-zinc-800">
                          <div className="max-w-2xl space-y-3">
                            <h4 className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                              <Plus className="w-3.5 h-3.5 text-emerald-400" />
                              Set Verified Image URLs for &quot;{p.flavor}&quot;
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] text-zinc-400 font-medium block mb-1">
                                  Front Packaging Image URL
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://..."
                                  value={editItemImageUrl}
                                  onChange={(e) => setEditItemImageUrl(e.target.value)}
                                  className="w-full text-xs px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-zinc-200 focus:outline-none focus:border-emerald-500"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-zinc-400 font-medium block mb-1">
                                  Ingredients Back Label Image URL
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://..."
                                  value={editIngredientsImageUrl}
                                  onChange={(e) => setEditIngredientsImageUrl(e.target.value)}
                                  className="w-full text-xs px-2.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded text-zinc-200 focus:outline-none focus:border-amber-500"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                onClick={() => setEditingProductId(null)}
                                className="px-3 py-1 text-xs rounded text-zinc-400 hover:text-zinc-200 transition"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveProductUrls(p)}
                                className="px-3.5 py-1 text-xs font-medium rounded bg-emerald-600 hover:bg-emerald-500 text-white transition"
                              >
                                Save URLs
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* Expanded Details Row */}
                    {isExpanded && (
                      <tr className="bg-zinc-950/40">
                        <td colSpan={7} className="p-4 border-t border-b border-zinc-800 text-zinc-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-semibold text-zinc-200 mb-1">Ingredients:</h5>
                              <p className="text-[11px] text-zinc-400 leading-relaxed">
                                {p.ingredients.join(', ')}
                              </p>
                              <h5 className="font-semibold text-zinc-200 mt-2 mb-1">Known Allergens:</h5>
                              <p className="text-[11px] text-rose-300">
                                {p.allergens.length > 0 ? p.allergens.join(', ') : 'None flagged (Single source/Novel protein)'}
                              </p>
                            </div>
                            <div>
                              <h5 className="font-semibold text-zinc-200 mb-1">Guaranteed Analysis:</h5>
                              <div className="grid grid-cols-3 gap-2 text-[11px] text-zinc-400">
                                <div>Protein: <span className="text-zinc-200 font-bold">{p.nutritionalValues.crudeProteinPercent}%</span></div>
                                <div>Fat: <span className="text-zinc-200 font-bold">{p.nutritionalValues.crudeFatPercent}%</span></div>
                                <div>Fiber: <span className="text-zinc-200 font-bold">{p.nutritionalValues.crudeFiberPercent}%</span></div>
                              </div>
                              <h5 className="font-semibold text-zinc-200 mt-2 mb-1">Available in Greece:</h5>
                              <p className="text-[11px] text-zinc-400">
                                {p.greeceRetailers.join(', ')}
                              </p>
                              {p.officialProductUrl && (
                                <a
                                  href={p.officialProductUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-400 hover:underline text-[11px] inline-flex items-center gap-1 mt-2"
                                >
                                  Official Catalog Link <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

