const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const cors = require('cors');
var inDev = process.env.NODE_ENV !== 'production';
var PORT = inDev ? 8080 : process.env.PORT;
const path = require('path');

//import JS modules
var superAdmin = require('./Server/SuperAdmin/SuperAdmin');
var Admin = require('./Server/Admin/Admin');
var Customer = require('./Server/Customer/Customer');
var Vehicals = require('./Server/Vehicals/Vehicals');
var Agreement = require('./Server/Agreement/Agreement');
var main = require('./Server/MainTasks/main');

const app = express();

// function handleRedirect(req, res) {
//     res.redirect(targetBaseUrl);
//   }

// app.get('/', handleRedirect);

// const pool = new pg.Pool({
//     user: "avnadmin",
//     password: "ibwxq0baui4aaxqn",
//     database: "defaultdb",
//     port: 15003,
//     host: "pg-1f9d942d-project-2adf.aivencloud.com",
//     ssl: true
//   });

  const pool = new pg.Pool({
      user: "jkmhepxyoiqbni",
      password: "3bde8a5f1e104c10db501365973a2c6137b8295864772318e7e1ebe309cf238b",
      database: "d6lsngqnhulrcb",
      port: 5432,
      max: 20,
      host: "ec2-174-129-242-183.compute-1.amazonaws.com",
      ssl: true
    });

//   pool.connect();

//   pool.query('SELECT * FROM public."usersTable"', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     pool.end();
//   });

// let pool = new pg.Pool({
//     port: 5432,
//     database: 'd4ps461pnfeas8',
//     password: '912e59bc8f02e39c3390fb7a21ed2c2dd5553a4015837d2ca0e149a8c59f9756',
//     max: 10,
//     host: 'ec2-23-21-177-102.compute-1.amazonaws.com',
//     user: 'lhhqkwktkgjxgt'
// });

// let pool = new pg.Pool({
//     port: 5432,
//     database: 'postgres',
//     password: '123',
//     max: 90,
//     host: 'localhost',
//     user: 'postgres'
// });

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));

//Super Admin Activity
app.post('/superAdmin/create', function(request, response){
    superAdmin.createAdmin(request, response, pool);
});

app.post('/uploadimage', function(request, response){
    superAdmin.uploadLogo(request, response, pool);
});

app.post('/getColor', function(request, response){
    superAdmin.getColor(request, response, pool);
});

app.get('/getTheme', function(request, response){
    superAdmin.getTheme(request, response, pool);
});

app.post('/saveBackground', function(request, response){
    superAdmin.setColor(request, response, pool);
});

app.post('/saveFont', function(request, response){
    superAdmin.setFontColor(request, response, pool);
});



//Main Activity
app.post('/signin', function(request, response){
    main.signin(request, response, pool);
});

app.post('/savePassword', function(request, response){
    main.savePassword(request, response, pool);
});

app.post('/getUsername', function(request, response){
    main.getUsername(request, response, pool);
});

app.post('/getSecurity', function(request, response){
    main.getSecurity(request, response, pool);
});

app.post('/lock', function(request, response){
    main.setLock(request, response, pool);
});

app.get('/companyList', function(request, response){
    main.companyList(request, response, pool);
});

app.post('/changePass', function(request, response){
    main.changePass(request, response, pool);
});



//Admin Activity
app.post('/Admin/create', function(request, response){
    Admin.createUser(request, response, pool);
});

app.get('/Admin/getUsers', function(request, response){
    Admin.getUsers(request, response, pool);
});

app.post('/Admin/changeStatus', function(request, response){
    Admin.changeStatus(request, response, pool);
});

app.post('/Admin/profileData', function(request, response){
    Admin.profileData(request, response, pool);
});

app.post('/Admin/changePass', function(request, response){
    Admin.changePass(request, response, pool);
});

app.post('/Admin/updateData', function(request, response){
    Admin.updateData(request, response, pool);
});

app.post('/Admin/signin', function(request, response){
    Admin.signin(request, response, pool);
});



//Customer Activity
app.post('/Customer/saveData', function(request, response){
    Customer.saveCustomer(request, response, pool);
});

app.post('/Customer/searchCutomer', function(request, response){
    Customer.searchCustomer(request, response, pool);
});

app.post('/Customer/updateCustomer', function(request, response){
    Customer.updateCustomer(request, response, pool);
});

app.post('/Customer/deleteCutomer', function(request, response){
    Customer.deleteCutomer(request, response, pool);
});



//Vehicals Activity
app.post('/Vehicals/saveVehicals', function(request, response){
    Vehicals.saveVehicals(request, response, pool);
});

app.get('/Vehicals/getVehicals', function(request, response){
    Vehicals.getVehicals(request, response, pool);
});

app.post('/Vehicals/getByNicVehical', function(request, response){
    Vehicals.getByNicVehical(request, response, pool);
});

app.post('/Vehicals/searchVehical', function(request, response){
    Vehicals.searchVehical(request, response, pool);
});

app.post('/Vehicals/updateVehicals', function(request, response){
    Vehicals.updateVehicals(request, response, pool);
});

app.post('/Vehicals/deleteVehicals', function(request, response){
    Vehicals.deleteVehicals(request, response, pool);
});


//Agreement Activity
app.post('/Agreement/getData', function(request, response){
    Agreement.getData(request, response, pool);
});

app.post('/Agreement/getAgreeData', function(request, response){
    Agreement.getAgreeData(request, response, pool);
});

app.post('/Agreement/saveData', function(request, response){
    Agreement.saveData(request, response, pool);
});

app.post('/Agreement/getAgree', function(request, response){
    Agreement.getAgree(request, response, pool);
});

app.post('/Agreement/savePayment', function(request, response){
    Agreement.savePayment(request, response, pool);
});

app.post('/Agreement/saveOther', function(request, response){
    Agreement.saveOther(request, response, pool);
});

app.get('/Agreement/getPayement', function(request, response){
    Agreement.getPayement(request, response, pool);
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'money360/build')));// Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'money360/build', 'index.html'));
    });
  }

app.use(morgan('dev'));

app.use(function(request, response, next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requesred-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => console.log('Listening on the '+PORT));
