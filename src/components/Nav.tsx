import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";

const mainNavItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
  { to: "/survey", label: "Survey" },
  { to: "/contact", label: "Contact Us" },
];

function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    window.setTimeout(() => toggleRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;

    const focusFirstLink = window.setTimeout(() => {
      const firstLink = menuRef.current?.querySelector<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      firstLink?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusables = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      // Include the toggle so Shift+Tab from the first link can reach it,
      // but keep Tab cycling within toggle + menu while open.
      const toggle = toggleRef.current;
      const items = [
        ...(toggle ? [toggle] : []),
        ...Array.from(focusables),
      ];
      if (items.length === 0) return;

      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusFirstLink);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileOpen, closeMobileMenu]);

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      isActive
        ? "text-primary border-b-2 border-b-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full rounded-lg px-3 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      isActive
        ? "bg-brand-feather-grey text-primary"
        : "text-muted-foreground hover:bg-brand-feather-grey"
    }`;

  return (
    <>
      {/* Primary navbar */}
      <nav className="fixed z-20 top-10 w-full border-b border-accent bg-background px-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          {/* Secondary 1: space-limited nav (primary needs >= 413px). */}
          <div className="flex-shrink-0">
            <BrandLogo variant="secondary-1" programLabel="SOR-IV" />
          </div>

          {/* Desktop main nav */}
          <div className="hidden h-full md:flex md:flex-row md:items-center md:gap-8">
            {mainNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={desktopLinkClass}
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            onClick={() => {
              if (isMobileOpen) {
                closeMobileMenu();
              } else {
                setIsMobileOpen(true);
              }
            }}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls={menuId}
          >
            {isMobileOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen ? (
          <div
            ref={menuRef}
            id={menuId}
            className="border-t border-accent bg-background px-4 pb-4 pt-2 md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={mobileLinkClass}
                  end={item.to === "/"}
                  onClick={() => closeMobileMenu()}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ) : null}
      </nav>

      {/* Spacer for fixed crisis bar (h-10) + navbar (h-16) */}
      <div className="w-full h-10" aria-hidden="true" />
      <div className="w-full h-16" aria-hidden="true" />
    </>
  );
}

export default Nav;
