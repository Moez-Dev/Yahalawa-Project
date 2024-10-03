'use client'

import { Topic } from "./Topic"
import { Suspense, useId, useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable';
import { editTopicTipOrder } from "@/app/actions/topic-action";
import { Skeleton } from "@/components/ui/skeleton";


const SortabelTopic = ({ el, tips }) => {

    //handle drag and drop
    const ids = useId()
    const [list, setList] = useState(el)

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
            setList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newOrder = arrayMove(items, oldIndex, newIndex);

                //server action
                editTopicTipOrder(newOrder);

                return newOrder;
            });
        }
    };



    return (
        <DndContext
        id={ids}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
    >
        <SortableContext
            items={list.map((el) => el.id)}
            strategy={verticalListSortingStrategy}
        >

            {Array.isArray(list) && list.map(({ id, title, section }) => (
                <Topic key={id} id={id} title={title} section={section} el={list} tips={tips} />
            ))}


        </SortableContext>
    </DndContext>
    )
}

export default SortabelTopic