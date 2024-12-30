import type { User } from './user';

export interface Task {
    title: string 
    description: string
    completed: boolean 
    creadtedAt?: string
    updatedAt?: string
    userId?: User['id']
}

export interface TaskWithId extends Task {
    id: string
}

export interface TaskFilters {
	completed: '' | 'completed' | 'pending'
}

export type TasksState = TaskWithId[];

export type TasksTypeAction = 
    | { type: 'SET_TASKS', payload: TasksState }
    | { type: 'ADD_TASK', payload: TaskWithId }
    | { type: 'EDIT_TASK', payload: TaskWithId }
    | { type: 'REMOVE_TASK', payload: TaskWithId['id'] }
    | { type: 'RESET_TASKS', payload: null }
