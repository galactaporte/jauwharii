const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

//New authors route
//this route is only to display the form to create new author
router.get('/new', (req, res) => {
    res.render ('authors/new', {author: new Author() }) //variable 'Author' is the schema defined in models folder 'author.js'
    //this variable will then be sent into the ejs file to be rendered for display
    //don't forget to import the module above in order to use the schema!
})


//this route is to actually create the new author
//res.send ('---CREATE AUTHOR ROUTE---' option1: using async-await)
  router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name //we do not simply 'req.body' because client may input ID in the name field which would overwrite the actual 'author' object. so we explicitly specify the exact field that we want to edit/create
    })
    try {
      const newAuthor = await author.save()
      res.redirect(`authors/${newAuthor.id}`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Homeschool'
      })
    }
  })
    
    
router.get('/:id', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id)
      const books = await Book.find({ author: author.id }).limit(6).exec()
      res.render('authors/show', {
        author: author,
        booksByAuthor: books
      })
    } catch {
      res.redirect('/')
    }
  })

  router.get('/:id/edit', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id)
      res.render('authors/edit', { author: author })
    } catch {
      res.redirect('/authors')
    }
  })
  
  router.put('/:id', async (req, res) => {
    let author
    try {
      author = await Author.findById(req.params.id)
      author.name = req.body.name
      await author.save()
      res.redirect(`/authors/${author.id}`)
    } catch {
      if (author == null) {
        res.redirect('/')
      } else {
        res.render('authors/edit', {
          author: author,
          errorMessage: 'Error updating HomeSchool'
        })
      }
    }
  })
  
  router.delete('/:id', async (req, res) => {
    let author
    try {
      author = await Author.findById(req.params.id)
      await author.remove()
      res.redirect('/authors')
    } catch {
      if (author == null) {
        res.redirect('/')
      } else {
        res.redirect(`/authors/${author.id}`)
      }
    }
  })
  module.exports = router // ('router' is the name to evoke for controller)  

    //res.send ('---CREATE AUTHOR ROUTE---' option2: using callback function)
    // author.save((err, newAuthor) => {//this is a callback function that saves the user input (async-await above is a cleaner-code option)
    //     if (err) {
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: "Error creating Author"
    //         })
    //         //console.log ("ERROR CREATING AUTHOR")
            
    //     } else {
    //         //res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //         console.log (author)
    //     }
    // })
    // //res.send (req.body.name) 
    // //'name' is the name param of new author the server received from user input
    // //the 'body-parser' needs to be installed first in order to acquire the user input in the form field


