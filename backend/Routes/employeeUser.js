const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const employeeUserController = require('../Controllers/employeeUser');

// Signup - Step 1: Send verification email
router.post('/signup', upload.single('profileImage'), employeeUserController.signup);

// Verify email - Step 2: Verify email code
router.post('/verify-email', employeeUserController.verifyEmail);

// Resend verification code
router.post('/resend-verification', employeeUserController.resendVerificationCode);

// Get all employees
router.get('/', employeeUserController.getAllEmployees);

// Get employee by ID
router.get('/:id', employeeUserController.getEmployeeById);

// Update employee
router.put('/:id', employeeUserController.updateEmployee);

// Delete employee
router.delete('/:id', employeeUserController.deleteEmployee);







module.exports = router; 