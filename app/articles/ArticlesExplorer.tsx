"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/content";

type SortOrder = "newest" | "oldest" | "title";
type ArticleSummary = Omit<Post, "body">;

export default function ArticlesExplorer({ posts }: { posts: ArticleSummary[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") ?? "all");
  const [selectedKind, setSelectedKind] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [pageSize, setPageSize] = useState(5);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b)),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts
      .filter((post) => {
        const matchesKind = selectedKind === "all" || post.kind === selectedKind;
        const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
        const matchesDateFrom = !dateFrom || post.date >= dateFrom;
        const matchesDateTo = !dateTo || post.date <= dateTo;
        const haystack = [post.title, post.excerpt, post.date, post.kind, ...post.tags]
          .join(" ")
          .toLowerCase();
        const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);

        return matchesKind && matchesTag && matchesDateFrom && matchesDateTo && matchesQuery;
      })
      .sort((a, b) => {
        if (sortOrder === "oldest") {
          return a.date.localeCompare(b.date);
        }

        if (sortOrder === "title") {
          return a.title.localeCompare(b.title, "ja");
        }

        return b.date.localeCompare(a.date);
      });
  }, [dateFrom, dateTo, posts, query, selectedKind, selectedTag, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  function resetPage() {
    setPage(1);
  }

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(150px,0.6fr))]">
          <label className="grid gap-2">
            <span className="text-xs font-black uppercase tracking-normal text-slate-500">Search</span>
            <input
              className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
              onChange={(event) => {
                setQuery(event.target.value);
                resetPage();
              }}
              placeholder="タイトル、説明、タグで検索"
              type="search"
              value={query}
            />
          </label>

          <SelectField
            label="Type"
            onChange={(value) => {
              setSelectedKind(value);
              resetPage();
            }}
            value={selectedKind}
            options={[
              { label: "All", value: "all" },
              { label: "Reports", value: "reports" },
              { label: "Notes", value: "notes" },
            ]}
          />

          <SelectField
            label="Sort"
            onChange={(value) => {
              setSortOrder(value as SortOrder);
              resetPage();
            }}
            value={sortOrder}
            options={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
              { label: "Title", value: "title" },
            ]}
          />

          <SelectField
            label="Per page"
            onChange={(value) => {
              setPageSize(Number(value));
              resetPage();
            }}
            value={String(pageSize)}
            options={[
              { label: "3", value: "3" },
              { label: "5", value: "5" },
              { label: "10", value: "10" },
              { label: "All", value: String(posts.length) },
            ]}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[repeat(2,minmax(180px,0.5fr))_auto] md:items-end">
          <DateField
            label="From"
            onChange={(value) => {
              setDateFrom(value);
              resetPage();
            }}
            value={dateFrom}
          />
          <DateField
            label="To"
            onChange={(value) => {
              setDateTo(value);
              resetPage();
            }}
            value={dateTo}
          />
          <button
            className="min-h-11 rounded-md border border-slate-300 px-4 font-black text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
            onClick={() => {
              setDateFrom("");
              setDateTo("");
              resetPage();
            }}
            type="button"
          >
            Clear dates
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            className={tagButtonClass(selectedTag === "all")}
            onClick={() => {
              setSelectedTag("all");
              resetPage();
            }}
            type="button"
          >
            all tags
          </button>
          {tags.map((tag) => (
            <button
              className={tagButtonClass(selectedTag === tag)}
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                resetPage();
              }}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <p>
          {filteredPosts.length} 件中 {visiblePosts.length ? startIndex + 1 : 0}-
          {Math.min(startIndex + pageSize, filteredPosts.length)} 件を表示
        </p>
        <p>
          Page {currentPage} / {totalPages}
        </p>
      </div>

      <div className="grid gap-4">
        {visiblePosts.length ? (
          visiblePosts.map((post) => (
            <Link
              className="grid gap-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md"
              href={`/${post.kind}/${post.slug}`}
              key={`${post.kind}-${post.slug}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-fit rounded-full border border-slate-200 px-3 py-1 text-xs font-black text-teal-900">
                  {post.kind === "reports" ? "Report" : "Note"}
                </span>
                <time className="text-sm text-slate-500" dateTime={post.date}>
                  {post.date}
                </time>
              </div>
              <h2 className="text-2xl font-black tracking-normal text-slate-950">{post.title}</h2>
              <p className="leading-8 text-slate-600">{post.excerpt}</p>
              {post.tags.length ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="font-black text-slate-950">該当する記事がありません</p>
            <p className="mt-2 text-sm text-slate-600">検索語やタグを変えて試してください。</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <button
          className="min-h-10 rounded-md border border-slate-300 px-4 font-black text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentPage <= 1}
          onClick={() => setPage((value) => Math.max(1, value - 1))}
          type="button"
        >
          Prev
        </button>
        <button
          className="min-h-10 rounded-md border border-slate-300 px-4 font-black text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentPage >= totalPages}
          onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
          type="button"
        >
          Next
        </button>
      </div>
    </section>
  );
}

function DateField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-normal text-slate-500">{label}</span>
      <input
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        onChange={(event) => onChange(event.target.value)}
        type="date"
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
  options: { label: string; value: string }[];
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-normal text-slate-500">{label}</span>
      <select
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function tagButtonClass(isActive: boolean) {
  const base = "rounded-full border px-3 py-1 text-xs font-black transition";

  if (isActive) {
    return `${base} border-teal-700 bg-teal-700 text-white`;
  }

  return `${base} border-slate-200 bg-white text-slate-600 hover:border-teal-500 hover:text-teal-700`;
}
