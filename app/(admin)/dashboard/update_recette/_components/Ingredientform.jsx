'use client'

import { useRef, useState, useId, useEffect } from "react"
import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
const IngredientList = dynamic(() => import("./IngredientList"), { ssr: false })
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable'
import { toast } from "sonner"
import { deleteIngRecipe } from "@/app/actions/recipe-action"



const Ingredientform = ({ recette, unitList, allIngredients, newIngredientList, setNewIngredientList }) => {


    const [ingredientList, setIngredient] = useState(recette.ingredients)

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

    //merge two array---------------------------------------//
    useEffect(() => {
        setNewIngredientList(ingredientList)
    },[])


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
            qte_gramme: qte,
            unite: unite.value,
            ingredient: ingredientName.value
        };

        setNewIngredientList(...ingredientList, ...newIngredientList)

        if (editingIndex !== null) {
            const updatedList = [...newIngredientList];
            updatedList[editingIndex] = newIngredient;
            setNewIngredientList(updatedList)
            setEditingIndex(null)
        } else {
            setNewIngredientList([...newIngredientList, newIngredient]);
        }
        setIngredientName('');
        setQte('');
        qteRef.current.value = '';
        setUnite(null);
    };

    //Edit ingredient-----------------------------------------//
    const handleEdit = (index) => {
        const item = newIngredientList[index];
        setQte(item.qte_gramme);
        setUnite({ value: item.unite, label: item.unite });
        setIngredientName({ value: item.ingredient, label: item.ingredient });
        setEditingIndex(index);
    };

    //delete ingredient--------------------------------------//
    const deleteIngredient =  (id) => {
        deleteIngRecipe(id)
        const newList = newIngredientList.filter(el => el.id !== id)
        setNewIngredientList(newList)
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
            setNewIngredientList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newOrder = arrayMove(items, oldIndex, newIndex);

                return newOrder;
            });
        }
    };



    return (
        <section className="w-72 md:w-96">
            <p className="font-semibold mb-3">Ingrédients : <span className='text-red text-lg'>*</span></p>

            <p className="text-sm mb-1 text-[#94a3b8]">Titre :</p>
            <input
                type="text"
                className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                name='ingredient_title'
                defaultValue={recette.ingredient_title}
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
                        options={allIngredients.map((el, i) => ({
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

            <button onClick={handleIngredient} className="blue-btn text-sm mt-4">
                Créer ingrédient
            </button>


            <DndContext
                id={ids}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={newIngredientList.map((el) => el.id)}
                    strategy={verticalListSortingStrategy}
                >

                    {newIngredientList.length > 0 &&
                        newIngredientList.map((el, index) => (
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