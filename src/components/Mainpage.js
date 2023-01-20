import React, { useState } from 'react'
import '../app.css'

const Mainpage = () => {

    const [customerInfo, setCustomerInfo] = useState([
        { name: 'Ego', id: '1', category: 'unplanned' },
        { name: 'Ugo', id: '2', category: 'unplanned' },
        { name: 'Chinwendu', id: '3', category: 'unplanned' },
        { name: 'Jezi', id: '4', category: 'planned' }
    ])

    //creating an object that contains all categories array
    //to store each customer value when dragged
    const customerCategories = {
        unplanned: [],
        planned: []
    }

    //checking through the customerinfo array for all datas, and grouping each data based on their categories
    customerInfo.forEach((info) => {
        customerCategories[info.category].push(
            { name: info.name, id: info.id }
        )
    })
    //console.log(customerInfo)
    //console.log(customerCategories)


    const onDragStart = (e, id) => {
        //console.log(id)
        //console.log("drag start")
        e.dataTransfer.setData('text/plain', id)
    }

    const onDragOver = (e) => {
        e.preventDefault()
        //console.log("drag over")
    }

    const onDrop = (e, cate) => {
        //console.log("dropped")
        e.preventDefault();

        //console.log(cate)
        let userId = e.dataTransfer.getData('text')

        //console.log(userId)

        let categories = customerInfo.filter((userCategory) => {
            if (userCategory.id === userId) {
                userCategory.category = cate;
            }
            return userCategory;
        })

        //console.log(categories)
        setCustomerInfo(categories)
    }

    return (
        <div className='mainPage'>
            <div className='d-flex justify-content-between mainpagesubdiv py-5 px-4'>
                <div className='unplanned-list-div'>
                    <h4 className='ps-5 mb-3'>Customers list</h4>
                    <table onDrop={(e) => onDrop(e, "unplanned")}>
                        <thead>
                            <tr>
                                <th className='px-4'>Customers Name</th>
                                <th className='px-4'>Customers ID</th>
                                <th className='px-4'>Pick Up location</th>
                                <th className='px-4'>Drop off Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customerCategories.unplanned.map((category) =>
                                    <tr key={category.id} onDragStart={(e) => onDragStart(e, category.id)} onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "unplanned")} draggable='true'>
                                        <td className='px-4'>{category.name}</td>
                                        <td className='px-4'>{category.id}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div>


                    </div>
                </div>


                <div className='planned-list-div'>
                    <h4 className='text-center mb-4'>Delivery planner</h4>
                    <div>

                        {
                            customerCategories.planned.map((category) =>
                                <div className='planned-item py-3 px-2 mb-3' onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "planned")} droppable='true'>
                                    <div className='d-flex justify-content-between mb-3'>
                                        <h6 className='mb-0'>Slot 1</h6>
                                        <p className='mb-0'>12/2/2023</p>
                                    </div>
                                    <div key={category.id}>
                                        <h6>{category.name}</h6>
                                    </div>
                                </div>
                            )
                        }
                        <div className='planned-item py-3 px-2 mb-3'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h6 className='mb-0'>Slot 2</h6>
                                <p className='mb-0'>12/2/2023</p>
                            </div>
                            
                        </div>

                        <div className='planned-item py-3 px-2 mb-3'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h6 className='mb-0'>Slot 3</h6>
                                <p className='mb-0'>12/2/2023</p>
                            </div>
                            
                        </div>

                        <div className='planned-item py-3 px-2 mb-3'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h6 className='mb-0'>Slot 4</h6>
                                <p className='mb-0'>12/2/2023</p>
                            </div>
                            
                        </div>

                        <div className='planned-item py-3 px-2 mb-3'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h6 className='mb-0'>Slot 5</h6>
                                <p className='mb-0'>12/2/2023</p>
                            </div>
                            
                        </div>

                        <div className='planned-item py-3 px-2 mb-3'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h6 className='mb-0'>Slot 6</h6>
                                <p className='mb-0'>12/2/2023</p>
                            </div>
                            
                        </div>

                        <div className='planned-item py-3 px-2 mb-3'>
                            <div className='d-flex justify-content-between mb-3'>
                                <h6 className='mb-0'>Slot 7</h6>
                                <p className='mb-0'>12/2/2023</p>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainpage