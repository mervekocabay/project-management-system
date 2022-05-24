import React from 'react'

const Card = () => {
    const list = [
        { description: 'Aliquip consequat culpa Lorem excepteur voluptate aliquip.' },
        { description: 'Aliquip consequat culpa Lorem excepteur voluptate aliquip.' },
        { description: 'Aliquip consequat culpa Lorem excepteur voluptate aliquip.' },
        { description: 'Aliquip consequat culpa Lorem excepteur voluptate aliquip.' },
    ]
    return (
        list?.map((item, index) => (
            <ul key={index} style={{ cursor: 'all-scroll' }} className='grid grid-cols-1 pt-3'>
                <li className='bg-white rounded-lg shadow-xl p-3'>
                    <div>
                        <h1 className='capitalize font-bold'>
                            title title
                        </h1 >
                        <h2 >
                            {item.description}
                        </h2>
                    </div>
                </li>
            </ul>
        ))
    )
}

export default Card