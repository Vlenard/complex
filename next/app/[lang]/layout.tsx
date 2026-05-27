import { Geist_Mono, Inter } from "next/font/google"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { getLocalization } from "@/lib/i18n";
import { I18nProvider, Language } from "@/components/i18n-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const localization = await getLocalization(lang);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}>
      <body>
        <ThemeProvider>
          <I18nProvider language={lang as Language} localization={localization}>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
