"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4">
      <div className="max-w-2xl w-full flex flex-col items-center gap-8 py-16">
        <Image
          src="/globe.svg"
          alt="CoreDS Logo"
          width={96}
          height={96}
          className="mb-4 animate-spin-slow"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Welcome to CoreDS</h1>
        <p className="text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 mb-6">
          Your AI-powered, interactive assistant for mastering data science fundamentals. Ask questions, get explanations, and learn by doing—all in one place.
        </p>
        <Link href="/chat">
          <button className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold shadow transition-all duration-200">
            Start Learning
          </button>
        </Link>
        <div className="mt-8 flex flex-wrap gap-6 justify-center">
          <FeatureCard
            icon="/file.svg"
            title="Code Generation"
            description="Get instant code snippets for Python, R, and more."
          />
          <FeatureCard
            icon="/window.svg"
            title="Step-by-Step Guidance"
            description="Learn data science concepts interactively and at your own pace."
          />
          <FeatureCard
            icon="/next.svg"
            title="Conversational Learning"
            description="Ask anything and get clear, tailored explanations."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center bg-white/80 dark:bg-black/40 rounded-xl p-6 shadow-md w-64 min-h-[180px]">
      <Image src={icon} alt={title} width={40} height={40} className="mb-3" />
      <h3 className="text-xl font-semibold mb-1 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center text-sm">{description}</p>
    </div>
  );
}
