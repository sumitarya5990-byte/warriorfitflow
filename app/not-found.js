export default function NotFound() {
  return (
    <main className="section-wrapper flex min-h-screen flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-red-300">404</p>
      <h1 className="mt-2 text-4xl font-black">Page Not Found</h1>
      <p className="mt-3 max-w-md text-zinc-300">
        The page you requested does not exist. Use the button below to return to WarriorFitFlow home.
      </p>
      <a
        href="/"
        className="mt-6 rounded-xl bg-ember px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-700"
      >
        Back to Home
      </a>
    </main>
  );
}
