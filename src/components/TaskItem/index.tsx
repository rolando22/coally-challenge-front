import { useTasks } from '@/hooks';
import { CompleteIcon, DeleteIcon, EditIcon, LoadScreen } from '@/components';

import type { TaskWithId, ToggleModal } from '@/types';

interface Props {
	id: TaskWithId['id']
	title: string
	description: string
	completed: boolean
	toggle: (newState: ToggleModal) => void
}

export function TaskItem({ id, title, description, completed, toggle }: Props) {
	const { isLoading, editTask, removeTask } = useTasks();

	const handlerRemoveTask = () => removeTask(id);
	const handlerEditTask = () => editTask({ id, title, description, completed: !completed });
	const handlerToggleEditTask = () => toggle({ taskId: id, type: 'edit', open: true });

	return (
		<>
			{isLoading && <LoadScreen />}
			<li className='rounded-xl bg-[#293143] relative flex flex-col justify-center items-center gap-2 mt-6 py-6'>
				<CompleteIcon 
					completed={completed} 
					onComplete={handlerEditTask} 
				/>
				<p className={`
					mx-10 w-[calc(100%-100px)] text-lg font-bold
					${completed === true ? 'line-through decoration-[#171b26]' : ''}
				`}>
					{title}
				</p>
				<p className={`
					mx-10 w-[calc(100%-100px)] text-lg font-extralight
					${completed === true ? 'line-through decoration-[#171b26]' : ''}
				`}>
					{description}
				</p>
				<EditIcon onEdit={handlerToggleEditTask} /> 
				<DeleteIcon onDelete={handlerRemoveTask} />
			</li>
		</>
	);
}
