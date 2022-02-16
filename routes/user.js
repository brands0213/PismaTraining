const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const { user } = new PrismaClient()

// READ
// Get all the users 
// if you want to filter user use 'where' 
router.get('/', async (req, res) => {
    const users = await user.findMany({
        select:{
            email: true,
            name: true,
            post: true
        }
    })
    res.json(users)
})


// CREATE 
// Create a new user using an email

router.post('/', async (req, res) => {
   const { email, name } = req.body;

   const userExists = await user.findUnique({
       select:{
            email: true
       },
       where:{
           email: email,
           name
       }
   })

   if(userExists){
       return res.status(400).json({
           msg: "email already exists"
       })
   }

   const newUser = await user.create({
       data:{
           email,
           name
       }
   })

   res.json(newUser)

})

// Update

router.put('/', async (req, res) => {

    const { email, name } = req.body;

    const updateUser = await user.update({
    where: {
      email
    },
    data: {
      name
    }
    })

    res.json(updateUser)

})

// Delete

router.delete('/', async (req, res) => {
    const { email } = req.body;

    const deleteUser = await user.delete({
    select: {
      email: true
    },
    where: {
        email
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