import Link from "next/link";

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
    <main className="min-h-screen bg-[#08110f] text-stone-100">
      <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-100/15 pb-6">
          <Link
            className="text-sm tracking-[0.22em] text-amber-100/70 transition hover:text-amber-100"
            href="/"
          >
            西域文献史料汇集
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm text-stone-400">
            <Link className="transition hover:text-stone-100" href="/research">
              研究论著
            </Link>
            <Link className="transition hover:text-stone-100" href="/sources">
              历史史料
            </Link>
            <Link className="transition hover:text-stone-100" href="/databases">
              专题数据库
            </Link>
            <Link className="transition hover:text-stone-100" href="/navigation">
              资源导航
            </Link>
          </nav>
        </header>

        <div className="grid gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm tracking-[0.35em] text-amber-200/75">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-stone-50 sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-amber-50/72">
              {subtitle}
            </p>
          </div>
          <p className="border-l border-amber-100/18 pl-7 text-lg leading-9 text-stone-300">
            {description}
          </p>
        </div>

        <section className="border border-amber-100/15 bg-stone-950/30 p-5 sm:p-7">
          <label className="text-sm tracking-[0.22em] text-stone-500">
            SEARCH
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              className="min-h-12 flex-1 border border-amber-100/15 bg-black/25 px-4 text-stone-100 outline-none placeholder:text-stone-600 focus:border-amber-200/55"
              placeholder={searchPlaceholder}
              type="search"
            />
            <button className="min-h-12 border border-amber-200/40 px-8 text-amber-100 transition hover:bg-amber-100 hover:text-stone-950">
              检索
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                className="border border-stone-700/80 px-3 py-1.5 text-sm text-stone-400 transition hover:border-amber-200/45 hover:text-amber-100"
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
              className="border border-amber-100/12 bg-stone-950/25 p-6 transition hover:border-amber-200/35 hover:bg-stone-900/50"
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
