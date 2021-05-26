const { PrismaClient } = require('@prisma/client');
const express = require('express')
const prisma = new PrismaClient()
const { body, validationResult } = require('express-validator'); 

const app = express();
app.use(express.json());


const userValidationRules = [
    body('email')
      .isLength({ min: 1 })
      .withMessage('Email must not be empty')
      .isEmail()
      .withMessage('Must be a valid email address'),
    body('name').isLength({ min: 1 }).withMessage('Name must not be empty'),
    body('role')
      .isIn(['ADMIN', 'USER', 'SUPERADMIN', undefined])
      .withMessage(`Role must be one of 'ADMIN', 'USER', 'SUPERADMIN'`),
  ]

  const simpleVadationResult = validationResult.withDefaults({
    formatter: (err) => err.msg,
  })

  const checkForErrors = (req, res, next) => {
    const errors = simpleVadationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped())
    }
    next()
  }

app.post('/users', userValidationRules,checkForErrors,
   async (req, res) => {
    const {name, email, role, posts } = req.body
    try{
        const existingUser = await prisma.user.findOne({ where: { email } })
        if (existingUser) throw { email: 'Email already exists' }
        const user = await prisma.user.create({
        data: {name, email, role, posts }
     }) 

       return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(500).json({eror: 'sothing went wrong'});
    }
})


app.get('/users', async (_: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          uuid: true,
          name: true,
          role: true,
          posts: {
            select: {
              body: true,
              title: true,
            },
          },
        },
      })
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

app.listen(5000, () => console.log('server running at http://localhost:5000'));
