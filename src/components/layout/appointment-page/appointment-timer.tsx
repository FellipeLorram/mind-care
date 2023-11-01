import { Button } from "@/components/ui/button";
import { useAppointmentContext } from "@/context/appointment-context";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Pause, Play, RotateCcw } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function TimerWrapper({ ...props }: Props) {
	return <div {...props} className={cn("p-2 px-4 border rounded-lg flex flex-row gap-6 w-72 items-center justify-between text-3xl", props.className)} />
}

export function Timer() {
	const {
		seconds,
		resetTimer,
	} = useAppointmentContext();
	const date = new Date(0);
	date.setSeconds(seconds);

	return <div className="group relative">
		<p>
			{format(date, 'mm:ss')}
		</p>
		<div className="absolute left-0 top-0 w-full flex items-center justify-center group-hover:bg-background/75 duration-150 h-full">
			<RotateCcw
				className="w-0 group-hover:w-5 duration-200 cursor-pointer"
				onClick={resetTimer}
			/>
		</div>
	</div>
}


export function TimerActions(props: Props) {
	return <div {...props} className="flex items-center justify-center gap-2" />
}

export function PauseAndPlayButtons() {
	const {
		isRunning,
		startTimer,
		stopTimer,
	} = useAppointmentContext();

	return <>
		{isRunning ?
			<Button
				variant="outline"
				onClick={stopTimer}
				size="sm"
			>
				<Pause
					strokeWidth={1.5}
					className="w-5"
				/>

			</Button>
			:
			<Button
				variant="outline"
				onClick={startTimer}
				size="sm"
			>
				<Play
					strokeWidth={1.5}
					className="w-5"
				/>
			</Button>
		}
	</>
}
