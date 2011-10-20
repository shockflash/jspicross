  var TimerModel = function(playFieldModel) {

    /* VARS */

    this.playFieldModel = playFieldModel;
    this.maxTime = (60*30);
    this.time = 0;
    this.mistakeTime = 5;

    /* EVENTS */

    this.events = new EventManager(this, [
        'onTime',
        'onTimeout',
      ])

    /* FUNCTIONS */

    this.init = function() {
      var self = this;

      /* event listeners */

      window.setTimeout(function() {
        self.onTime();
      }, 1000);

      this.playFieldModel.events.bind('onMistake', function() {
        self.handleOnMistake();
      });


    }

    this.onTime = function() {
      this.time = this.time + 1;

      this.events.trigger('onTime', this.time);

      var self = this;
      window.setTimeout(function() {
        self.onTime();
      }, 1000);
    }

    this.handleOnMistake = function() {
      this.mistakeTime = this.mistakeTime * 2;

      this.time = this.time + this.mistakeTime;
      this.events.trigger('onTime', this.time);



      if (this.maxTime < this.time) {
        this.playFieldModel.setFailed(true);
        this.events.trigger('onTimeout', this.time);
      }
    }

    this.init();

  }