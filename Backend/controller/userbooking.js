const express = require("express")
const Booking = require("../model/userBooking")
const { TokenGenerate } = require("../utils/Token")

exports.Addbooking = async (req,res)=>{
    const Id = req.params.id

    if(!Id){
        return res.status(404).json({message : "User not found"})
    }

    const { from , to , depart} = req.body

    if(!from || !to || !depart){
        return res.status(404).json({message : "All fields are required"})
    }

    
    const Extbooking = await Booking.findOne({depart})
    if(Extbooking){
        return res.status(404).json({message : "Booking already done"})
    }
    const user = await Booking.create({
        from,
        to,
        depart
    })
    const token = TokenGenerate(user._id,res)

    return res.status(201).json({message : "Booking successfull", user, token})
}