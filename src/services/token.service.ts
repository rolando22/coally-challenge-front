let token = '';

export const tokenService = {
	set: (newToken: string) => {
		token = `Bearer ${newToken}`;
	},
	get: () => token,
};
