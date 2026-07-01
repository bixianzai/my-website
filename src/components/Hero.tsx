import { useState, useEffect } from "react";
import HeroParticles from "./HeroParticles";

export default function Hero() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="relative h-svh flex items-center justify-center overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <HeroParticles isDark={isDark} />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          Your Name
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium mb-6">
          Your Profession
        </h2>
        <p className="text-base md:text-lg text-gray-400 dark:text-gray-500 max-w-lg mx-auto">
          A short introduction about yourself — what you do, what you care about.
        </p>
        <a
          href="#projects"
          className="inline-block mt-8 px-6 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-600 rounded-full hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors"
        >
          查看项目
        </a>
      </div>
    </section>
  );
}
