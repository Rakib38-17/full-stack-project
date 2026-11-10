"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "add Destination", href: "/add-destination" },
];

// Shown in the navbar when the visitor is NOT signed in.
const authLinks = [
  { label: "Log In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const initials = (
    user?.name ??
    user?.email ??
    "U"
  )
    .trim()
    .charAt(0)
    .toUpperCase();

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await authClient.signOut();
      router.refresh();
    } finally {
      setLoggingOut(false);
      setMenuOpen(false);
    }
  }

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

        {/* Desktop: avatar + popover when signed in, links when not */}
        <nav className="hidden items-center gap-7 md:flex">
          {user ? (
            <Popover>
              <PopoverTrigger
                aria-label="Open user menu"
                className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Avatar size="default">
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name ?? "User"} />
                  ) : null}
                  <AvatarFallback className="bg-brand/10 text-sm font-semibold text-brand">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64">
                <div className="flex items-center gap-3 px-1.5 pt-1.5">
                  <Avatar size="default">
                    {user.image ? (
                      <AvatarImage src={user.image} alt={user.name ?? "User"} />
                    ) : null}
                    <AvatarFallback className="bg-brand/10 text-sm font-semibold text-brand">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <PopoverTitle className="truncate text-sm">
                      {user.name ?? "Signed in"}
                    </PopoverTitle>
                    <PopoverDescription className="truncate text-xs">
                      {user.email}
                    </PopoverDescription>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <nav className="flex flex-col gap-0.5">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    <User className="size-4" />
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut className="size-4" />
                    {loggingOut ? "Logging out..." : "Log out"}
                  </button>
                </nav>
              </PopoverContent>
            </Popover>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  linkClasses(link.href, "text-sm"),
                  link.label === "Sign Up" && "font-semibold text-zinc-900",
                )}
              >
                {link.label}
              </Link>
            ))
          )}
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

            {user ? (
              <div className="mt-4 flex flex-col gap-3 border-t border-zinc-200 pt-4">
                <div className="flex items-center gap-3 px-3">
                  <Avatar size="default">
                    {user.image ? (
                      <AvatarImage src={user.image} alt={user.name ?? "User"} />
                    ) : null}
                    <AvatarFallback className="bg-brand/10 text-sm font-semibold text-brand">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900">
                      {user.name ?? "Signed in"}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      linkClasses("/profile", "rounded-md px-3 py-2.5 text-sm"),
                      "flex items-center gap-2 hover:bg-zinc-50",
                    )}
                  >
                    <User className="size-4" aria-hidden />
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut className="size-4" aria-hidden />
                    {loggingOut ? "Logging out..." : "Log out"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-1 border-t border-zinc-200 pt-4">
                {authLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      linkClasses(link.href, "rounded-md px-3 py-2.5 text-sm"),
                      "hover:bg-zinc-50",
                      link.label === "Sign Up" && "font-semibold text-zinc-900",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
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
              {link.label}
            </Link>
          ))}
        </nav>

        <Menu className="size-6 text-zinc-800 md:hidden" aria-hidden />
      </header>
    </nav>
  );
}
