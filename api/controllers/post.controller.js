import Employee from '../models/employee.model.js'; 
import { errorHandler } from '../utils/error.js';
import multer from 'multer';

const upload = multer(); 

export const createEmployee = async (req, res, next) => {
 
   
    if (!req.user) {
      return next(errorHandler(401, 'You are not authorized to create an employee.'));
    }
    

    const { name, email, number, designation, gender, course } = req.body;

    
    if (!name || !email || !number || !designation || !gender || !course) {
      return next(errorHandler(400, 'All fields are required.'));
    }

   

   const newEmployee = new Employee({
    ...req.body,
    userId: req.user.id,
   });
   try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
   } catch (error) {
    next(error)
   }
};

export const getEmployees = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const employees = await Employee.find({userId})

    res.status(200).json({
      success: true,
      posts: employees, 
    });
  } catch (error) {
    next(error); 
  }
};
