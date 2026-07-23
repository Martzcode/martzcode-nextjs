import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-mt-24 text-2xl font-bold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-6 scroll-mt-24 text-lg font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("mt-4 leading-7 text-muted-foreground", className)}
      {...props}
    />
  ),
  a: ({ href, className, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className={cn(
            "font-medium text-primary underline underline-offset-4",
            className,
          )}
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "font-medium text-primary underline underline-offset-4",
          className,
        )}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }) => (
    <ul
      className={cn("mt-4 list-disc pl-6 text-muted-foreground", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("mt-4 list-decimal pl-6 text-muted-foreground", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary pl-4 italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-8 border-border", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    <Image
      alt={alt ?? ""}
      className={cn("mt-6 rounded-lg border border-border", className)}
      width={0}
      height={0}
      sizes="(max-width: 768px) 100vw, 768px"
      style={{ width: "100%", height: "auto" }}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="mt-6 overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border border-border px-3 py-2 text-left font-semibold",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border border-border px-3 py-2", className)}
      {...props}
    />
  ),
};
