/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

interface AppointmentContextProps {
	patientId: string;
	seconds: number;
	isRunning: boolean;
	startTimer: () => void;
	stopTimer: () => void;
	resetTimer: () => void;
	startAppointment(patientId: string): void;
	discardAppointment: () => void;
}


export const AppointmentContext = createContext<AppointmentContextProps>({
	patientId: '',
	seconds: 0,
	isRunning: false,
	startTimer: () => { },
	stopTimer: () => { },
	resetTimer: () => { },
	startAppointment: () => { },
	discardAppointment: () => {}
});


export function useAppointmentContext() {
	const context = useContext(AppointmentContext);

	if (context === undefined) {
		throw new Error('useTimer must be used within a AppointmentContextProvider');
	}

	return context;
}
