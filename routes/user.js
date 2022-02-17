const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")
const { request } = require("express")
const { body, validationResult } = require('express-validator')

const { user } = new PrismaClient()

// READ
// Get all the users 
// if you want to filter user use 'where' 
router.get('/', async (req, res) => {

    const users = await user.findMany({
        select:{ 
            id:true,
            email: true,
            name: true,
            phone: true,
            posts: true
        }
    })
    res.json(users)
})


// CREATE 
// Create a new user using an email

router.post('/', 
    // Validation
    body('email').isEmail().normalizeEmail(),
    
    body('name').isLength({min: 6}),

    body('phone').isNumeric(11)
, 

async (req, res) => {


    // For sending the error
    const errors  = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array() 
        })
    }


    // Checking if the email exist and Creating a new user
    const { email, name, phone } = req.body;

    const userExists = await user.findUnique({
       select:{
            email: true
       },
       where:{
           email

       }
    })

    // If the user Already Exist 
    if(userExists){
       return res.status(400).json({
           msg: "email already exists"
       })
    } 

    // Creating the User
    const newUser = await user.create({
       data:{
           email,
           name,
           phone
       }
    })

    // Registration successful
   res.status(200).json({
       msg: "Registration Successful"
    })


})

// Update

router.patch('/:id', async (req, res) => {

    const { id } = req.params;
    const { email, name, phone} = req.body

    const updateUser = await user.update({
    where: {
      id: Number(id)
    },
    data: {
      email,
      name,
      phone
    }
    })

    res.status(200).json({
        msg: "User updated"
    })

})

// Delete

router.delete('/:id', async (req, res) => {

    const { id } = req.params;


    const userExists = await user.findUnique({
        select:{
             id: true
        },
        where:{
            id : Number(id)
 
        }
     })
 
     // If the user Already Exist 
     if(!userExists){
        return res.status(400).json({
            msg: "User Doesn't Exist"
        })
     } 

    const deleteUser = await user.delete({
    where: {
        id: Number(id)
    }
    })

    if(deleteUser){
        return res.status(200).json({
            msg: "User Deleted"
        })
    } 

    res.json(deleteUser)
})

module.exports = router