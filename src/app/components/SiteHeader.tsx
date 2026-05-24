import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/papers", label: "研究论著" },
  { href: "/sources", label: "历史史料" },
  { href: "/topics", label: "专题数据库" },
  { href: "/resources", label: "资源导航" },
  { href: "/upload", label: "上传资源" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" href="/">
        西域文献史料汇集
      </Link>
      <nav className="site-nav">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
