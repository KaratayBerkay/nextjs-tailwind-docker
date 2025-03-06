import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* 
          Next.js Logo
          - This logo is a SVG image
        */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {/* 
          Login Button
          - This button is a link to the login page.
        */}
        <div className="flex gap-4 items-center flex-col sm:flex-row hover:h-24 hover:text-9xl text-accent-500 dark:text-accent-400">
          <Link
            className="rounded-full border w-full border-solid bg-slate-900 text-white border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-900 hover:border-transparent text-2xl h-16 sm:h-16 px-4 sm:px-5 sm:min-w-90"
            rel="noopener noreferrer"
            href="/login"
          >
            Login
          </Link>
        </div>
      </main>
      {/* 
        Footer
        - This footer contains the login form information.
      */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div className="container flex flex-col items-center justify-center">
          <p className="text-4xl my-5">Login Form</p>
          <p>Login via given email and password</p>
        </div>
      </footer>
    </div>
  );
}
