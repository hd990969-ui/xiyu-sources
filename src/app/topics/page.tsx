import Link from "next/link";

const topics = [
  "内亚历史人物索引",
  "西域地名与历史地理",
  "蒙古帝国诸兀鲁思",
  "多语种史料版本目录",
  "碑铭、文书与写本资料",
  "清代边疆档案专题",
];

export default function TopicsPage() {
  return (
    <main className="min-h-screen bg-[#08110f] text-stone-100">
      <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
        <Header />
        <div className="py-14">
          <p className="mb-4 text-sm tracking-[0.35em] text-amber-200/75">
            SPECIAL COLLECTIONS
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            专题数据库
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
            围绕人物、地名、文献版本、碑铭文书和边疆档案建立专题资料入口。
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article className="min-h-40 border border-amber-100/12 bg-stone-950/25 p-6 hover:border-amber-200/35" key={topic}>
              <h2 className="text-2xl font-medium text-stone-50">{topic}</h2>
              <p className="mt-4 leading-7 text-stone-400">
                资料正在整理中，后续可接入条目、索引和全文链接。
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-100/15 pb-6">
      <Link className="text-sm tracking-[0.22em] text-amber-100/70" href="/">西域文献史料汇集</Link>
      <nav className="flex flex-wrap gap-4 text-sm text-stone-400">
        <Link href="/papers">研究论著</Link>
        <Link href="/sources">历史史料</Link>
        <Link href="/topics">专题数据库</Link>
        <Link href="/resources">资源导航</Link>
        <Link href="/upload">上传资源</Link>
      </nav>
    </header>
  );
}
