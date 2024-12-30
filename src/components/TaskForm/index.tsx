import { useState } from 'react';

import { useTasks } from '@/hooks';

import type { TaskWithId, ToggleModal } from '@/types';

interface Props {
	type?: 'new' | 'edit' | '' 
	taskId?: TaskWithId['id']
	toggle: (newState: ToggleModal) => void
}

export function TaskForm({ taskId = '', type, toggle }: Props) {
	const [isTitleTaskInvalid, setIsTitleTaskInvalid] = useState(false);
	const { getTask, addTask, editTask } = useTasks();
	const [task, setTask] = useState<TaskWithId>(() => (getTask(taskId) || { id: taskId, title: '', description: '', completed: false, userId: '' }));

	const handlerOnSubmitAddTask = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (task.title === '') return setIsTitleTaskInvalid(true);
		taskId === '' ? addTask(task.title, task.description) : editTask(task);
		toggle({ taskId: '', open: false });
	};

	const handlerOnClickToggleModal = () => toggle({ taskId: '', open: false });
	const handlerOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTask((prevState => ({ ...prevState, title: event.target.value })));
	};
	const handlerOnChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTask((prevState => ({ ...prevState, description: event.target.value })));
	};

	return (
		<div className='flex flex-col justify-center items-center bg-[#171b26] rounded-3xl px-8 py-10 gap-8'>
			<h2 
				className='text-center font-bold text-xl text-[#fff]'
			>
				{type === 'new' ? 'Add new Task' : 'Edit Task'}
			</h2>
			<form 
				className='w-[90%] max-w-xs bg-[#171b26] rounded-3xl grid justify-center content-center gap-4'
				onSubmit={handlerOnSubmitAddTask}
			>
				<input
					className='bg-[#293143] border-[2px] border-[#202329] rounded-xl text-[#fff] text-xl text-center p-3 w-full placeholder:text-[#4f6b7f] placeholder:font-normal focus:outline-[#61dafa]'
					type='text'
					name='taskTitle' 
					id='taskTitle' 
					placeholder='Write Task title here'
					value={task.title}
					onChange={handlerOnChangeTitle}
				/>
				<p className={`${isTitleTaskInvalid ? 'text-[#e2685c]' : 'hidden'}`}>
					Task can't be empty title
				</p>
				<textarea 
					className='bg-[#293143] border-[2px] border-[#202329] rounded-xl text-[#fff] text-xl text-center p-3 h-32 w-full placeholder:text-[#4f6b7f] placeholder:font-normal focus:outline-[#61dafa]'
					name='taskDescription' 
					id='taskDescription' 
					placeholder='Write Task description here'
					value={task.description}
					onChange={handlerOnChangeDescription}
				/>
				<div className='flex justify-between items-center w-full gap-4'>
					<button
						type='button'
						className='cursor-pointer inline-block text-xl font-normal w-32 h-10 rounded-lg border-none bg-[#293143]'
						onClick={handlerOnClickToggleModal}
					>
						Cancel
					</button>
					<button
						type='submit'
						className='cursor-pointer inline-block text-xl font-normal w-32 h-10 rounded-lg border-none bg-[#47c2be]'
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}
