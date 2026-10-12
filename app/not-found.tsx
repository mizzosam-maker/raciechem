import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-5xl font-bold text-brand">404</h1>
      <h2 className="mt-3 text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-slate-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="inline-block mt-6 rounded-xl bg-brand text-white font-semibold px-5 py-3">
        Back to Home
      </Link>
    </div>
  );
}