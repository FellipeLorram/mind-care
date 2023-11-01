import { type ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AppointmentContextProvider } from "./appointment-context-provider";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			<AppointmentContextProvider>
				{children}
			</AppointmentContextProvider>
		</ThemeProvider>
	)
}
