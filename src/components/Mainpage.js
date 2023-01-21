import React, { useState } from 'react'
import '../app.css'

const Mainpage = () => {

    const [customerInfo, setCustomerInfo] = useState([
        { name: 'Ego', id: '1', category: 'unplanned', slotNo: '' },
        { name: 'Ugo', id: '2', category: 'unplanned', slotNo: '' },
        { name: 'Chinwendu', id: '3', category: 'unplanned', slotNo: '' },


        { name: 'Jezi', id: '1.1', category: 'planned', slotNo: '1', slotDate: '12/2/2023' },
        { name: '', id: '1.2', category: 'planned', slotNo: '2', slotDate: '13/2/2023' },
        { name: '', id: '1.3', category: 'planned', slotNo: '3', slotDate: '14/2/2023' },
        { name: '', id: '1.4', category: 'planned', slotNo: '4', slotDate: '15/2/2023' },
        { name: '', id: '1.5', category: 'planned', slotNo: '5', slotDate: '16/2/2023' },
        { name: '', id: '1.6', category: 'planned', slotNo: '6', slotDate: '17/2/2023' },
        { name: '', id: '1.7', category: 'planned', slotNo: '7', slotDate: '18/2/2023' }
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
            { name: info.name, id: info.id, slotNo: info.slotNo, slotDate: info.slotDate }
        )
    })
    //console.log(customerInfo)
    //console.log(customerCategories)


    const onDragStart = (e, id, no) => {
        //console.log(id)
        //console.log("drag start")
        //console.log(no)
        e.dataTransfer.setData('text/plain', id)
    }

    const onDragOver = (e) => {
        e.preventDefault()
        //console.log("drag over")
    }

    const onDrop = (e, cate, no, id) => {
        //console.log("dropped")
        e.preventDefault();

        //console.log(cate)
        let userId = e.dataTransfer.getData('text')
        let destinationId = id

        //console.log(userId)

        let updatedCategories = []

        let merged = []
        let categories = customerInfo.filter((user) => {
            if (user.id === userId) {
                //console.log(destinationId)
                //user.id = destinationId
                user.category = cate;
                user.slotNo = no;
                //console.log(user)
            }

            if (user.slotNo === no) {
                //console.log(user)
                merged.push(user)
                //console.log(merged)
            }
            let newMerged = { ...merged[1], ...merged[0] }
            //console.log(newMerged)

            if (user.id === destinationId) {
                //console.log(user)

                //update all info of the customer to the planner
                user.name = newMerged.name
            }

            if (user.id === userId) {
                //console.log(user)
                //console.log(customerInfo.indexOf(user))

                //function to delete customer info repeatition
                updatedCategories = customerInfo.filter((newuser) => {
                    return newuser !== user
                })
            }

            return user;
        })


        console.log(categories)
        //console.log(updatedCategories)
        setCustomerInfo(updatedCategories)
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
                                    <tr key={category.id} onDragStart={(e) => onDragStart(e, category.id, category.slotNo)} onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "unplanned")} draggable='true'>
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
                                <div key={category.id} className='planned-item py-3 px-2 mb-3' onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "planned", category.slotNo, category.id)} droppable='true'>
                                    <div className='d-flex justify-content-between mb-3'>
                                        <h6 className='mb-0'>Slot {category.slotNo}</h6>
                                        <p className='mb-0'>{category.slotDate}</p>
                                    </div>
                                    <div className='bg-light py-2 px-1 text-black' key={category.id}>
                                        <h6>{category.name}</h6>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainpage