import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Card from './Card'
import { Plus, X } from 'react-feather'
import { useForm } from "react-hook-form";
import shortid from 'shortid';

const List = () => {
    const array = [
        { title: 'Başlık 1' },
        { title: 'Başlık 2' },
        { title: 'Başlık 3' },
        { title: 'Başlık 4' },
    ]

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [listGenerator, setListGenerator] = useState(false)
    const [listData, setlistData] = useState([])

    const onSubmit = (data) => {
        setlistData([...listData, { listId: shortid.generate(), title: data.title }])
        reset({ title: "" })
    }


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
                                {
                                    !listGenerator ?
                                        <div onClick={() => setListGenerator(!listGenerator)} className="bg-gray-100 hover:bg-gray-200 rounded-lg shadow-xl mt-3 h-12 flex justify-center items-center cursor-pointer font-semibold text-xs">
                                            <Plus size={15} /> Yeni Liste Ekle
                                        </div>

                                        :
                                        <div className="bg-gray-200 p-5 rounded-lg shadow-xl mt-3 h-28 cursor-pointer font-semibold text-xs">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <input type="text" {...register("title", { required: true })} className="px-3 py-3 placeholder-slate-300 h-10 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none m-auto focus:outline-none focus:ring w-full" />
                                                <div className='flex  mt-2 items-center'>
                                                    <button className='bg-green-600 w-20 h-8 text-white font-medium text-base rounded-sm'>
                                                        Kaydet
                                                    </button>
                                                    <X onClick={() => setListGenerator(!listGenerator)} className='ml-2 text-gray-400' />
                                                </div>
                                            </form>

                                        </div>


                                }

                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}

export default List