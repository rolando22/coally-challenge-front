import { config } from '@/config';
import { tokenService } from '@/services';
import { formaterTask, formaterTasks } from '@/adapters';

import type { Task, TaskFilters, TaskWithId } from '@/types';
import type TasksResponse from '@/mocks/getTasks.json';
import type TaskChangeResponse from '@/mocks/changeTasks.json';

const { apiUrl } = config;

const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
	getByUser: async (filter?: TaskFilters) => {
		await delay(1000);
		const url = !filter ? `${apiUrl}/api/tasks` : `${apiUrl}/api/tasks?completed=${filter?.completed}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: { 
				'Authorization': tokenService.get(), 
			},
		});

		if (!response.ok) throw new Error('Server error');

		const { data }: { data: typeof TasksResponse } = await response.json();
		const tasks = formaterTasks(data);

		return tasks;
	},
	create: async (newTask: Task) => {
		await delay(1000);
		const response = await fetch(`${apiUrl}/api/tasks`, {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': tokenService.get(), 
			},
			body: JSON.stringify(newTask),
		});

		if (!response.ok) throw new Error('Server error');

		const data: typeof TaskChangeResponse = await response.json();
		const task = formaterTask(data);

		return task;
	},
	update: async (taskId: TaskWithId['id'], newTask: Task) => {
		await delay(1000);
		const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
			method: 'PUT',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': tokenService.get(), 
			},
			body: JSON.stringify(newTask),
		});

		if (!response.ok) throw new Error('Server error');

		const data: typeof TaskChangeResponse = await response.json();
		const task = formaterTask(data);

		return task;
	},
	delete: async (id: TaskWithId['id']) => {
		await delay(1000);
		const response = await fetch(`${apiUrl}/api/tasks/${id}`, {
			method: 'DELETE',
			headers: { 'Authorization': tokenService.get() },
		});
		
		if (!response.ok) throw new Error('Server error');

		const data: typeof TaskChangeResponse = await response.json();
		const task = formaterTask(data);

		return task;
	},
};
