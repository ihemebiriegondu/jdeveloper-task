import React, { useState } from 'react'

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
        <div>
            <div>
                <div className='unplanned-list-div' style={{background: 'blue'}} onDrop={(e) => onDrop(e, "unplanned")}>
                    <h4>Customers list</h4>
                    <div>
                        {
                            customerCategories.unplanned.map((category) =>
                                <div key={category.id} onDragStart={(e) => onDragStart(e, category.id)} onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "unplanned")} className='draggable' draggable='true'>
                                    <h6>{category.name}</h6>
                                </div>
                            )
                        }

                    </div>
                </div>


                <div className='planned-list-div' style={{background: 'yellow', padding:'2rem 0'}} onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "planned")} droppable='true'>
                    <h4>Delivery datails</h4>
                    <div>
                        {
                            customerCategories.planned.map((category) =>
                                <div key={category.id}>
                                    <h6>{category.name}</h6>
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