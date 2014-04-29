window.addEventListener('DOMContentLoaded', function () {

  'use strict';

  Echo.init({ offset: 100, throttle: 250 });

  /*
   * Select an element or multiple elements from the DOM.
   * @namespace $
   * @param {string} 'selector'
   */
  var $ = function(selector) {
    return document.querySelector(selector);
  };

  /*
   * Configure fit.js.
   * @module fitConfigModule

   var fitConfigModule = {
    init: function() {
      var cover = $('.portfolio-item--cover'),
          coverImg = $('.portfolio-item--cover img');
      fit(coverImg,cover).init;
    }
  };
  fitConfigModule.init();*/

  /*
   * Initialize Skrollr.
   */
  var s = skrollr.init({
    forceHeight: false,
    render: function (data) {
      //console.log(data.curTop);  // log the current viewport position
    },
    beforerender: function(data) {
      return data.curTop > data.lastTop; // only animate when scrolling down
    }
  });
  skrollr.menu.init(s, {
    animate: true,
    easing: 'sqrt',
    scale: 2,
    duration: function (currentTop, targetTop) {
      return 400
    }
  });

});
