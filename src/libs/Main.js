var Main = function() {

  this.controller = false;
  this.language = null;

  this.init = function() {
    if (getCookie('language'))
      this.setLanguage(getCookie('language'));
  }

  this.switchController = function(controller, direction, var1, var2, var3, var4) {
    var main = $('.main');

    var left = 5000;
    var top2 = 5000;
    if (this.controller)
    {
      if (direction == 'left')
      {
        top2 =  main.scrollTop();
        left =  main.scrollLeft() + 1024;
      } else if (direction == 'right') {
        top2 =  main.scrollTop();
        left =  main.scrollLeft() - 1024;
      } else if (direction == 'down') {
        top2 =  main.scrollTop() + 768;
        left =  main.scrollLeft();
      } else if (direction == 'up') {
        top2 =  main.scrollTop() - 768;
        left =  main.scrollLeft();
      }
    }



    var newContent = $('<div class="content" style="position: absolute; left: ' + left + 'px; top: ' +  top2 + 'px;"></div>');
    main.append(newContent);

    if (!this.controller)
    {
      main.scrollLeft(left);
      main.scrollTop(top2);
    }

    var oldController = this.controller;

    this.controller = new controller(this, newContent, var1, var2, var3, var4);

    this.controller.events.bind('onLoad', function(event, sender) {
      if (oldController) {

        if (direction == 'left' || direction == 'right')
        {
          main.animate({ scrollLeft: left}, 200, function() {
            oldController.destroy();
          });
        } else if (direction == 'down' || direction == 'up') {
          main.animate({ scrollTop: top2}, 200, function() {
            oldController.destroy();
          });
        }

      }
    });
  }

  this.hasLanguage = function() {
    if (this.language)
      return true;

    return false;
  }

  this.getLanguage = function() {
    return this.language;
  }

  /**
   * Sets the language. The callback is used to indicate that the language
   * is now loaded and the i18n support is now usable. The first time it is
   * loaden we need to wait until it is ready, or the following pages could
   * contain errors
   */
  this.setLanguage = function(language, callback) {
    this.language = language;

    $.getJSON('translations/' + language + '.json', function(data) {
      $.i18n.setDictionary(data);
      $.i18n.setLanguage(language);

      if (callback)
        callback();
    });

    setCookie('language', this.language);
  }


  this.init();
}