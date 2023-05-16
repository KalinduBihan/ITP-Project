const { Router } = require('express')

const router = Router();


router.post("/api/goals/uploads",(req,res) => {

    res.send("handling post requests ..")
})

module.exports =  router
