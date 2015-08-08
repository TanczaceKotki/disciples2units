var express = require('express');
var router = express.Router();
var fs = require('fs');
var f = require('../models/form');
var rawJSON = f.getXML();
var fractionList = f.list();


/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', {
    frac: rawJSON
  })
});

router.get('/add-fraction', function(req, res){
  res.render('add-frac');
});

// GET fraction units stats
router.get('/:fraction', function(req, res) {
  var cmp = fractionList.indexOf(req.params.fraction);
  if (cmp > -1) {
    res.render('frac', {frac: rawJSON, stats: rawJSON[cmp]});
  } else {
    res.render('frac-404', {frac: rawJSON});
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

