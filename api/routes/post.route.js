import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createEmployee, getEmployee, getEmployees, updateEmployee } from "../controllers/post.controller.js";


const router = express.Router();

router.post('/create', verifyToken, createEmployee)
router.get('/getemployees', verifyToken,  getEmployees);
router.put('/employee/:id', verifyToken, updateEmployee);
router.get('/getemployee/:id', verifyToken, getEmployee);

export default router;