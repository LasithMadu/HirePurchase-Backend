module.exports={
    signin: function(request, response, dbconfg){
        var username = request.body.username;
        var password = request.body.password;
        var user = true;
        var pass = true;
        var row = -1;
        var count = -1;
        var values = [];

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log(err);
                return response.json({msg: false, data: err})
            }
            else{
                db.query('SELECT * FROM public."usersTable"', (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }
                    else{
                        for(var i=0; i<table.rowCount; i++){
                            if(table.rows[i].userName == username){
                                count = i;
                                user = true;
                                break;
                            }else{
                                count = -1;
                                user = false;
                            }
                        }

                        if(count == -1){
                            pass = false;
                        }else{
                            if(table.rows[count].password == password){
                                pass = true;
                            }else{
                                pass = false;
                            }
                        }
                        

                        for(var i=0; i<table.rowCount; i++){
                            if(table.rows[i].userName == username && table.rows[i].password == password){
                                row = i;
                                break;
                            }else{
                                row = -1
                            }
                        }

                        if(!user && !pass){
                            values = null;
                        }else if(user && !pass){
                            values = table.rows[count];
                        }else{
                            values = table.rows[row];
                        }

                        response.json({msg: true, pass: pass, user: user, table: values});
                    }
                });
            }
        })
    },

    setLock: function(request, response, dbconfg){
        var userId = request.body.data;
        var values = [userId, true];

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log(err);
                return response.json({msg: false, data: err})
            }
            else{
                db.query('UPDATE public."usersTable" SET "isLock"= $2 WHERE "userId" = $1',[...values], (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table: table.rows[0]});
                    }
                });
            }
        })
    },

    getUsername: function(request, response, dbconfg){
        var username = request.body.username;
        var user = [];

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log(err);
                return response.json({msg: false, data: err})
            }
            else{
                db.query('SELECT * FROM public."usersTable"', (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        for(var i=0; i<table.rowCount; i++){
                            if(table.rows[i].userName == username){
                                user = [table.rows[i].userName, table.rows[i].isLock];
                                break;
                            }else{
                                user = [];
                            }
                        }
                        response.json({msg: true, username: user});
                    }
                });
            }
        })
    },

    getSecurity: function(request, response, dbconfg){
        var username = request.body.username;
        var question1 = '';
        var question2 = '';
        var answer1 = '';
        var answer2 = '';

        console.log(username)

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log(err);
                return response.json({msg: false, data: err})
            }
            else{
                db.query('SELECT * FROM public."usersTable"', (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        for(var i=0; i<table.rowCount; i++){
                            if(table.rows[i].userName == username){
                                question1 = table.rows[i].que1;
                                question2 = table.rows[i].que2;
                                answer1 = table.rows[i].answer1;
                                answer2 = table.rows[i].answer2;
                                break;
                            }
                        }
                        response.json({msg: true, values: [question1, question2, answer1, answer2]});
                    }
                });
            }
        })
    },

    savePassword: function(request, response, dbconfg){
        var username = request.body.username;
        var password = request.body.password;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log(err);
                return response.json({msg: false, data: err})
            }
            else{
                db.query('UPDATE public."usersTable" SET password=$2 WHERE "userName" = $1',[username, password] , (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table: table});
                    }
                });
            }
        })
    },

    companyList: function(request, response, dbconfg){
        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }
            else{
                db.query('SELECT "companyName" FROM public."themeTable"', (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }
                    else{
                        var company = [];
                        for(var i=0; i<table.rows.length; i++){
                            company[i] = table.rows[i].companyName;
                        }
                        response.json({msg: true, table:company});
                    }
                });
            }
        })
    },

    changePass: function(request, response, dbconfg){
        var userId = request.body.userId;
        var que1 = request.body.q1;
        var que2 = request.body.q2;
        var ans1 = request.body.an1;
        var ans2 = request.body.an2;
        var pass = request.body.pass;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log(err);
                return response.json({msg: false, data: err})
            }
            else{
                db.query('UPDATE public."usersTable" SET password=$6, que1=$2, que2=$3, answer1=$4, answer2=$5, "isLog"=$7 WHERE "userId" = $1',[userId, que1, que2, ans1, ans2, pass, true] , (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table: table});
                    }
                });
            }
        })
    },

    getTime: function() {

        var date = new Date();
    
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
    
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
    
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
    
        var year = date.getFullYear();
    
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    
        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
    
        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    }
}