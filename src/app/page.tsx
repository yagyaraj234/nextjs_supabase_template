import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex  gap-12 justify-center row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />{" "}
        <Image
          className="dark:invert"
          src="/supabase.svg"
          alt="Supabase logo"
          width={240}
          height={80}
          priority
        />{" "}
      </main>
    </div>
  );
}
