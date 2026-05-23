"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type SourceName = "OpenAlex" | "Crossref" | "Internet Archive";
type SourceFilter = "全部" | SourceName;

type SearchResult = {
  id: string;
  source: SourceName;
  title: string;
  authors: string;
  year: string;
  venue: string;
  linkLabel: string;
  linkUrl: string;
  abstract: string;
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
  primary_location?: {
    source?: {
      display_name?: string | null;
    } | null;
  } | null;
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
  "container-title"?: string[];
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
  language?: string | string[];
  description?: string | string[];
};

type InternetArchiveResponse = {
  response?: {
    docs?: InternetArchiveDoc[];
  };
};

const sourceOptions: SourceFilter[] = [
  "全部",
  "OpenAlex",
  "Crossref",
  "Internet Archive",
];

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
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("全部");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [sourceErrors, setSourceErrors] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    const selectedSources: SourceName[] =
      sourceFilter === "全部"
        ? ["OpenAlex", "Crossref", "Internet Archive"]
        : [sourceFilter];

    const settledResults = await Promise.allSettled(
      selectedSources.map((source) => fetchSource(source, translatedKeyword)),
    );

    const nextResults: SearchResult[] = [];
    const nextErrors: string[] = [];

    settledResults.forEach((result, index) => {
      const source = selectedSources[index];

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
    <main className="min-h-screen bg-[#08110f] text-stone-100">
      <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
        <Header />

        <div className="py-14">
          <p className="mb-4 text-sm tracking-[0.35em] text-amber-200/75">
            OPEN RESEARCH SEARCH
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            研究论著数据库
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
            同时检索 OpenAlex、Crossref 与 Internet Archive 的真实公开数据。建议使用英文关键词，例如
            Golden Horde、Jochid Ulus、Chagatai Khanate、Persian chronicles。
          </p>
          <div className="mt-6 border-l border-amber-200/35 pl-5 text-amber-100/80">
            建议优先使用英文关键词进行学术检索
          </div>
        </div>

        <section className="border border-amber-100/15 bg-stone-950/35 p-6">
          <form
            className="grid gap-4 lg:grid-cols-[1fr_240px_auto]"
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

            <label>
              <span className="mb-2 block text-sm text-amber-100/55">
                来源选择
              </span>
              <select
                className="search-input w-full"
                onChange={(event) =>
                  setSourceFilter(event.target.value as SourceFilter)
                }
                value={sourceFilter}
              >
                {sourceOptions.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="mt-auto min-h-12 border border-amber-200/40 px-8 text-amber-100 transition hover:bg-amber-100 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-55"
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
                className="border border-stone-700/80 px-3 py-1.5 transition hover:border-amber-200/45 hover:text-amber-100"
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
            <div className="mt-5 border border-amber-100/12 bg-black/15 p-4 text-sm text-stone-400">
              <span className="text-amber-100/65">实际检索词：</span>
              {submittedQuery === actualQuery
                ? actualQuery
                : `${submittedQuery} → ${actualQuery}`}
            </div>
          )}
        </section>

        <section className="grid gap-4 py-10">
          {isLoading && (
            <div className="border border-amber-100/12 bg-stone-950/25 p-8 text-stone-300">
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
            results.map((result) => (
              <article
                className="border border-amber-100/12 bg-stone-950/25 p-6 transition hover:border-amber-200/35 hover:bg-stone-900/45"
                key={result.id}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="text-2xl font-medium text-stone-50">
                    {result.title}
                  </h2>
                  <span className="w-fit border border-amber-100/20 px-2.5 py-1 text-xs text-amber-100/65">
                    {result.source}
                  </span>
                </div>

                <dl className="mt-5 grid gap-3 text-sm text-stone-400 sm:grid-cols-2 lg:grid-cols-3">
                  <Meta label="作者" value={result.authors} />
                  <Meta label="年份" value={result.year} />
                  <Meta label="出版来源/馆藏来源" value={result.venue} />
                  <div className="lg:col-span-3">
                    <dt className="text-amber-100/55">
                      DOI 或资源链接
                    </dt>
                    <dd>
                      <a
                        className="break-all text-amber-100/70 transition hover:text-amber-100"
                        href={result.linkUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {result.linkLabel}
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <p className="mb-2 text-sm text-amber-100/55">摘要/描述</p>
                  <p className="leading-7 text-stone-300">
                    {result.abstract}
                  </p>
                </div>
              </article>
            ))}

          {!isLoading &&
            hasSearched &&
            results.length === 0 &&
            sourceErrors.length === 0 && (
              <div className="border border-amber-100/12 bg-stone-950/25 p-8 text-stone-400">
                未找到相关文献，请尝试英文关键词或更具体的术语。
              </div>
            )}
        </section>
      </section>
    </main>
  );
}

async function fetchSource(source: SourceName, keyword: string) {
  if (source === "OpenAlex") {
    return fetchOpenAlex(keyword);
  }

  if (source === "Crossref") {
    return fetchCrossref(keyword);
  }

  return fetchInternetArchive(keyword);
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
    `https://api.openalex.org/works?search=${encodeURIComponent(
      keyword,
    )}&per-page=20`,
  );

  if (!response.ok) {
    throw new Error("OpenAlex request failed");
  }

  const data = (await response.json()) as OpenAlexResponse;

  return (data.results ?? []).map((work) => ({
    id: `openalex-${work.id}`,
    source: "OpenAlex",
    title: work.title ?? "无题名",
    authors: formatOpenAlexAuthors(work),
    year: work.publication_year?.toString() ?? "未知",
    venue: work.primary_location?.source?.display_name ?? "未知来源",
    linkLabel: work.doi ?? work.id,
    linkUrl: work.doi ?? work.id,
    abstract: formatOpenAlexAbstract(work),
  }));
}

async function fetchCrossref(keyword: string): Promise<SearchResult[]> {
  const response = await fetch(
    `https://api.crossref.org/works?query=${encodeURIComponent(
      keyword,
    )}&rows=20`,
  );

  if (!response.ok) {
    throw new Error("Crossref request failed");
  }

  const data = (await response.json()) as CrossrefResponse;

  return (data.message?.items ?? []).map((work, index) => {
    const doi = work.DOI ? `https://doi.org/${work.DOI}` : "";
    const url = doi || work.URL || "https://www.crossref.org/";

    return {
      id: `crossref-${work.DOI ?? work.URL ?? index}`,
      source: "Crossref",
      title: firstValue(work.title) || "无题名",
      authors: formatCrossrefAuthors(work),
      year: formatCrossrefYear(work),
      venue: firstValue(work["container-title"]) || "未知来源",
      linkLabel: work.DOI ?? work.URL ?? "Crossref 记录",
      linkUrl: url,
      abstract: stripTags(work.abstract) || "暂无摘要",
    };
  });
}

async function fetchInternetArchive(keyword: string): Promise<SearchResult[]> {
  const response = await fetch(
    `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
      keyword,
    )}&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=year&fl[]=language&fl[]=description&rows=20&page=1&output=json`,
  );

  if (!response.ok) {
    throw new Error("Internet Archive request failed");
  }

  const data = (await response.json()) as InternetArchiveResponse;

  return (data.response?.docs ?? [])
    .filter((doc) => Boolean(doc.identifier))
    .map((doc) => {
      const identifier = doc.identifier as string;
      const url = `https://archive.org/details/${identifier}`;

      return {
        id: `internet-archive-${identifier}`,
        source: "Internet Archive",
        title: normalizeValue(doc.title) || "无题名",
        authors: normalizeValue(doc.creator) || "未知作者",
        year: normalizeValue(doc.year) || "未知",
        venue: normalizeValue(doc.language)
          ? `Internet Archive · ${normalizeValue(doc.language)}`
          : "Internet Archive",
        linkLabel: url,
        linkUrl: url,
        abstract: stripTags(normalizeValue(doc.description)) || "暂无摘要",
      };
    });
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
      </nav>
    </header>
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
  if (work.abstract) {
    return work.abstract;
  }

  if (!work.abstract_inverted_index) {
    return "暂无摘要";
  }

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
      if (author.name) {
        return author.name;
      }

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

function normalizeValue(value?: string | string[] | number | Array<string | number>) {
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
