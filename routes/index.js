var express = require('express');
var router = express.Router();
var fs = require('fs');
var xml2js = require('xml2js');

var xmlPath = './public/xml/xml.xml';
var fractionList = [];


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
  var fract = fracList(rawJSON);
  var cmp = fract.indexOf(req.params.fraction);
  if (cmp > -1) {
    var details = returnFractionDetails(rawJSON, cmp);
    res.render('frac', {frac: fractions(rawJSON), stats: details});
  } else {
    res.render('frac-404', {frac: fractions(rawJSON)});
  }
});

router.post('/add', function(req, res) {
  var et = require('elementtree');
  var XML = et.XML;
  var ElementTree = et.ElementTree;
  var element = et.Element;
  var subElement = et.SubElement;
  var dataNew, etreeNew;
  dataNew = fs.readFileSync('./public/xml/xml.xml').toString();
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

function fracList(rawJSON) {
  if (fractionList.length == 0) {
    rawJSON.root.fraction.forEach(function(entry){
      fractionList.push(entry.title);
    });
  }
  return fractionList;
}

function returnFractionDetails(rawJSON, fracIndex) {
  return rawJSON.root.fraction[fracIndex];
}