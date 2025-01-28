import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Movie Recommendation App</h1>
      <div className="flex gap-4">
        <Link href="/movies">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Browse Movies</button>
        </Link>
        <Link href="/login">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">Login</button>
        </Link>
      </div>
    </main>
  );
}
