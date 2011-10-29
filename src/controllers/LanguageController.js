var LanguageController = function(main, content) {
  this.main = main;
  this.content = content;

  /* EVENTS */

  this.events = new EventManager(this, [
      'onLoad',
    ])

  this.init = function() {
    this.content.addClass('language');

    this.content.append($('<div class="selectlang">Select language / Sprache wählen</div>'));

    var list = $('<ul class="list"></ul>');
    this.content.append(list);

    var en = $('<li class="en"></li>');
    en.data('language', 'en');
    list.append(en);

    var de = $('<li class="de"></li>');
    de.data('language', 'de');
    list.append(de);

    var self = this;
    $('li', this.content).click(function() {
      self.main.setLanguage($(this).data('language'), function() {
        self.main.switchController(SelectController, 'left');
      });
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
