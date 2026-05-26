import Link from "next/link";
import { Home, Download } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-lg">
        <p className="font-display font-bold text-8xl text-gradient mb-6">404</p>
        <h1 className="font-display font-bold text-3xl text-white mb-4">Page Not Found</h1>
        <p className="text-[#9090a8] text-lg mb-10">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white font-semibold text-sm"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/#downloader"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm"
          >
            <Download className="w-4 h-4" />
            Start Downloading
          </Link>
        </div>
      </div>
    </div>
  );
}
