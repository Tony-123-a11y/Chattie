

import { LoaderCircle } from "lucide-react";

export default function LoaderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <LoaderCircle
        className="h-24 w-24 animate-spin text-primary-800"
        strokeWidth={2.5}
      />

      <p className="text-sm font-medium text-gray-500">
        Loading...
      </p>
    </main>
  );
}