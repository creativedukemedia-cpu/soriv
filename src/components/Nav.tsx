import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const mainNavItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
  { to: "/survey", label: "Survey" },
  { to: "/contact", label: "Contact Us" },
];

function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 font-semibold text-sm transition-colors ${
      isActive
        ? "text-primary border-b-2 border-b-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full rounded-lg px-3 py-2 font-medium transition-colors ${
      isActive
        ? "bg-secondary/30 text-primary"
        : "text-muted-foreground hover:bg-secondary/20"
    }`;

  return (
    <>
      {/* Primary navbar */}
      <nav className="fixed z-20 top-10 w-full border-b border-accent bg-background px-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          {/* Logo placeholder */}
          <div className="flex-shrink-0">
            <div className="text-sm md:text-base font-bold text-foreground">
              SOR-<span className="text-red-500">IV</span>
            </div>
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
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary/20 md:hidden"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="border-t border-accent bg-background px-4 pb-4 pt-2 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={mobileLinkClass}
                  end={item.to === "/"}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed crisis bar (h-10) + navbar (h-16) */}
      <div className="w-full h-10" aria-hidden="true" />
      <div className="w-full h-16" aria-hidden="true" />
    </>
  );
}

export default Nav;
