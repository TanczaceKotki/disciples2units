var express = require('express');
var router = express.Router();
var fs = require('fs');
var xml2js = require('xml2js');

var xmlPath = './public/xmls/xml.xml';


/* GET home page. */
router.get('/', function(req, res) {
  var rawJSON = loadXMLDoc( xmlPath );
  res.render('index', {
    frac: fractions(rawJSON)
  })
});

router.get('/add-fraction', function(req, res){
  res.render('add-frac');
});

// GET fraction units stats
router.get('/:fraction', function(req, res) {
  var rawJSON = loadXMLDoc( xmlPath );
  var fracList = returnFractions(rawJSON);
  console.log(JSON.stringify(rawJSON));
  var cmp = fracList.indexOf(req.params.fraction);
  if (cmp > -1) {

    var details = returnFractionDetails(rawJSON, cmp);
    console.log(JSON.stringify(details.leaders.warrior_lord.lame));
    res.render('frac', {stats: details});
  } else {
    res.render('frac-404');
  }
});

router.post('/add', function(req, res) {
  var et = require('elementtree');
  var XML = et.XML;
  var ElementTree = et.ElementTree;
  var element = et.Element;
  var subElement = et.SubElement;
  var dataNew, etreeNew;
  dataNew = fs.readFileSync('./public/xmls/xml.xml').toString();
  etreeNew = et.parse(dataNew);

  fract = subElement(etreeNew._root, 'fraction');

  iframeTitle = subElement(fract, 'title');
  iframeTitle.text = req.body.title;

  //iframeUrl1 = subElement(fract, 'url1');
  //iframeUrl1.text = 'a';
  //
  //iframeUrl2 = subElement(fract, 'url2');
  //iframeUrl2.text = 'a';

  etree = new ElementTree(etreeNew._root);
  xml = etree.write({'xml_declaration': false});
  //var product = calc.sub(parseInt(req.body.a), parseFloat(req.body.b));
  res.redirect('/');
});

module.exports = router;


function loadXMLDoc(filePath) {
  try {
    var fileData = fs.readFileSync(filePath, 'ascii');
    var parser = new xml2js.Parser({explicitArray : false});
    parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
      json = result;
    });

    console.log("File '" + filePath + "/ was successfully read.\n");
    return json;
  } catch (ex) {console.log(ex)}
}

function fractions(rawJSON) {
  var fractions = [];
  rawJSON.root.fraction.forEach(function(entry){
    fractions.push(entry);
  });
  return fractions;
}

function returnFractionDetails(rawJSON, fracIndex) {
  return rawJSON.root.fraction[fracIndex];
}