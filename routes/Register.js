var express = require('express');
var router = express.Router();
var passwordValidator = require('password-validator');
var emailValidator = require('email-validator');
// const {validateAlphanumeric} = require ('../Validation/RegistrationValidation');
var userAccountRepo = require('../Repository/UserAccountRepository');

var schema = new passwordValidator();
// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(50)                                  // Maximum length 50
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                            // Must have at least 1 digits
    .has().symbols(1)                          // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password', 'password'], 'input keyword is not allowed as password'); // Blacklist these values

var userAccountRepo = require('../Repository/UserAccountRepository');

router.route('').post( async (request, response) => {
    let { username, password, firstName, lastName, email } = request.body;

    // Define a regular expression pattern to match non-alphanumeric characters
    // Trim spaces from all four fields
    username = username.trim().toLowerCase();
    password = password.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();

    const nonAlphanumericPattern = /[^a-zA-Z0-9]+/;
    // Check for non-alphanumeric characters in each field
    if (nonAlphanumericPattern.test(username) ||
        nonAlphanumericPattern.test(firstName) ||
        nonAlphanumericPattern.test(lastName)) {
        return response.status(400).json({ error: "Only alphanumeric characters are allowed." });
    }

    if (schema.validate(password)) {
        console.info("password validation is OK")
    } else {
        console.warn("Password validation failed: ", schema.validate(password, { details: true }));
        return response.status(400).json({ error: schema.validate(password, { details: true }) })
    };
    console.log(emailValidator.validate(email))
    if (!emailValidator.validate(email)) {
        console.warn("Email validation failed");
        return response.status(400).json({ error: "incorrect email format" });
    }

    // find whether the username already exist
    const result = await userAccountRepo.FindUserAccountByUsername(username);
    if(result.length > 0 ){
        console.log("Username already exist");
        return response.status(400).json({error: "Username already exist"});
    }

    console.log("user request received:", username, password, firstName, lastName, email);
    // start updating the database
    // userAccountRepo.RegisterNewUser(username, password, firstName, lastName, email).then(result =>{
    //    return response.status(201).json("OK");
    // });


    try {
        await userAccountRepo.RegisterNewUser(username, password, firstName, lastName, email)
        return response.status(201).json("OK");
    } catch (err) {
        console.log("registration error, please try again!");
        return response.status(400).json("Registration input error");
    }
    // return response.status(200).json({ message: "testing register api" })
});

router.route('/test').post((req, res) => {
    return res.status(200).json({ message: "testing register api" })
})

module.exports = router;