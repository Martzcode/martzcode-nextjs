"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export type TimelineEntry = {
  date: string;
  title: string;
  content: string;
};

interface Timeline_02Props {
  title?: string;
  items: TimelineEntry[];
  className?: string;
}

export default function Timeline_02({
  title = "My Journey",
  items,
  className,
}: Timeline_02Props) {
  return (
    <section className={className}>
      <div className="container">
        {title ? (
          <h1 className="text-foreground mb-16 text-center text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
        ) : null}

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[0.4rem] top-2 bottom-2 w-px bg-border" />

          {items.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative mb-12 pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 top-5 h-3 w-3 -translate-x-[0.3rem] rounded-full bg-cyan-500 ring-4 ring-background" />

              {/* Content */}
              <h4 className="text-lg font-normal text-foreground">
                {entry.title}
              </h4>
              <p className="mb-2 text-sm text-muted-foreground">
                {entry.date}
              </p>
              <Card className="border bg-card shadow-sm transition hover:shadow-md">
                <CardContent className="px-5 py-4">
                  <p className="leading-relaxed text-muted-foreground">
                    {entry.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
