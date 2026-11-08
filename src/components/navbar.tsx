"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "add Destination", href: "/add-destination" },
];

const authLinks = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClasses = (href: string, className?: string) =>
    cn(
      className,
      "font-medium hover:text-brand",
      pathname === href
        ? "text-brand underline underline-offset-2"
        : "text-zinc-800",
    );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <header className="relative z-20 flex h-14 items-center justify-between bg-white px-4 md:px-7">
        {/* Desktop: primary links on the left */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={linkClasses(link.href, "text-sm")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: logo on the left */}
        <Link href="/" className="md:hidden">
          <Image
            src="/image/Wanderlast.png"
            alt="Wanderlast"
            width={112}
            height={22}
            priority
            className="h-auto w-24"
          />
        </Link>

        {/* Desktop: logo centered between the two menus */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <Image
            src="/image/Wanderlast.png"
            alt="Wanderlast"
            width={112}
            height={22}
            priority
            className="h-auto w-28"
          />
        </Link>

        {/* Desktop: auth links on the right */}
        <nav className="hidden items-center gap-7 md:flex">
          {authLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                linkClasses(link.href, "text-sm"),
                link.label === "Sign Up" && "font-semibold text-zinc-900",
              )}
            >
              <span className="flex items-center gap-1.5">
                {link.icon ? (
                  <link.icon className="size-4" aria-hidden />
                ) : null}
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile: menu toggle button */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="md:hidden"
        >
          <Menu className="size-6 text-zinc-800" />
        </button>
      </header>

      {/* Mobile: slide-in drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-in fade-in-0 duration-200"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <aside className="absolute inset-y-0 right-0 flex w-64 max-w-[80%] flex-col bg-white p-5 shadow-lg animate-in slide-in-from-right-8 duration-200">
            <div className="flex items-center justify-between">
              <Image
                src="/image/Wanderlast.png"
                alt="Wanderlast"
                width={112}
                height={22}
                className="h-auto w-24"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X className="size-6 text-zinc-800" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    linkClasses(link.href, "rounded-md px-3 py-2.5 text-sm"),
                    "hover:bg-zinc-50",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col gap-1 border-t border-zinc-200 pt-4">
              {authLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    linkClasses(link.href, "rounded-md px-3 py-2.5 text-sm"),
                    "flex items-center gap-2 hover:bg-zinc-50",
                    link.label === "Sign Up" && "font-semibold text-zinc-900",
                  )}
                >
                  {link.icon ? <link.icon className="size-4" aria-hidden /> : null}
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
}

export function NavbarFallback() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <header className="flex h-14 items-center justify-between bg-white px-4 md:px-7">
        <Link href="/" className="md:hidden">
          <Image
            src="/image/Wanderlast.png"
            alt="Wanderlast"
            width={112}
            height={22}
            priority
            className="h-auto w-24"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zinc-800 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        >
          <Image
            src="/image/Wanderlast.png"
            alt="Wanderlast"
            width={112}
            height={22}
            priority
            className="h-auto w-28"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {authLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zinc-800 hover:text-brand"
            >
              <span className="flex items-center gap-1.5">
                {link.icon ? (
                  <link.icon className="size-4" aria-hidden />
                ) : null}
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <Menu className="size-6 text-zinc-800 md:hidden" aria-hidden />
      </header>
    </nav>
  );
}
