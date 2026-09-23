import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Product Search & Verification grounded with Google Search
  // (Provides real-time Greek market pricing, official product URLs, and allergen facts)
  app.post('/api/ai/lookup-product', async (req, res) => {
    try {
      const { query, brand } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      const ai = getAIClient();
      const prompt = `You are a canine veterinary nutritionist and pet food specialist in Greece.
Search for official information on the dog food or treat: "${query}" (Brand: ${brand || 'Any'}).
Search Greek and European official distributor catalogs (such as Pet City, Petvet24, Zoofast GR, or official brand websites).

Provide an accurate, verified summary of:
1. Exact product name & flavor line
2. Pet age group (Puppy, Adult, Senior, All Life Stages)
3. Full or key ingredients list
4. Guaranteed nutritional analysis (Crude Protein %, Crude Fat %, Crude Fiber %, Ash %, Moisture %, Caloric content)
5. Known allergens present (e.g. Chicken, Beef, Wheat, Corn, Soy, Dairy, Specific Fish)
6. Recommended Manufacturer Suggested Retail Price (MSRP) in Euros (€) in Greece
7. Official product website link
8. Where available in Greece (notable pet shops or distributors)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || '';
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const searchLinks = chunks
        .filter((c: any) => c.web?.uri)
        .map((c: any) => ({
          title: c.web.title || c.web.uri,
          url: c.web.uri,
        }));

      return res.json({
        content: text,
        sources: searchLinks,
      });
    } catch (err: any) {
      console.error('Lookup product error:', err);
      return res.status(500).json({ error: err.message || 'Internal AI lookup error' });
    }
  });

  // Batch AI Scraper / Verifier for Day Products
  // Scrapes live retail/official data for products without overwriting if no new data found
  app.post('/api/ai/rescrape-day-products', async (req, res) => {
    try {
      const { day, brands, products } = req.body;
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Array of products is required' });
      }

      const ai = getAIClient();
      const results: any[] = [];

      // Process in small sequential batches with Google Search grounding
      for (const p of products) {
        try {
          const prompt = `You are an elite canine veterinary nutritionist, barcode auditor, and Greek pet food retail researcher.
You are performing a strict, zero-hallucination audit of the dog product:
- Brand: "${p.brand}"
- Product Line: "${p.productLine || ''}"
- Flavor / Recipe: "${p.flavor}"
- Package Size: "${p.packageSize || ''}"
- Canonical Product Type: "${p.productType || 'Dry Food'}"

YOUR DIRECTIVE: Find the EXACT, verified real-world product specifications as distributed in Greece and Europe.
CRITICAL INTEGRITY RULES:
1. ABSOLUTE TRUTH, NO GUESSING: Do not hallucinate or invent URLs, EANs, or ingredients.
2. NO GENERIC SEARCH OR HOMEPAGE LINKS:
   - "officialProductUrl" MUST be the deep direct product page on the brand's official website (e.g., https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-singles-lamb-new.html or https://www.royalcanin.com/gr/dogs/products/...), NEVER a generic homepage like "https://acana.com" or "https://royalcanin.com".
   - "skroutzUrl" MUST be the actual Skroutz.gr product page (e.g., https://www.skroutz.gr/s/11545620/Acana-Grass-Fed-Lamb-11-4kg.html), NEVER a generic search query like "/search?key=...". If unavailable, return null.
   - "bestPriceUrl" MUST be the actual BestPrice.gr product page (e.g., https://www.bestprice.gr/item/2153678950/acana-grass-fed-lamb-11-4kg.html), NEVER a search URL. If unavailable, return null.
3. AUTHENTIC PACKAGING & LABEL IMAGES:
   - "itemImageUrl" must be an authentic, high-resolution direct image URL of the front packaging from the manufacturer or trusted retailer CDN (e.g., brand CDN, official distributor). NEVER stock Unsplash or placeholder URLs.
   - "ingredientsImageUrl" must be a direct image URL of the back label / guaranteed analysis panel or kibble breakdown if publicly hosted on the brand CDN.
4. EAN-13 / UPC BARCODE:
   - "eanBarcode" must be the verified authentic manufacturer GTIN / EAN-13 or UPC barcode.
5. COMPLETE GUARANTEED ANALYSIS & INGREDIENTS:
   - "ingredientsList": Complete European packaging composition in descending order by weight.
   - "additives": Nutritional/technological additives (e.g., Vitamin A, Vitamin D3, Zinc, Enterococcus faecium).
   - "crudeProteinPercent", "crudeFatPercent", "crudeFiberPercent", "crudeAshPercent", "moisturePercent", "caloricContentKcalKg": Verified percentages from packaging.

Return ONLY a valid JSON object matching this schema (set null if unverified):
{
  "officialProductUrl": string | null,
  "skroutzUrl": string | null,
  "bestPriceUrl": string | null,
  "itemImageUrl": string | null,
  "ingredientsImageUrl": string | null,
  "eanBarcode": string | null,
  "ingredientsList": string[] | null,
  "additives": string | null,
  "allergens": string[] | null,
  "msrpEuros": number | null,
  "crudeProteinPercent": number | null,
  "crudeFatPercent": number | null,
  "crudeFiberPercent": number | null,
  "crudeAshPercent": number | null,
  "moisturePercent": number | null,
  "caloricContentKcalKg": number | null,
  "animalProteinPercent": number | null,
  "greeceRetailers": string[] | null,
  "verificationMethod": string | null,
  "verificationSourceUrl": string | null
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              tools: [{ googleSearch: {} }],
              responseMimeType: 'application/json',
            },
          });

          let parsed: any = null;
          try {
            parsed = JSON.parse(response.text || '{}');
          } catch {
            parsed = null;
          }

          // Merge with grounding links if parsed fields are missing
          const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
          const firstWebUri = chunks.find((c: any) => c.web?.uri)?.web?.uri;

          if (parsed && typeof parsed === 'object') {
            // Validate URLs: reject generic search URLs or domain root URLs if returned
            if (parsed.skroutzUrl && parsed.skroutzUrl.includes('/search?')) {
              parsed.skroutzUrl = null;
            }
            if (parsed.bestPriceUrl && parsed.bestPriceUrl.includes('/search?')) {
              parsed.bestPriceUrl = null;
            }
            if (parsed.itemImageUrl && (parsed.itemImageUrl.includes('unsplash.com') || parsed.itemImageUrl.startsWith('data:image'))) {
              parsed.itemImageUrl = null;
            }
            if (parsed.ingredientsImageUrl && (parsed.ingredientsImageUrl.includes('unsplash.com') || parsed.ingredientsImageUrl.startsWith('data:image'))) {
              parsed.ingredientsImageUrl = null;
            }

            if (!parsed.officialProductUrl && firstWebUri && !firstWebUri.includes('/search') && !firstWebUri.includes('google.com')) {
              parsed.officialProductUrl = firstWebUri;
            }

            results.push({
              productId: p.id,
              success: true,
              scrapedData: parsed,
            });
          } else {
            results.push({
              productId: p.id,
              success: false,
              message: 'No structured data returned',
            });
          }
        } catch (itemErr: any) {
          console.warn(`Error scraping product ${p.flavor}:`, itemErr.message);
          results.push({
            productId: p.id,
            success: false,
            error: itemErr.message,
          });
        }
      }

      return res.json({
        day,
        totalRequested: products.length,
        results,
      });
    } catch (err: any) {
      console.error('Batch rescrape error:', err);
      return res.status(500).json({ error: err.message || 'Internal batch rescrape error' });
    }
  });

  // AI Dietary Comparison & Allergen Analyzer
  app.post('/api/ai/compare-diet', async (req, res) => {
    try {
      const { productNames, dogProfile } = req.body;
      const ai = getAIClient();

      const prompt = `Compare the nutritional profiles and allergen risks of the following dog foods/treats available in Greece:
Products: ${JSON.stringify(productNames)}
Dog Condition / Criteria: ${dogProfile || 'General Health & Sensitive Digestion'}

Provide a clear comparison highlighting:
- Protein quality and primary meat sources
- Allergen safety (grain-free, monoprotein, novel proteins)
- Fat to protein ratio suitability
- Best recommendation based on age and dietary sensitivity`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({
        analysis: response.text || '',
      });
    } catch (err: any) {
      console.error('Diet comparison error:', err);
      return res.status(500).json({ error: err.message || 'Internal AI comparison error' });
    }
  });

  // Google Drive Multipart Image Uploader
  // Downloads the verified image from retail/brand CDN (server-side, bypassing browser CORS)
  // and streams directly into user's designated Google Drive vault folder.
  app.post('/api/drive/upload-image-url', async (req, res) => {
    try {
      const { folderId, imageUrl, fileName } = req.body;
      const authHeader = req.headers.authorization;
      const accessToken = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : req.body.accessToken;

      if (!accessToken) {
        return res.status(401).json({ error: 'OAuth access token is required' });
      }
      if (!folderId || !imageUrl || !fileName) {
        return res.status(400).json({ error: 'folderId, imageUrl, and fileName are required' });
      }

      // 1. Download image
      const imgRes = await fetch(imageUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
      });

      if (!imgRes.ok) {
        return res
          .status(400)
          .json({ error: `Failed to download source image: HTTP ${imgRes.status} (${imageUrl})` });
      }

      const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
      const arrayBuffer = await imgRes.arrayBuffer();
      const imageBuffer = Buffer.from(arrayBuffer);

      // 2. Check if a file with this name already exists in this Drive folder
      const cleanFileName = fileName.replace(/'/g, "\\'");
      const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(
        cleanFileName
      )}' and '${folderId}' in parents and trashed=false&fields=files(id,name,webViewLink,webContentLink)`;

      const searchRes = await fetch(searchUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.files && searchData.files.length > 0) {
          const existing = searchData.files[0];
          return res.json({
            fileId: existing.id,
            webViewLink:
              existing.webViewLink || `https://drive.google.com/file/d/${existing.id}/view`,
            webContentLink: existing.webContentLink,
            alreadyExisted: true,
          });
        }
      }

      // 3. Upload to Google Drive using multipart upload
      const boundary = '-------GreeceVaultMultipartBoundary' + Date.now();
      const delimiter = `\r\n--${boundary}\r\n`;
      const closeDelimiter = `\r\n--${boundary}--`;

      const metadata = {
        name: fileName,
        parents: [folderId],
        description: 'Greece Pet Food Vault - Verified packaging or ingredients label photo',
      };

      const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
        metadata
      )}`;
      const mediaPartHeader = `${delimiter}Content-Type: ${contentType}\r\nContent-Transfer-Encoding: binary\r\n\r\n`;

      const payload = Buffer.concat([
        Buffer.from(metadataPart, 'utf-8'),
        Buffer.from(mediaPartHeader, 'utf-8'),
        imageBuffer,
        Buffer.from(closeDelimiter, 'utf-8'),
      ]);

      const uploadResponse = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': `multipart/related; boundary=${boundary}`,
            'Content-Length': String(payload.length),
          },
          body: payload,
        }
      );

      if (!uploadResponse.ok) {
        const errText = await uploadResponse.text();
        return res
          .status(uploadResponse.status)
          .json({ error: `Google Drive API upload rejected: ${errText}` });
      }

      const fileData = await uploadResponse.json();
      return res.json({
        fileId: fileData.id,
        webViewLink:
          fileData.webViewLink || `https://drive.google.com/file/d/${fileData.id}/view`,
        webContentLink: fileData.webContentLink,
        alreadyExisted: false,
      });
    } catch (err: any) {
      console.error('Drive upload exception:', err);
      return res.status(500).json({ error: err.message || 'Drive upload failed' });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Greece Pet Food App running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
