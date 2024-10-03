'use client'

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Pencil } from 'lucide-react';
import DeleteItem from './DeleteItem';

const InstructionList = ({ id, titre, instruction, deleteInstruction, handleEdit }) => {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="flex items-start space-x-4 my-3 bg-gray rounded-md py-1 px-2 w-fit">

      <div className="flex items-center space-x-3 pt-0.5">
        <Pencil className="size-4 hover:text-blue duration-300 cursor-pointer" onClick={handleEdit} />
        <DeleteItem deleteItem={() => deleteInstruction(id)} />
      </div>
      <div className=' border-l border-black pl-3'>
        <p dir="rtl" className="font-semibold">{titre}</p>
        <p dir="rtl" >{instruction}</p>
      </div>

    </div>
  )
}

export default InstructionList