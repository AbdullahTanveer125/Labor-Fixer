const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Generate verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
const sendVerificationEmail = async (email, verificationCode) => {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Email credentials not configured. Please add EMAIL_USER and EMAIL_PASS to your .env file');
        console.log('For now, showing verification code in console:', verificationCode);
        return true; // Return true for testing purposes
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification - Labor Fixer',
        html: `
      <h2>Email Verification</h2>
      <p>Your verification code is: <strong>${verificationCode}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

// // Signup - Step 1: Send verification email
// exports.signup = async (req, res) => {
//   try {
//     const {
//       name, email, phone, password, gender,
//       dateOfBirth, address, jobCategory, availability,
//       hourlyRate, description
//     } = req.body;

//     const profileImage = req.file;

//     const imageUrl = `/uploads/${profileImage.filename}`;

//     const existingUser = await prisma.user.findUnique({
//       where: { email }
//     });


//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already registered' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate verification code
//     const verificationCode = generateVerificationCode();
//     const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     // Create user with verification code
//     // const user = await prisma.employeeUser.create({
//     //   data: {
//     //     name,
//     //     email,
//     //     phone,
//     //     password: hashedPassword,
//     //     profileImage,
//     //     gender,
//     //     dateOfBirth: new Date(dateOfBirth),
//     //     address,
//     //     jobCategory,
//     //     availability,
//     //     hourlyRate: parseFloat(hourlyRate),
//     //     description,
//     //     verificationCode,
//     //     verificationCodeExpires
//     //   }
//     // });

//     // Create User
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         phone,
//         password: hashedPassword,
//         profileImage,
//       },
//     });

//     const employeeUser = await prisma.employeeUser.create({
//       data: {
//         userId: user.id,
//         gender,
//         dateOfBirth: new Date(dateOfBirth),
//         address,
//         jobCategory,
//         availability,
//         hourlyRate: parseFloat(hourlyRate),
//         description,
//         emailVerified: false,
//         verificationCode,
//         verificationCodeExpires,
//       },
//     });



//     // Send verification email
//     const emailSent = await sendVerificationEmail(email, verificationCode);

//     // if (!emailSent) {
//     //   // If email fails, delete the user
//     //   await prisma.user.delete({ where: { id: user.id } });
//     //   return res.status(500).json({ error: 'Failed to send verification email' });
//     // }

//     if (!emailSent) {
//       // If email fails, delete the employeeUser and user
//       await prisma.employeeUser.delete({ where: { id: employeeUser.id } });
//       await prisma.user.delete({ where: { id: user.id } });
//       return res.status(500).json({ error: 'Failed to send verification email' });
//     }

//     res.status(201).json({
//       message: 'User created successfully. Please check your email for verification code.',
//       userId: user.id
//     });

//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };



exports.signup = async (req, res) => {
    try {
        const {
            name, email, phone, password, gender, address, description
        } = req.body;

        const profileImage = req.file;

        if (!profileImage) {
            return res.status(400).json({ error: 'Profile image is required' });
        }

        // Save only the URL (not file object)
        const imageUrl = `/uploads/${profileImage.filename}`;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification code
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

        // Create User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                profileImage: imageUrl,  // <-- Store URL here
            },
        });


        const clientUser = await prisma.clientUser.create({
            data: {
                userId: user.id,
                gender,

                address,

                description,
                emailVerified: false,
                verificationCode,
                verificationCodeExpires,
            },
        });



        // Send verification email
        const emailSent = await sendVerificationEmail(email, verificationCode);

        if (!emailSent) {
            await prisma.clientUser.delete({ where: { id: clientUser.id } });
            await prisma.user.delete({ where: { id: user.id } });
            return res.status(500).json({ error: 'Failed to send verification email' });
        }

        res.status(201).json({
            message: 'User created successfully. Please check your email for verification code.',
            userId: user.id
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: error.message });
    }
};























// Verify email - Step 2: Verify email code
exports.verifyEmail = async (req, res) => {
    try {
        const { userId, verificationCode } = req.body;
        console.log("User ID:", userId);

        const user = await prisma.clientUser.findUnique({
            where: { userId: parseInt(userId) },
            include: { user: true },  // include User details if needed
        });
        console.log("User=========:", user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.emailVerified) {
            return res.status(400).json({ error: 'Email already verified' });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }

        if (new Date() > user.verificationCodeExpires) {
            return res.status(400).json({ error: 'Verification code expired' });
        }

        // Update user as verified
        await prisma.clientUser.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verificationCode: null,
                verificationCodeExpires: null
            }
        });

        res.json({ message: 'Email verified successfully' });

    } catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Resend verification code
exports.resendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.clientUser.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.emailVerified) {
            return res.status(400).json({ error: 'Email already verified' });
        }

        // Generate new verification code
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

        // Update user with new verification code
        await prisma.clientUser.update({
            where: { id: user.id },
            data: {
                verificationCode,
                verificationCodeExpires
            }
        });

        // Send new verification email
        const emailSent = await sendVerificationEmail(email, verificationCode);

        if (!emailSent) {
            return res.status(500).json({ error: 'Failed to send verification email' });
        }

        res.json({ message: 'New verification code sent successfully' });

    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all employees
exports.getAllClients = async (req, res) => {
    try {
        const employees = await prisma.clientUser.findMany({
            where: { emailVerified: true }
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get employee by ID
exports.getClientById = async (req, res) => {
    try {
        const employee = await prisma.clientUser.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update employee
exports.updateClient = async (req, res) => {
    try {
        const {
            name, phone, profileImage, gender, dateOfBirth,
            address, jobCategory, availability, hourlyRate, description
        } = req.body;

        const employee = await prisma.clientUser.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name,
                phone,
                profileImage,
                gender,
                dateOfBirth: new Date(dateOfBirth),
                address,
                jobCategory,
                availability,
                hourlyRate: parseFloat(hourlyRate),
                description
            }
        });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete employee
exports.deleteClient = async (req, res) => {
    try {
        await prisma.clientUser.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};










exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await prisma.user.findUnique({
            where: { email }, include: {
                client: true // include ClientUser data
            }
        });
        if (!user) return res.status(404).json({ message: "User not found" });

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // 3. Create JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // 4. Exclude password before sending user data
        const { password: _, ...userWithoutPassword } = user;
        // Check if client exists
        // const client = await prisma.clientUser.findUnique({
        //     where: { userId: parseInt(user.id) }
        // });
        // console.log("Client in loginUser:", client);

        res.json({
            message: "Login successful",
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
















