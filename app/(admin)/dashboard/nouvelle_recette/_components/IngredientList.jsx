import { Pencil } from "lucide-react"
import DeleteItem from "./DeleteItem"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const IngredientList = ({ el, handleEdit, deleteIngredient }) => {

  const { id, quantite, unite, name } = el

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (

    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      key={id} className="flex items-center space-x-3 mb-2 mt-3 bg-gray rounded-md py-1 px-2 w-fit"
    >

      <div className="flex items-center space-x-3">
        <Pencil className="size-4 hover:text-blue duration-300 cursor-pointer" onClick={handleEdit} />
        <DeleteItem deleteItem={() => deleteIngredient(id)} />
      </div>

      <p dir="rtl" className="border-l border-black pl-6">{quantite} {unite} {name}</p>

    </div>
  )
}

export default IngredientList