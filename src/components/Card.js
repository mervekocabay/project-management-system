import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Card = ({ cardData, setCardData, listId }) => {

    let listCardData = [];

    cardData?.map((item) => (
        item.listId == listId && listCardData.push(item)
    ))
    const handleDragEnd = (result) => {
        if (!result.destination) return
        const items = [...cardData]
        const [removedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, removedItem)
        setCardData(items)
    }
 


    return (
        <DragDropContext onDragEnd={handleDragEnd} >
            <Droppable droppableId='myCustomCard'>
                {(provider) => (
                    <ul {...provider.droppableProps} ref={provider.innerRef} className='grid grid-cols-1 pt-3'>
                        {
                            listCardData?.map((item, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {
                                        (provider) => (
                                            <li ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps} className='bg-white rounded-lg shadow-xl p-3 mb-2'>
                                                <div>
                                                    {/* <h1 className='capitalize font-bold'>
                                                        {item.title}
                                                    </h1 > */}
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
