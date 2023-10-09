import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Montserrat } from 'next/font/google'

import { api } from "@/lib/api";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>
          {`
            :root {
              --font-montserrat: ${montserrat.variable}
            }
          
          `}
      </style>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className={`${montserrat.variable} font-sans bg-background`}>
            <Toaster />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
