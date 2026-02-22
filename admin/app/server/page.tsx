import Image from "next/image";

export default async function ServerPage() {
  const data = { message: "Data placeholder for Convex test" };

  return (
    <main className="p-8 flex flex-col gap-6 mx-auto max-w-2xl">
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/convex.svg"
            alt="Convex Logo"
            width={48}
            height={48}
          />
          <div className="w-px h-12 bg-slate-300 dark:bg-slate-600"></div>
          <Image
            src="/nextjs-icon-light-background.svg"
            alt="Next.js Logo"
            width={48}
            height={48}
            className="dark:hidden"
          />
          <Image
            src="/nextjs-icon-dark-background.svg"
            alt="Next.js Logo"
            width={48}
            height={48}
            className="hidden dark:block"
          />
        </div>
        <h1 className="text-4xl font-bold text-[var(--foreground)]">
          Convex + Next.js
        </h1>
      </div>
      <div className="flex flex-col gap-4 bg-[var(--background)]/10 border border-[var(--border)] p-6 rounded-xl shadow-[0_0_15px_var(--primary-glow)]">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Non-reactive server-loaded data
        </h2>
        <code className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)] overflow-x-auto text-[var(--muted-foreground)]">
          <pre className="text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </code>
      </div>
    </main>
  );
}
