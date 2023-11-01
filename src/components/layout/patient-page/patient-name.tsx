import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { type ReactNode } from "react"

interface Props {
	children: ReactNode;
}

export function PatientName({ children }: Props) {
	const { back } = useRouter();
	
	return (
		<div className="flex flex-row justify-center items-center gap-1 group p-2 hover:border-border border border-transparent rounded-md cursor-pointer">
			<button onClick={back}>
				<ArrowLeft className="w-0 group-hover:w-8 duration-150 ease-in-out transition-all" />
			</button>
			<h1 className='text-2xl font-medium'>
				{children}
			</h1>
		</div>
	)
}
