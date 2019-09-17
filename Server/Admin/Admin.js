module.exports={
    createUser: function(request, response, dbconfg){
        let values = request.body.data;
        let theme = [values[0], values[7], '', '#3a3a3a'];
        var alert,tableData;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }
            else{
                try{
                    db.query('SELECT * FROM public."usersTable" WHERE "nic" = $1',[values[6]], (err, table) => {
                        if(err){
                            response.json({msg: false, data: err})
                        }else{
                            if(table.rowCount === 0){
                                db.query('INSERT INTO public."usersTable"("userId", "firstName", "lastName", "userName", password, email, nic, company, address, city, state, zip, "userLevel") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',[...values], (err, table) => {
                                    if(err){
                                        users = false;
                                        alert = 'User Registered Fail';
                                    }
                                    else{
                                        users = true;
                                        alert = 'User Registered';
                                        tableData = table;
                                    }
                                });
                            }else{
                                alert = 'User Already Registered';
                                users = true;
                                tableData = table;
                            }
                        }
                    });
                    db.query('SELECT * FROM public."themeTable" WHERE "companyName" = $1',[values[7]], (err, table) => {
                        if(err){
                            response.json({msg: false, data: err})
                        }else{
                            if(table.rowCount === 0){
                                console.log('Company is not registered')
                                db.query('INSERT INTO public."themeTable"(id, "companyName", logo, color) VALUES ($1, $2, $3, $4)',[...theme], (err, table) => {
                                    db.end();
                                    if(err){
                                        alert = 'User Registered Fail';
                                        response.json({msg: false, data: err});
                                    }
                                    else{
                                        alert = 'User Registered';
                                        response.json({msg: true, table:tableData});
                                    }
                                });
                            }else{
                                response.json({msg: true, alert: alert, table:tableData});
                            }
                        }
                    });
                }catch(Exception){
                    console.log('Error')
                }
            }
        })
    },

    profileData: function(request, response, dbconfg){
        let value = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('SELECT * FROM public."usersTable" WHERE "userId" = $1',[value], (err, table) => {
                    db.end();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table:table})
                    }
                });
            }
        });
    },

    changePass: function(request, response, dbconfg){
        let value = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('UPDATE public."usersTable" SET password=$2 WHERE "userId" = $1',[...value], (err, table) => {
                    db.end();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table:table})
                    }
                });

            }
        });
    },

    updateData: function(request, response, dbconfg){
        let values = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('UPDATE public."usersTable" SET "firstName"=$2, "lastName"=$3, "userName"=$5, email=$4 WHERE "userId" = $1',[...values], (err, table) => {
                    db.end();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table:table})
                    }
                });

            }
        });

    },

    getUsers: function(request, response, dbconfg){

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('SELECT * FROM public."usersTable"', (err, table) => {
                    db.end();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table:table})
                    }
                });
            }
        });

    },

    changeStatus: function(request, response, dbconfg){
      var userid = request.body.uid;
      var state = request.body.state;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('UPDATE public."usersTable" SET "isLock"=$2 WHERE "userId"=$1',[userid, state], (err, table) => {
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                      db.query('SELECT * FROM public."usersTable"', (err, table) => {
                          db.end();
                          if(err){
                              response.json({msg: false, data: err})
                          }else{
                              response.json({msg: true, table:table})
                          }
                      });
                    }
                });
            }
        });

    },

    signin: function(request, response, dbconfg){
        let values = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('SELECT * FROM public."usersTable" WHERE "userName" = $1 AND "password" = $2 AND "company" = $3',[...values], (err, table) => {
                    db.end();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        if(table.rowCount === 1){
                            if(table.rows[0].userLevel === 'Admin'){
                                response.json({msg: true, alert: 'succsess', table:table})
                            }else{
                                response.json({msg: true, alert: 'fail', table:table})
                            }
                        }else{
                            response.json({msg: false, alert: 'fail', data: err})
                        }
                    }
                });

            }
        });

    }
}
