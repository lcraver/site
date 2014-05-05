/* Read and write cookies on a site
 */
var cookie = {

    options: {
      debug: true,
      domain: 'http://.pburtchaell.com' ||,
    },

    /**
     * @method cookie.read
     *
     * @param: undefined
     */
    read: function () {

      if (this.options.debug === true) console.log('Reading the cookies');

      var cookies = document.cookie;
      var array;
      array = cookies.split(';');

      for (var i=0; i < array.length; i++) {
        key = array[0].split('=')[0];
        value = array[1].split('=')[1];
        if (this.options.debug === true) console.log('Key is: ' + key + '. Value is: ' + value + '.');
      }

    },

    /**
     * @method cookie.write
     *
     * @param: key (string)
     * @param: value (string)
     */
    write: function (key,value) {
      document.cookie =
        '"' + key + '=' + value + '"';
       if (this.options.debug === true) console.log('Cookie written');
    },

    clear: function () {

    }

  };
  cookie.write('aw yeah','yolo');
  cookie.read();
