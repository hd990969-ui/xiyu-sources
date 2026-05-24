"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const resourceGroups = [
  {
    title: "馆藏与数字图书馆",
    resources: [
      {
        name: "British Museum Collection",
        description: "大英博物馆在线藏品检索，适合查询内亚、中亚、丝路与亚洲艺术文物。",
        url: "https://www.britishmuseum.org/collection/search",
      },
      {
        name: "British Library Asian Collections",
        description: "大英图书馆亚洲馆藏与手稿资源，包含中亚、波斯文、藏文和东方学资料。",
        url: "https://www.bl.uk/subjects/asia",
      },
      {
        name: "Library of Congress",
        description: "美国国会图书馆馆藏与研究指南，含亚洲、中亚、蒙古、藏文和多语种资料。",
        url: "https://www.loc.gov/",
      },
      {
        name: "Russian National Library",
        description: "俄罗斯国家图书馆，收藏俄文、东方学、欧亚史和历史文献资源。",
        url: "https://nlr.ru/",
      },
      {
        name: "Institute of Oriental Manuscripts",
        description: "俄罗斯科学院东方文献研究所，收藏东方语言写本、敦煌文献与内亚资料。",
        url: "https://www.orientalstudies.ru/",
      },
      {
        name: "Qatar Digital Library",
        description: "卡塔尔数字图书馆，提供阿拉伯文手稿、海湾史、伊斯兰史和英印档案。",
        url: "https://www.qdl.qa/",
      },
      {
        name: "Gallica",
        description: "法国国家图书馆数字馆藏，含东方学、波斯文、中亚和旧籍影像资料。",
        url: "https://gallica.bnf.fr/",
      },
      {
        name: "CiNii",
        description: "日本学术论文、图书和博士论文检索平台，适合东洋史与中亚研究。",
        url: "https://cir.nii.ac.jp/",
      },
      {
        name: "J-STAGE",
        description: "日本科学技术振兴机构期刊平台，收录多种人文社科开放期刊。",
        url: "https://www.jstage.jst.go.jp/",
      },
    ],
  },
  {
    title: "藏学与喜马拉雅",
    resources: [
      {
        name: "BDRC",
        description: "Buddhist Digital Resource Center，提供藏文佛教文献、写本、木刻本和馆藏影像。",
        url: "https://www.bdrc.io/",
      },
      {
        name: "Treasury of Lives",
        description: "藏传佛教与喜马拉雅人物传记数据库，收录人物生平、传承和参考文献。",
        url: "https://treasuryoflives.org/",
      },
      {
        name: "THL",
        description: "Tibetan and Himalayan Library，整合藏学、喜马拉雅研究、地图和语言资料。",
        url: "https://www.thlib.org/",
      },
    ],
  },
  {
    title: "蒙古学与内亚",
    resources: [
      {
        name: "Mongolia Digital Archive",
        description: "蒙古相关历史、民族志、影像和档案资料的数字化入口。",
        url: "https://mongoliadigitalarchive.org/",
      },
      {
        name: "Inner Asia Journal",
        description: "关注蒙古、西藏、中亚和内亚区域研究的学术期刊。",
        url: "https://brill.com/view/journals/inas/inas-overview.xml",
      },
    ],
  },
  {
    title: "突厥学与中亚",
    resources: [
      {
        name: "National Library of Kazakhstan",
        description: "哈萨克斯坦国家图书馆，适合检索哈萨克文、俄文和中亚区域研究资料。",
        url: "https://nlrk.kz/",
      },
      {
        name: "National Library of Uzbekistan",
        description: "乌兹别克斯坦国家图书馆，提供乌兹别克文、俄文和中亚文献资源入口。",
        url: "https://natlib.uz/",
      },
    ],
  },
  {
    title: "波斯文与伊斯兰世界",
    resources: [
      {
        name: "NoorMags",
        description: "伊朗学术期刊平台，收录波斯文人文社科论文和伊斯兰研究资料。",
        url: "https://www.noormags.ir/",
      },
    ],
  },
  {
    title: "俄文与欧亚",
    resources: [
      {
        name: "CyberLeninka",
        description: "俄文学术论文开放平台，适合检索中亚、金帐汗国和东方学研究。",
        url: "https://cyberleninka.ru/",
      },
      {
        name: "eLIBRARY",
        description: "俄罗斯大型学术文献平台，收录期刊、会议论文和引文资料。",
        url: "https://www.elibrary.ru/",
      },
      {
        name: "Runivers",
        description: "俄罗斯历史文献、百科、期刊和古籍影像资源平台。",
        url: "https://runivers.ru/",
      },
    ],
  },
  {
    title: "中国资源",
    resources: [
      {
        name: "国家哲学社会科学文献中心",
        description: "中文哲学社会科学期刊、论文和学术资源服务平台。",
        url: "https://www.ncpssd.org/",
      },
      {
        name: "中国国家图书馆",
        description: "国家图书馆馆藏目录、古籍、民国文献和数字资源入口。",
        url: "https://www.nlc.cn/",
      },
      {
        name: "中国基本古籍库",
        description: "大型中文古籍全文数据库，适合检索传世文献和类书资料。",
        url: "https://www.er07.com/",
      },
    ],
  },
];

export default function ResourcesPage() {
  const [searchText, setSearchText] = useState("");

  const filteredGroups = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return resourceGroups;
    }

    return resourceGroups
      .map((group) => ({
        ...group,
        resources: group.resources.filter((resource) =>
          [group.title, resource.name, resource.description, resource.url]
            .join(" ")
            .toLowerCase()
            .includes(query),
        ),
      }))
      .filter((group) => group.resources.length > 0);
  }, [searchText]);

  return (
    <main className="min-h-screen bg-[#08110f] text-stone-100">
      <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
        <Header />
        <div className="py-14">
          <p className="mb-4 text-sm tracking-[0.35em] text-amber-200/75">
            DISCIPLINARY RESOURCE GUIDE
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            资源导航
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
            按学科、语种和馆藏类型整理开放数据库、图书馆、期刊平台和数字文献资源。
          </p>
        </div>

        <section className="mb-10 border border-amber-100/15 bg-stone-950/35 p-6">
          <label>
            <span className="mb-2 block text-sm text-amber-100/55">
              实时筛选资源
            </span>
            <input
              className="search-input w-full"
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="输入：波斯、藏文、蒙古、俄罗斯、中亚、library..."
              value={searchText}
            />
          </label>
        </section>

        <div className="space-y-12 pb-12">
          {filteredGroups.map((group, index) => (
            <section key={group.title}>
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-amber-100/15 pb-4">
                <h2 className="text-2xl font-medium text-stone-50">
                  {index + 1} {group.title}
                </h2>
                <span className="hidden text-sm tracking-[0.18em] text-stone-500 sm:block">
                  {group.resources.length} RESOURCES
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.resources.map((resource) => (
                  <a
                    className="group flex min-h-48 flex-col justify-between border border-amber-100/12 bg-stone-950/25 p-6 transition hover:-translate-y-1 hover:border-amber-200/35 hover:bg-stone-900/50"
                    href={resource.url}
                    key={`${group.title}-${resource.name}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <div>
                      <h3 className="text-2xl font-medium text-stone-50">
                        {resource.name}
                      </h3>
                      <p className="mt-4 leading-7 text-stone-400">
                        {resource.description}
                      </p>
                    </div>
                    <span className="mt-6 break-all text-sm text-amber-100/60 transition group-hover:text-amber-100">
                      {resource.url} →
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}

          {filteredGroups.length === 0 && (
            <div className="border border-amber-100/12 bg-stone-950/25 p-8 text-stone-400">
              未找到匹配资源，请尝试其他关键词。
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-100/15 pb-6">
      <Link className="text-sm tracking-[0.22em] text-amber-100/70" href="/">
        西域文献史料汇集
      </Link>
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
