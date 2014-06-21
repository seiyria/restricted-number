(function() {
  var RestrictedNumber;

  RestrictedNumber = (function() {
    RestrictedNumber.maximum = 0;

    RestrictedNumber.minimum = 0;

    RestrictedNumber.__current = 0;

    RestrictedNumber.booster = 0;

    function RestrictedNumber(minimum, maximum, __current, booster) {
      var _ref;
      this.minimum = minimum;
      this.maximum = maximum;
      this.__current = __current != null ? __current : this.maximum;
      this.booster = booster != null ? booster : 0;
      if (this.minimum > this.maximum) {
        _ref = [this.minimum, this.maximum], this.maximum = _ref[0], this.minimum = _ref[1];
      }
      this.set(this.__current);
    }

    RestrictedNumber.prototype.set = function(num) {
      num = Math.min(num, this.maximum);
      num = Math.max(num, this.minimum);
      this.__current = num;
      return this;
    };

    RestrictedNumber.prototype.add = function(num) {
      return this.set(this.__current + num);
    };

    RestrictedNumber.prototype.sub = function(num) {
      return this.add(-num);
    };

    RestrictedNumber.prototype.addAndBound = function(num) {
      this.maximum += num;
      return this.add(num);
    };

    RestrictedNumber.prototype.subAndBound = function(num) {
      this.minimum -= num;
      return this.sub(num);
    };

    RestrictedNumber.prototype.toMaximum = function(num) {
      return this.add(this.maximum);
    };

    RestrictedNumber.prototype.toMinimum = function(num) {
      return this.sub(this.maximum);
    };

    RestrictedNumber.prototype.getTotal = function() {
      return this.__current + this.booster;
    };

    RestrictedNumber.prototype.getValue = function() {
      return this.getTotal();
    };

    RestrictedNumber.prototype.atMax = function() {
      return this.maximum <= this.getTotal();
    };

    RestrictedNumber.prototype.atMin = function() {
      return this.minimum >= this.getTotal();
    };

    RestrictedNumber.prototype.equals = function(num) {
      return this.getTotal() === num;
    };

    RestrictedNumber.prototype.greaterThan = function(num) {
      return this.getTotal() > num;
    };

    RestrictedNumber.prototype.gte = function(num) {
      return this.getTotal() >= num;
    };

    RestrictedNumber.prototype.lessThan = function(num) {
      return !this.gte(num);
    };

    RestrictedNumber.prototype.lte = function(num) {
      return !this.greaterThan(num);
    };

    RestrictedNumber.prototype.setToPercent = function(perc) {
      return this.set(perc * this.maximum / 100);
    };

    RestrictedNumber.prototype.addPercent = function(perc) {
      return this.add(perc * this.maximum / 100);
    };

    RestrictedNumber.prototype.subPercent = function(perc) {
      return this.addPercent(-perc);
    };

    RestrictedNumber.prototype.asPercent = function() {
      return Math.floor(this.getTotal() / this.maximum * 100);
    };

    RestrictedNumber.prototype.greaterThanPercent = function(perc) {
      return this.asPercent() > perc;
    };

    RestrictedNumber.prototype.gtePercent = function(perc) {
      return this.asPercent() >= perc;
    };

    RestrictedNumber.prototype.lessThanPercent = function(perc) {
      return !this.gtePercent(perc);
    };

    RestrictedNumber.prototype.ltePercent = function(perc) {
      return !this.greaterThanPercent(perc);
    };

    RestrictedNumber.prototype.equalsPercent = function(perc) {
      return this.asPercent() === perc;
    };

    return RestrictedNumber;

  })();

  module.exports = RestrictedNumber;

}).call(this);
