import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "@/app/globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Noir Table",
  description: "Premium restaurant web app with Supabase auth, dynamic menu, and favorites."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-base-950 text-white`}>
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(9, 9, 11, 0.92)",
              color: "#f7f7f8",
              border: "1px solid rgba(255,255,255,0.08)"
            }
          }}
        />
      </body>
    </html>
  );
}

