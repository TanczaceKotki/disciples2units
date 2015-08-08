var Fraction = function () {};

Fraction.prototype.getXML = function () {
    try {
        var json;
        var xml2js = require('xml2js');
        var fs = require('fs');
        var fileData = fs.readFileSync('./public/xml/xml.xml', 'ascii');
        var parser = new xml2js.Parser({explicitArray : false});
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = result;
        });
        return json.root.fraction;
    } catch (ex) {console.log(ex)}
};

Fraction.prototype.rawJSON = Fraction.prototype.getXML();

Fraction.prototype.list = function () {
    var f = [];
    Fraction.prototype.rawJSON.forEach(function(entry){
        f.push(entry.title);
    });
    return f;
};

Fraction.prototype.titles = Fraction.prototype.list();

module.exports = new Fraction();
