import React, { useState } from 'react';
import { DogProduct } from '../types';
import { exportToGoogleSheet, CreateSheetResult } from '../services/sheetsExport';
import { downloadProductsAsCSV, downloadRecipesAsCSV } from '../services/csvExport';
import {
  FileSpreadsheet,
  Download,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChefHat,
  Utensils,
} from 'lucide-react';
import { User } from 'firebase/auth';

interface ExportBarProps {
  products: DogProduct[];
  user: User | null;
  accessToken: string | null;
  onPromptLogin: () => void;
}

export const ExportBar: React.FC<ExportBarProps> = ({
  products,
  user,
  accessToken,
  onPromptLogin,
}) => {
  const [exporting, setExporting] = useState(false);
  const [exportResult, setExportResult] = useState<CreateSheetResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const foodCount = products.filter(
    (p) => p.productType === 'Dry Food' || p.productType === 'Wet Food'
  ).length;
  const treatsCount = products.filter(
    (p) => p.productType === 'Treats' || p.productType === 'Dental Chews'
  ).length;

  const handleExportToSheets = async () => {
    if (!user || !accessToken) {
      onPromptLogin();
      return;
    }

    try {
      setExporting(true);
      setErrorMessage(null);
      setExportResult(null);

      const title = `Greece Dog Feeds & Treats Catalog (${new Date().toLocaleDateString('el-GR')})`;
      const result = await exportToGoogleSheet(accessToken, products, title);
      setExportResult(result);
    } catch (err: any) {
      console.error('Google Sheets export failed:', err);
      setErrorMessage(err.message || 'Failed to export to Google Sheets. Check permissions.');
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadAllCSV = () => {
    downloadProductsAsCSV(products, `greece_dog_products_catalog_${products.length}.csv`);
  };

  const handleDownloadFoodCSV = () => {
    const food = products.filter(
      (p) => p.productType === 'Dry Food' || p.productType === 'Wet Food'
    );
    downloadProductsAsCSV(food, `greece_dog_food_sheet_${food.length}_items.csv`);
  };

  const handleDownloadTreatsCSV = () => {
    const treats = products.filter(
      (p) => p.productType === 'Treats' || p.productType === 'Dental Chews'
    );
    downloadProductsAsCSV(treats, `greece_dog_treats_sheet_${treats.length}_items.csv`);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            Export Divided Google Sheets & CSV
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5 max-w-2xl">
            Generates a multi-tab Google Spreadsheet divided into{' '}
            <strong className="text-emerald-300">Sheet 1: Dog Food</strong> ({foodCount} items),{' '}
            <strong className="text-sky-300">Sheet 2: Dog Treats & Chews</strong> ({treatsCount} items), and{' '}
            <strong className="text-amber-300">Sheet 3: 10 Home Cooking Recipes</strong> with full ingredient image URLs, guaranteed values, and laboratory audit standards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Primary Action: Export to Google Sheets */}
          <button
            onClick={handleExportToSheets}
            disabled={exporting || products.length === 0}
            id="export-google-sheets-btn"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white rounded-lg text-xs font-semibold shadow-md transition disabled:opacity-50"
          >
            {exporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating 2 Sheets + Recipes...</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4" />
                <span>Export to Google Sheets (2 Sheets + Recipes)</span>
              </>
            )}
          </button>

          {/* Direct CSV Downloads */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleDownloadFoodCSV}
              id="download-food-csv-btn"
              title="Download Dog Food Sheet as CSV"
              className="inline-flex items-center gap-1 px-2.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium border border-zinc-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Food CSV</span>
            </button>

            <button
              onClick={handleDownloadTreatsCSV}
              id="download-treats-csv-btn"
              title="Download Dog Treats Sheet as CSV"
              className="inline-flex items-center gap-1 px-2.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium border border-zinc-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Treats CSV</span>
            </button>

            <button
              onClick={() => downloadRecipesAsCSV()}
              id="download-recipes-csv-quick-btn"
              title="Download 10 Home Cooking Recipes as CSV"
              className="inline-flex items-center gap-1 px-2.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium border border-zinc-700 transition"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Recipes CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification with Direct Link to the created Google Sheet */}
      {exportResult && (
        <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-200 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-semibold">Google Sheet successfully generated with 3 tabs:</span>
              <div className="text-[11px] text-emerald-300/80 mt-0.5">
                • Sheet 1 &quot;Dog Food&quot; ({exportResult.foodRowsCount} rows) • Sheet 2 &quot;Dog Treats &amp; Chews&quot; ({exportResult.treatsRowsCount} rows) • Sheet 3 &quot;Home Cooking Recipes&quot; ({exportResult.recipesRowsCount} balanced formulas)
              </div>
            </div>
          </div>

          <a
            href={exportResult.spreadsheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="open-google-sheet-link"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow transition shrink-0"
          >
            <span>Open in Google Sheets</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Error alert */}
      {errorMessage && (
        <div className="p-3 bg-rose-950/40 border border-rose-700/50 rounded-lg flex items-center justify-between gap-3 text-xs text-rose-200 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-xs text-rose-300 hover:text-white underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
