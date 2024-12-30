import type LoginResponse from '@/mocks/authLogin.json';
import type TasksResponse from '@/mocks/getTasks.json';
import type TaskChangeResponse from '@/mocks/changeTasks.json';
import type { TasksState, TaskWithId, UserState } from '@/types';

export function formaterUser(data: typeof LoginResponse): UserState {
	const { user, token } = data;
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		image: user.image,
		token,
	};
}

export function formaterTasks(data: typeof TasksResponse): TasksState {
	return data.map(task => ({
		id: task.id,
		title: task.title,
		description: task.description,
		completed: task.completed,
	}));
}

export function formaterTask({ data }: typeof TaskChangeResponse): TaskWithId {
	return {
		id: data.id,
		title: data.title,
		description: data.description,
		completed: data.completed,
	};
}
