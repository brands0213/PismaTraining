const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")
const { route } = require("./user")

const { user, post } = new PrismaClient()


// Getting a post 
router.get('/', async (req, res) =>{

       const posts = await post.findMany({
        include: { 
          user: true
        }
    })
    res.json(posts)
    
})

// Creating a posts
router.post('/', async( req, res, next) => {

try {


    const { title, content, user_id } = req.body;

    const userExists = await user.findUnique({
        where:{ 
            id: user_id 
        }
     })

    if(!userExists){
        return res.status(400).json({
            msg: 'User not Found'
        })
    }

    const newPost = await post.create({
        data:{
            title,
            post: content,
            user_id
        }
    })  
    res.status(200).json({
        msg: "Post Created",
        newPost
    })

}catch(err){

    next(err)

}
})

// Deleting a Post
router.delete('/:id', async ( req, res, next) => {

    // Deleting a single post using the id 
    try {
        const { id } = req.params;

        const postDelete = await post.delete({
            where:{
                id: Number(id)
            }
        })

        res.status(200).json({
            msg: 'Post Successfuly deleted'}
        )

    } catch (err) {
        next(err)
    }
 

})

// Updating a post 
router.patch('/:id', async (req, res, next) => {

    try {
        const {id} = req.params;
        
        const { title, content } = req.body

        const updatedPost = await post.update({
            where:{
                id: Number(id)
            },
            data: {
                title,
                post: content
            },
            include:{
                user: true
            }
        })
        res.status(200).json({
            msg: "Post Updated",
            updatedPost
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router