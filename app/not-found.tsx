import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-6 rounded-full bg-sky-50 p-4">
                <svg
                    className="h-12 w-12 text-sky-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <h1 className="mb-2 text-4xl font-bold text-slate-900">404</h1>
            <h2 className="mb-4 text-xl font-semibold text-slate-700">Page Not Found</h2>
            <p className="mb-8 max-w-md text-slate-600">
                The destination you're looking for doesn't exist or has been moved. Let's find you a better trip!
            </p>
            <Link
                href="/"
                className="rounded-full bg-sky-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-sky-700 transition transform hover:scale-105"
            >
                Explore Packages
            </Link>
        </div>
    );
}
