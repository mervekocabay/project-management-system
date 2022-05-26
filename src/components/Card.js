import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Card = () => {
    const list = [
        { title: 'card title 1', description: 'Aliquip consequat culpa Lorem excepteur voluptate aliquip.' },
        { title: 'card title 2', description: 'Aliquip consequat culpa Lorem excepteur voluptate aliquip.' },
        { title: 'card title 3', description: 'Aliquip consequat culpa Lorem excepteur voluptate aliquip.' },
        { title: 'card title 4', description: 'Aliquip consequat culpa Lorem excepteur voluptate aliquip.' },
    ]
    const [character, setCharacter] = useState(list)


    const handleDragEnd = (result) => {
        if (!result.destination) return
        const items = [...character]
        const [removedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, removedItem)
        setCharacter(items)
    }


    return (
        <DragDropContext onDragEnd={handleDragEnd} >
            <Droppable droppableId='myCustomCard'>
                {(provider) => (
                    <ul {...provider.droppableProps} ref={provider.innerRef} className='grid grid-cols-1 pt-3'>
                        {
                            character?.map((item, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {

                                        (provider) => (
                                            <li ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps} className='bg-white rounded-lg shadow-xl p-3 mb-2'>
                                                <div>
                                                    <h1 className='capitalize font-bold'>
                                                        {item.title}
                                                    </h1 >
                                                    <h2 >
                                                        {item.description}
                                                    </h2>
                                                </div>
                                            </li>
                                        )
                                    }

                                </Draggable>
                            ))
                        }
                        {provider.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Card
