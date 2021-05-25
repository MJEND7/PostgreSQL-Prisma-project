const { PrismaClient } = require('@prisma/client');
const express = require('express')
const prisma = new PrismaClient()


const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
    const {name, email, role } = req.body
    try{
       const user = await prisma.user.create({
           data: {name, email, role }
       }) 

       return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(500).json({eror: 'sothing went wrong'});
    }
})

app.listen(5000, () => console.log('server running at http://localhost:5000'));

