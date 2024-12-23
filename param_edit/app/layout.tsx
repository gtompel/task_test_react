
import type { Metadata } from "next";
import "./globals.css"; // Подключаем глобальные стили

// Используем Google Fonts для подключения Roboto
const roboto = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";

export const metadata: Metadata = {
  title: "Главная |",
  description: "testapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href={roboto} rel="stylesheet" />
      </head>
      <body className="antialiased bg-gray-100 text-gray-800 transition-colors duration-300 ease-in-out min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold">Welcome to My App</h1>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p className="text-sm">&copy; 2024 My App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
