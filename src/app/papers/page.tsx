"use client";

import { FormEvent, useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { SiteHeader } from "../components/SiteHeader";

type SourceName =
  | "OpenAlex"
  | "Crossref"
  | "Internet Archive"
  | "Google Books"
  | "WorldCat"
  | "Gallica"
  | "Qatar Digital Library";
type ResultCategory = "论文" | "图书" | "档案" | "手稿" | "数字馆藏";
type CategoryFilter = "全部" | ResultCategory;
type SortMode = "相关度" | "时间" | "作者";

type SearchResult = {
  id: string;
  source: SourceName;
  category: ResultCategory;
  title: string;
  authors: string;
  year: string;
  linkUrl: string;
  abstract: string;
  relevance: number;
};

type OpenAlexWork = {
  id: string;
  title: string | null;
  publication_year: number | null;
  doi: string | null;
  abstract?: string | null;
  abstract_inverted_index?: Record<string, number[]> | null;
  authorships?: {
    author?: {
      display_name?: string | null;
    } | null;
  }[];
};

type OpenAlexResponse = {
  results?: OpenAlexWork[];
};

type CrossrefWork = {
  DOI?: string;
  URL?: string;
  title?: string[];
  author?: {
    given?: string;
    family?: string;
    name?: string;
  }[];
  issued?: {
    "date-parts"?: number[][];
  };
  published?: {
    "date-parts"?: number[][];
  };
  abstract?: string;
};

type CrossrefResponse = {
  message?: {
    items?: CrossrefWork[];
  };
};

type InternetArchiveDoc = {
  identifier?: string;
  title?: string | string[];
  creator?: string | string[];
  year?: string | number | Array<string | number>;
  description?: string | string[];
};

type InternetArchiveResponse = {
  response?: {
    docs?: InternetArchiveDoc[];
  };
};

type GoogleBookItem = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    publishedDate?: string;
    infoLink?: string;
    description?: string;
  };
};

type GoogleBooksResponse = {
  items?: GoogleBookItem[];
};

const allSources: SourceName[] = [
  "OpenAlex",
  "Crossref",
  "Internet Archive",
  "Google Books",
  "WorldCat",
  "Gallica",
  "Qatar Digital Library",
];

const categoryOptions: CategoryFilter[] = [
  "全部",
  "论文",
  "图书",
  "档案",
  "手稿",
  "数字馆藏",
];

const sortOptions: SortMode[] = ["相关度", "时间", "作者"];

const quickSearchTags = [
  "金帐汗国",
  "术赤兀鲁思",
  "察合台汗国",
  "蒙古帝国",
  "波斯史料",
  "满文档案",
  "蒙古文史料",
  "藏文史料",
  "中亚",
  "Inner Asia",
  "Golden Horde",
  "Jochid Ulus",
  "Chagatai Khanate",
  "Rashid al-Din",
  "Jami al-Tawarikh",
  "Tarikh-i Rashidi",
];

const keywordTranslations: Record<string, string> = {
  金帐汗国: "Golden Horde OR Jochid Ulus OR Ulus of Jochi",
  术赤兀鲁思: "Jochid Ulus OR Golden Horde",
  察合台汗国: "Chagatai Khanate",
  波斯史料: "Persian chronicles OR Persian sources",
  满文档案: "Manchu archives",
  蒙古文史料: "Mongolian chronicles",
  藏文史料: "Tibetan sources",
  蒙古帝国: "Mongol Empire",
  中亚: "Central Asia",
};

export default function PapersPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [actualQuery, setActualQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("全部");
  const [sortMode, setSortMode] = useState<SortMode>("相关度");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [sourceErrors, setSourceErrors] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const visibleResults = useMemo(() => {
    const filteredResults =
      categoryFilter === "全部"
        ? results
        : results.filter((result) => result.category === categoryFilter);

    return [...filteredResults].sort((left, right) => {
      if (sortMode === "时间") {
        return parseYear(right.year) - parseYear(left.year);
      }

      if (sortMode === "作者") {
        return left.authors.localeCompare(right.authors, "zh-CN");
      }

      return left.relevance - right.relevance;
    });
  }, [categoryFilter, results, sortMode]);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runSearch(query);
  }

  async function runSearch(rawKeyword: string) {
    const keyword = rawKeyword.trim();
    if (!keyword) {
      setResults([]);
      setSourceErrors([]);
      setHasSearched(false);
      setSubmittedQuery("");
      setActualQuery("");
      return;
    }

    const translatedKeyword = translateKeyword(keyword);

    setIsLoading(true);
    setResults([]);
    setSourceErrors([]);
    setHasSearched(true);
    setSubmittedQuery(keyword);
    setActualQuery(translatedKeyword);

    const settledResults = await Promise.allSettled(
      allSources.map((source) => fetchSource(source, translatedKeyword)),
    );

    const nextResults: SearchResult[] = [];
    const nextErrors: string[] = [];

    settledResults.forEach((result, index) => {
      const source = allSources[index];

      if (result.status === "fulfilled") {
        nextResults.push(...result.value);
      } else {
        nextErrors.push(`${source} 检索失败`);
      }
    });

    setResults(nextResults);
    setSourceErrors(nextErrors);
    setIsLoading(false);
  }

  return (
    <main className="site-shell">
      <section className="content-wrap">
        <SiteHeader />
        <PageHero
          description="统一检索 OpenAlex、Crossref、Internet Archive、Google Books、WorldCat、Gallica 与 Qatar Digital Library。"
          eyebrow="CROSS-DATABASE SEARCH"
          title="研究论著数据库"
        />
        <div className="mb-8 border-l border-[var(--gold)] pl-5 text-[color:rgba(214,179,90,0.86)]">
          建议优先使用英文关键词进行学术检索
        </div>

        <section className="scholar-card p-6">
          <form
            className="grid gap-4 lg:grid-cols-[1fr_180px_160px_auto]"
            onSubmit={handleSearch}
          >
            <label>
              <span className="mb-2 block text-sm text-amber-100/55">
                关键词
              </span>
              <input
                className="search-input w-full"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Golden Horde / Jochid Ulus / Persian chronicles"
                value={query}
              />
            </label>

            <SelectControl
              label="来源筛选"
              onChange={(value) => setCategoryFilter(value as CategoryFilter)}
              options={categoryOptions}
              value={categoryFilter}
            />

            <SelectControl
              label="排序"
              onChange={(value) => setSortMode(value as SortMode)}
              options={sortOptions}
              value={sortMode}
            />

            <button
              className="gold-button mt-auto"
              disabled={isLoading}
              type="submit"
            >
              搜索
            </button>
          </form>

          <div className="mt-6">
            <p className="mb-3 text-sm text-amber-100/55">
              学术快捷搜索标签
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-stone-400">
              {quickSearchTags.map((sample) => (
                <button
                  className="tag-button"
                  key={sample}
                  onClick={() => {
                    setQuery(sample);
                    void runSearch(sample);
                  }}
                  type="button"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {actualQuery && (
            <div className="mt-5 border border-[var(--border)] bg-black/15 p-4 text-sm text-[#aaa28f]">
              <span className="text-amber-100/65">实际检索词：</span>
              {submittedQuery === actualQuery
                ? actualQuery
                : `${submittedQuery} → ${actualQuery}`}
            </div>
          )}
        </section>

        <section className="grid gap-4 py-10">
          {isLoading && (
            <div className="scholar-card p-8 text-[#cfc7b4]">
              正在检索真实文献数据……
            </div>
          )}

          {!isLoading &&
            sourceErrors.map((message) => (
              <div
                className="border border-red-300/25 bg-red-950/20 p-5 text-red-100"
                key={message}
              >
                {message}
              </div>
            ))}

          {!isLoading &&
            visibleResults.map((result) => (
              <article
                className="scholar-card p-6"
                key={result.id}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="text-2xl font-medium text-stone-50">
                    {result.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="w-fit border border-amber-100/20 px-2.5 py-1 text-xs text-amber-100/65">
                      {result.source}
                    </span>
                    <span className="w-fit border border-stone-700/80 px-2.5 py-1 text-xs text-stone-400">
                      {result.category}
                    </span>
                  </div>
                </div>

                <dl className="mt-5 grid gap-3 text-sm text-stone-400 sm:grid-cols-3">
                  <Meta label="作者" value={result.authors} />
                  <Meta label="年份" value={result.year} />
                  <div>
                    <dt className="text-amber-100/55">链接</dt>
                    <dd>
                      <a
                        className="break-all text-amber-100/70 transition hover:text-amber-100"
                        href={result.linkUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {result.linkUrl}
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <p className="mb-2 text-sm text-amber-100/55">摘要</p>
                  <p className="leading-7 text-stone-300">
                    {result.abstract}
                  </p>
                </div>
              </article>
            ))}

          {!isLoading &&
            hasSearched &&
            visibleResults.length === 0 &&
            sourceErrors.length === 0 && (
              <div className="scholar-card p-8 text-[#aaa28f]">
                未找到相关文献，请尝试英文关键词或更具体的术语。
              </div>
            )}
        </section>
      </section>
    </main>
  );
}

async function fetchSource(source: SourceName, keyword: string) {
  if (source === "OpenAlex") return fetchOpenAlex(keyword);
  if (source === "Crossref") return fetchCrossref(keyword);
  if (source === "Internet Archive") return fetchInternetArchive(keyword);
  if (source === "Google Books") return fetchGoogleBooks(keyword);
  if (source === "Gallica") return fetchGallica(keyword);
  if (source === "WorldCat") return fetchWorldCatLink(keyword);
  return fetchQatarDigitalLibraryLink(keyword);
}

function translateKeyword(keyword: string) {
  const exactMatch = keywordTranslations[keyword];

  if (exactMatch) {
    return exactMatch;
  }

  return Object.entries(keywordTranslations).reduce(
    (currentKeyword, [chineseKeyword, englishKeyword]) =>
      currentKeyword.replaceAll(chineseKeyword, englishKeyword),
    keyword,
  );
}

async function fetchOpenAlex(keyword: string): Promise<SearchResult[]> {
  const response = await fetch(
    `https://api.openalex.org/works?search=${encodeURIComponent(keyword)}&per-page=20`,
  );

  if (!response.ok) throw new Error("OpenAlex request failed");

  const data = (await response.json()) as OpenAlexResponse;

  return (data.results ?? []).map((work, index) => ({
    id: `openalex-${work.id}`,
    source: "OpenAlex",
    category: "论文",
    title: work.title ?? "无题名",
    authors: formatOpenAlexAuthors(work),
    year: work.publication_year?.toString() ?? "未知",
    linkUrl: work.doi ?? work.id,
    abstract: formatOpenAlexAbstract(work),
    relevance: index,
  }));
}

async function fetchCrossref(keyword: string): Promise<SearchResult[]> {
  const response = await fetch(
    `https://api.crossref.org/works?query=${encodeURIComponent(keyword)}&rows=20`,
  );

  if (!response.ok) throw new Error("Crossref request failed");

  const data = (await response.json()) as CrossrefResponse;

  return (data.message?.items ?? []).map((work, index) => {
    const doi = work.DOI ? `https://doi.org/${work.DOI}` : "";
    const url = doi || work.URL || "https://www.crossref.org/";

    return {
      id: `crossref-${work.DOI ?? work.URL ?? index}`,
      source: "Crossref",
      category: "论文",
      title: firstValue(work.title) || "无题名",
      authors: formatCrossrefAuthors(work),
      year: formatCrossrefYear(work),
      linkUrl: url,
      abstract: stripTags(work.abstract) || "暂无摘要",
      relevance: index + 100,
    };
  });
}

async function fetchInternetArchive(keyword: string): Promise<SearchResult[]> {
  const response = await fetch(
    `https://archive.org/advancedsearch.php?q=${encodeURIComponent(keyword)}&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=year&fl[]=description&rows=20&page=1&output=json`,
  );

  if (!response.ok) throw new Error("Internet Archive request failed");

  const data = (await response.json()) as InternetArchiveResponse;

  return (data.response?.docs ?? [])
    .filter((doc) => Boolean(doc.identifier))
    .map((doc, index) => {
      const identifier = doc.identifier as string;
      const url = `https://archive.org/details/${identifier}`;

      return {
        id: `internet-archive-${identifier}`,
        source: "Internet Archive",
        category: "数字馆藏",
        title: normalizeValue(doc.title) || "无题名",
        authors: normalizeValue(doc.creator) || "未知作者",
        year: normalizeValue(doc.year) || "未知",
        linkUrl: url,
        abstract: stripTags(normalizeValue(doc.description)) || "暂无摘要",
        relevance: index + 200,
      };
    });
}

async function fetchGoogleBooks(keyword: string): Promise<SearchResult[]> {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}&maxResults=20`,
  );

  if (!response.ok) throw new Error("Google Books request failed");

  const data = (await response.json()) as GoogleBooksResponse;

  return (data.items ?? []).map((item, index) => ({
    id: `google-books-${item.id}`,
    source: "Google Books",
    category: "图书",
    title: item.volumeInfo?.title ?? "无题名",
    authors: item.volumeInfo?.authors?.join("；") ?? "未知作者",
    year: item.volumeInfo?.publishedDate?.slice(0, 4) ?? "未知",
    linkUrl:
      item.volumeInfo?.infoLink ??
      `https://books.google.com/books?id=${item.id}`,
    abstract: stripTags(item.volumeInfo?.description) || "暂无摘要",
    relevance: index + 300,
  }));
}

async function fetchGallica(keyword: string): Promise<SearchResult[]> {
  const query = `dc.title all "${keyword}"`;
  const response = await fetch(
    `https://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&query=${encodeURIComponent(query)}&maximumRecords=20&startRecord=1`,
  );

  if (!response.ok) throw new Error("Gallica request failed");

  const xml = await response.text();
  const document = new DOMParser().parseFromString(xml, "application/xml");
  const records = Array.from(document.getElementsByTagName("record"));

  return records.map((record, index) => {
    const title = getXmlText(record, "title") || "无题名";
    const identifier = getXmlText(record, "identifier");
    const url =
      identifier && identifier.startsWith("http")
        ? identifier
        : `https://gallica.bnf.fr/services/engine/search/sru?operation=searchRetrieve&query=${encodeURIComponent(query)}`;

    return {
      id: `gallica-${identifier || index}`,
      source: "Gallica",
      category: "数字馆藏",
      title,
      authors: getXmlText(record, "creator") || "未知作者",
      year: getXmlText(record, "date") || "未知",
      linkUrl: url,
      abstract: getXmlText(record, "description") || "暂无摘要",
      relevance: index + 400,
    };
  });
}

async function fetchWorldCatLink(keyword: string): Promise<SearchResult[]> {
  const url = `https://search.worldcat.org/search?q=${encodeURIComponent(keyword)}`;

  return [
    {
      id: `worldcat-${keyword}`,
      source: "WorldCat",
      category: "图书",
      title: `WorldCat 馆藏检索：${keyword}`,
      authors: "WorldCat",
      year: "未知",
      linkUrl: url,
      abstract: "WorldCat 官方检索入口。该来源需要通过馆藏页面查看具体图书、论文和馆藏记录。",
      relevance: 500,
    },
  ];
}

async function fetchQatarDigitalLibraryLink(
  keyword: string,
): Promise<SearchResult[]> {
  const url = `https://www.qdl.qa/en/search/site/${encodeURIComponent(keyword)}`;

  return [
    {
      id: `qdl-${keyword}`,
      source: "Qatar Digital Library",
      category: "档案",
      title: `Qatar Digital Library 检索：${keyword}`,
      authors: "Qatar Digital Library",
      year: "未知",
      linkUrl: url,
      abstract: "Qatar Digital Library 官方检索入口，适合查询海湾、伊斯兰史、手稿和英印档案资料。",
      relevance: 600,
    },
  ];
}

function SelectControl({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  value: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm text-amber-100/55">{label}</span>
      <select
        className="search-input w-full"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-amber-100/55">{label}</dt>
      <dd className="break-words">{value}</dd>
    </div>
  );
}

function formatOpenAlexAuthors(work: OpenAlexWork) {
  const names =
    work.authorships
      ?.map((authorship) => authorship.author?.display_name)
      .filter(Boolean) ?? [];

  return names.length > 0 ? names.join("；") : "未知作者";
}

function formatOpenAlexAbstract(work: OpenAlexWork) {
  if (work.abstract) return work.abstract;
  if (!work.abstract_inverted_index) return "暂无摘要";

  const words = Object.entries(work.abstract_inverted_index)
    .flatMap(([word, positions]) =>
      positions.map((position) => ({ position, word })),
    )
    .sort((left, right) => left.position - right.position)
    .map(({ word }) => word);

  return words.length > 0 ? words.join(" ") : "暂无摘要";
}

function formatCrossrefAuthors(work: CrossrefWork) {
  const authors =
    work.author?.map((author) => {
      if (author.name) return author.name;
      return [author.given, author.family].filter(Boolean).join(" ");
    }) ?? [];

  const filteredAuthors = authors.filter(Boolean);
  return filteredAuthors.length > 0 ? filteredAuthors.join("；") : "未知作者";
}

function formatCrossrefYear(work: CrossrefWork) {
  const year =
    work.issued?.["date-parts"]?.[0]?.[0] ??
    work.published?.["date-parts"]?.[0]?.[0];

  return year ? year.toString() : "未知";
}

function firstValue(value?: string[]) {
  return value?.find(Boolean) ?? "";
}

function normalizeValue(
  value?: string | string[] | number | Array<string | number>,
) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join("；");
  }

  return value ? value.toString() : "";
}

function stripTags(value?: string) {
  return value
    ?.replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getXmlText(parent: Element, tagName: string) {
  return (
    Array.from(parent.getElementsByTagName("*"))
      .find((element) => element.localName === tagName)
      ?.textContent?.trim() ?? ""
  );
}

function parseYear(year: string) {
  const parsedYear = Number.parseInt(year, 10);
  return Number.isNaN(parsedYear) ? 0 : parsedYear;
}
