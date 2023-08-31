import { Logo } from "@/assets/logo";
import { Button } from "../ui/button";
import { signIn } from 'next-auth/react';
import { useToast } from "../ui/use-toast";

export function AuthForm() {
	const { toast } = useToast();

	const handleSignIn = async () => {
		try {
			const res = await signIn('google', { callbackUrl: `${window.location.pathname}/dashboard` });
			console.log(res);
		} catch (error) {
			console.log(error);
			toast({
				title: 'Error',
				description: 'An error occurred while signing in.',
				duration: 5000,
			});
		}
	}

	return (
		<div className="w-full max-w-xl shadow-3xl border border-slate-400 rounded-lg p-8 mx-auto">
			<Logo className="mx-auto w-40" />

			<p className="text-center my-8">
				By continuing you are setting up a MindCare account and agree to our User Agreement and Privacy Policy.
			</p>

			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={handleSignIn}
				className="p-6 border border-slate-400 mx-auto w-full"
				variant="secondary"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
				</svg>
				<span className="text-black ml-4">Sign in with Google</span>
			</Button>

		</div>
	)
}
