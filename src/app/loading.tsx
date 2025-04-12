export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-950 via-purple-950 to-blue-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-purple-300/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-purple-300 text-lg font-medium">Loading...</div>
      </div>
    </div>
  );
}
