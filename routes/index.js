// this routes/index.js file will carry general files with no resource or model in the URL 
//note: in the MVC architecture, 'routes' are sometimes called 'controller'

const express = require('express')
const router = express.Router()
const Book = require ('../models/book')

router.get('/', async (req, res) => {
    let books
    try {
        books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
    } catch {
        books = []
    }
    //res.send('server is running on port 3000')
     res.render ('index', { books: books})
})

module.exports = router // ('router' is the name to evoke for controller)
