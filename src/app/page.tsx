import Link from "next/link";

const actions = [
  {
    title: "研究论著检索",
    href: "/papers",
  },
  {
    title: "历史史料检索",
    href: "/sources",
  },
  {
    title: "专题数据库",
    href: "/topics",
  },
  {
    title: "资源导航",
    href: "/resources",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08110f] text-stone-100">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_18%_20%,rgba(171,124,54,0.18),transparent_28%),radial-gradient(circle_at_86%_10%,rgba(57,91,83,0.35),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.04)_0,transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 -z-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="mb-16 flex items-center justify-between border-b border-amber-100/15 pb-6 text-sm text-stone-400">
          <span className="tracking-[0.28em] text-amber-100/70">
            INNER ASIAN SOURCES
          </span>
          <span className="hidden text-stone-500 sm:block">
            <Link className="transition hover:text-amber-100" href="/upload">
              上传资源
            </Link>
          </span>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-8 h-16 w-px bg-gradient-to-b from-amber-200/80 to-transparent" />
            <p className="mb-5 text-sm tracking-[0.35em] text-amber-200/75">
              西域 · 内亚 · 中亚
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-stone-50 sm:text-7xl">
              西域文献史料汇集
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-amber-50/72 sm:text-2xl">
              Inner Asian Historical Sources and Scholarship Database
            </p>
          </div>

          <div className="border-l border-amber-100/18 pl-7">
            <p className="text-lg leading-9 text-stone-300">
              本项目旨在汇集西域、内亚、中亚及蒙古帝国诸兀鲁思相关的多语种研究文献与历史史料。研究范围包括蒙古学、突厥学、满学、藏学、西夏学，以及新疆、西藏、内蒙古、青海、中亚、南亚等区域研究。
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link
              className="group flex min-h-36 flex-col justify-between border border-amber-100/15 bg-stone-950/35 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-200/50 hover:bg-stone-900/70"
              href={action.href}
              key={action.href}
            >
              <span className="text-lg font-medium text-stone-100">
                {action.title}
              </span>
              <span className="mt-8 flex items-center justify-between text-sm text-amber-100/60">
                <span>进入数据库</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
