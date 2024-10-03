'use client'

import { useRef, useState, useId } from "react"
import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
const IngredientList = dynamic(() => import("./IngredientList"), { ssr: false })
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable'
import { toast } from "sonner"


const Ingredientform = ({ unitList, ingredientsList, ingredientList, setIngredient, status }) => {


    const [ingredientName, setIngredientName] = useState()
    const handleIngredientName = (option) => {
        setIngredientName(option);
    };

    const [unite, setUnite] = useState()
    const handleUnite = (option) => {
        setUnite(option);
    };

    const [qte, setQte] = useState()
    const qteRef = useRef()


    //create ingredient--------------------------------------//
    const [editingIndex, setEditingIndex] = useState(null)

    const handleIngredient = (e) => {
        e.preventDefault();

        if(!qte || !unite?.value ||  !ingredientName?.value){
            toast.error('Element manquant !!')
            return;
        }

        const newIngredient = {
            id: Date.now(),
            quantite: qte,
            unite: unite.value,
            name: ingredientName.value
        };

        if (editingIndex !== null) {
            const updatedList = [...ingredientList];
            updatedList[editingIndex] = newIngredient;
            setIngredient(updatedList)
            setEditingIndex(null)
        } else {
            setIngredient([...ingredientList, newIngredient]);
        }
        setIngredientName('');
        setQte('');
        qteRef.current.value = '';
        setUnite(null);
    };

    //Edit ingredient-----------------------------------------//
    const handleEdit = (index) => {
        const ingredient = ingredientList[index];
        setQte(ingredient.quantite);
        setUnite({ value: ingredient.unite, label: ingredient.unite });
        setIngredientName({ value: ingredient.name, label: ingredient.name });
        setEditingIndex(index);
    };

    //delete ingredient--------------------------------------//
    const deleteIngredient = (id) => {
        const newList = ingredientList.filter(el => el.id !== id)
        setIngredient(newList)
    };


    //handle drag and drop---------------------------------------//
    const ids = useId()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );


    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setIngredient((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newOrder = arrayMove(items, oldIndex, newIndex);

                return newOrder;
            });
        }
    };


    return (
        <section className="w-72 md:w-96">
            <p className="font-semibold mb-3">Ingrédients : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>

            <p className="text-sm mb-1 text-[#94a3b8]">Titre :</p>
            <input
                type="text"
                className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                name="ingredient_title"
            />

            <div className="md:flex items-center justify-between flex-wrap">

                <div className="my-6">
                    <p className="text-sm mb-1 text-[#94a3b8]">Quantité :</p>
                    <input
                        type="number"
                        value={qte}
                        className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        onChange={(e) => setQte(e.target.value)}
                        ref={qteRef}
                    />
                </div>

                <div className="my-6">
                    <p className="text-sm mb-1 text-[#94a3b8]">Unité :</p>
                    <Select
                        options={unitList.map((el, i) => ({
                            value: el.title,
                            label: el.title,
                            id: i
                        }))}
                        onChange={handleUnite}
                        value={unite}
                        placeholder=""
                        className="w-[180px]"
                        classNamePrefix="my-react-select"
                        isClearable={true}
                        components={{ IndicatorSeparator: () => null }}
                    />
                </div>

                <div>
                    <p className="text-sm mb-1 text-[#94a3b8]">Ingredient :</p>
                    <Select
                        options={ingredientsList.map((el, i) => ({
                            value: el.title,
                            label: el.title,
                            id: i
                        }))}
                        onChange={handleIngredientName}
                        value={ingredientName}
                        placeholder=""
                        className="w-72 md:w-96"
                        classNamePrefix="my-react-select"
                        isClearable={true}
                        components={{ IndicatorSeparator: () => null }}
                    />
                </div>

            </div>

            <button onClick={handleIngredient} className="blue-btn text-sm my-4">
                Créer ingrédient
            </button>

            <DndContext
                id={ids}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={ingredientList.map((el) => el.id)}
                    strategy={verticalListSortingStrategy}
                >

                    {ingredientList.length > 0 &&
                        ingredientList.map((el, index) => (
                            <IngredientList
                                key={el.id}
                                el={el}
                                handleEdit={() => handleEdit(index)}
                                deleteIngredient={deleteIngredient}
                                ingredientList={ingredientList}
                            />
                        ))}

                </SortableContext>
            </DndContext>
        </section>
    )
}

export default Ingredientform