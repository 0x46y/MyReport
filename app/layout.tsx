import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Report",
  description:
    "技術調査、実現可能性検証、業務自動化、AI・クラウド活用について整理する個人技術ノートです。",
};

const navItems = [
  { href: "/", label: "トップ" },
  { href: "/articles", label: "記事一覧" },
  { href: "/roadmap", label: "おすすめの読み方" },
  { href: "/reports", label: "技術レポート" },
  { href: "/portfolio", label: "ポートフォリオ" },
  { href: "/profile", label: "プロフィール" },
  { href: "/notes", label: "用語集" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-slate-900/10 bg-stone-50/90 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
          <Link className="text-lg font-black tracking-normal text-slate-950" href="/">
            My Report
          </Link>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-600"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <Link className="transition hover:text-teal-700" key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
        <footer className="border-t border-slate-900/10 px-5 py-7 text-sm text-slate-500 md:px-12 lg:px-16">
          <p>
            技術調査、実現可能性検証、業務自動化、AI・クラウド活用について整理する個人技術ノートです。
          </p>
        </footer>
      </body>
    </html>
  );
}
