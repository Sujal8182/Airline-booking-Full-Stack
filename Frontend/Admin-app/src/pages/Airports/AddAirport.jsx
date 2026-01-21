import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAirport } from '../../Redux/Reducers/airportSlice'
import { toast } from 'react-toastify'


const AddAirport = () => {
    const [form , setForm] = useState({
        name : "",
        code : "",
        city : "",
        country : ""
    })

    const dispatch = useDispatch()
    const {error, message } = useSelector(state => state.airport)

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(createAirport(form))
    }
    useEffect(()=>{
           if (error) {
            toast.error(error)
           };
            if (message){
              toast.success(message)
            } 
    },[error, message])
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
    <form onSubmit={handleSubmit}>
      <input placeholder="Airport Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Code" onChange={e=>setForm({...form,code:e.target.value})}/>
      <input placeholder="City" onChange={e=>setForm({...form,city:e.target.value})}/>
      <input placeholder="Country" onChange={e=>setForm({...form,country:e.target.value})}/>
      <button>Add Airport</button>
    </form>
    </div>
  )
}

export default AddAirport
