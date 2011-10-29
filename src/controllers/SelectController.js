var SelectController = function(main, content) {
  this.main = main;
  this.content = content;

  /* EVENTS */

  this.events = new EventManager(this, [
      'onLoad',
    ])

  this.init = function() {

     this.content.addClass('select');

     var html = '<ul class="buttons ' + $.i18n.getLanguage() + '">' +
                  '<li class="list"></li>' +
                  '<li class="howtoplay"></li>' +
                  '<li class="morepuzzles"></li>' +
                  '<li class="changelanguage"></li>' +
                '</ul>';
     this.content.html(html);

     var self = this;
     $('.list').click(function() {
       self.main.switchController(ListController, 'left');
     });

     $('.howtoplay').click(function() {
       self.main.switchController(HowToPlayController, 'left', SelectController);
     });

     $('.morepuzzles').click(function() {
       self.main.switchController(MoreController, 'down');
     });

     $('.changelanguage').click(function() {
       self.main.switchController(LanguageController, 'right');
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