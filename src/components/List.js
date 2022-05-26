import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddCard from './AddCard'
import AddList from './AddList'
import Card from './Card'


const List = () => {



    const [listData, setlistData] = useState([])
    const [cardData, setCardData] = useState([])
    const [generalData, setGeneralData] = useState([])

    // listData?.map((listItem)=>(
    //     cardData?.map((cardItem)=>(
    //         console.log("kajshdkuesf:", listItem.listId == cardItem.listId ? setGeneralData([...generalData,{listItem:listItem}]))
    //     ))

    // ))


    const handleDragEnd = (result) => {
        if (!result.destination) return
        const items = [...listData]
        const [removedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, removedItem)
        setlistData(items)
    }

    return (
        <div className='min-h-screen flex'>
            <div className='flex-1 max-w-4x1 max-auto p-5'>
                <DragDropContext onDragEnd={handleDragEnd} >
                    <Droppable direction='horizontal' droppableId='myCustomList'>
                        {(provider) => (
                            <ul {...provider.droppableProps} ref={provider.innerRef} className='grid grid-cols-6 gap-2'>
                                {listData?.map((item, index) => (
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {
                                            (provider) => (
                                                <li ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps} className='bg-gray-200 h-fit rounded-lg shadow-xl mt-3'>
                                                    <div className='p-3'>
                                                        <h1 className='capitalize font-bold'>
                                                            {item.title}
                                                        </h1 >
                                                        <Card cardData={cardData} setCardData={setCardData} listId={item.listId} />
                                                    </div>
                                                    <AddCard setCardData={setCardData} cardData={cardData} listId={item.listId} />
                                                </li>
                                            )
                                        }
                                    </Draggable>
                                ))}
                                {provider.placeholder}
                                <AddList setlistData={setlistData} listData={listData} />

                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

export default List