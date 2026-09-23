import * as fs from 'fs';

interface ProductAudit {
  officialUrl: string;
  title: string;
  frontImg: string | null;
  frontImgStatus: number;
  backImg: string | null;
  backImgStatus: number;
  ingredientsText: string;
  additivesText: string;
  calorieText: string;
  kcal: number | null;
  analysis: Record<string, number>;
}

async function checkHead(url: string): Promise<number> {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
    return res.status;
  } catch {
    return 500;
  }
}

async function scrapePage(url: string): Promise<ProductAudit> {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();

  // Title
  const titleMatch = html.match(/<h1[^>]*class=\"product-name\"[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  // Zoom images
  const zoomMatches = [...html.matchAll(/data-zoom-image=\"([^\"]+)\"/g)].map(m => m[1].replace(/&amp;/g, '&'));
  const frontImgRaw = zoomMatches.find(img => img.toLowerCase().includes('front')) || zoomMatches[0] || null;
  const backImgRaw = zoomMatches.find(img => img.toLowerCase().includes('back')) || (zoomMatches.length > 1 ? zoomMatches[1] : null);

  const frontImg = frontImgRaw ? frontImgRaw.replace(/\s/g, '%20') : null;
  const backImg = backImgRaw ? backImgRaw.replace(/\s/g, '%20') : null;

  const frontImgStatus = frontImg ? await checkHead(frontImg) : 404;
  const backImgStatus = backImg ? await checkHead(backImg) : 404;

  // Ingredients
  let ingredientsText = '';
  const ingMatch = html.match(/class=\"ingredients-list\"[\s\S]*?<h2>Ingredients<\/h2>\s*<p>([\s\S]*?)<\/p>/i);
  if (ingMatch) {
    ingredientsText = ingMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Additives
  let additivesText = '';
  const addMatch = html.match(/ADDITIVES\s*\(per kg\):?\s*([\s\S]*?)<\/p>/i);
  if (addMatch) {
    additivesText = addMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Calorie
  let calorieText = '';
  let kcal: number | null = null;
  const calMatch = html.match(/CALORIE CONTENT\s*\(calculated\):?\s*([\s\S]*?)<\/p>/i);
  if (calMatch) {
    calorieText = calMatch[1].replace(/<[^>]+>/g, '').replace(/&bull;/g, '•').trim();
    const kcalMatch = calorieText.match(/(\d+)\s*kcal\/kg/i);
    if (kcalMatch) kcal = parseInt(kcalMatch[1], 10);
  }

  // Guaranteed analysis
  const analysis: Record<string, number> = {};
  const gaBlock = html.match(/class=\"analysis\"[\s\S]*?<ul>([\s\S]*?)<\/ul>/i);
  if (gaBlock) {
    const items = [...gaBlock[1].matchAll(/<li>\s*([^<]+?)\s*<span>\s*([\d\.]+)%\s*<\/span>\s*<\/li>/gi)];
    for (const item of items) {
      const label = item[1].trim();
      const val = parseFloat(item[2]);
      analysis[label] = val;
    }
  }

  return {
    officialUrl: url,
    title,
    frontImg,
    frontImgStatus,
    backImg,
    backImgStatus,
    ingredientsText,
    additivesText,
    calorieText,
    kcal,
    analysis
  };
}

async function run() {
  const urls = [
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-singles-lamb-new.html',
    'https://www.acana.com/en-CA/dogs/dog-food/singles%2C-duck-with-pear-recipe/ns-aca-singles-duck-new.html',
    'https://www.acana.com/en-CA/dogs/dog-food/singles%2C-pork-with-squash-recipe/ns-aca-singles-pork-new.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-adult-large.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-sport-agility.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-light-fit.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-senior.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-puppy-small.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-puppy-large.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-wild-prairie.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-grasslands.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-pacifica.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-prairiepoultry.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-wildcoast.html',
    'https://apac.acana.com/en/dogs/dog-food/ap-ns-aca-classicred.html',
    'https://www.acana.com/en-CA/dogs/dog-food/acana-premium-p%C3%A2t%C3%A9%2C-poultry-recipe/premium-pate-poultry-recipe.html',
    'https://www.acana.com/en-CA/dogs/dog-food/acana-premium-p%C3%A2t%C3%A9%2C-beef-recipe/premium-pate-dog-beef-recipe.html',
    'https://www.acana.com/en-CA/dogs/dog-food/premium-p%C3%A2t%C3%A9%2C-puppy-recipe-in-bone-broth/premium-chunks-puppy-recipe.html',
    'https://www.acana.com/en-CA/dogs/dog-food/lamb-and-apple-freeze-dried-treats/ds-aca-fdt-lamb-apple.html',
  ];

  const results: ProductAudit[] = [];
  for (const u of urls) {
    console.log('Scraping:', u);
    const data = await scrapePage(u);
    results.push(data);
  }

  fs.writeFileSync('audited_day1.json', JSON.stringify(results, null, 2));
  console.log('Saved audited_day1.json successfully! Total:', results.length);
}

run();
