module.exports = {
    getData: function(request, response, dbconfg){
        var vehi = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."agreementData" WHERE "vehiNo" = $1 OR "agreeId" = $1',[vehi], (err, table) => {
                        db.end();
                        if(err){
                            console.log(err);
                            response.json({msg: false, data: err})
                        }else{
                            response.json({msg: true, table:table})
                        }
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    getAgreeData: function(request, response, dbconfg){
        var agreeId = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."agreementData" WHERE "agreeId" = $1',[agreeId], (err, table) => {
                        db.end();
                        if(err){
                            console.log(err);
                            response.json({msg: false, data: err})
                        }else{
                            response.json({msg: true, table:table})
                        }
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    saveData: function(request, response, dbconfg){
        var cusDeatils = request.body.cusDetails;
        var vehiDetails = request.body.vehiDetails;
        var payDetails = request.body.payDetails;
        var arr = [...payDetails, ...cusDeatils, ...vehiDetails];

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                  db.query('INSERT INTO public."agreementData"("agreeId", created, capital, period, intrest, repayment, first_rental, last_rental, name, nic, address, occupation, city, state, country, email, mobile, "vehiNo", chassis, "engineNo", capacity, modal, fuel, year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)',[...arr], (err, table) => {
                    db.end();
                    if(err){
                        console.log(err);
                        response.json({msg: false, data: err})
                      }else{
                        response.json({msg: true, table:table})
                      }
                  });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    getAgree: function(request, response, dbconfg){
        var nic = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."agreementData" INNER JOIN public."customerTable" ON public."agreementData"."nic" = public."customerTable"."nic" WHERE public."customerTable"."nic" = $1 ORDER BY "agreeId" DESC',[nic], (err, table) => {
                        if(err){
                            console.log(err);
                            response.json({msg: false, data: err})
                        }else{
                            if (table.rowCount == 0) {
                                db.query('SELECT * FROM public."customerTable" WHERE "nic" = $1',[nic], (err, table) => {
                                    db.end();
                                    if(err){
                                      console.log(err);
                                        response.json({msg: false, data: err})
                                    }else{
                                        response.json({msg: true, table:table})
                                    }
                                });
                            }else{
                                response.json({msg: true, table:table})
                            }
                        }
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    savePayment: function(request, response, dbconfg){
        var values = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error'+err);
                return console.log(err);
            }else{
                try{
                    db.query('INSERT INTO public."paymentTable"("agreeId", created, capital, period, intrest, repayment, "firstRenatl", "lastRental") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',[...values], (err, table) => {
                        db.end();
                        if(err){
                            console.log(err);
                            response.json({msg: false, data: err})
                        }else{
                            response.json({msg: true, table:table})
                        }
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    saveOther: function(request, response, dbconfg){
        var values = request.body.data;
        var isNot = true;

        console.log(values)

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error'+err);
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."cusOtherTable"', (err, table) => {
                        if(err){
                            console.log(err);
                            response.json({msg: false, data: err})
                        }else{
                            for(var i=0; i<table.rowCount; i++){
                                if(table.rows[i].agreeId === values[0]){
                                    isNot = false;
                                    break;
                                }else{
                                    isNot = true;
                                }
                            }
                            if(isNot){
                                db.query('INSERT INTO public."cusOtherTable"("agreeId", nic, name, mobile) VALUES ($1, $2, $3, $4)',[...values], (err, table) => {
                                    db.end();
                                    if(err){
                                        console.log(err);
                                        response.json({msg: false, data: err})
                                    }else{
                                        response.json({msg: true, table:table})
                                    }
                                });
                            }else{
                                response.json({msg: true, dub: true})
                            }
                        }
                    });
                    
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    getPayement: function(request, response, dbconfg){
        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error'+err);
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."paymentTable" ORDER BY "agreeId" DESC LIMIT 1', (err, table) => {
                        db.end();
                        if(err){
                            console.log(err);
                            response.json({msg: false, data: err})
                        }else{
                            response.json({msg: true, table:table})
                        }
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    
}
