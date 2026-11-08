import { homeCategories, productsForCategory } from '../../data/site';
import { CategoryCard } from '../ui/CategoryCard';
import { SectionHeading } from '../ui/SectionHeading';

export function CategoryGrid() {
  return (
    <section
      id="collections"
      className="border-b border-[#efe5d6] bg-surface-container-low/40 py-16 lg:py-24"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 border-b border-[#efe5d6] pb-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Baked daily in Toronto"
            title="Find Your Favourite"
            description="From morning viennoiserie to Portuguese country bread and bespoke showpieces, our counter is built around the bakes we love."
          />
          <p className="label-caps shrink-0 text-outline">
            6 core collections
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {homeCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              productCount={
                category.id === 'custom'
                  ? undefined
                  : productsForCategory(category.id).length
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
