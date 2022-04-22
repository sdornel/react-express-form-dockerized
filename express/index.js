const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = new express()
app.use(express.json())
app.use(cors());

app.get('/api/supervisors', async (req, res) => {
    const supervisors = await getSupervisors();
    res.json(supervisors.data);
})

const getSupervisors = async () => {
    try {
        return await axios.get('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')

    } catch (error) {
        console.error(error);
    }
}

app.post('/api/submit', async (req, res) => {
    console.log('===================================');
    console.log('SUBMITTED DATA:', req.body);
    console.log('===================================');
})

app.post('/echo', async (req, res) => {
    try {
        res.json({
            'body': req.body
        })
    }
    catch(e) {
        res.json({
            'error': e.message
        })
    }
})

app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})