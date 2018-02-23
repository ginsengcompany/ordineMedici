let express = require('express');
let router = express.Router();
let postgresConnection = require('../../../config/postgres');
let multiUser = require('../../../config/configMultiUser');


let connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    let matricola = req.body.matricola;
    let token = req.body.token;
    let organizzazione = req.body.organizzazione;

    let client = connectionPostgres();

    for(let i=0;i<multiUser.data.length;i++){

            if(multiUser.data[i].cod_org===organizzazione){

                let queryPostToken = "UPDATE "+multiUser.data[i].tb_contatti+" SET token='"+token+"' WHERE matricola='"+ matricola +"'";

                const query1 = client.query(queryPostToken);

                query1.on("row", function (row, result) {
                    result.addRow(row);
                });

                let queryPostMatricola = "SELECT * FROM "+multiUser.data[i].tb_contatti+" WHERE matricola='"+ matricola +"'";

                const query = client.query(queryPostMatricola);

                query.on("row", function (row, result) {
                    result.addRow(row);
                });

                query.on("end", function (result) {
                    let myOjb = JSON.stringify(result.rows, null, "    ");
                    let final = JSON.parse(myOjb);
                    if(final.length>0){
                        client.end();
                        return res.send(true);
                    }else{
                        client.end();
                        return res.send(false);
                    }

                });

            }
    }

});

module.exports = router;