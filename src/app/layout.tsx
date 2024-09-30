// app/layout.tsx
import './globals.css'; // Import global styles if you have any
import { ReactNode } from 'react';
import { ModalMenu } from "@/components/shared/menu/ModalMenu";
import { ConfigMenuModal } from "@/components/shared/menu/ConfigMenuModal";

export const metadata = {
  title: "FarmFinder",
  description: "Find and connect with local farms",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Any additional meta tags can go here */}
      </head>
      <body className="min-h-screen flex flex-col bg-[#beb5a8]">
        <header className="bg-[#f9f7f4] border-b border-gray-300 p-2 flex items-center justify-between">
          <div className="flex items-center flex-grow">
            <ModalMenu />
            <h1 className="text-xl font-bold ml-2 flex-grow text-center font-rockwell">
              FarmFinder<span className="text-sm">.net</span>
            </h1>
          </div>
          <ConfigMenuModal />
        </header>
        <main className="flex-grow bg-[#beb5a8] h-full">
          {children} {/* This will render the content of each page */}
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm">
              &copy; {new Date().getFullYear()} FarmFinder. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
