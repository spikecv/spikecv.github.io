// Simple replacement for countdown.js
(function($) {
  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }

  $.fn.simpleCountdown = function(options) {
    const settings = $.extend({
      date: '2025-05-01T08:08:00',
      refresh: 1000
    }, options);

    return this.each(function() {
      const $el = $(this);

      function update() {
        const t = getTimeRemaining(settings.date);

        if (t.total <= 0) {
          clearInterval(interval);
          t.days = t.hours = t.minutes = t.seconds = 0;
        }

        $el.html(
          '<div>' + t.days + '<span>days</span></div>' +
          '<div>' + padZero(t.hours) + '<span>hrs</span></div>' +
          '<div>' + padZero(t.minutes) + '<span>min</span></div>' +
          '<div>' + padZero(t.seconds) + '<span>sec</span></div>'
        );
      }

      update();
      const interval = setInterval(update, settings.refresh);
    });
  };
})(jQuery);
