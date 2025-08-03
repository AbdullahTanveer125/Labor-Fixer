const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const clientUserController = require('../Controllers/clientUser');

// Signup - Step 1: Send verification email
router.post('/signup', upload.single('profileImage'), clientUserController.signup);

// Verify email - Step 2: Verify email code
router.post('/verify-email', clientUserController.verifyEmail);

// Resend verification code
router.post('/resend-verification', clientUserController.resendVerificationCode);

// Get all clients
router.get('/', clientUserController.getAllClients);

// Get client by ID
router.get('/:id', clientUserController.getClientById);

// Update client
router.put('/:id', clientUserController.updateClient);

// Delete client
router.delete('/:id', clientUserController.deleteClient);







module.exports = router; 