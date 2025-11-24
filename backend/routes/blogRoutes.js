const express = require('express')
const { createBlogController, getAllBlogsController, getBlogByIdController, updateBlogController, deleteBlogController, userBlogController } = require('../controllers/blogController')
const { requireAuth } = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/all-blogs',getAllBlogsController)

router.post('/create-blog', requireAuth, createBlogController)

router.get('/get-blog/:id',getBlogByIdController)

router.put('/update-blog/:id', requireAuth, updateBlogController)

router.delete("/delete-blog/:id", requireAuth, deleteBlogController);

router.get('/user-blog/:id', requireAuth, userBlogController)

module.exports = router