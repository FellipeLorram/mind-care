import { AppointmentContext } from "@/context/appointment-context";
import { useEffect, useState } from "react";

interface AppointmentState {
	patientId: string;
	seconds: number;
	running: boolean;
}

export function AppointmentContextProvider({ children }: { children: React.ReactNode }) {
	const [patientId, setPatientId] = useState('');
	const [seconds, setSeconds] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const isLocalStorageAvailable = typeof window !== 'undefined' ?? window.localStorage;

	useEffect(() => {
		if (isLocalStorageAvailable) {
			const timer = localStorage.getItem('timer-state');

			if (timer) {
				const parsedTimer = JSON.parse(timer) as AppointmentState;

				if (!parsedTimer.patientId) {
					setPatientId('');
					setSeconds(0);
					setIsRunning(false);
					return;
				}

				setSeconds(parsedTimer.seconds);
				setIsRunning(parsedTimer.running);
				setPatientId(parsedTimer.patientId);
			}
		}
	}, [isLocalStorageAvailable]);

	useEffect(() => {
		if (isRunning) {
			const interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					localStorage.setItem('timer-state', JSON.stringify({ seconds: prevSeconds + 1, running: isRunning, patientId }));
					return prevSeconds + 1
				});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isRunning, patientId]);

	const startAppointment = (id: string) => {
		localStorage.setItem('timer-state', JSON.stringify({ seconds, running: isRunning, patientId: id }));
		setPatientId(id);
		startTimer();
	}

	const startTimer = () => {
		setIsRunning(true);
		localStorage.setItem('timer-state', JSON.stringify({ seconds, running: true, patientId }));
	}

	const stopTimer = () => {
		setIsRunning(false);
		localStorage.setItem('timer-state', JSON.stringify({ seconds, running: false, patientId }));
	}

	const resetTimer = () => {
		setSeconds(0);
		localStorage.setItem('timer-state', JSON.stringify({ seconds: 0, running: isRunning, patientId }));
	}

	const discardAppointment = () => {
		setSeconds(0);
		setIsRunning(false);
		setPatientId('');
		localStorage.setItem('timer-state', JSON.stringify({ seconds: 0, running: false, patientId: '' }));
	}

	const contextValue = {
		patientId,
		seconds,
		isRunning,
		startTimer,
		stopTimer,
		resetTimer,
		startAppointment,
		discardAppointment,
	};

	return (
		<AppointmentContext.Provider value={contextValue}>
			{/* eslint-disable-next-line react/prop-types */}
			{children}
		</AppointmentContext.Provider>
	)
}
