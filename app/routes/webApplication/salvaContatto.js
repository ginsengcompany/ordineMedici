let express = require('express');
let router = express.Router();
let postgresConnection = require('../../../config/postgres');
let moment = require('moment');
let multiUser = require('../../../config/configMultiUser');

let connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    let datiContatto = req.body;

    let organizzazione = req.session.cod_org;

    let client = connectionPostgres();

    for(let i=0;i<multiUser.data.length;i++) {

        if (multiUser.data[i].cod_org === organizzazione) {

            let queryPostContatto = "INSERT INTO "+multiUser.data[i].tb_contatti+" " +
                "(nome, cognome, specializzazione, provincia, mail, matricola, numero_telefono, pec)" +
                "VALUES (" +
                "'" + datiContatto.nome        +"', " +
                "'" + datiContatto.cognome   +"', " +
                "'" + datiContatto.specializzazione         +"', " +
                "'" + datiContatto.provincia  +"', " +
                "'" + datiContatto.mail      +"', " +
                "'" + datiContatto.matricola      +"', " +
                "'" + datiContatto.numero_telefono      +"', " +
                "'" + datiContatto.pec   +"')";

            const query = client.query(queryPostContatto);

            query.on("row", function (row, result) {
                result.addRow(row);
            });

            query.on("end", function (result) {
                let myOjb = JSON.stringify(result.rows, null, "    ");
                let final = JSON.parse(myOjb);
                client.end();
                return res.json(final);
            });

        }
    }


});

module.exports = router;