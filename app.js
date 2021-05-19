const { PrismaClient } = require('@prisma/client');
cosnt express = require('express');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
    try{

    } catch(err){
        console.log(err)
        return res.status(500).json({eror: 'you pooy head you f*** UP'})
    }
})

app.listen(5000, () => console.log('server running at http://localhost:5000'));
