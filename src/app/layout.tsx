import { Inter } from "next/font/google";
import "./style.linaria.global";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bing your stock",
  description: "Too many people uses Google, help the little folks out ;)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="banner" />
        <>{children}</>
      </body>
    </html>
  );
}
