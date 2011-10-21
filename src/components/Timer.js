

  var Timer = function(element, model, playFieldModel) {
    this.element = element;
    this.model = model;
    this.playFieldModel = playFieldModel;
    this.active = true;

    /* FUNCTIONS */

    this.init = function() {
      var self = this;

      /* event listeners */

      this.model.events.bind('onTime', function(event, sender, time) {
        self.handleOnTime(time);
      });

      this.model.events.bind('onTimeout', function(event, sender, time) {
        self.handleOnTimeOut(time);
      });

      this.playFieldModel.events.bind('onSolved', function(event, sender, time) {
        self.active = false;
      });

      /* init timer design */
      this.handleOnTime(0);
    }

    this.getHumanReadable = function(time) {
      var seconds = time % 60
      var rest = time / 60;
      var minutes = Math.floor(rest % 60)

      if (seconds < 10)
        seconds = '0' + seconds
      return minutes + ':' + seconds;
    }

    this.handleOnTime = function(time) {
      if (this.active)
        this.element.html($.i18n._('time') + ':<br> ' + this.getHumanReadable(time));
    }

    this.handleOnTimeOut = function(time) {
      this.active = false;
    }

    this.init();

  }