import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Edit, Trash } from 'react-feather'
import AddCard from './AddCard'
import AddList from './AddList'
import Card from './Card'

const List = () => {
    const [listData, setlistData] = useState([])
    const [cardData, setCardData] = useState([])
    const [hover, setHover] = useState({ status: false, listId: null })
    const [edit, setEdit] = useState({ status: false, listId: null })


    const handleDragEnd = (result) => {
        if (!result.destination) return
        const items = [...listData]
        const [removedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, removedItem)
        setlistData(items)
    }

    const removeItem = (item) => {
        //Liste Silindiyse o listeye bağlı olan kartlarında silinmesi gerekir.
        setlistData((prevState) =>
            prevState.filter((prevItem) => prevItem.listId !== item)
        );
        setCardData((prevState) =>
            prevState.filter((prevItem) => prevItem.listId !== item)
        )
    };

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
                                                    {
                                                        edit.status && edit.listId === item.listId ?
                                                            <h1>
                                                                Boşver
                                                            </h1>
                                                            :
                                                            <>
                                                                <div
                                                                    onMouseEnter={() => setHover({ status: true, listId: item.listId })}
                                                                    onMouseLeave={() => setHover({ status: false, listId: item.listId })}
                                                                    className='flex relative p-3'>
                                                                    <h1 className='capitalize font-bold'>
                                                                        {item.title}
                                                                    </h1 >
                                                                    {(hover.status && hover.listId === item.listId) &&
                                                                        <>
                                                                            <Edit size={20} onClick={() => setEdit({ status: true, listId: item.listId })} className='float-right right-4 hover:bg-gray-300 absolute text-blue-400' />
                                                                            <Trash size={20} onClick={() => removeItem(item.listId)} className='float-right right-10 absolute hover:bg-gray-300 text-red-400' />
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div className='p-3'>
                                                                    <Card listData={listData} cardData={cardData} setCardData={setCardData} listId={item.listId} />
                                                                    <AddCard setCardData={setCardData} cardData={cardData} listId={item.listId} />
                                                                </div>
                                                            </>
                                                    }

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