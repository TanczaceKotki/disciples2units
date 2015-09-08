var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');
var fraction = require('../models/fraction');
var f = new fraction();
var filename = '';

router.use(multer({ dest: './public/images/start',
  onFileUploadComplete: function (file) {
    filename = file.name;
  }
}));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {frac: f.details})
});

// GET fraction units stats
router.get('/:fracTitle', function(req, res) {
  var cmp = f.titles.indexOf(req.params.fracTitle);
  if (cmp > -1) {
    res.render('frac', {frac: f.details, stats: f.details[cmp]});
  } else {
    res.render('frac-404', {frac: f.details});
  }
});

router.post('/add', function(req, res) {
  f.add(req, filename);
  res.redirect('/');
  filename = '';
});

module.exports = router;

