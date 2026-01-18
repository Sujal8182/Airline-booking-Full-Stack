import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAirports } from '../../Redux/Reducers/airportSlice'

const Airportlist = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.airport)
    const airportlist = useSelector(
        state => state.airport.airports?.airports || []
    )


    useEffect(()=>{
        dispatch(fetchAirports())

        // setAirportdata(prev => [...prev,Airportdata])
    }, [dispatch])

    if(loading) return <p>Loading...</p>
  return (
     <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>City</th>
          <th>Country</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {airportlist.map(a => (
          <tr key={a._id}>
            <td>{a.name}</td>
            <td>{a.code}</td>
            <td>{a.city}</td>
            <td>{a.country}</td>
            <td>{a.isActive ? "Active" : "Disabled"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Airportlist
