var main = require('../MainTasks/main');

module.exports={
    saveVehicals: function(request, response, dbconfg){
        var nic = request.body.nic;
        var vehicals = request.body.vehiData;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('INSERT INTO public."vehicalsTable"( id, "vehiNo", chassis, "engineNo", capacity, make, modal, fuel, year, "cusNic", "logTime") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',[...vehicals, nic, main.getTime()], (err, table) => {
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

    getVehicals: function(request, response, dbconfg){

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."vehicalsTable" INNER JOIN public."customerTable" ON public."vehicalsTable"."cusNic" = public."customerTable".nic', (err, table) => {
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

    getByNicVehical: function(request, response, dbconfg){
        nic = request.body.nic;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."vehicalsTable" INNER JOIN public."customerTable" ON public."vehicalsTable"."cusNic" = public."customerTable".nic WHERE "cusNic" = $1',[nic], (err, table) => {
                        db.end();
                        if(err){
                            console.log(err)
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

    searchVehical: function(request, response, dbconfg){
        var vehi = request.body.data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('SELECT * FROM public."vehicalsTable" INNER JOIN public."customerTable" ON public."vehicalsTable"."cusNic" = public."customerTable".nic WHERE "vehiNo" = $1',[vehi], (err, table) => {
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

    updateVehicals: function(request, response, dbconfg){
        var vehiNo = request.body.vehiNo;
        var vehicals = request.body.Data;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('UPDATE public."vehicalsTable" SET "vehiNo"=$2, chassis=$3, "engineNo"=$4, capacity=$5, make=$6, modal=$7, fuel=$8, year=$9, "logTime"=$10 WHERE "vehiNo"=$1',[vehiNo, ...vehicals, main.getTime()], (err, table) => {
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

    deleteVehicals: function(request, response, dbconfg){
        var vehiNo = request.body.vehiNo;

        dbconfg.connect((err, db, done) =>{
            if(err){
                console.log('Conection Error');
                return console.log(err);
            }else{
                try{
                    db.query('DELETE FROM public."vehicalsTable" WHERE "vehiNo" = $1',[vehiNo], (err, table) => {
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
    }
}