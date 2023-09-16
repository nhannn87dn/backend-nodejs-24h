const Employee = require('../models/employees.model');

const fechtData = async ()=>{
    try{
        const id = '65059292b3d574437b00a9f6'
        const result = await Employee.findById(id);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
   
}

fechtData();