
const config = {
    user :'sa',
    password :'localadmin',
    server:'DESKTOP-KQH5GKT',
    // server:'15.0.2000.5',
    database:'Todo',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'SQLEXPRESS',
        trustServerCertificate: true
    },
    port : 1433
}

module.exports = config; 
