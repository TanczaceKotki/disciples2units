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
        that.save();
    };

    this.addUnit = function (req) {

        that.save();
    };

    this.editLeader = function(req) {
        that.findLeader(req);
        that.save();
    };

    this.editUnit = function(req) {
        that.findValue(req);
        that.save();
    };
    this.save = function() {
        xml.write(that.source);
        that.details = that.source.root.fraction;
        that.titles = xml.list(that.details);
    };

    this.findLeader = function(req) {
        console.log(req.body.pk);
        for (var i = 0; i < that.details.length; ++i ) {
            console.log('b');
            for (var klass in that.details[i].leaders) {
                console.log('c');
                if (that.details[i].leaders[klass].label === req.body.pk) {
                    that.source.root.fraction[i].leaders[klass][req.body.name] = req.body.value;
                    return;
                }
            }
        }
    };

    this.findValue = function(req) {
        var klasses = ['fighters', 'mages', 'rangers'];
        for (var i = 0; i < that.details.length; ++i) {
            for (var klass in klasses) {
                for (var j in that.details[i][klasses[klass]].unit) {
                    if (this.details[i][klasses[klass]].unit[j].label === req.body.pk) {
                        that.source.root.fraction[i][klasses[klass]].unit[j][req.body.name] = req.body.value;
                        return;
                    }
                }
            }
        }
    }
};

module.exports = Fraction;