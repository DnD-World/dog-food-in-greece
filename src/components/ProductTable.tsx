import React, { useState } from 'react';
import { DogProduct } from '../types';
import { ExternalLink, AlertCircle, Image as ImageIcon, ShieldCheck, Tag, CheckCircle2, Clock } from 'lucide-react';
import { ImageModal } from './ImageModal';

interface ProductTableProps {
  products: DogProduct[];
  onSelectProduct: (product: DogProduct) => void;
  selectedProductId?: string;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onSelectProduct,
  selectedProductId,
}) => {
  const [activeImageModal, setActiveImageModal] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-zinc-900/40 rounded-xl border border-zinc-800 text-zinc-400">
        <p className="text-base font-medium text-zinc-300">No matching products found</p>
        <p className="text-xs mt-1">Try relaxing your brand, channel, age group, or allergen filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[680px] overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-xs border-b border-zinc-800 text-zinc-300 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-3 text-center w-14">Images</th>
                <th className="py-3.5 px-3 text-center min-w-[115px]">Real-Life Verified</th>
                <th className="py-3.5 px-4 min-w-[170px]">Brand & Category</th>
                <th className="py-3.5 px-4 min-w-[200px]">Flavor / Recipe</th>
                <th className="py-3.5 px-3">Age Group</th>
                <th className="py-3.5 px-3">Type</th>
                <th className="py-3.5 px-3">Size</th>
                <th className="py-3.5 px-3 font-mono text-emerald-400 text-right">MSRP (€)</th>
                <th className="py-3.5 px-3 font-mono text-zinc-400 text-right">€ / kg</th>
                <th className="py-3.5 px-3 min-w-[130px]">Nutritional Values</th>
                <th className="py-3.5 px-3 min-w-[160px]">Quality & Lab Standard</th>
                <th className="py-3.5 px-4 min-w-[190px]">Allergens & Dietary</th>
                <th className="py-3.5 px-3 text-center min-w-[130px]">Links & Aggregators</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {products.map((product) => {
                const isSelected = selectedProductId === product.id;
                const { crudeProteinPercent, crudeFatPercent, crudeFiberPercent, caloricContentKcalKg } =
                  product.nutritionalValues;

                return (
                  <tr
                    key={product.id}
                    id={`product-row-${product.id}`}
                    onClick={() => onSelectProduct(product)}
                    className={`cursor-pointer transition-colors duration-150 ${
                      isSelected
                        ? 'bg-emerald-950/40 border-l-4 border-l-emerald-500'
                        : 'hover:bg-zinc-800/50'
                    }`}
                  >
                    {/* Item Image & Ingredients Label Thumbnail */}
                    <td className="py-3 px-2 align-top text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col gap-1.5 items-center">
                        {/* Item packaging thumbnail */}
                        {product.itemImageUrl ? (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageModal({
                                url: product.itemImageUrl,
                                title: `${product.brand} - ${product.flavor}`,
                                subtitle: `Packaging (${product.packageSize})`,
                              })
                            }
                            className="group relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950 flex items-center justify-center hover:border-emerald-500 transition"
                            title="Click to view packaging image"
                          >
                            <img
                              src={product.itemImageUrl}
                              alt={product.flavor}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-150"
                              loading="lazy"
                            />
                            <span className="absolute bottom-0 right-0 bg-black/70 text-[9px] px-1 text-zinc-300 rounded-tl">
                              Pack
                            </span>
                          </button>
                        ) : (
                          <div
                            className="w-10 h-10 rounded-lg border border-dashed border-zinc-800 bg-zinc-950/80 flex items-center justify-center text-[9px] text-zinc-500 text-center font-mono"
                            title="No verified packaging photo yet"
                          >
                            No Pic
                          </div>
                        )}

                        {/* Ingredients label thumbnail */}
                        {product.ingredientsImageUrl ? (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageModal({
                                url: product.ingredientsImageUrl,
                                title: `${product.brand} - Composition & Ingredients Label`,
                                subtitle: 'Guaranteed Analysis & Formulation',
                              })
                            }
                            className="group relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950 flex items-center justify-center hover:border-amber-500 transition"
                            title="Click to view ingredients and nutrition label"
                          >
                            <img
                              src={product.ingredientsImageUrl}
                              alt="Ingredients label"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-150"
                              loading="lazy"
                            />
                            <span className="absolute bottom-0 right-0 bg-black/70 text-[9px] px-1 text-amber-300 rounded-tl">
                              Label
                            </span>
                          </button>
                        ) : (
                          <div
                            className="w-10 h-10 rounded-lg border border-dashed border-zinc-800 bg-zinc-950/80 flex items-center justify-center text-[9px] text-zinc-500 text-center font-mono"
                            title="No verified label photo yet"
                          >
                            No Lbl
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Real-Life Verified Status Badge with Mouseover Popover */}
                    <td className="py-3 px-3 align-top text-center" onClick={(e) => e.stopPropagation()}>
                      {product.isRealLifeVerified ? (
                        <div className="relative group/verify inline-block">
                          <div
                            id={`verified-badge-${product.id}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/35 text-[11px] font-semibold cursor-help hover:bg-blue-500/25 transition shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>Verified</span>
                          </div>

                          {/* Hover Tooltip / Detail Card */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/verify:block z-50 w-72 p-3 bg-zinc-900/98 border border-blue-500/50 rounded-xl shadow-2xl text-left pointer-events-auto backdrop-blur-md">
                            <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs border-b border-zinc-800 pb-1.5 mb-2">
                              <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-400" />
                              <span>Real-Life Data Verified</span>
                            </div>
                            <div className="space-y-1.5 text-[11px] text-zinc-300">
                              <div>
                                <span className="text-zinc-400 font-medium">Source Type: </span>
                                <span className="text-blue-300 font-semibold">{product.verificationSourceType}</span>
                              </div>
                              <div>
                                <span className="text-zinc-400 font-medium">Method: </span>
                                <span className="text-zinc-200">{product.verificationMethod}</span>
                              </div>
                              {product.verificationDate && (
                                <div>
                                  <span className="text-zinc-400 font-medium">Date: </span>
                                  <span className="text-zinc-200 font-mono">{product.verificationDate}</span>
                                </div>
                              )}
                              {product.verificationSourceUrl && (
                                <div className="pt-1.5 mt-1 border-t border-zinc-800">
                                  <a
                                    href={product.verificationSourceUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline font-mono text-[10px] break-all"
                                  >
                                    <span>Visit Verification Source</span>
                                    <ExternalLink className="w-3 h-3 shrink-0" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative group/verify inline-block">
                          <div
                            id={`unverified-badge-${product.id}`}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/60 text-[10px] font-medium cursor-help hover:bg-zinc-800 transition"
                          >
                            <Clock className="w-3 h-3 text-zinc-500 shrink-0" />
                            <span>Synthetic</span>
                          </div>

                          {/* Hover Tooltip for Synthetic/Unverified */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/verify:block z-50 w-64 p-2.5 bg-zinc-900/98 border border-zinc-700/80 rounded-xl shadow-2xl text-left pointer-events-none backdrop-blur-md">
                            <div className="flex items-center gap-1.5 text-zinc-300 font-semibold text-xs border-b border-zinc-800 pb-1 mb-1.5">
                              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>Pre-Trained Market Model</span>
                            </div>
                            <p className="text-[10px] text-zinc-400 leading-relaxed">
                              {product.verificationMethod ||
                                'This record is an unverified estimate based on pre-trained market defaults. Live scraping verification is pending.'}
                            </p>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Brand & Category */}
                    <td className="py-3 px-4 align-top">
                      <div className="font-bold text-zinc-100 text-sm flex items-center gap-1.5 flex-wrap">
                        {product.brand}
                        {product.countryOfOrigin === 'Greece' && (
                          <span className="text-[9px] px-1.5 py-0.2 bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">
                            GR
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{product.productLine}</div>
                      
                      {/* Channel Category badge */}
                      <div className="mt-1.5">
                        <span
                          className={`inline-block text-[10px] px-2 py-0.5 rounded font-medium border ${
                            product.channelCategory === 'Supermarket Generic'
                              ? 'bg-amber-950/40 text-amber-300 border-amber-600/40'
                              : product.channelCategory === 'Commercial & Aggregator (Skroutz/BestPrice)'
                              ? 'bg-orange-950/40 text-orange-300 border-orange-500/40'
                              : product.channelCategory === 'Veterinary Clinical'
                              ? 'bg-indigo-950/40 text-indigo-300 border-indigo-500/40'
                              : 'bg-emerald-950/40 text-emerald-300 border-emerald-600/40'
                          }`}
                        >
                          {product.channelCategory}
                        </span>
                      </div>
                    </td>

                    {/* Flavor / Recipe */}
                    <td className="py-3 px-4 align-top">
                      <div className="font-medium text-zinc-200">{product.flavor}</div>
                      <div
                        className="text-[11px] text-zinc-500 mt-1 line-clamp-2"
                        title={product.ingredients.join(', ')}
                      >
                        {product.keyIngredientsSummary}
                      </div>
                      {product.animalProteinPercent && (
                        <div className="text-[10px] text-emerald-400/90 font-medium mt-1">
                          🐾 {product.animalProteinPercent}% Total Animal Protein
                        </div>
                      )}
                    </td>

                    {/* Pet Age Group */}
                    <td className="py-3 px-3 align-top whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                          product.petAgeGroup === 'Puppy'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : product.petAgeGroup === 'Senior'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : product.petAgeGroup === 'All Life Stages'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                        }`}
                      >
                        {product.petAgeGroup}
                      </span>
                    </td>

                    {/* Product Type */}
                    <td className="py-3 px-3 align-top whitespace-nowrap text-zinc-400">
                      {product.productType}
                    </td>

                    {/* Size */}
                    <td className="py-3 px-3 align-top whitespace-nowrap text-zinc-400 font-mono">
                      <div>{product.packageSize}</div>
                      {product.availableSizes && product.availableSizes.length > 1 && (
                        <div className="text-[9px] text-zinc-500 font-sans mt-0.5">
                          +{product.availableSizes.length - 1} sizes
                        </div>
                      )}
                    </td>

                    {/* MSRP in Euros */}
                    <td className="py-3 px-3 align-top whitespace-nowrap font-mono font-bold text-emerald-400 text-right text-sm">
                      €{product.msrpEuros.toFixed(2)}
                    </td>

                    {/* Price per Kg */}
                    <td className="py-3 px-3 align-top whitespace-nowrap font-mono text-zinc-400 text-right text-xs">
                      €{product.pricePerKg.toFixed(2)}/kg
                    </td>

                    {/* Nutritional Values */}
                    <td className="py-3 px-3 align-top whitespace-nowrap text-zinc-300">
                      <div className="space-y-0.5 font-mono text-[11px]">
                        <div>
                          <span className="text-zinc-500">Protein:</span>{' '}
                          <strong className="text-zinc-200">{crudeProteinPercent}%</strong>
                        </div>
                        <div>
                          <span className="text-zinc-500">Fat:</span>{' '}
                          <span className="text-zinc-300">{crudeFatPercent}%</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">Fiber:</span>{' '}
                          <span className="text-zinc-400">{crudeFiberPercent}%</span>
                        </div>
                        {caloricContentKcalKg && (
                          <div className="text-[10px] text-zinc-500">
                            {caloricContentKcalKg} kcal/kg
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Quality Standard & Lab Report */}
                    <td className="py-3 px-3 align-top" onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-1 text-[11px]">
                        <div className="flex items-center gap-1 text-zinc-300 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>{product.certifyingBody || 'FEDIAF Standards'}</span>
                        </div>
                        {product.hasIndependentLabReport && product.labReportUrl ? (
                          <a
                            href={product.labReportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-teal-400 hover:text-teal-300 hover:underline"
                          >
                            Lab Audit Report
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono block">
                            Internal QA / Self-Decl.
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Allergens & Dietary */}
                    <td className="py-3 px-4 align-top">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {product.grainFree && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-medium border border-emerald-500/30">
                            Grain-Free
                          </span>
                        )}
                        {product.specialDietaryInfo.slice(0, 2).map((diet, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-zinc-300 rounded border border-zinc-700"
                          >
                            {diet}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-rose-300/90 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-rose-400 shrink-0" />
                        <span className="truncate max-w-[170px]" title={product.allergens.join(', ')}>
                          {product.allergens.length > 0 ? product.allergens.join(', ') : 'None listed'}
                        </span>
                      </div>
                    </td>

                    {/* Links & Aggregators */}
                    <td className="py-3 px-3 align-top text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col gap-1.5 items-center">
                        <a
                          href={product.officialProductUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`link-official-${product.id}`}
                          className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-medium px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 transition w-full justify-center"
                          title="Official Brand Website"
                        >
                          Official
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>

                        {product.skroutzUrl && (
                          <a
                            href={product.skroutzUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-orange-400 hover:text-orange-300 font-medium px-2 py-0.5 rounded bg-orange-950/40 border border-orange-500/30 hover:bg-orange-900/50 transition w-full justify-center"
                            title="Compare on Skroutz.gr"
                          >
                            Skroutz
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}

                        {product.bestPriceUrl && (
                          <a
                            href={product.bestPriceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-300 font-medium px-2 py-0.5 rounded bg-sky-950/40 border border-sky-500/30 hover:bg-sky-900/50 transition w-full justify-center"
                            title="Compare on BestPrice.gr"
                          >
                            BestPrice
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageModal && (
        <ImageModal
          isOpen={!!activeImageModal}
          imageUrl={activeImageModal.url}
          title={activeImageModal.title}
          subtitle={activeImageModal.subtitle}
          onClose={() => setActiveImageModal(null)}
        />
      )}
    </>
  );
};
