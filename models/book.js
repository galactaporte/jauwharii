const mongoose = require('mongoose')
// const path = require ('path')
// const coverImageBasePath = 'uploads/bookCovers'

//createa a 'schema', which in a noSQL database means a TABLE! 
//which in mongoose is defined as a JSON object
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
}) 

bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
  })
  

// multer-wise,we create a virtual book schema to extract the image path name
// bookSchema.virtual('coverImagePath').get(function() {
//     if (this.coverImageName != null) {
//         return path.join('/', coverImageBasePath, this.coverImageName)
//     }
// })
//use normal 'function' instead of arrow to be able to access the 'this' property

module.exports = mongoose.model('Book', bookSchema) //name of table, spec name of object
// module.exports.coverImageBasePath = coverImageBasePath