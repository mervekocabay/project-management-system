import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Card from './Card'

const List = () => {
    const array = [
        { title: 'Başlık 1' },
        { title: 'Başlık 2' },
        { title: 'Başlık 3' },
        { title: 'Başlık 4' },
    ]
    const [character, setCharacter] = useState(array)

    const handleDragEnd = (result) => {
        if (!result.destination) return
        const items = [...character]
        const [removedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, removedItem)
        setCharacter(items)
    }

    return (
        <div className='min-h-screen flex'>
            <div className='flex-1 max-w-4x1 max-auto p-5'>
                <DragDropContext onDragEnd={handleDragEnd} >
                    <Droppable direction='horizontal' droppableId='myCustomList'>
                        {(provider) => (
                            <ul {...provider.droppableProps} ref={provider.innerRef} className='grid grid-cols-5 gap-2'>
                                {character?.map((item, index) => (
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {
                                            (provider) => (
                                                <li ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps} className='bg-gray-200 rounded-lg shadow-xl mt-3'>
                                                    <div className='p-3'>
                                                        <h1 className='capitalize font-bold'>
                                                            {item.title}
                                                        </h1 >
                                                        <Card />
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </Draggable>
                                ))}
                                {provider.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

export default List