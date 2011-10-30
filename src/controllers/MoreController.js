var MoreController = function(main, content) {
  this.main = main;
  this.content = content;

  /* EVENTS */

  this.events = new EventManager(this, [
      'onLoad',
    ])

  this.init = function() {

     this.content.addClass('more').addClass('text');

     var html = '<div class="backbutton ' + $.i18n.getLanguage() + '"></div>' +
                '<div class="bg"></div>' +
                '<div class="text"> Bla bla bla bla bla</div>';
     this.content.html(html);

     var self = this;
     $('.backbutton').click(function() {
       self.main.switchController(SelectController, 'right');
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