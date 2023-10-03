var config = require('../dbconfig');
const sql = require('mssql');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const { STATUS_CODES } = require('http');

const Login = async (username, password) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query('SELECT UserAccountId, Username, Active FROM UserAccount WHERE Username = @username AND Password = @password AND Active = 1');

    // console.log("user.recordsets:", user.recordsets);
    // console.log("user.recordsets type:", typeof user.recordset);
    return user.recordset;
  } catch (err) {
    console.log(err);
    throw new Error("An error occurred during login.");
  }
};

const GetUserAccountByUsernameAndPassword = async (username, password) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query('SELECT UserAccountId, Username, Active FROM UserAccount WHERE Username = @username AND Password = @password AND Active = 1');
    return user.recordset;
  } catch (err) {
    console.log(err);
    throw new Error("An error occurred during login.");
  }
}

const FindUserAccountByUsername = async (username) => {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM UserAccount WHERE Username = @username');
    return user.recordset;
  } catch (err) {
    console.log(err);
    throw new Error("An error occurred during login.");
  }
}
const RegisterNewUser = async (username, password, firstName, lastName, email) => {
  let pool;
  pool = await sql.connect(config);
  const transaction = new sql.Transaction(pool);
  console.log(username, password, firstName, lastName, email);
  try {
    await transaction.begin();
    const newUserAccountID = uuidv4();
    const newUserProfileID = uuidv4();
    // const newUserAccountID = crypto.randomBytes(16).toString("hex");
    // const newUserProfileID = crypto.randomBytes(16).toString("hex");
    console.info("newGuid: ", newUserAccountID);

    const createNewUserAccount = await pool
      .request()
      .input('UserAccountId', sql.UniqueIdentifier, newUserAccountID)
      .input('Username', sql.NVarChar, username)
      .input('Password', sql.NVarChar, password)
      .input('Email', sql.NVarChar, email)
      .query(
        'INSERT INTO UserAccount (UserAccountId, [Username], [Password], Active, Email)' +
        'VALUES (@UserAccountId, @Username, @Password, 1, @Email)');

    const createNewUserProfile = await pool
      .request()
      .input('Id', sql.UniqueIdentifier, newUserProfileID)
      .input('UserAccountId', sql.UniqueIdentifier, newUserAccountID)
      .input('FirstName', sql.NVarChar, firstName)
      .input('LastName', sql.NVarChar, lastName)
      .query('INSERT INTO UserProfile ([Id], [UserAccountId], FirstName, LastName)' +
        'VALUES (@Id, @UserAccountId, @FirstName, @LastName )')
    
    await transaction.commit();
    return ;
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    // throw new Error(err, 'transaction aborted. rolling back');
  } finally {
    pool.close(); // Close the connection when done
  }

}


module.exports = {
  Login,
  GetUserAccountByUsernameAndPassword,
  RegisterNewUser,
  FindUserAccountByUsername
}