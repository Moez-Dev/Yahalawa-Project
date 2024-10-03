'use client'

import { useState, useRef, useEffect, useId } from "react"
import dynamic from "next/dynamic"
const InstructionList = dynamic(() => import("./InstructionList"), { ssr: false })
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable'
import { toast } from "sonner"
import { deleteStep } from "@/app/actions/recipe-action"

const InstructionForm = ({ recette, newInstructionList, setNewInstructionList }) => {

    const [instructionList, setInstructionList] = useState(recette.steps)

    const [titre, setTitre] = useState('')
    const titreRef = useRef()
    const [instruction, setInstruction] = useState('')
    const instructionRef = useRef()

     //merge two array---------------------------------------//

     useEffect(() => {
        setNewInstructionList(instructionList)
     },[])

    // create instruction------------------------------------//
    const [editingIndex, setEditingIndex] = useState(null)

    const handleInstructions = (e) => {
        e.preventDefault();

        if(!titre || !instruction){
            toast.error('Element manquant !!')
            return;
        }

        const newList = {
            id: Date.now(),
            title: titre,
            description: instruction
        };

        setNewInstructionList(...instructionList, ...newInstructionList)

        if (editingIndex !== null) {
            const updatedList = [...newInstructionList];
            updatedList[editingIndex] = newList;
            setNewInstructionList(updatedList)
            setEditingIndex(null)
        } else {
            setNewInstructionList([...newInstructionList, newList])
        }
        setTitre('')
        titreRef.current.value = ''
        setInstruction('')
        instructionRef.current.value = ''
    };

    //Edit instruction-----------------------------------------//
    const handleEdit = (index) => {
        const item = newInstructionList[index]
        setTitre(item.title)
        setInstruction(item.description)
        setEditingIndex(index)
    };

    // delete instruction----------------------------------------//
    const deleteInstruction = (id) => {
        deleteStep(id)
        const newList = newInstructionList.filter(el => el.id !== id)
        setNewInstructionList(newList)
    }
    console.log(recette.steps)


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
            setNewInstructionList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newOrder = arrayMove(items, oldIndex, newIndex);

                return newOrder;
            });
        }
    };


    return (
        <section>
            <p className="font-semibold mb-3">Instructions : <span className='text-red text-lg'>*</span></p>
            <div className="flex flex-col justify-between ">

                <div>
                    <p className="text-sm mb-1 text-[#94a3b8]">Titre :</p>
                    <input
                        type="text"
                        className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        onChange={(e) => setTitre(e.target.value)}
                        ref={titreRef}
                        value={titre}
                    />
                </div>

                <div className="mt-6">
                    <p className="text-sm mb-1 text-[#94a3b8]">Instruction :</p>
                    <textarea
                        rows="4"
                        className="p-2.5 w-full md:w-[30rem] resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        onChange={(e) => setInstruction(e.target.value)}
                        ref={instructionRef}
                        value={instruction}>
                    </textarea>
                </div>

            </div>

            <button onClick={handleInstructions} className="blue-btn text-sm mt-2">
                Créer instruction
            </button>


            <DndContext
                id={ids}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={newInstructionList.map((el) => el.id)}
                    strategy={verticalListSortingStrategy}
                >

                    {newInstructionList.length > 0 &&
                        newInstructionList.map(({ id, title, description }, index) => (
                            <InstructionList 
                            key={id} id={id} 
                            titre={title} 
                            instruction={description} 
                            deleteInstruction={deleteInstruction} 
                            handleEdit={()=>handleEdit(index)}
                            />
                        ))}

                </SortableContext>
            </DndContext>
        </section>
    )
}

export default InstructionForm