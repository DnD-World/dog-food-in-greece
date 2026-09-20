import React, { useState } from 'react';
import { HomeCookingRecipe, POPULAR_HOME_COOKING_RECIPES } from '../recipesData';
import { downloadRecipesAsCSV } from '../services/csvExport';
import {
  Utensils,
  ChefHat,
  HeartPulse,
  Scale,
  Sparkles,
  Download,
  AlertTriangle,
  Clock,
  Flame,
  CheckCircle,
  BookOpen,
} from 'lucide-react';

export const HomeCookingRecipesView: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<HomeCookingRecipe>(
    POPULAR_HOME_COOKING_RECIPES[0]
  );
  const [dogWeightKg, setDogWeightKg] = useState<number>(10);

  // Scaler multiplier based on target dog weight (default base recipe is designed for ~10kg adult dog, ~450g daily)
  const multiplier = Math.max(0.2, dogWeightKg / 10);

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-amber-950/50 via-zinc-900 to-zinc-900 border border-amber-800/40 rounded-2xl p-5 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <ChefHat className="w-4 h-4" />
              Veterinary-Balanced Home Cooking
            </div>
            <h2 className="text-xl font-bold text-white">
              10 Balanced Greek Canine Home-Cooking Recipes
            </h2>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
              Wholesome whole-food diets formulated according to FEDIAF and NRC guidelines. Includes exact metric quantities (grams), step-by-step stovetop directions, and mandatory Calcium:Phosphorus balancer rules.
            </p>
          </div>

          <button
            onClick={() => downloadRecipesAsCSV(POPULAR_HOME_COOKING_RECIPES)}
            id="download-recipes-csv-btn"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <Download className="w-4 h-4" />
            Export 10 Recipes (CSV)
          </button>
        </div>

        {/* Portions calculator */}
        <div className="mt-4 pt-4 border-t border-amber-900/40 flex flex-wrap items-center gap-4 text-xs">
          <span className="text-zinc-300 font-medium flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-amber-400" />
            Adjust Portion by Dog Weight:
          </span>
          <div className="flex items-center gap-2">
            {[5, 10, 18, 25, 35].map((kg) => (
              <button
                key={kg}
                onClick={() => setDogWeightKg(kg)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition ${
                  dogWeightKg === kg
                    ? 'bg-amber-500 text-black border-amber-400 font-bold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {kg} kg
              </button>
            ))}
            <span className="text-zinc-400 text-[11px] ml-2">
              Serving: ~{Math.round(450 * multiplier)}g/day for a {dogWeightKg}kg dog (split into 2 meals)
            </span>
          </div>
        </div>
      </div>

      {/* Main layout: Recipe Selector Sidebar + Recipe Detail Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: 10 Recipe Buttons */}
        <div className="lg:col-span-4 space-y-2 max-h-[720px] overflow-y-auto pr-1">
          {POPULAR_HOME_COOKING_RECIPES.map((recipe, index) => {
            const isSelected = selectedRecipe.id === recipe.id;
            return (
              <button
                key={recipe.id}
                id={`recipe-tab-${recipe.id}`}
                onClick={() => setSelectedRecipe(recipe)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-zinc-900/80 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    Recipe #{index + 1}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {recipe.macronutrientsPer100g.kcalPer100g} kcal/100g
                  </span>
                </div>
                <div className="font-bold text-zinc-100 text-xs leading-snug">
                  {recipe.title}
                </div>
                <div className="text-[11px] text-zinc-400 italic">
                  {recipe.greekTitle}
                </div>
                <div className="text-[10px] text-zinc-400 line-clamp-1">
                  {recipe.targetProfile}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column: Selected Recipe Deep-Dive */}
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5">
          {/* Title and Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {selectedRecipe.dogSizeSuitability}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                  {selectedRecipe.targetProfile}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1.5">{selectedRecipe.title}</h3>
              <p className="text-xs text-amber-300/80 italic mt-0.5">{selectedRecipe.greekTitle}</p>
            </div>

            <div className="text-right sm:self-center">
              <div className="text-[10px] uppercase tracking-wider text-zinc-400">Portion for {dogWeightKg}kg dog</div>
              <div className="text-lg font-bold text-emerald-400">
                ~{Math.round(450 * multiplier)}g <span className="text-xs font-normal text-zinc-400">/ day</span>
              </div>
            </div>
          </div>

          {/* Guaranteed Macronutrients per 100g */}
          <div className="grid grid-cols-4 gap-3 bg-zinc-950/70 p-3.5 rounded-xl border border-zinc-800/80 text-center">
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-medium">Crude Protein</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {selectedRecipe.macronutrientsPer100g.proteinPercent}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-medium">Crude Fat</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {selectedRecipe.macronutrientsPer100g.fatPercent}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-medium">Fiber</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {selectedRecipe.macronutrientsPer100g.fiberPercent}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 uppercase font-medium">Energy Density</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">
                {selectedRecipe.macronutrientsPer100g.kcalPer100g} kcal
              </div>
            </div>
          </div>

          {/* Scaled Ingredients Table */}
          <div>
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              Ingredients & Scaled Quantities ({dogWeightKg} kg Dog daily batch)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-zinc-950 text-zinc-400 text-[11px] uppercase border-b border-zinc-800">
                  <tr>
                    <th className="py-2.5 px-3">Ingredient</th>
                    <th className="py-2.5 px-3 text-right">Scaled Weight</th>
                    <th className="py-2.5 px-3 text-right text-zinc-400 font-normal">(Base 10kg)</th>
                    <th className="py-2.5 px-3">Nutritional Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/40">
                  {selectedRecipe.ingredients.map((ing: { name: string; quantityGrams: number; purpose: string }, i: number) => (
                    <tr key={i} className="hover:bg-zinc-800/40">
                      <td className="py-2 px-3 font-medium text-zinc-200">{ing.name}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-amber-400">
                        {Math.round(ing.quantityGrams * multiplier)}g
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-zinc-400">
                        {ing.quantityGrams}g
                      </td>
                      <td className="py-2 px-3 text-zinc-400 text-[11px]">{ing.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CRITICAL: Ca:P Balancer Rule Warning */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-700/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              Mandatory Calcium & Essential Micronutrient Balancing
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong className="text-amber-200">Rule:</strong>{' '}
              {selectedRecipe.vitalNutritionalBalancer.calciumPhosphorusRule}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="bg-black/30 p-2 rounded-lg border border-amber-900/30">
                <span className="text-amber-400 font-medium block">Calcium Source:</span>
                <span className="text-zinc-200">
                  {selectedRecipe.vitalNutritionalBalancer.recommendedSupplement}
                </span>
              </div>
              <div className="bg-black/30 p-2 rounded-lg border border-amber-900/30">
                <span className="text-amber-400 font-medium block">Essential Fatty Acids:</span>
                <span className="text-zinc-200">
                  {selectedRecipe.vitalNutritionalBalancer.omega3Source}
                </span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Cooking Instructions */}
          <div>
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Step-by-Step Cooking Instructions
            </h4>
            <div className="space-y-2">
              {selectedRecipe.stepByStepInstructions.map((step: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80 text-xs text-zinc-300"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Veterinary Notes & Storage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                <HeartPulse className="w-3.5 h-3.5" />
                Veterinary Clinical Notes
              </div>
              <p className="text-zinc-400 leading-relaxed">{selectedRecipe.veterinaryNotes}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
              <div className="flex items-center gap-1.5 text-sky-400 font-semibold mb-1">
                <Clock className="w-3.5 h-3.5" />
                Storage & Freezing Shelf-Life
              </div>
              <p className="text-zinc-400 leading-relaxed">{selectedRecipe.storageInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
