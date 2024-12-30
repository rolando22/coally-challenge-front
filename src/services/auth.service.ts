import { config } from '@/config';
import { formaterUser } from '@/adapters';

import type { UserLogin, UserState } from '@/types';
import type Login from '@/mocks/authLogin.json';

const { apiUrl } = config;

const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
	login: async (loginData: UserLogin): Promise<UserState> => {
		await delay(3000);
		const response = await fetch(`${apiUrl}/api/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(loginData),
		});

		const { data, error }: { data: typeof Login, error: string } = await response.json();
		
		if (response.status === 401) throw new Error(error);
		if (!response.ok) throw new Error('Server error');

		const user = formaterUser(data);

		return user;
	},
};