import { useState } from 'react';
import { toast } from 'sonner';

import { useTasksContext, useUserContext } from '@/context';
import { useUser } from '@/hooks';
import { taskService } from '@/services';

import type { TaskFilters, TaskWithId } from '@/types';

export function useTasks() {
	const { user } = useUserContext();
	const { logout } = useUser();
	const { tasks, dispatch } = useTasksContext();
	const [isLoading, setIsLoading] = useState(false);

	const getTasks = async (filter?: TaskFilters) => {
		try {
			setIsLoading(true);
			const tasksData = await taskService.getByUser(filter);
			dispatch({ type: 'SET_TASKS', payload: tasksData });
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const addTask = async (title: string, description: string) => {
		try {
			setIsLoading(true);
			const taskData = await taskService.create({ title, description, completed: false, userId: user.id });
			dispatch({ type: 'ADD_TASK', payload: taskData });
			toast.success('Task created');
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
			logout();
		} finally {
			setIsLoading(false);
		}
	};

	const editTask = async (newTask: TaskWithId) => {
		try {
			setIsLoading(true);
			const { title, description, completed } = newTask;
			const taskData = await taskService.update(newTask.id, { title, description, completed, userId: user.id });
			dispatch({ type: 'EDIT_TASK', payload: taskData });
			toast.success('Task updated');
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
			logout();
		} finally {
			setIsLoading(false);
		}
	};

	const removeTask = async (id: TaskWithId['id']) => {
		try {
			setIsLoading(true);
			const task = await taskService.delete(id);
			dispatch({ type: 'REMOVE_TASK', payload: task.id });
			toast.success('Task deleted');
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			console.log(error);
			logout();
		} finally {
			setIsLoading(false);
		}
	};

	const reset = () => dispatch({ type: 'RESET_TASKS', payload: null });

	const getTask = (id: TaskWithId['id']) => structuredClone(tasks).find(task => task.id === id);

	return {
		isLoading, 
		addTask, 
		editTask, 
		removeTask,
		getTasks,
		getTask,
		reset,
	};
}