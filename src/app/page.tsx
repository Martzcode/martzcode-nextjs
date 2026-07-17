import StackFeatureSection from "@/components/ui/stack-feature-section";

export default function Home() {
  return (
    <main className="flex flex-1 w-full items-center justify-center">
      <StackFeatureSection
        title="Crafting fast, thoughtful web experiences"
        description="I'm Martin — a creative full-stack engineer building accessible, polished products with React, Next.js and Tailwind CSS."
        primaryLabel="View my work"
        primaryHref="/projects"
        secondaryLabel="Read my blog"
        secondaryHref="/blog"
      />
    </main>
  );
}
