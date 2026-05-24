import { PageHero } from "./PageHero";
import { SiteHeader } from "./SiteHeader";

type DatabasePageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  searchPlaceholder: string;
  filters: string[];
  items: {
    title: string;
    meta: string;
    description: string;
  }[];
};

export function DatabasePage({
  eyebrow,
  title,
  subtitle,
  description,
  searchPlaceholder,
  filters,
  items,
}: DatabasePageProps) {
  return (
    <main className="site-shell">
      <section className="content-wrap">
        <SiteHeader />
        <PageHero
          description={`${subtitle}。${description}`}
          eyebrow={eyebrow}
          title={title}
        />

        <section className="scholar-card p-5 sm:p-7">
          <label className="text-sm tracking-[0.22em] text-stone-500">
            SEARCH
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              className="search-input flex-1"
              placeholder={searchPlaceholder}
              type="search"
            />
            <button className="gold-button">
              检索
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                className="tag-button"
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 py-10">
          {items.map((item) => (
            <article
              className="scholar-card p-6"
              key={item.title}
            >
              <p className="mb-3 text-sm text-amber-100/55">{item.meta}</p>
              <h2 className="text-2xl font-medium text-stone-50">
                {item.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-stone-400">
                {item.description}
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
