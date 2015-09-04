var xml = require('./utility.js');

var Fraction = function () {
    var that = this;
    this.source = xml.read();
    this.details = this.source.root.fraction;
    this.titles = xml.list(this.details);
    this.add = function (req, filename) {
        var img = filename || 'default.jpg';
        that.source.root.fraction.push(
            xml.new_fraction(req.body.title, req.body.desc, img)
        );
        xml.write(that.source);
        that.details = that.source.root.fraction;
        that.titles = xml.list(that.details);
    };
};

module.exports = Fraction;