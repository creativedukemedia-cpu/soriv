import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bg-background px-4 py-20 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          That page does not exist or may have moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-brand-deep-maroon"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
