import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <li className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">Home</h2>
                <p className="text-gray-700 mb-1"><Link href='/'>Home</Link></p>
              </li>
              <li className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">Users</h2>
                <p className="text-gray-700 mb-1"><Link href='/users'>Users</Link></p>
              </li>
            </ul>
      </main>
        
    </div>
  );
}
