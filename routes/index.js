// this routes/index.js file will carry general files with no resource or model in the URL 
//note: in the MVC architecture, 'routes' are sometimes called 'controller'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    //res.send('server is running on port 3000')
    res.render ('index')
})

module.exports = router // ('router' is the name to evoke for controller)