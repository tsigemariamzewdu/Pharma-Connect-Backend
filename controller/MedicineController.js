const MedicineServices=require("../services/MedicineServices");



//add medicine controller

exports.addMedicineController= async(req,res)=>{
    try {
        const newMedicine =await MedicineServices.addMedcine(req.body)
        res.status(201).json({
            success: true,
            message:"medicine created successfully!",
            data:{
                medicine:{
                   name:newMedicine.name,
                   category:newMedicine.category
                }
            }
           
        
        })
        
    } catch (error) {
        console.log("file: MedicineController.js:5 ~ exports.addMedicineController ~ error:", error.message);
        res.status(500).json({
            success:false,
            message:"Something went wrong!",
            error:error.message
        })
    } 
}

//  editing medicine controller

exports.editMedicineDetailController = async (req, res) => {
    try {
        const { medicineId } = req.body; // ID of the medicine to edit
        const updatedData = req.body; // Updated fields sent from the frontend

        const updatedMedicine = await MedicineServices.editMedicine(medicineId, updatedData);
        res.status(200).json({
            message: "Medicine details updated successfully",
            data: updatedMedicine,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete medicine controller

exports.deleteMedicineController=async (req,res)=>{
    try{
        const {medicineId}=req.params;
        const deletedMedicine=await MedicineServices.deleteMedicine(medicineId);
        res.status(200).json({
             success:true,
            message:"Medicine deleted succesfully",
            data:deletedMedicine,
        })
    }catch(error){
       res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//list medicines controller

exports.listMedicinesController=async(req,res)=>{
    try{
        const listOfMedicines= await MedicineServices.listMedicine();
        res.status(200).json({
            success:true,
            message:"All Medicines are listed succesfully",
            data:listOfMedicines,
        })
    } catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
}}

//get medicine Controller

exports.getMedicineController=async(req,res)=>{
    try{
        const Medicine=await MedicineServices.getMedicineById()
        res.status(200).json({
            success:true,
            message:"medicine is listed successfully",
            data:Medicine
        }
    )
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
