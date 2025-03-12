import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/images', async (req, res) => {
    const tagName = req.query.tag || 'manveer';
    try {
        const response = await axios.get(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/image/tags/${tagName}`,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${process.env.API_KEY}:${process.env.API_SECRET}`).toString('base64')}`,
                },
            }
        );

        res.json({
            resources: response.data.resources || [],
        });
    } catch (error) {
        console.error('❌ Error Details:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to fetch images',
            details: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
