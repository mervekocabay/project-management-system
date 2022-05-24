import React from 'react'
import Card from './Card'

const List = () => {
    const array = ["a", "a", "a", "a"]

    return (
        <div className='min-h-screen flex'>
            <div className='flex-1 max-w-4x1 max-auto p-5'>
                <ul className='grid grid-cols-5 gap-2'>
                    {
                        array?.map((item, index) => (
                            <li key={index} className='bg-gray-200 rounded-lg shadow-xl mt-3'>
                                <div className='p-3'>
                                    <h1 className='capitalize font-bold'>
                                        Title
                                    </h1 >
                                    <Card />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default List