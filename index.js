import express from 'express';
import axios from 'axios';

const app = express();

const router = express.Router();

const port = +process.env.PORT || 4000

const dataUrl = 'https://sjodie1157.github.io/todayPortfolioData/data/';

app.use(express.json());

app.use(router);

router.get('^/$|/ejd', (req, res) => {
    res.json({
        status: res.statusCode,
        msg: 'This is the home page'
    });
});

router.get('/resume', async (req, res) => {
    try {
        let response = await axios.get(dataUrl);
        let { resume } = response.data;
        res.json({
            status: res.statusCode,
            resume
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/resume/:id', async (req, res) => {
    try {
        let response = await axios.get(dataUrl);
        let { resume } = response.data;
        let params = +req.params.id;
        let idx = params > 0 ? params - 1 : 0;
        res.json({
            status: res.statusCode,
            resume: resume[idx]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.post('/addResume', async (req, res) => {
//     let response = await axios.post(dataUrl, {
//         id: 6,
//         year: 2024,
//         description: '',
//         place: '',
//         certificate: ''
//     });
//     console.log(response);
// });

router.post('/addResume', (req, res) => {
    const { id, year, description, place, certificate } = req.body;
    const newResume = { id: 6, year, description, place, certificate };
})

router.delete('/deleteResume/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let response = await axios.delete(`${dataUrl}/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
