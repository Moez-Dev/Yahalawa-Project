import { Pencil } from "lucide-react"
import DeleteItem from "./DeleteItem"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


const IngredientList = ({ el, handleEdit, deleteIngredient }) => {

  const { id, qte_gramme, unite, ingredient } = el

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (

    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
         key={id} className="flex items-center space-x-3 mb-3 mt-6 bg-gray rounded-md py-1 px-2 w-fit"
    >

      <p dir="rtl" className="border-r border-black pr-2">{qte_gramme} {unite} {ingredient}</p>

      <div className="flex items-center space-x-3">
        <Pencil className="size-5 hover:text-blue duration-300 cursor-pointer" onClick={handleEdit} />
        <DeleteItem deleteItem={() => deleteIngredient(id)} />
      </div>

    </div>
  )
}

export default IngredientList