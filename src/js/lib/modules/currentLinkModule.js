/*
 * Find out what the current URL is and add an .active class.
 * @module currentLinkModule
 */
var currentLinkModule = {

  options: {
    className: 'active',
    debug: true
  },

  init: function() {

    var option = this.options;

    var URL = window.location.pathname.toString();
    console.log('Page: ' + URL);

    var addClass = function(a) {
      var b = option.className;
      var c = option.debug;
      if (a.classlist) {
        if (c === true) {
          console.log(link + ' already has' + b + ' class.');
        }
      } else {
        if (c === true) {
          console.log('Adding ' + b + ' class');
        }
        a.classList.add(b);
        a.className += ' ' + b;
      }
    }

    var link;
    if (URL === '/work/') {
      link = document.querySelector('.nav-item#work');
      addClass(link);
    } else if (URL === '/about/') {
      link = document.querySelector('.nav-item#about');
      addClass(link);
    } else if (URL === '/') {
      console.log('Welcome home. No active URL.');
    } else {
      link = document.querySelector('.nav-item#writing');
      addClass(link);
    }

  }
};
