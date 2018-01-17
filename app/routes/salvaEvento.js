var express = require('express');
var router = express.Router();
var postgresConnection = require('../../config/postgres');
var moment = require('moment');

var connectionPostgres = function () {
    return postgresConnection();
};

router.post('/',function (req, res, next) {
    var datiEvento = req.body;
    var dataInizio = datiEvento.data.date;
    var dataIni = moment(dataInizio).format();
    var dataFine = datiEvento.dataFine.date;
    var dataFin = moment(dataFine).format();

    function replaceAll (search, replacement, string) {
        var target = string;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    var queryPostEvento = "INSERT INTO tb_landing_evento " +
        "(titolo, sottotitolo, data, data_fine, luogo, informazioni, relatori, descrizione, immagine)" +
        "VALUES (" +
        "'" + replaceAll("'", "`",datiEvento.titolo)  +"', " +
        "'" + replaceAll("'", "`",datiEvento.sottotitolo) +"', " +
        "'" + dataIni                  +"', " +
        "'" + dataFin                  +"', " +
        "'" + replaceAll("'", "`",datiEvento.luogo) +"', " +
        "'" + replaceAll("'", "`",datiEvento.informazioni)  +"', " +
        "'" + replaceAll("'", "`",datiEvento.relatori)    +"', " +
        "'" + replaceAll("'", "`",datiEvento.descrizione)    +"', " +
        "'" + replaceAll("'", "`",datiEvento.immagine)  +"')";

    var client = connectionPostgres();


    const query = client.query(queryPostEvento);

    query.on("row", function (row, result) {
        result.addRow(row);
    });

    query.on("end", function (result) {
        var myOjb = JSON.stringify(result.rows, null, "    ");
        var final = JSON.parse(myOjb);
        return res.json(final);
        client.end();
    });


});

module.exports = router;