import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Report",
  description:
    "このサイトは、個人的な技術レポート、制作物、ポートフォリオ、意見記事をまとめた個人サイトです。",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/reports", label: "Reports" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/r2-image-test", label: "R2 Demo" },
  { href: "/notes", label: "Notes" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
            このサイトは、個人的な技術レポート、制作物、ポートフォリオ、意見記事をまとめた個人サイトです。
          </p>
        </footer>
      </body>
    </html>
  );
}
