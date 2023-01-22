import React, { useState } from 'react'
import { storage } from '../firebase';
import { collection, onSnapshot, doc, query, orderBy, updateDoc } from 'firebase/firestore'

import '../app.css'

const Mainpage = () => {

    //getting all stored data
    const customerList = collection(storage, 'customers-info');
    const plannerList = collection(storage, "planner");

    //getting query, for ordering
    const qCustomer = query(customerList, orderBy('Name', 'asc'))
    const qPlanner = query(plannerList, orderBy('slotNo', 'asc'))

    const [customerInfo, setCustomerInfo] = useState([])

    let allDbInformations = []

    onSnapshot(qCustomer, (customer) => {
        let customers = []
        customer.docs.forEach((doc) => {
            customers.push({ ...doc.data(), id: doc.id })
        })

        customers.forEach(customer => {
            allDbInformations.push(customer)
        })
        //allDbInformations.push(...customers)
        setCustomerInfo(allDbInformations)
    })

    onSnapshot(qPlanner, (plan) => {
        let planner = []
        plan.docs.forEach((doc) => {
            planner.push({ ...doc.data(), id: doc.id })
        })

        planner.forEach(plan => {
            allDbInformations.push(plan)
        })
        //allDbInformations.push(...planner)
        setCustomerInfo(allDbInformations)
    })

    //console.log(allDbInformations)

    //creating an object that contains all categories array
    //to store each customer value when dragged
    const customerCategories = {
        unplanned: [],
        planned: []
    }

    //checking through the customerinfo array for all datas, and grouping each data based on their categories
    customerInfo.forEach((info) => {
        customerCategories[info.category].push(
            { Name: info.Name, id: info.id, customerID: info.customerID, slotNo: info.slotNo, slotDate: info.slotDate, DropOff: info.DropOff, PickUp: info.PickUp }
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

    const onDrop = (e, cate, no, id, firebaseID) => {
        //console.log(customerInfo)
        //console.log("dropped")
        e.preventDefault();

        //console.log(cate)
        let userId = e.dataTransfer.getData('text')
        let destinationId = id

        //console.log(userId)

        let updatedCategories = []

        let merged = []
        let categories = customerInfo.filter((user) => {
            //console.log(user)
            if (user.customerID === userId) {
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

            if (user.customerID === destinationId) {
                //console.log(user)

                //update all info of the customer to the planner
                user.Name = newMerged.Name
                user.DropOff = newMerged.DropOff
                user.PickUp = newMerged.PickUp

                let docId = firebaseID;
                //console.log(docId)

                const newplanner = doc(storage, "planner", docId);
                //console.log(planner)
                updateDoc(newplanner, {
                    Name: user.Name,
                    DropOff: user.DropOff,
                    PickUp: user.PickUp
                })
                    .then(() => {
                        console.log('done')
                    }).catch((err) => {
                        console.log(err)
                    })
                //console.log(user)
            }

            if (user.customerID === userId) {
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

    const resetPlanner = (e) => {

        //console.log(customerInfo)
        customerInfo.forEach(customer => {
            if (customer.category === "planned") {
                //console.log(customer)
                let docID = customer.id
                //console.log(docID)

                const resetplanner = doc(storage, "planner", docID);
                //console.log(planner)
                updateDoc(resetplanner, {
                    Name: '',
                    DropOff: '',
                    PickUp: ''
                })
                    .then(() => {
                        console.log('done')
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
        //alert('Deleted')
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
                                    <tr className='uplanned-content' key={category.id} onDragStart={(e) => onDragStart(e, category.customerID, category.slotNo)} onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "unplanned")} draggable='true'>
                                        <td className='px-4 py-1'>{category.Name}</td>
                                        <td className='px-4'>{category.customerID}</td>
                                        <td className='px-4'>{category.PickUp}</td>
                                        <td className='px-4'>{category.DropOff}</td>
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
                                <div key={category.id} className='planned-item py-3 px-2 mb-3' onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, "planned", category.slotNo, category.customerID, category.id)} droppable='true'>
                                    <div className='d-flex justify-content-between mb-3'>
                                        <h6 className='mb-0'>Slot {category.slotNo}</h6>
                                        <p className='mb-0'>{category.slotDate}</p>
                                    </div>
                                    <div className='bg-light py-2 px-1 text-black' key={category.id}>
                                        <h6>{category.Name}</h6>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='btn-div pb-5 mx-auto d-flex justify-content-center'>
                <button className='py-2 mx-auto' onClick={(e) => { resetPlanner(e) }}>Reset Planner</button>
            </div>
        </div>
    )
}

export default Mainpage