var express = require('express');
var router = express.Router();
var userAccountRepo = require('../Repository/UserAccountRepository');

router.route('').post((request, response) => {
    const { username, password} = request.body;
    console.log("user request received", username, password);
    userAccountRepo.Login(username, password).then(result => {
        // console.log("result", result);
        // console.log("result length", result.length);
        if(result.length > 0) {
            console.log("user result:", result[0]);
            response.json(result[0]);
        } else{
            response.status(404).json({error: "User not found"});
        }
    }) .catch(error => {
        console.log(error);
        response.status(400).json({ error: "An error occurred while fetching user." });
    });
});



module.exports = router;