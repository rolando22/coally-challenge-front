import { useTasksContext } from '@/context';
import { useTasks } from '@/hooks';
import { LoadScreen, TaskItem } from '@/components';

import type { ToggleModal } from '@/types';

interface Props {
	toggle: (newState: ToggleModal) => void
}

export function TaskList({ toggle }: Props) {
	const { tasks } = useTasksContext();
	const { isLoading } = useTasks();

	return (
		<>
			{isLoading && tasks.length === 0 
				? <LoadScreen /> 
				: <ul className='m-0 px-0 pt-0 pb-14'>
					{[...tasks].reverse().map(task => 
						<TaskItem 
							key={task.id} 
							id={task.id}
							title={task.title}
							description={task.description}
							completed={task.completed}
							toggle={toggle}
						/>
					)}
				</ul>
			}
		</>
	);
}
