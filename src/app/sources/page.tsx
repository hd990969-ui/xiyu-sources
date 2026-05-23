import Link from "next/link";

const sources = [
  ["《集史》", "拉施特丁", "14世纪初", "波斯文", "Karl Jahn 校订本；Wheeler Thackston 英译本"],
  ["《史集》", "拉施特丁", "14世纪初", "波斯文", "余大钧、周建奇汉译本；波斯文校勘本"],
  ["Tarikh-i Rashidi", "米尔咱·海答儿", "16世纪", "波斯文", "Elias and Ross 英译本；中亚史研究常用本"],
  ["《元史》", "宋濂等", "14世纪", "汉文", "中华书局点校本"],
  ["《圣武亲征录》", "佚名", "13-14世纪", "汉文", "王国维笺证本；中华书局整理本"],
  ["Jami al-Tawarikh", "Rashid al-Din", "14世纪初", "波斯文", "Thackston translation；Blochet manuscript tradition"],
  ["Muʿizz al-Ansāb", "佚名帖木儿朝编者", "15世纪", "波斯文", "Woods 研究本；谱系史料整理本"],
  ["《马可波罗旅行记》", "马可波罗 / 鲁思梯谦", "13-14世纪", "中古法文 / 拉丁文", "Yule-Cordier 英译注本；多种汉译本"],
  ["《长春真人西游记》", "李志常", "13世纪", "汉文", "中华书局整理本；王国维校注本"],
  ["《多桑蒙古史》", "多桑", "19世纪", "法文", "冯承钧汉译本；法文原本"],
  ["《世界征服者史》", "志费尼", "13世纪", "波斯文", "Boyle 英译本；Qazvini 校勘本"],
  ["《史集》蒙古部族志", "拉施特丁", "14世纪初", "波斯文", "波斯文校本与汉译注本"],
  ["《蒙古秘史》", "佚名", "13世纪", "蒙古文 / 汉字音写", "额尔登泰、乌云达赉校勘本；Igor de Rachewiltz 英译注"],
  ["《黑鞑事略》", "彭大雅 / 徐霆", "13世纪", "汉文", "王国维笺证本；中华书局整理本"],
  ["《蒙鞑备录》", "赵珙", "13世纪", "汉文", "王国维笺证本；宋元笔记整理本"],
  ["波斯编年史选辑", "瓦萨夫等", "13-14世纪", "波斯文", "Hammer-Purgstall 摘译本；现代波斯文整理本"],
  ["《瓦萨夫史》", "瓦萨夫", "14世纪", "波斯文", "Bombay lithograph；部分英译与研究摘编"],
  ["《贵显世系》", "佚名", "15世纪", "波斯文", "中亚谱系史料研究本"],
  ["鲁布鲁克旅行记", "William of Rubruck", "13世纪", "拉丁文", "Jackson and Morgan 英译注本"],
  ["柏朗嘉宾蒙古行纪", "John of Plano Carpini", "13世纪", "拉丁文", "Dawson 英译本；Sinica Franciscana 版本"],
];

export default function SourcesPage() {
  return (
    <main className="min-h-screen bg-[#08110f] text-stone-100">
      <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
        <Header />
        <div className="py-14">
          <p className="mb-4 text-sm tracking-[0.35em] text-amber-200/75">
            HISTORICAL SOURCE DATABASE
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            历史史料数据库
          </h1>
        </div>

        <section className="grid gap-4 pb-12">
          {sources.map(([name, author, era, language, edition]) => (
            <article className="border border-amber-100/12 bg-stone-950/25 p-6 hover:border-amber-200/35" key={name}>
              <h2 className="text-2xl font-medium text-stone-50">{name}</h2>
              <dl className="mt-4 grid gap-2 text-sm text-stone-400 sm:grid-cols-4">
                <div><dt className="text-amber-100/55">作者</dt><dd>{author}</dd></div>
                <div><dt className="text-amber-100/55">年代</dt><dd>{era}</dd></div>
                <div><dt className="text-amber-100/55">语种</dt><dd>{language}</dd></div>
                <div><dt className="text-amber-100/55">学界版本</dt><dd>{edition}</dd></div>
              </dl>
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
      </nav>
    </header>
  );
}
