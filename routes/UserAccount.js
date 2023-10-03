var express = require('express');
var router = express.Router();
var userAccountRepo = require('../Repository/UserAccountRepository');

router.route('').post((request, response) => {
    const { username, password} = request.body;
    console.log("user request received", username, password);
    userAccountRepo.GetUserAccountByUsernameAndPassword(username, password).then(result => {
        if(result.length > 0) {
            console.log("result", result[0]);
            response.json(result[0]);
        } else{
            response.status(404).json({error: "User not found"});
        }
    }) .catch(error => {
        console.log(error);
        response.status(400).json({ error: "User not found" });
    });
});

router.route('/search').post( async (request, response) => {
    const {criteria, value} = request.body;

    try{
        if(criteria === 'username'){
            console.log('username value: ', value);
            const result = await userAccountRepo.FindUserAccountByUsername(value);
            response.json(result);
        }
    } catch(err){
        response.status(400).json({error: "Request Error"});
    }

})

module.exports = router;