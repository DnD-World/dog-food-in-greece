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
