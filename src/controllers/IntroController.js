var IntroController = function(main, content) {
  this.main = main;
  this.content = content;

  /* EVENTS */

  this.events = new EventManager(this, [
      'onLoad',
    ])

  this.init = function() {
    this.content.addClass('intro');

    var self = this;
    this.content.click(function() {
      new Sound('solved', false);

      if (self.main.hasLanguage())
        self.main.switchController(ListController, 'left');
      else
        self.main.switchController(LanguageController, 'left');
    });

    /* we need to launch is separate, of jquery will not call the triggered
       event. I don't now why, but without the setTimeout, the event is not
       triggered by jQuery */
    window.setTimeout(function() {
      self.events.trigger('onLoad');
    }, 10);
  }

  this.destroy = function() {
    this.content.remove();
  }

  this.init();
}
