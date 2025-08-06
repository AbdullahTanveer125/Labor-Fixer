const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



exports.createJob = async (req, res) => {
    try {
        const { title, category, type, description, location } = req.body; // include clientId
        const clientId = req.params.clientId;

        console.log("Client ID in createJob: ", clientId);

        const attachment = req.file ? req.file.path : null;

        if (!title || !category || !type || !description || !clientId) {
            return res.status(400).json({ message: 'All required fields must be filled' });
        }

        // Check if client exists
        const client = await prisma.clientUser.findUnique({
            where: { id: parseInt(clientId) }
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const newJob = await prisma.job.create({
            data: {
                title,
                category,
                type,
                description,
                location,
                attachment,
                client: {
                    connect: { id: parseInt(clientId) } // link job to client
                }
            }
        });

        res.status(201).json({ message: 'Job posted successfully', job: newJob });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
