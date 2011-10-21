var PuzzlePreview = function(parent, model) {

    /* VARS */

    this.parent = parent;
    this.element;
    this.canvas;
    this.model = model;

    /* size of the canvas. Not part of the css, since we need to calc with this
       value. Other sizes:

       */
    this.size = 90;

    /* EVENTS */

    this.events = new EventManager(this, [
        'onSelected'
      ])

    /* FUNCTIONS */

    this.init = function() {
      this.element = $('<div class="puzzle preview"><div class="title">' + $.i18n._('unsolved') + '</div></div>');
      this.parent.append(this.element);

      this.canvas = $('<canvas width="' + this.size + '" height="' + this.size + '"></canvas>');
      this.element.append(this.canvas);

      var self = this;
      this.canvas.click(function() {
        self.events.trigger('onSelected', self);
      });

      if (this.model.isSolved())
      {
        var title = 'title_' + $.i18n.getLanguage();
        $('.title', this.element).html(this.model.getData()[title]);
        this.draw();
      } else {
        this.element.addClass('unsolved');
      }
    }

    this.draw = function() {
      var c = this.canvas[0].getContext("2d");
      var data = this.model.getField();

      var xMulti = this.size / this.model.getRows();
      var yMulti = this.size / this.model.getCols();

      c.fillStyle = "brown"

      for (var x = 1; x <= this.model.getCols(); x++)
      {
        for (var y = 1; y <= this.model.getRows(); y++)
        {
          if (data[y-1][x-1] != 'x')
            continue;

          c.beginPath();
          c.rect(x * xMulti - xMulti, y * yMulti - yMulti, xMulti, yMulti);
          c.closePath();
          c.fill();
        }
      }
    }

    this.getModel = function() {
      return this.model;
    }

    this.init();
}