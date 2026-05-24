import { PageHero } from "../components/PageHero";
import { SiteHeader } from "../components/SiteHeader";

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
    <main className="site-shell">
      <section className="content-wrap">
        <SiteHeader />
        <PageHero
          description="围绕人物、地名、文献版本、碑铭文书和边疆档案建立专题资料入口。"
          eyebrow="SPECIAL COLLECTIONS"
          title="专题数据库"
        />

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article className="scholar-card min-h-40 p-6" key={topic}>
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
