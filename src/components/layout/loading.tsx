import { CircleDashed } from 'lucide-react'

interface LoadingProps {
	loading: boolean
	children: React.ReactNode
}

export function Loading({ loading, children }: LoadingProps) {
	return loading ? (
		<CircleDashed className="animate-spin h-5 w-5" />
	) : children

}
