import { useEffect, useState } from 'react';

import { useUserContext } from '@/context';
import { useTasks } from '@/hooks';
import { tokenService } from '@/services';
import { CreateTaskButton, Modal, TaskCounter, TaskForm, TaskList } from '@/components';

import type { TaskFilters, ToggleModal } from '@/types';
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
	const [toggleModal, setToggleModal] = useState<ToggleModal>({ taskId: '', type: '', open: false });
	const [searchParams, setSearchParams] = useSearchParams();
	const { user } = useUserContext();
	const { getTasks, reset } = useTasks();

	useEffect(() => {
		if (user.token === '') return reset();
		tokenService.set(user.token);
		if (searchParams.get('completed') && searchParams.get('completed') !== '') {
			const filter: TaskFilters = {
				completed: searchParams.get('completed') as TaskFilters['completed'],
			};
			getTasks(filter);
			return;
		}
		getTasks();
	}, [user.token]);

	const toggle = (newState: ToggleModal) => {
		setToggleModal(prevState => ({ ...prevState, ...newState }));
	};

	const handlerOnFilterCompleted = (completed: TaskFilters['completed']) => () => {
		if (completed === '') {
			setSearchParams();
			getTasks();
			return;
		}
		setSearchParams({ completed });
		const filter: TaskFilters = {
			completed,
		};
		getTasks(filter);
	};

	return (
		<>
			<header className='my-0 mx-auto py-12 w-[75%] grid gap-6'>
				<TaskCounter />
				<section className='flex flex-col justify-center items-center gap-5'>
					<CreateTaskButton toggle={toggle} />
					<div className='flex gap-2'>
						<span
							className={`bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 cursor-pointer ${!searchParams.get('completed') ? 'border border-white' : ''}`}
							onClick={handlerOnFilterCompleted('')}
						>
							All
						</span>
						<span
							className={`bg-gray-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-300 cursor-pointer ${searchParams.get('completed') === 'completed' ? 'border border-white' : ''}`}
							onClick={handlerOnFilterCompleted('completed')}
						>
							Completed
						</span>
						<span
							className={`bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 cursor-pointer ${searchParams.get('completed') === 'pending' ? 'border border-white' : ''}`}
							onClick={handlerOnFilterCompleted('pending')}
						>
							Pending
						</span>
					</div>
				</section>
			</header>
			<main className='my-0 mx-auto w-[75%] grid'>
				<TaskList toggle={toggle} />
			</main>
			{toggleModal.open && 
				<Modal>
					<TaskForm 
						type={toggleModal.type}
						taskId={toggleModal.taskId}
						toggle={toggle} 
					/>
				</Modal>
			}
		</>
	);
}
