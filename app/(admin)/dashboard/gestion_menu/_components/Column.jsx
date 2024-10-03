'use client'

import { useId, useState } from 'react'
import { SortableItem } from './SortableItem'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, } from '@dnd-kit/sortable';
import { editItems } from '@/app/actions/menuItems-action';
import NewItem from './NewItem';


const Column = ({ menuList }) => {

    const { id, title, subtitle } = menuList

    //handle drag and drop
    const ids = useId()
    const [list, setList] = useState(subtitle)

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
                editItems(newOrder);

                return newOrder;
            });
        }
    };



    return (
        <section className="w-fit text-center">
            <p className="font-semibold text-lg mb-4">{title}</p>

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

                    {Array.isArray(list) && list.map(({ id, title }) => (
                        <SortableItem key={id} id={id} title={title} />
                    ))}

                    {(Array.isArray(list) && list.length === 0) && (
                        <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
                    )}

                </SortableContext>
            </DndContext>

            <NewItem menuId={id} />
        </section>
    )
}

export default Column
