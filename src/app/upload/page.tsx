"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { PageHero } from "../components/PageHero";
import { SiteHeader } from "../components/SiteHeader";
import { getSupabaseClient } from "../../lib/supabaseClient";

const categories = [
  "研究论著",
  "历史史料",
  "专题数据库",
  "资源导航",
  "藏学与喜马拉雅",
  "蒙古学与内亚",
  "突厥学与中亚",
  "波斯文与伊斯兰世界",
  "俄文与欧亚",
  "中国资源",
  "馆藏与数字图书馆",
];

const languages = [
  "汉文",
  "英文",
  "俄文",
  "日文",
  "蒙古文",
  "藏文",
  "波斯文",
  "阿拉伯文",
  "土耳其文",
  "哈萨克文",
];

const regions = [
  "新疆",
  "内蒙古",
  "西藏",
  "青海",
  "中亚",
  "南亚",
  "俄罗斯",
  "东欧",
  "伊朗",
];

type UploadForm = {
  title: string;
  author: string;
  year: string;
  language: string;
  category: string;
  region: string;
  description: string;
  externalUrl: string;
};

const initialForm: UploadForm = {
  title: "",
  author: "",
  year: "",
  language: languages[0],
  category: categories[0],
  region: regions[0],
  description: "",
  externalUrl: "",
};

export default function UploadPage() {
  const [form, setForm] = useState<UploadForm>(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(field: keyof UploadForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsUploading(true);
    setMessage("");
    setError("");

    try {
      const supabase = getSupabaseClient();

      if (!supabase) {
        throw new Error("Supabase is not configured");
      }

      // Auth is intentionally not enforced yet. Future logic can read:
      // const { data: { user } } = await supabase.auth.getUser();
      let filePath = "";

      if (file) {
        if (file.type !== "application/pdf") {
          throw new Error("Only PDF files are allowed");
        }

        const safeName = file.name.replace(/[^\w.\-]+/g, "_");
        filePath = `${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("resource-files")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }
      }

      const { error: insertError } = await supabase.from("resources").insert({
        title: form.title,
        author: form.author,
        year: form.year ? Number(form.year) : null,
        language: form.language,
        category: form.category,
        region: form.region,
        description: form.description,
        external_url: form.externalUrl || null,
        file_path: filePath || null,
        status: "pending",
      });

      if (insertError) {
        throw insertError;
      }

      setForm(initialForm);
      setFile(null);
      setMessage("上传成功，等待审核。");
    } catch {
      setError("上传失败，请检查 Supabase 配置或稍后重试。");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="site-shell">
      <section className="content-wrap max-w-5xl">
        <SiteHeader />
        <PageHero
          description="请提交与西域、内亚、中亚、蒙古史、藏学、满学、突厥学、波斯文献等相关的研究论著、历史史料或数字资源。"
          eyebrow="RESOURCE SUBMISSION"
          title="提交学术资源"
        />

        <form
          className="scholar-card p-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="资源标题 title"
              onChange={(value) => updateField("title", value)}
              required
              value={form.title}
            />
            <TextField
              label="作者 author"
              onChange={(value) => updateField("author", value)}
              value={form.author}
            />
            <TextField
              label="年份 year"
              onChange={(value) => updateField("year", value)}
              type="number"
              value={form.year}
            />
            <SelectField
              label="语种 language"
              onChange={(value) => updateField("language", value)}
              options={languages}
              value={form.language}
            />
            <SelectField
              label="分类 category"
              onChange={(value) => updateField("category", value)}
              options={categories}
              value={form.category}
            />
            <SelectField
              label="地域 region"
              onChange={(value) => updateField("region", value)}
              options={regions}
              value={form.region}
            />
            <TextField
              label="外部链接 externalUrl"
              onChange={(value) => updateField("externalUrl", value)}
              type="url"
              value={form.externalUrl}
            />
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm text-amber-100/55">
              简介 description
            </span>
            <textarea
              className="search-input min-h-36 w-full py-3"
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              value={form.description}
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm text-amber-100/55">
              PDF文件 file
            </span>
            <input
              accept="application/pdf,.pdf"
              className="block w-full border border-[var(--border)] bg-black/25 px-4 py-3 text-stone-300 file:mr-4 file:border-0 file:bg-[var(--gold)] file:px-4 file:py-2 file:text-[#07110f]"
              onChange={handleFileChange}
              type="file"
            />
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              className="gold-button"
              disabled={isUploading || !form.title}
              type="submit"
            >
              {isUploading ? "正在上传…" : "提交资源"}
            </button>
            {message && <p className="text-amber-100">{message}</p>}
            {error && <p className="text-red-200">{error}</p>}
          </div>
        </form>
      </section>
    </main>
  );
}

function TextField({
  label,
  onChange,
  required,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm text-amber-100/55">{label}</span>
      <input
        className="search-input w-full"
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function SelectField({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
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
