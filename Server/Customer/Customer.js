module.exports={
    saveCustomer: function(request, response, dbconfg){
        var values = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."customerTable" WHERE "nic" = $1',[values[4]], (err, table) => {
                        if(err){
                            response.json({msg: false, data: err})
                        }else{
                            if(table.rowCount === 0){
                                try{
                                    db.query('INSERT INTO public."customerTable"("cusId", title, "nameInitials", "fullName", nic, gender, occupation, address, "address_2", city, state, country, email, mobile) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',[...values], (err, table) => {
                                        db.end();
                                        if(err){
                                            response.json({msg: false, data: err})
                                        }else{
                                            response.json({msg: true, table:table})
                                        } 
                                    });
                                }catch(err){
                                    console.log(err)
                                }
                            }else{
                                response.json({msg: false, alert: 'fail', data: err})
                            }
                        } 
                    });
                }catch(err){
                    console.log(err)
                }
            }
        });
    },

    updateCustomer: function(request, response, dbconfg){
        var cusid = request.body.cusid;
        var values = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                   db.query('UPDATE public."customerTable" SET title=$2, "nameInitials"=$3, "fullName"=$4, gender=$5, occupation=$6, address=$7, address_2=$8, city=$9, state=$10, country=$11, email=$12, mobile=$13 WHERE "cusId" = $1',[cusid,...values], (err, table) => {
                        db.end();
                        if(err){
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

    searchCustomer: function(request, response, dbconfg){
        var value = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('SELECT * FROM public."customerTable" WHERE "nic" = $1',[value], (err, table) => {
                    db.end();
                    if(err){
                        response.json({msg: false, data: err})
                    }else{
                        if(table.rowCount === 0){
                            response.json({msg: false, alert: 'fail', table:table})
                        }else{
                            response.json({msg: true, table:table})
                        }
                    } 
                });
            }
        });
    }, 

    deleteCutomer: function(request, response, dbconfg){
        var value = request.body.data;

        console.log(value)
        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                db.query('DELETE FROM public."customerTable" WHERE "cusId" = $1',[value], (err, table) => {
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
}