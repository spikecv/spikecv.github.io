(function ($) {
  $.countdown = function (el, options) {
    var getDateData,
        _this = this;
    this.el = el;
    this.$el = $(el);
    this.$el.data("countdown", this);
    this.init = function () {
      _this.options = $.extend({}, $.countdown.defaultOptions, options);
      if (_this.options.refresh) {
        _this.interval = setInterval(function () {
          return _this.render();
        }, _this.options.refresh);
      }
      _this.render();
      return _this;
    };
    getDateData = function (endDate) {
      var dateData, diff;
      endDate = $.isPlainObject(_this.options.date) ? new Date(_this.options.date) : new Date(_this.options.date);
      diff = (endDate.getTime() - new Date().getTime()) / 1000;
      if (diff <= 0) {
        diff = 0;
        if (_this.interval) {
          _this.stop();
        }
        _this.options.onEnd.apply(_this);
      }
      dateData = {
        years: 0,
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
        millisec: 0
      };
      if (diff >= (365.25 * 86400)) {
        dateData.years = Math.floor(diff / (365.25 * 86400));
        diff -= dateData.years * 365.25 * 86400;
      }
      if (diff >= 86400) {
        dateData.days = Math.floor(diff / 86400);
        diff -= dateData.days * 86400;
      }
      if (diff >= 3600) {
        dateData.hours = Math.floor(diff / 3600);
        diff -= dateData.hours * 3600;
      }
      if (diff >= 60) {
        dateData.min = Math.floor(diff / 60);
        diff -= dateData.min * 60;
      }
      dateData.sec = Math.floor(diff);
      return dateData;
    };
    this.leadingZeros = function (num, length) {
      if (length == null) length = 2;
      num = String(num);
      while (num.length < length) {
        num = "0" + num;
      }
      return num;
    };
    this.update = function (newDate) {
      _this.options.date = newDate;
      return _this;
    };
    this.render = function () {
      _this.options.render.apply(_this, [getDateData(_this.options.date)]);
      return _this;
    };
    this.stop = function () {
      if (_this.interval) {
        clearInterval(_this.interval);
      }
      _this.interval = null;
      return _this;
    };
    this.start = function (refresh) {
      if (refresh == null) {
        refresh = _this.options.refresh || $.countdown.defaultOptions.refresh;
      }
      if (_this.interval) {
        clearInterval(_this.interval);
      }
      _this.render();
      _this.options.refresh = refresh;
      _this.interval = setInterval(function () {
        return _this.render();
      }, _this.options.refresh);
      return _this;
    };
    return this.init();
  };

  $.countdown.defaultOptions = {
    date: new Date(2025, 4, 1, 8, 8, 0), // May 1, 2025
    refresh: 1000,
    onEnd: $.noop,
    render: function (date) {
      $(this.el).html(
        "<div>" + date.days + "<span> days</span></div>" +
        "<div>" + this.leadingZeros(date.hours, 2) + "<span> hrs</span></div>" +
        "<div>" + this.leadingZeros(date.min, 2) + "<span> min</span></div>" +
        "<div>" + this.leadingZeros(date.sec, 2) + "<span> sec</span></div>"
      );
    }
  };

  $.fn.countdown = function (options) {
    return $.each(this, function (i, el) {
      var $el = $(el);
      if (!$el.data('countdown')) {
        return $el.data('countdown', new $.countdown(el, options));
      }
    });
  };
})(jQuery);