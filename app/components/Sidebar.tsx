"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaYoutube } from "react-icons/fa";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const XMarkIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Turnitin: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 120 200" className="h-6 w-6" fill="currentColor" {...props}>
    <path d="M8.2 74.4L5.6 90.9h26.3C11.2 109.6 0 138.7 0 157.5c0 13.9 4.4 24.7 13.3 32.1 7.1 6 16.9 9.3 29.1 10.1l1.2.1V194l-.9-.2c-11.1-2.5-29.6-9.9-29.8-32.4-.1-16.8 17.2-48.2 37.2-61.4l-5.3 30.5h16.9l9.5-56-63-.1z" />
    <path d="M24.6 0C15.9 0 8.8 7.1 8.7 15.7l-.6 44.2 9.1.1h9l.5-41.9h74.4l.5 113.5H77.8l-3.1 18.1h29.1c8.7 0 15.9-7.9 16-16.6L119.5 0H24.6z" />
  </svg>
);

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: FaYoutube,
      label: "YT Clipper AI",
      path: "/",
      color: "#ff1a47",
      soon: false,
    },
    {
      icon: Turnitin,
      label: "Turnitin Check",
      path: "./",
      color: "",
      soon: true,
    },
    {
      icon: FaYoutube,
      label: "Social Media",
      path: "./",
      color: "",
      soon: true,
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-zinc-900 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo Section */}
          <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
            <a href="./" className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {/* logo: show light or dark variant based on html.dark class */}
                <div className="h-8 w-8 relative">
                  <Image
                    src="/logo/logo_light.png"
                    alt="BisaMudah"
                    width={32}
                    height={32}
                    priority
                    className="h-8 w-8 object-contain dark:hidden"
                  />
                  <Image
                    src="/logo/logo_dark.png"
                    alt="BisaMudah (dark)"
                    width={32}
                    height={32}
                    priority
                    className="hidden h-8 w-8 object-contain dark:block"
                  />
                </div>
              </div>
              <span className="text-xl font-bold text-zinc-900 dark:text-white">
                BisaMudah
              </span>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              <XMarkIcon />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const iconStyles = { color: item.color, fontSize: "1.5em" };
                const isActive = pathname === item.path;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.soon ? "#" : item.path}
                      className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                        item.soon
                          ? "cursor-not-allowed opacity-60"
                          : isActive
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                          : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                      }`}
                      onClick={(e) => item.soon && e.preventDefault()}
                    >
                      <div className={item.soon ? "opacity-50" : ""}>
                        <Icon style={iconStyles} />
                      </div>
                      <span
                        className={`font-medium ${
                          item.soon ? "text-zinc-500 dark:text-zinc-500" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && !item.soon && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      )}
                      {item.soon && (
                        <span className="ml-auto rounded-full bg-linear-to-r from-blue-500 to-purple-600 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm whitespace-nowrap">
                          Soon
                        </span>
                      )}
                      {item.soon && (
                        <div className="absolute inset-0 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  John Doe
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
