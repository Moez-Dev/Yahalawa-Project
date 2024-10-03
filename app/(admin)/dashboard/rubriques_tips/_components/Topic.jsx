'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import DeleteTopic from "./DeleteTopic"
import EditTopic from "./EditTopic"
import { Suspense, useId, useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable';
import { SortableRecipes } from "./SortableRecipes";
import { editTipSection } from "@/app/actions/topic-action"
import { Skeleton } from "@/components/ui/skeleton"
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


export const Topic = ({el, id, title, section, tips }) => {
  

    //handle drag and drop
    const ids = useId()
    const [recipeList, setRecipeList] = useState(section)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setRecipeList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newOrder = arrayMove(items, oldIndex, newIndex);

                //server action
                editTipSection(newOrder);

                return newOrder;
            });
        }
    };


    //for topic
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({ id });
    
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };


    return (
        <section dir="rtl" className="w-[500px] shadow-md rounded-md border border-gray text-lg p-4 my-8" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h1><strong>عنوان المحور :</strong> {title}</h1>
            <Accordion type="single" collapsible className="mt-3">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-blue">الوصفات</AccordionTrigger>
                    <AccordionContent>

                        <DndContext
                            id={ids}
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={recipeList.map((el) => el.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <ol className="list-decimal marker:text-blue list-inside">
                                    {
                                        Array.isArray(recipeList) && recipeList.map((el) => {
                                            return (
                                                <Suspense key={el.id} fallback={<Skeleton className="w-[500px] h-10" />}>
                                                    <SortableRecipes  id={el.id} idi={el.idi} />
                                                </Suspense>
                                            )
                                        })
                                    }
                                </ol>

                            </SortableContext>
                        </DndContext>

                        <div className="mt-8">
                            <DeleteTopic title={title} id={id} />
                            <EditTopic title={title} section={section} id={id} tips={tips} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section >
    )
}
