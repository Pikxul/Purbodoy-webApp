export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />

        {/* Text */}
        <p className="text-sm font-medium text-slate-600">
          Preparing your journey…
        </p>
      </div>
    </div>
  );
}
