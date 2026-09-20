import React, { useState } from 'react';
import { DogProduct } from '../types';
import {
  X,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Store,
  Info,
  ShieldCheck,
  Tag,
  Barcode,
  Image as ImageIcon,
} from 'lucide-react';
import { ImageModal } from './ImageModal';

interface ProductDetailModalProps {
  product: DogProduct | null;
  onClose: () => void;
  onAskAI: (product: DogProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAskAI,
}) => {
  const [activeImageZoom, setActiveImageZoom] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  if (!product) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 text-zinc-100 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
            id="close-product-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pr-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {product.brand}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                {product.productType}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                {product.petAgeGroup}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {product.channelCategory}
              </span>
              {product.countryOfOrigin && (
                <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Made in {product.countryOfOrigin}
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-white mt-2">{product.flavor}</h2>
            <p className="text-xs text-zinc-400 mt-0.5">{product.productLine}</p>
          </div>

          {/* Dual Image Gallery: Packaging + Composition Label */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-950/70 p-3.5 rounded-xl border border-zinc-800">
            {/* Item Packaging Image */}
            <div className="flex items-center gap-3">
              <div
                onClick={() =>
                  setActiveImageZoom({
                    url: product.itemImageUrl,
                    title: `${product.brand} - ${product.flavor}`,
                    subtitle: `Packaging (${product.packageSize})`,
                  })
                }
                className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 cursor-pointer group relative"
              >
                <img
                  src={product.itemImageUrl}
                  alt={product.flavor}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition">
                  Zoom
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
                  Product Packaging
                </span>
                <p className="text-xs text-zinc-400">Net: {product.packageSize}</p>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageZoom({
                      url: product.itemImageUrl,
                      title: `${product.brand} - ${product.flavor}`,
                      subtitle: `Packaging (${product.packageSize})`,
                    })
                  }
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 underline inline-flex items-center gap-1"
                >
                  <ImageIcon className="w-3 h-3" /> View full pack
                </button>
              </div>
            </div>

            {/* Ingredients Label Image */}
            <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-3 sm:pt-0 sm:pl-3">
              <div
                onClick={() =>
                  setActiveImageZoom({
                    url: product.ingredientsImageUrl,
                    title: `${product.brand} - Composition & Nutrition Label`,
                    subtitle: 'Official Guaranteed Ingredients',
                  })
                }
                className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 cursor-pointer group relative"
              >
                <img
                  src={product.ingredientsImageUrl}
                  alt="Ingredients label"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-white font-medium transition">
                  Zoom
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  Ingredients Label
                </span>
                <p className="text-xs text-zinc-400">Guaranteed Analysis Label</p>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageZoom({
                      url: product.ingredientsImageUrl,
                      title: `${product.brand} - Composition & Nutrition Label`,
                      subtitle: 'Official Guaranteed Ingredients',
                    })
                  }
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-1"
                >
                  <ImageIcon className="w-3 h-3" /> View label image
                </button>
              </div>
            </div>
          </div>

          {/* Pricing, Per-Kg, & Aggregator Links */}
          <div className="mt-4 p-4 bg-zinc-950/70 border border-zinc-800 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                  MSRP in Greece (Euros)
                </div>
                <div className="text-2xl font-black text-emerald-400 mt-0.5 flex items-baseline gap-2">
                  €{product.msrpEuros.toFixed(2)}
                  <span className="text-xs font-normal text-zinc-400">
                    ({product.packageSize} • €{product.pricePerKg.toFixed(2)}/kg)
                  </span>
                </div>
              </div>

              {/* Barcode */}
              {product.eanBarcode && (
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                  <Barcode className="w-3.5 h-3.5 text-zinc-400" />
                  EAN: {product.eanBarcode}
                </div>
              )}
            </div>

            {/* Links Bar: Official, Skroutz, BestPrice */}
            <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
              <a
                href={product.officialProductUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow transition"
              >
                Official Manufacturer Page
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {product.skroutzUrl && (
                <a
                  href={product.skroutzUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs shadow transition"
                >
                  Skroutz.gr Price Search
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {product.bestPriceUrl && (
                <a
                  href={product.bestPriceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs shadow transition"
                >
                  BestPrice.gr Compare
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Guaranteed Nutritional Values */}
          <div className="mt-5">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                Guaranteed Nutritional Analysis
              </span>
              {product.animalProteinPercent && (
                <span className="text-emerald-400 font-bold text-xs normal-case">
                  {product.animalProteinPercent}% Animal Protein Proportion
                </span>
              )}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/80 text-center">
              <div>
                <div className="text-[10px] text-zinc-400 font-medium">Protein</div>
                <div className="text-base font-bold text-white">
                  {product.nutritionalValues.crudeProteinPercent}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium">Fat</div>
                <div className="text-base font-bold text-white">
                  {product.nutritionalValues.crudeFatPercent}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium">Fiber</div>
                <div className="text-base font-bold text-white">
                  {product.nutritionalValues.crudeFiberPercent}%
                </div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium">Ash</div>
                <div className="text-base font-bold text-zinc-300">
                  {product.nutritionalValues.crudeAshPercent
                    ? `${product.nutritionalValues.crudeAshPercent}%`
                    : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium">Moisture</div>
                <div className="text-base font-bold text-zinc-300">
                  {product.nutritionalValues.moisturePercent
                    ? `${product.nutritionalValues.moisturePercent}%`
                    : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium">Energy</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">
                  {product.nutritionalValues.caloricContentKcalKg || 'N/A'}
                  <span className="block text-[9px] text-zinc-500 font-normal">kcal/kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifying Lab & Quality Audit Standard */}
          <div className="mt-4 p-3 rounded-xl bg-teal-950/30 border border-teal-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <span className="text-teal-300 font-semibold">
                  Lab & Quality Standard Certification:
                </span>{' '}
                <span className="text-zinc-200">{product.certifyingBody || 'FEDIAF Industry Standard'}</span>
              </div>
            </div>
            {product.labReportUrl && (
              <a
                href={product.labReportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal-300 hover:text-teal-200 underline font-medium"
              >
                Official Quality / Audit Link
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Known Allergens Alert */}
          <div className="mt-4 p-3 rounded-xl bg-rose-950/30 border border-rose-800/40">
            <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Contains Known Allergens:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.allergens.length > 0 ? (
                product.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="text-xs px-2 py-0.5 rounded bg-rose-900/40 text-rose-200 border border-rose-700/50 font-medium"
                  >
                    {allergen}
                  </span>
                ))
              ) : (
                <span className="text-xs text-zinc-400">
                  No common high-risk canine allergens declared (hypoallergenic profile).
                </span>
              )}
            </div>
          </div>

          {/* Dietary Highlights */}
          <div className="mt-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Special Dietary & Clinical Properties
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {product.specialDietaryInfo.map((info, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700"
                >
                  {info}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients Breakdown */}
          <div className="mt-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Full Ingredients List (Composition)
            </h3>
            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed max-h-40 overflow-y-auto">
              {product.ingredients.join(', ')}
            </div>
          </div>

          {/* Greek Retailers & Availability */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Store className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Available in Greece via:{' '}
                <strong className="text-zinc-200">{product.greeceRetailers.join(', ')}</strong>
              </span>
            </div>

            <button
              onClick={() => onAskAI(product)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-medium transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Verify with Gemini Search Grounding
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox for modal */}
      {activeImageZoom && (
        <ImageModal
          isOpen={!!activeImageZoom}
          imageUrl={activeImageZoom.url}
          title={activeImageZoom.title}
          subtitle={activeImageZoom.subtitle}
          onClose={() => setActiveImageZoom(null)}
        />
      )}
    </>
  );
};
