import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";

const actions = [
  {
    title: "研究论著检索",
    subtitle: "Scholarship Search",
    description: "跨数据库检索论文、专著、书评与研究目录。",
    href: "/papers",
  },
  {
    title: "历史史料检索",
    subtitle: "Primary Sources",
    description: "整理多语种史料、编年史、行纪与档案线索。",
    href: "/sources",
  },
  {
    title: "专题数据库",
    subtitle: "Special Collections",
    description: "面向人物、地名、版本和文献群的专题入口。",
    href: "/topics",
  },
  {
    title: "资源导航",
    subtitle: "Resource Guide",
    description: "连接图书馆、馆藏、期刊平台和数字人文项目。",
    href: "/resources",
  },
];

const manuscriptItems = [
  ["Manuscripts", "敦煌文书与写本目录"],
  ["Archives", "边疆档案与馆藏线索"],
  ["Bibliography", "多语种研究书目"],
  ["Digital Collections", "开放数字资源入口"],
  ["Mongol Empire", "诸兀鲁思史料网络"],
  ["Central Asia", "绿洲城市与丝路交通"],
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="content-wrap">
        <SiteHeader />

        <div className="grid min-h-[72vh] gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-eyebrow">
              SILK ROAD · INNER ASIA · CENTRAL EURASIA
            </p>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-[var(--paper)] sm:text-7xl">
              西域文献史料汇集
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-[color:rgba(239,226,195,0.82)] sm:text-2xl">
              Inner Asian Historical Sources and Scholarship Database
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-[#cfc7b4]">
              汇集西域、内亚、中亚及蒙古帝国诸兀鲁思相关的多语种研究论著、历史史料、馆藏资源与数字文献入口。
            </p>
          </div>

          <div className="manuscript-panel">
            {manuscriptItems.map(([title, text]) => (
              <div className="archive-slip" key={title}>
                <span>{title}</span>
                <strong>{text}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link
              className="scholar-card lift-card group flex min-h-52 flex-col justify-between p-6"
              href={action.href}
              key={action.href}
            >
              <div>
                <p className="mb-4 text-xs tracking-[0.24em] text-[color:rgba(214,179,90,0.72)]">
                  {action.subtitle}
                </p>
                <h2 className="text-xl font-medium text-[var(--paper)]">
                  {action.title}
                </h2>
                <p className="mt-4 leading-7 text-[#aaa28f]">
                  {action.description}
                </p>
              </div>
              <span className="mt-7 flex items-center justify-between text-sm text-[color:rgba(214,179,90,0.72)]">
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
