import { PageHero } from "../components/PageHero";
import { SiteHeader } from "../components/SiteHeader";

type SourceLink = {
  label: string;
  url: string;
  type: "read" | "catalog" | "search";
};

type HistoricalSource = {
  id: string;
  title: string;
  originalTitle: string;
  author: string;
  period: string;
  language: string;
  description: string;
  sourceName: string;
  links: SourceLink[];
};

const sources: HistoricalSource[] = [
  {
    id: "jami-al-tawarikh",
    title: "Jami al-Tawarikh",
    originalTitle: "《史集》 / 《集史》",
    author: "Rashid al-Din",
    period: "14世纪初",
    language: "波斯文",
    description: "蒙古帝国与诸兀鲁思研究最重要的波斯文史料之一，含部族谱系、征服叙事与世界史框架。",
    sourceName: "Internet Archive / Edinburgh Archives",
    links: [
      {
        label: "在线阅读",
        url: "https://archive.org/details/dli.ernet.544904",
        type: "read",
      },
      {
        label: "馆藏页面",
        url: "https://archives.collections.ed.ac.uk/repositories/2/digital_objects/154",
        type: "catalog",
      },
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Jami%20al-Tawarikh%20Rashid%20al-Din",
        type: "search",
      },
    ],
  },
  {
    id: "tarikh-i-rashidi",
    title: "Tarikh-i Rashidi",
    originalTitle: "《拉失德史》",
    author: "Mirza Muhammad Haidar Dughlat",
    period: "16世纪",
    language: "波斯文",
    description: "研究察合台汗国、蒙兀儿斯坦、叶尔羌汗国及中亚政治文化的重要史料。",
    sourceName: "NYPL / Internet Archive / Google Books",
    links: [
      {
        label: "在线阅读",
        url: "https://digital-research-books-beta.nypl.org/work/37502f14-ea03-4f4f-bfbf-4accd600c875",
        type: "read",
      },
      {
        label: "备用阅读",
        url: "https://archive.org/details/bub_gb_eikPAAAAYAAJ_2",
        type: "read",
      },
      {
        label: "Google Books",
        url: "https://books.google.com/books?id=eikPAAAAYAAJ",
        type: "catalog",
      },
    ],
  },
  {
    id: "rashid-successors",
    title: "The Successors of Genghis Khan",
    originalTitle: "Rashid al-Din, The Successors of Genghis Khan",
    author: "Rashid al-Din / John Andrew Boyle",
    period: "20世纪译本",
    language: "英文 / 波斯文",
    description: "Boyle 英译拉施特丁关于成吉思汗继承者和蒙古帝国诸汗国的重要译本。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "在线阅读",
        url: "https://archive.org/details/Boyle1971RashidAlDin",
        type: "read",
      },
    ],
  },
  {
    id: "muizz-al-ansab",
    title: "Muʿizz al-Ansāb",
    originalTitle: "《贵显世系》",
    author: "佚名帖木儿朝编者",
    period: "15世纪",
    language: "波斯文",
    description: "帖木儿朝谱系史料，保存成吉思汗系和帖木儿家族谱系信息。",
    sourceName: "Wikimedia Commons / Internet Archive",
    links: [
      {
        label: "图像资源",
        url: "https://commons.wikimedia.org/wiki/Category:Mu%27izz_al-Ansab_fi_Shajarat_al-Ansab",
        type: "catalog",
      },
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Muizz%20al-Ansab",
        type: "search",
      },
    ],
  },
  {
    id: "yuan-shi",
    title: "Yuan Shi",
    originalTitle: "《元史》",
    author: "宋濂等",
    period: "14世纪",
    language: "汉文",
    description: "明初官修正史，保存元代帝纪、志、表、列传等材料，是元史和蒙古帝国研究核心汉文史料。",
    sourceName: "Chinese Text Project",
    links: [
      {
        label: "在线阅读",
        url: "https://ctext.org/wiki.pl?if=gb&res=806957",
        type: "read",
      },
    ],
  },
  {
    id: "shengwu-qinzheng-lu",
    title: "Shengwu Qinzheng Lu",
    originalTitle: "《圣武亲征录》",
    author: "佚名",
    period: "13-14世纪",
    language: "汉文",
    description: "记述成吉思汗征战事迹的汉文史料，常与《蒙古秘史》等材料互证。",
    sourceName: "Chinese Text Project",
    links: [
      {
        label: "在线阅读",
        url: "https://ctext.org/wiki.pl?if=gb&res=969007",
        type: "read",
      },
    ],
  },
  {
    id: "tarikh-i-jahan-gusha",
    title: "Tarikh-i Jahan-Gusha",
    originalTitle: "Ata-Malik Juvayni / 《世界征服者史》",
    author: "Ata-Malik Juvayni",
    period: "13世纪",
    language: "波斯文",
    description: "志费尼所撰蒙古征服史，是研究早期蒙古帝国和花剌子模的重要波斯文史料。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Juvayni%20History%20of%20the%20World%20Conqueror",
        type: "search",
      },
    ],
  },
  {
    id: "marco-polo-travels",
    title: "Marco Polo Travels",
    originalTitle: "《马可波罗旅行记》",
    author: "Marco Polo / Rustichello da Pisa",
    period: "13-14世纪",
    language: "中古法文 / 拉丁文",
    description: "欧洲旅行记传统中关于元代中国、丝路城市与蒙古帝国交通的重要文本。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Travels%20of%20Marco%20Polo",
        type: "search",
      },
    ],
  },
  {
    id: "ibn-battuta-travels",
    title: "Ibn Battuta Travels",
    originalTitle: "伊本·白图泰游记",
    author: "Ibn Battuta",
    period: "14世纪",
    language: "阿拉伯文",
    description: "记录伊斯兰世界、南亚和中亚交通网络的重要旅行记资料。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Ibn%20Battuta%20Travels",
        type: "search",
      },
    ],
  },
  {
    id: "tarikh-i-wassaf",
    title: "Tarikh-i Wassaf",
    originalTitle: "《瓦萨夫史》",
    author: "Wassaf",
    period: "14世纪",
    language: "波斯文",
    description: "伊儿汗国后期重要波斯编年史，常用于研究蒙古统治下的伊朗政治与财政。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Wassaf%20Persian%20history",
        type: "search",
      },
    ],
  },
  {
    id: "secret-history-of-the-mongols",
    title: "Secret History of the Mongols",
    originalTitle: "《蒙古秘史》",
    author: "佚名",
    period: "13世纪",
    language: "蒙古文 / 汉字音写",
    description: "蒙古早期历史、成吉思汗家族叙事与草原政治文化的核心文本。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Secret%20History%20of%20the%20Mongols",
        type: "search",
      },
    ],
  },
  {
    id: "hei-da-shi-lue",
    title: "Hei Da Shi Lue",
    originalTitle: "《黑鞑事略》",
    author: "彭大雅 / 徐霆",
    period: "13世纪",
    language: "汉文",
    description: "南宋使者关于蒙古社会、制度与军事情况的观察记录。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Hei%20Da%20Shi%20Lue",
        type: "search",
      },
    ],
  },
  {
    id: "meng-da-bei-lu",
    title: "Meng Da Bei Lu",
    originalTitle: "《蒙鞑备录》",
    author: "赵珙",
    period: "13世纪",
    language: "汉文",
    description: "早期汉文蒙古见闻录，保存蒙古兴起阶段的制度、军事和风俗资料。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Meng%20Da%20Bei%20Lu",
        type: "search",
      },
    ],
  },
  {
    id: "changchun-xiyou-ji",
    title: "Changchun Zhenren Xiyou Ji",
    originalTitle: "《长春真人西游记》",
    author: "李志常",
    period: "13世纪",
    language: "汉文",
    description: "记录丘处机西行觐见成吉思汗过程，涉及中亚道路、城市和蒙古宫廷。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=Changchun%20Zhenren%20Xiyou%20Ji",
        type: "search",
      },
    ],
  },
  {
    id: "rubruck-travels",
    title: "William of Rubruck Travels",
    originalTitle: "鲁布鲁克旅行记",
    author: "William of Rubruck",
    period: "13世纪",
    language: "拉丁文",
    description: "欧洲传教士访问蒙古帝国的旅行记，记录草原社会、宗教和欧亚交通。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=William%20of%20Rubruck%20Travels",
        type: "search",
      },
    ],
  },
  {
    id: "plano-carpini",
    title: "Plano Carpini Mission",
    originalTitle: "柏朗嘉宾蒙古行纪",
    author: "John of Plano Carpini",
    period: "13世纪",
    language: "拉丁文",
    description: "方济各会使者关于蒙古帝国政治、军事和礼仪的重要拉丁文报告。",
    sourceName: "Internet Archive",
    links: [
      {
        label: "备用检索",
        url: "https://archive.org/search?query=John%20of%20Plano%20Carpini%20Mongols",
        type: "search",
      },
    ],
  },
];

export default function SourcesPage() {
  return (
    <main className="site-shell">
      <section className="content-wrap">
        <SiteHeader />
        <PageHero
          description="汇集波斯文、汉文、蒙古文、藏文、拉丁文等多语种历史史料，展示版本、译本与可阅读电子资源入口。"
          eyebrow="HISTORICAL SOURCE DATABASE"
          title="历史史料数据库"
        />

        <section className="grid gap-4 pb-12">
          {sources.map((source) => {
            const hasReadableLink = source.links.some(
              (link) => link.type === "read",
            );

            return (
              <article className="scholar-card p-6" key={source.id}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="mb-3 text-sm text-amber-100/55">
                      {source.originalTitle}
                    </p>
                    <h2 className="text-2xl font-medium text-stone-50">
                      {source.title}
                    </h2>
                  </div>
                  <span className="w-fit border border-amber-100/20 px-2.5 py-1 text-xs text-amber-100/65">
                    {source.sourceName}
                  </span>
                </div>

                <dl className="mt-5 grid gap-3 text-sm text-[#aaa28f] sm:grid-cols-4">
                  <div>
                    <dt className="text-amber-100/55">作者</dt>
                    <dd>{source.author}</dd>
                  </div>
                  <div>
                    <dt className="text-amber-100/55">年代</dt>
                    <dd>{source.period}</dd>
                  </div>
                  <div>
                    <dt className="text-amber-100/55">语种</dt>
                    <dd>{source.language}</dd>
                  </div>
                  <div>
                    <dt className="text-amber-100/55">线上来源</dt>
                    <dd>{source.sourceName}</dd>
                  </div>
                </dl>

                <p className="mt-5 leading-7 text-stone-300">
                  {source.description}
                </p>

                {!hasReadableLink && (
                  <p className="mt-5 text-sm text-[#aaa28f]">
                    暂无可靠电子版，查看馆藏/检索结果。
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {sortLinks(source.links).map((link) => (
                    <a
                      className={getLinkClassName(link.type)}
                      href={link.url}
                      key={`${source.id}-${link.label}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}

function sortLinks(links: SourceLink[]) {
  const order: Record<SourceLink["type"], number> = {
    read: 0,
    catalog: 1,
    search: 2,
  };

  return [...links].sort((left, right) => order[left.type] - order[right.type]);
}

function getLinkClassName(type: SourceLink["type"]) {
  const baseClass =
    "border px-4 py-2 text-sm transition hover:-translate-y-0.5";

  if (type === "read") {
    return `${baseClass} border-[color:rgba(214,179,90,0.55)] bg-[color:rgba(214,179,90,0.1)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#07110f]`;
  }

  return `${baseClass} border-[var(--border)] text-[#c8a96a] hover:border-[color:rgba(214,179,90,0.55)] hover:text-[var(--gold)]`;
}
