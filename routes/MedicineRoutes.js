const express = require('express');
const router = express.Router();
const MedicineController=require("../controller/MedicineController") 



// medicine routes

//add medicine route
router.post('/add',MedicineController.addMedicineController);

//edit medicine route
router.post('/edit/:medicineId',MedicineController.editMedicineDetailController);

//delete medicine route
router.delete("/delete/:medicineId",MedicineController.deleteMedicineController);

//list medicine route
router.get('/list', MedicineController.listMedicinesController);

//get medicine route
router.get('/get/:medicineId', MedicineController.getMedicineController);









module.exports = router