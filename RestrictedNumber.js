(function() {
  var RestrictedNumber;

  RestrictedNumber = (function() {
    RestrictedNumber.maximum = 0;

    RestrictedNumber.minimum = 0;

    RestrictedNumber.__current = 0;

    function RestrictedNumber(minimum, maximum, __current) {
      var ref;
      this.minimum = minimum;
      this.maximum = maximum;
      this.__current = __current != null ? __current : this.maximum;
      if (this.minimum > this.maximum) {
        ref = [this.minimum, this.maximum], this.maximum = ref[0], this.minimum = ref[1];
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
      if (this.__current + num > this.maxmimum) {
        this._remainder = this.maximum - this.__current + num;
      }
      return this.set(this.__current + num);
    };

    RestrictedNumber.prototype.sub = function(num) {
      if (this.__current - num < this.minimum) {
        this._remainder = this.minimum - (this.__current - num);
      }
      return this.set(this.__current - num);
    };

    RestrictedNumber.prototype.addOverMaximum = function(num) {
      this.maximum += num;
      return this.add(num);
    };

    RestrictedNumber.prototype.subUnderMinimum = function(num) {
      this.minimum -= num;
      return this.sub(num);
    };

    RestrictedNumber.prototype.toMaximum = function() {
      return this.set(this.maximum);
    };

    RestrictedNumber.prototype.toMinimum = function() {
      return this.set(this.minimum);
    };

    RestrictedNumber.prototype.getTotal = function() {
      return this.__current;
    };

    RestrictedNumber.prototype.getValue = function() {
      return this.getTotal();
    };

    RestrictedNumber.prototype.atMaximum = function() {
      return this.maximum <= this.getTotal();
    };

    RestrictedNumber.prototype.atMinimum = function() {
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
      return this.set(perc * (this.maximum - this.minimum) / 100);
    };

    RestrictedNumber.prototype.addPercent = function(perc) {
      return this.add(perc * (this.maximum - this.minimum) / 100);
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
