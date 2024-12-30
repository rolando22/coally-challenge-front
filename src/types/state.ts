import type { TaskWithId } from './';

export interface ToggleModal {
    taskId?: TaskWithId['id']
    type?: 'new' | 'edit' | ''
    open: boolean
}
