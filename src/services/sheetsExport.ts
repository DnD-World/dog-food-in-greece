import { DogProduct } from '../types';
import { POPULAR_HOME_COOKING_RECIPES } from '../recipesData';

export interface CreateSheetResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
  foodRowsCount: number;
  treatsRowsCount: number;
  recipesRowsCount: number;
}

/**
 * Exports products to a new, professionally formatted Google Sheet divided into:
 * 1. "Dog Food" (Dry & Wet Diets)
 * 2. "Dog Treats & Chews" (Dental Chews, Biscuits, Jerky)
 * 3. "Home Cooking Recipes" (10 Balanced Veterinary Recipes)
 */
export async function exportToGoogleSheet(
  accessToken: string,
  products: DogProduct[],
  title = `Greece Dog Feeds & Treats Catalog (${new Date().toLocaleDateString('en-GB')})`
): Promise<CreateSheetResult> {
  // Partition products into Food vs Treats
  const foodProducts = products.filter(
    (p) => p.productType === 'Dry Food' || p.productType === 'Wet Food'
  );
  const treatProducts = products.filter(
    (p) => p.productType === 'Treats' || p.productType === 'Dental Chews'
  );

  // 1. Create a new Spreadsheet with 3 dedicated sheets
  const createResponse = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Dog Food',
            gridProperties: { frozenRowCount: 1 },
          },
        },
        {
          properties: {
            title: 'Dog Treats & Chews',
            gridProperties: { frozenRowCount: 1 },
          },
        },
        {
          properties: {
            title: 'Home Cooking Recipes (10)',
            gridProperties: { frozenRowCount: 1 },
          },
        },
      ],
    }),
  });

  if (!createResponse.ok) {
    const errorData = await createResponse.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Failed to create Google Sheet: HTTP ${createResponse.status}`
    );
  }

  const spreadsheetData = await createResponse.json();
  const spreadsheetId = spreadsheetData.spreadsheetId;
  const spreadsheetUrl = spreadsheetData.spreadsheetUrl;

  const foodSheetId = spreadsheetData.sheets?.[0]?.properties?.sheetId ?? 0;
  const treatsSheetId = spreadsheetData.sheets?.[1]?.properties?.sheetId ?? 1;
  const recipesSheetId = spreadsheetData.sheets?.[2]?.properties?.sheetId ?? 2;

  // 2. Build headers for Product Sheets
  const productHeaders = [
    'Brand',
    'Product Line',
    'Flavor / Recipe',
    'Channel Category',
    'Product Type',
    'Pet Age Group',
    'Canonical Package Size',
    'All Available Packaging Sizes',
    'MSRP (€)',
    'Price / Kg (€/kg)',
    'Web Item Image URL',
    'Web Ingredients Image URL',
    'Google Drive Pack Photo',
    'Google Drive Ingredients Label',
    'Official Product Link',
    'Skroutz.gr Price Link',
    'BestPrice.gr Price Link',
    'Quality & Manufacturing Standard',
    'Independent 3rd-Party Lab Report Status',
    'Lab Audit URL (If Verified)',
    'Animal Protein (%)',
    'EAN Barcode',
    'Crude Protein (%)',
    'Crude Fat (%)',
    'Crude Fiber (%)',
    'Ash (%)',
    'Moisture (%)',
    'Calories (kcal/kg)',
    'Grain-Free',
    'Allergens',
    'Key Dietary & Nutritional Info',
    'Ingredients List',
    'Greece Retailers & Availability',
    'Country of Origin',
  ];

  const mapProductToRow = (p: DogProduct) => [
    p.brand,
    p.productLine,
    p.flavor,
    p.channelCategory,
    p.productType,
    p.petAgeGroup,
    p.packageSize,
    p.availableSizes ? p.availableSizes.join(', ') : p.packageSize,
    Number(p.msrpEuros.toFixed(2)),
    Number(p.pricePerKg.toFixed(2)),
    p.itemImageUrl || '',
    p.ingredientsImageUrl || '',
    p.drivePackImageUrl || '',
    p.driveIngredientsImageUrl || '',
    p.officialProductUrl,
    p.skroutzUrl || '',
    p.bestPriceUrl || '',
    p.certifyingBody || 'FEDIAF Standards Compliant',
    p.hasIndependentLabReport ? 'Verified Independent Lab Audit' : 'Manufacturer In-House QA (Self-Declared)',
    p.hasIndependentLabReport && p.labReportUrl ? p.labReportUrl : 'N/A (No Public 3rd-Party COA)',
    p.animalProteinPercent ? `${p.animalProteinPercent}%` : 'N/A',
    p.eanBarcode || 'N/A',
    p.nutritionalValues.crudeProteinPercent,
    p.nutritionalValues.crudeFatPercent,
    p.nutritionalValues.crudeFiberPercent,
    p.nutritionalValues.crudeAshPercent ?? 'N/A',
    p.nutritionalValues.moisturePercent ?? 'N/A',
    p.nutritionalValues.caloricContentKcalKg ?? 'N/A',
    p.grainFree ? 'Yes' : 'No',
    p.allergens.join(', '),
    p.specialDietaryInfo.join(' | '),
    p.ingredients.join(', '),
    p.greeceRetailers.join(', '),
    p.countryOfOrigin,
  ];

  const foodRows = foodProducts.map(mapProductToRow);
  const treatsRows = treatProducts.map(mapProductToRow);

  // 3. Headers and rows for Home Cooking Recipes
  const recipeHeaders = [
    'Recipe Title',
    'Greek Title (Ελληνικά)',
    'Target Profile & Indication',
    'Dog Size Suitability',
    'Daily Portion (per 10kg Dog)',
    'Ingredients & Exact Metric Amounts (Grams)',
    'Preparation & Step-by-Step Cooking Guide',
    'Vital Ca:P Balancer Rule & Supplements',
    'Est. Protein %',
    'Est. Fat %',
    'Est. Fiber %',
    'Kcal per 100g',
    'Veterinary Clinical Notes',
    'Storage & Freezing Shelf-Life',
  ];

  const recipeRows = POPULAR_HOME_COOKING_RECIPES.map((r) => [
    r.title,
    r.greekTitle,
    r.targetProfile,
    r.dogSizeSuitability,
    r.dailyPortionPer10KgDog,
    r.ingredients.map((i) => `${i.name} (${i.quantityGrams}g - ${i.purpose})`).join('; '),
    r.stepByStepInstructions.map((s, idx) => `Step ${idx + 1}: ${s}`).join('\n\n'),
    `Calcium Balancer: ${r.vitalNutritionalBalancer.recommendedSupplement}\nOmega-3: ${r.vitalNutritionalBalancer.omega3Source}\nRule: ${r.vitalNutritionalBalancer.calciumPhosphorusRule}`,
    r.macronutrientsPer100g.proteinPercent,
    r.macronutrientsPer100g.fatPercent,
    r.macronutrientsPer100g.fiberPercent,
    r.macronutrientsPer100g.kcalPer100g,
    r.veterinaryNotes,
    r.storageInstructions,
  ]);

  // 4. Batch populate data into all 3 sheets
  const appendData = async (sheetName: string, values: unknown[][]) => {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${sheetName}'!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn(`Warning appending to ${sheetName}:`, err);
    }
  };

  await appendData('Dog Food', [productHeaders, ...foodRows]);
  await appendData('Dog Treats & Chews', [productHeaders, ...treatsRows]);
  await appendData('Home Cooking Recipes (10)', [recipeHeaders, ...recipeRows]);

  // 5. Apply rich formatting: header colors, currency formatting, auto-filters
  try {
    const requests: Record<string, unknown>[] = [];

    // Helper for styling product sheet
    const addProductSheetStyles = (sheetId: number, rowCount: number) => {
      requests.push(
        // Header background (Emerald for Food, Amber/Teal for Treats)
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: productHeaders.length,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor:
                  sheetId === foodSheetId
                    ? { red: 0.07, green: 0.28, blue: 0.2 } // Emerald
                    : { red: 0.12, green: 0.22, blue: 0.35 }, // Slate Navy
                textFormat: {
                  foregroundColor: { red: 1, green: 1, blue: 1 },
                  bold: true,
                  fontSize: 10,
                },
                horizontalAlignment: 'LEFT',
                verticalAlignment: 'MIDDLE',
                padding: { top: 6, bottom: 6, left: 8, right: 8 },
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,padding)',
          },
        },
        // Currency formatting for MSRP column (Column H, index 7) & Price/Kg (Column I, index 8)
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 1,
              endRowIndex: rowCount + 1,
              startColumnIndex: 7,
              endColumnIndex: 9,
            },
            cell: {
              userEnteredFormat: {
                numberFormat: {
                  type: 'CURRENCY',
                  pattern: '€#,##0.00',
                },
              },
            },
            fields: 'userEnteredFormat.numberFormat',
          },
        },
        // Native Auto-filter on columns
        {
          setBasicFilter: {
            filter: {
              range: {
                sheetId,
                startRowIndex: 0,
                endRowIndex: rowCount + 1,
                startColumnIndex: 0,
                endColumnIndex: productHeaders.length,
              },
            },
          },
        }
      );
    };

    addProductSheetStyles(foodSheetId, foodRows.length);
    addProductSheetStyles(treatsSheetId, treatsRows.length);

    // Style Recipes Sheet header (Warm Terra Cotta)
    requests.push(
      {
        repeatCell: {
          range: {
            sheetId: recipesSheetId,
            startRowIndex: 0,
            endRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: recipeHeaders.length,
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.45, green: 0.2, blue: 0.08 }, // Warm Copper
              textFormat: {
                foregroundColor: { red: 1, green: 1, blue: 1 },
                bold: true,
                fontSize: 10,
              },
              horizontalAlignment: 'LEFT',
              verticalAlignment: 'MIDDLE',
            },
          },
          fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
        },
      },
      {
        setBasicFilter: {
          filter: {
            range: {
              sheetId: recipesSheetId,
              startRowIndex: 0,
              endRowIndex: recipeRows.length + 1,
              startColumnIndex: 0,
              endColumnIndex: recipeHeaders.length,
            },
          },
        },
      }
    );

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    });
  } catch (styleErr) {
    console.warn('BatchUpdate styling notice (non-fatal):', styleErr);
  }

  return {
    spreadsheetId,
    spreadsheetUrl,
    foodRowsCount: foodRows.length,
    treatsRowsCount: treatsRows.length,
    recipesRowsCount: recipeRows.length,
  };
}

/**
 * Searches user's Google Drive for an existing spreadsheet for a given Day,
 * or creates a new one. Updates the contents in place to replace old data with new data,
 * without wiping if there is no new data.
 */
export async function updateOrCreateDaySheet(
  accessToken: string,
  day: number,
  brandNames: string[],
  products: DogProduct[]
): Promise<CreateSheetResult> {
  const dayPrefix = `Greece Pet Food Vault - Day ${day}`;
  const searchName = `${dayPrefix} (${brandNames.join(', ')})`;
  
  // Search Drive for spreadsheet with this title pattern
  const query = encodeURIComponent(
    `name contains 'Greece Pet Food Vault - Day ${day}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`
  );
  
  let existingSpreadsheetId: string | null = null;
  try {
    const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        existingSpreadsheetId = searchData.files[0].id;
      }
    }
  } catch (err) {
    console.warn('Could not check existing sheet, will create new:', err);
  }

  // Partition products into Food vs Treats
  const foodProducts = products.filter(
    (p) => p.productType === 'Dry Food' || p.productType === 'Wet Food'
  );
  const treatProducts = products.filter(
    (p) => p.productType === 'Treats' || p.productType === 'Dental Chews'
  );

  const productHeaders = [
    'Brand',
    'Product Line',
    'Flavor / Recipe',
    'Channel Category',
    'Product Type',
    'Pet Age Group',
    'Canonical Package Size',
    'All Available Packaging Sizes',
    'MSRP (€)',
    'Price / Kg (€/kg)',
    'Web Item Image URL',
    'Web Ingredients Image URL',
    'Google Drive Pack Photo',
    'Google Drive Ingredients Label',
    'Official Product Link',
    'Skroutz.gr Price Link',
    'BestPrice.gr Price Link',
    'Quality & Manufacturing Standard',
    'Independent 3rd-Party Lab Report Status',
    'Lab Audit URL (If Verified)',
    'Animal Protein (%)',
    'EAN Barcode',
    'Crude Protein (%)',
    'Crude Fat (%)',
    'Crude Fiber (%)',
    'Ash (%)',
    'Moisture (%)',
    'Calories (kcal/kg)',
    'Grain-Free',
    'Allergens',
    'Key Dietary & Nutritional Info',
    'Ingredients List',
    'Greece Retailers & Availability',
    'Country of Origin',
  ];

  const mapProductToRow = (p: DogProduct) => [
    p.brand,
    p.productLine,
    p.flavor,
    p.channelCategory,
    p.productType,
    p.petAgeGroup,
    p.packageSize,
    p.availableSizes ? p.availableSizes.join(', ') : p.packageSize,
    Number(p.msrpEuros.toFixed(2)),
    Number(p.pricePerKg.toFixed(2)),
    p.itemImageUrl || '',
    p.ingredientsImageUrl || '',
    p.drivePackImageUrl || '',
    p.driveIngredientsImageUrl || '',
    p.officialProductUrl,
    p.skroutzUrl || '',
    p.bestPriceUrl || '',
    p.certifyingBody || 'FEDIAF Standards Compliant',
    p.hasIndependentLabReport ? 'Verified Independent Lab Audit' : 'Manufacturer In-House QA (Self-Declared)',
    p.hasIndependentLabReport && p.labReportUrl ? p.labReportUrl : 'N/A (No Public 3rd-Party COA)',
    p.animalProteinPercent ? `${p.animalProteinPercent}%` : 'N/A',
    p.eanBarcode || 'N/A',
    p.nutritionalValues.crudeProteinPercent,
    p.nutritionalValues.crudeFatPercent,
    p.nutritionalValues.crudeFiberPercent,
    p.nutritionalValues.crudeAshPercent ?? 'N/A',
    p.nutritionalValues.moisturePercent ?? 'N/A',
    p.nutritionalValues.caloricContentKcalKg ?? 'N/A',
    p.grainFree ? 'Yes' : 'No',
    p.allergens.join(', '),
    p.specialDietaryInfo.join(' | '),
    p.ingredients.join(', '),
    p.greeceRetailers.join(', '),
    p.countryOfOrigin,
  ];

  const foodRows = foodProducts.map(mapProductToRow);
  const treatsRows = treatProducts.map(mapProductToRow);

  // If no existing sheet found, create a brand new one
  if (!existingSpreadsheetId) {
    return exportToGoogleSheet(
      accessToken,
      products,
      `${searchName} [${new Date().toLocaleDateString('en-GB')}]`
    );
  }

  // If existing sheet exists, update values in place (clearing old rows and writing new)
  const spreadsheetId = existingSpreadsheetId;
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Helper to clear and write sheet
  const overwriteSheet = async (sheetName: string, values: unknown[][]) => {
    // 1. Clear existing range
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${sheetName}'!A1:Z1000:clear`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    ).catch(() => {});

    // 2. Put new values starting at A1
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'${sheetName}'!A1?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      }
    );
  };

  // Only overwrite if we have rows or valid headers
  if (foodRows.length > 0) {
    await overwriteSheet('Dog Food', [productHeaders, ...foodRows]);
  }
  if (treatsRows.length > 0) {
    await overwriteSheet('Dog Treats & Chews', [productHeaders, ...treatsRows]);
  }

  return {
    spreadsheetId,
    spreadsheetUrl,
    foodRowsCount: foodRows.length,
    treatsRowsCount: treatsRows.length,
    recipesRowsCount: 0,
  };
}
