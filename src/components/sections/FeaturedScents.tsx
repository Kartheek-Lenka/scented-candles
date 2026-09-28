import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function FeaturedScents() {
  const featured = products.filter((p) => p.featured);

  return (
    <section id="shop" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The collection"
            title="Find your mood."
            intro="Six scents. Six different versions of you."
          />
          <Reveal delay={0.1} className="shrink-0">
            <a
              href="#scents"
              className="group inline-flex min-h-11 items-center gap-2 text-sm text-stone-500 transition-colors hover:text-ink-900"
            >
              Not sure yet? Take the scent finder
              <svg
                viewBox="0 0 24 24"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h13M13 6.5 18.5 12 13 17.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* Horizontal snap rail on mobile, grid from tablet up */}
        <div className="mt-12 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 hide-scrollbar sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14 md:overflow-visible md:px-0 lg:grid-cols-3 lg:gap-x-10">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              className="w-[74vw] max-w-[19rem] shrink-0 snap-start md:w-auto md:max-w-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
