var HowToPlayController = function(main, content, returnController, returnPuzzle) {
  this.main = main;
  this.content = content;
  this.returnController = returnController;
  this.returnPuzzle = returnPuzzle; /* unset if not from PuzzleController */

  /* EVENTS */

  this.events = new EventManager(this, [
      'onLoad',
    ])

  this.init = function() {
     if (!this.returnController)
       this.returnController = SelectController;

     this.content.addClass('howtoplaycon').addClass('text');

     setCookie('howtoplay', 1);

     var html = '<div class="backbutton ' + $.i18n.getLanguage() + '"></div>' +
                '<div class="bg"></div>' +
                '<h1>' + $.i18n._('howtoplay') + ' (1/2)</h1>' +
                '<div class="text page1">' +
                '  Ziel eines Picross ist es das Bild im Rätsel nur anhand der Spalten- und Zeilenhilfen aufzulösen.<br><br>' +
                '  Wieviele Felder in einer Spalte oder Zeile gefüllt sind wird durch die Zahlen in den jeweiligen Spalte/Zeile angegeben. ' +
                '  Ein Beispiel: <br><br>' +

                '  <table class="picross" style="float: left; margin-right: 100px;" cellspacing="0"> ' +
                '    <tr><td colspan="6" style="border: 0">Startzustand</td> ' +
                '    <tr> ' +
                '      <td></td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '    </tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">5</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '  </table>' +

                '  <table class="picross" style="float: left; margin-right: 100px;" cellspacing="0"> ' +
                '    <tr><td colspan="6" style="border: 0">Lösung</td> ' +
                '    <tr> ' +
                '      <td></td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '    </tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">5</td><td class="solved"></td><td class="solved"></td><td class="solved"></td><td class="solved"></td><td class="solved"></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '  </table>' +
                '  <br style="clear: left"><br>' +
                '  Ist die Zahl größer als 1, so sind die damit gemeinten Felder immer aufeinanderfolgend. Eine 2 meint also nicht ein Feld oben und eines unten, <br>sondern z.B. 2 oben oder 2 unten.' +

                '  <div class="next page1"></div>' +

                '</div>' +

                '<div class="text page2" style="display: none">' +
                '  Steht mehr als eine Zahl in einer Zeile oder Spalte, so sind entsprechend viele zusammenhängende Blöcke auszufüllen und von anderen solchen zusammenhängenden Blöcken immer durch ein leeres Feld getrennt.<br><br> Beispiel: <br><br>' +
                '  <table class="picross" style="float: left; margin-right: 100px;" cellspacing="0"> ' +
                '    <tr><td colspan="6" style="border: 0">Startzustand</td> ' +
                '    <tr> ' +
                '      <td></td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1<br>1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '    </tr> ' +
                '    <tr><td class="head">2</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">&nbsp;2&nbsp;2&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '  </table>' +

                '  <table class="picross" style="float: left; margin-right: 100px;" cellspacing="0"> ' +
                '    <tr><td colspan="6" style="border: 0">Lösung</td> ' +
                '    <tr> ' +
                '       <td></td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1<br>1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '      <td class="head">1</td> ' +
                '    </tr> ' +
                '    <tr><td class="head">2</td><td></td><td class="solved"></td><td class="solved"></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">&nbsp;2&nbsp;2&nbsp;</td><td class="solved"></td><td class="solved"></td><td></td><td class="solved"></td><td class="solved"></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '    <tr><td class="head">0</td><td></td><td></td><td></td><td></td><td></td></tr> ' +
                '  </table>' +

                '  <br style="clear: left">' +
                '  <br><br><span class="puzzle1">Versuch es selbst und löse das erste Rätsel</span>' +
                '  <div class="back page2"></div>' +

                '</div>';

     this.content.html(html);

     var self = this;
     $('.backbutton').click(function() {
       self.main.switchController(self.returnController, 'right', self.returnPuzzle);
     });

     $('.puzzle1').click(function() {
       var pl = new PuzzleListModel();

       pl.getListReq(function(list) {
         var pr = new PuzzlePreview($('.previewlist'), list[0])
         self.main.switchController(PuzzleController, 'right', pr);
       });
     });

     $('.next.page1').click(function() {
       $('.text.page1').hide();
       $('.text.page2').show();

       $('h1').html($.i18n._('howtoplay') + ' (2/2)');
     });

     $('.back.page2').click(function() {
       $('.text.page2').hide();
       $('.text.page1').show();

       $('h1').html($.i18n._('howtoplay') + ' (1/2)');
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