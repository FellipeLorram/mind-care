import { type Session } from "next-auth";
import { type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Montserrat } from 'next/font/google'

import { api } from "@/lib/api";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { RunningAppointment } from "@/components/layout/running-appointment";

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
        <Providers>
          <main className={`${montserrat.variable} font-sans bg-background pb-20`}>
            <Toaster />
            <Component {...pageProps} />
          </main>
          <RunningAppointment />
        </Providers>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
