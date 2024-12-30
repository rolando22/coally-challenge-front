import { Toaster } from 'sonner';

import { HomePage, LoginPage } from '@/pages';
import { useUserContext } from '@/context';

export function App() {
	const { user } = useUserContext();

	return (
		<div className='mx-auto max-w-5xl grid'>
			{user.token === '' 
				? <LoginPage /> 
				: <HomePage />
			}
			<Toaster richColors />
		</div>
	);
}
