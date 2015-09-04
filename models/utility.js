var xml2js = require('xml2js');
var fs = require('fs');

exports.read = function () {
    try {
        var json;
        var fileData = fs.readFileSync('./public/xml/xml.xml', 'ascii');
        var parser = new xml2js.Parser({explicitArray : false});
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            json = result;
        });
        return json;
    } catch (ex) {console.log(ex)}
};

exports.list = function (details) {
    var f = [];
    details.forEach(function (entry) {
        f.push(entry.title);
    });
    return f;
};

exports.write = function (obj) {
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.writeFileSync('./public/xml/xml.xml', xml);
};

exports.new_fraction = function (title, desc, img) {
    return {
        'title': title,
        'description': desc,
        'city_img': img,
        'leaders': {
            'warrior_lord': {
                'label': '',
                'flying': ''
            },
            'mage_lord': {
                'label': '',
                'flying': ''
            },
            'guildmaster': {
                'label': '',
                'flying': ''
            },
            'champion': {
                'label': '',
                'flying': ''
            }
        },
        'fighters': {
            'unit': []
        },
        'mages': {
            'unit': []
        },
        'rangers': {
            'unit': []
        }
    };
};
