import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import shortid from 'shortid';
import { Plus, X } from 'react-feather'


const AddList = ({setlistData, listData}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [listGenerator, setListGenerator] = useState(false)

    const onSubmit = (data) => {
        setlistData([...listData, { listId: shortid.generate(), title: data.title }])
        reset({ title: "" })
    }

    return (
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
    )
}

export default AddList