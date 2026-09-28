import { products } from "@/data/products";
import { ProductVisual } from "@/components/product/ProductVisual";
import { ProductOrderCtas } from "@/components/product/ProductOrderCtas";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function ProductCollection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="The shelf"
          title="All six, side by side."
          intro="Every scent comes in three sizes. Every size includes the same wax, the same wick and the same care."
        />

        <ul className="mt-12 flex flex-col gap-16 sm:mt-16 lg:gap-24">
          {products.map((product, i) => (
            <Reveal
              as="li"
              key={product.id}
              className="grid items-center gap-7 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-10 lg:gap-16"
            >
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ backgroundColor: `${product.accentColor}12` }}
                data-cursor="VIEW"
              >
                <ProductVisual
                  product={product}
                  ratio={i % 2 === 0 ? "portrait" : "square"}
                  priority={i === 0}
                  sizes="(min-width: 640px) 40vw, 90vw"
                  className="[&_svg]:transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&_svg]:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow text-stone-400">
                    {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-stone-400">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: product.accentColor }}
                      aria-hidden="true"
                    />
                    {product.fragrance}
                  </span>
                </div>

                <h3 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.02] text-ink-900">
                  {product.name}
                </h3>

                <p className="max-w-prose text-base leading-relaxed text-stone-500">
                  {product.shortDescription}
                </p>

                <p className="text-sm text-stone-400">
                  {product.notes.join(" · ")}
                </p>

                <ProductOrderCtas
                  product={product}
                  layout="row"
                  className="mt-2"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
