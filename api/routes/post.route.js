import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createEmployee, getEmployees } from "../controllers/post.controller.js";


const router = express.Router();

router.post('/create', verifyToken, createEmployee)
router.get('/getemployees', verifyToken,  getEmployees);


export default router;