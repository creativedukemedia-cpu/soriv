import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/chatbot/ChatWidget";

export default function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <div className="fixed top-0 z-30 flex h-10 w-full items-center justify-center border-b border-brand-deep-maroon bg-primary px-4 text-center font-brand-sans text-sm text-primary-foreground">
        Need help now? Call or text{" "}
        <a
          href="tel:988"
          className="font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded-sm"
        >
          988
        </a>
        . Emergency:{" "}
        <a
          href="tel:911"
          className="font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground rounded-sm"
        >
          911
        </a>
        .
      </div>

      <Nav />

      <main id="main">
        <Outlet />
      </main>

      <Footer />

      <div id="chat-root" />
      <ChatWidget />
    </>
  );
}
