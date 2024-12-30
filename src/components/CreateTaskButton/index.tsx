import type { ToggleModal } from '@/types';

interface Props {
	toggle: (newState: ToggleModal) => void
}

export function CreateTaskButton({ toggle }: Props) {

	const handlerOnClickToggle = () => toggle({ type: 'new', open: true });

	return (
		<button 
			className='bg-[#47c2be] border-none rounded-full cursor-pointer text-5xl font-bold text-[#fafafa] flex justify-center items-center h-16 w-16 pb-2'
			onClick={handlerOnClickToggle}
		>
      +
		</button>
	);
}