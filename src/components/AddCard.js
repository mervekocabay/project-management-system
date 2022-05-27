import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import shortid from 'shortid';
import { Plus, X } from 'react-feather'


const AddCard = ({ setCardData, cardData, listId }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [cardGenerator, setCardGenerator] = useState(false)

    const onSubmit = (data) => {
        setCardData([...cardData, { listId: listId, cardId: shortid.generate(), description: data.description }])
        reset({ description: "" })
    }


    return (
        !cardGenerator ?
            <div onClick={() => setCardGenerator(!cardGenerator)} className="bg-gray-200 hover:bg-gray-300 rounded-lg shadow-xl h-12 flex justify-center items-center cursor-pointer font-semibold text-xs">
                <Plus size={15} /> Yeni Kart Ekle
            </div>
            :
            <div className=" h-28 cursor-pointer font-semibold text-xs">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea {...register("description", { required: true })} className="px-3 py-3 rounded-md placeholder-slate-300 h-12 text-slate-600 relative bg-white text-sm border-0 shadow outline-none m-auto focus:outline-none focus:ring w-full" />
                    <div className='flex  mt-2 items-center'>
                        <button className='bg-green-600 w-20 h-8 text-white font-medium text-base rounded-sm'>
                            Kaydet
                        </button>
                        <X onClick={() => setCardGenerator(!cardGenerator)} className='ml-2 text-gray-400' />
                    </div>
                </form>
            </div>


    )
}

export default AddCard