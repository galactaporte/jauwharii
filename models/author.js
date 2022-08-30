const mongoose = require('mongoose')

//createa a 'schema', which in a noSQL database means a TABLE! 
//which in mongoose is defined as a JSON object
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}) //see other config. these two are the most commong spec

module.exports = mongoose.model('Author', authorSchema) //name of table, spec name of object
