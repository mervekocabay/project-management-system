import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Edit } from 'react-feather';

const Card = ({ cardData, listId,listData }) => {


    const [listCard, setListCard] = useState([])
    const [hover, setHover] = useState({ status: false, cardId: null })

    useEffect(() => {
        const cardList = cardData?.filter((item) => item.listId == listId)
        setListCard(cardList)
    }, [cardData,listData])


    const handleDragEnd = (result) => {
        if (!result.destination) return
        const items = [...listCard]
        const [removedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, removedItem)
        setListCard(items)
    }


    return (
        <DragDropContext onDragEnd={handleDragEnd} >
            <Droppable droppableId='myCustomCard'>
                {(provider) => (
                    <ul {...provider.droppableProps} ref={provider.innerRef} className='grid grid-cols-1 pt-3'>
                        {
                            listCard?.map((item, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {
                                        (provider) => (
                                            <li ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps}
                                                onMouseEnter={() => setHover({ status: true, cardId: item.cardId })}
                                                onMouseLeave={() => setHover({ status: false, cardId: item.cardId })}
                                                className='bg-white hover:bg-gray-100 rounded-lg shadow-xl p-3 mb-2'>
                                                <div className='flex relative'>
                                                    <h2 >
                                                        {item.description}
                                                    </h2>
                                                    {(hover.status && hover.cardId === item.cardId) &&
                                                        <Edit onClick={() => (console.log(item.cardId))} className='float-right right-0 absolute' />
                                                    }
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
