module.exports={
    createAdmin: function(request, response, dbconfg){
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
                                        alert = 'Admin Registered Fail';
                                    }
                                    else{
                                        users = true;
                                        alert = 'Admin Registered';
                                        tableData = table;
                                    }
                                });
                            }else{
                                alert = 'Admin Already Registered';
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
                                        response.json({msg: false, data: err});
                                    }
                                    else{
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

    getColor: function(request, response, dbconfg){
        let company = request.body.company;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('SELECT * FROM public."themeTable" WHERE "companyName" = $1',[company], (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table: table});
                    }
                });
            }
        });
    },

    getTheme: function(request, response, dbconfg){

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('SELECT * FROM public."themeTable"', (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table: table});
                    }
                });
            }
        });
    },

    uploadLogo: function(request, response, dbconfg){
        let company = request.body.company;
        console.log(request.body.data.url)

        // dbconfg.connect((err, db, done) =>{
        //     if(err){
        //         console.log('Conection Error');
        //         return console.log(err);
        //     }else{
        //         db.query('SELECT * FROM public."themeTable" WHERE "companyName" = $1',[company], (err, table) => {
        //             done();
        //             if(err){
        //                 response.json({msg: false, data: err})
        //             }else{
        //                 response.json({msg: true, table: table});
        //             }
        //         });
        //     }
        // });
    },

    setColor: function(request, response, dbconfg){
        var bgColor = request.body.backColor;
        var company = request.body.company;

        console.log(bgColor)
        console.log(company)

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('UPDATE public."themeTable" SET "backColor"=$2 WHERE "companyName" = $1',[company,bgColor], (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table: table});
                    }
                });
            }
        });
    },

    setFontColor: function(request, response, dbconfg){
        var fontColor = request.body.fontColor;
        var company = request.body.company;

        console.log(fontColor)
        console.log(company)

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('UPDATE public."themeTable" SET "fontColor"=$2 WHERE "companyName" = $1',[company,fontColor], (err, table) => {
                    done();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        response.json({msg: true, table: table});
                    }
                });
            }
        });
    }
}