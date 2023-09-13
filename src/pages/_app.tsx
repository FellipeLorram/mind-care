import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/lib/api";
import { Montserrat } from 'next/font/google'
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className={`${montserrat.variable} font-sans bg-background`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
