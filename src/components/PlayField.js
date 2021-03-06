  var PlayField = function(element, model) {

    /* VARS */

    this.element = element;
    this.model = model;
    this.fields = {};

    this.colHeaders = {};
    this.rowHeaders = {};

    this.mode = 'check';

    /* set on true on mousedown, and false on leave or up */
    this.drag = false;

    /* if marking is draged, the initial field sets the mode
         '' = no drag mode defined, the next one defines it
         'clear' = remove marks
         'set' = set marks
       */
    this.dragMarkMode = '';


    /* FUNCTIONS */

    this.init = function() {
      var self = this;
      this.model.events.bind('onSolved', function(event, sender) {
        self.handleOnSolved();
      });

      element.mouseleave(function() {
        self.drag = false;
        self.dragMarkMode = '';
      });

      element.mouseup(function() {
        self.drag = false;
        self.dragMarkMode = '';
      });

      $('#playfieldstyle').remove();
      $('head').append('<style id="playfieldstyle"></style>');      
    }

    /* Called by a field when mouse down is called.
       Since the field is called first, but the playfield must react first,
       the field informs the playfield, instead of an own mousedown event
       listener in the playfield */
    this.startMouseDown = function() {
      this.dragMarkMode = '';
      this.drag = true;
    }

    this.getDrag = function() {
      return this.drag;
    }

    this.getDragMarkMode = function() {
      return this.dragMarkMode;
    }

    this.setDragMarkMode = function(mode) {
      if (this.drag)
        this.dragMarkMode = mode;
    }

    this.draw = function() {
      var self = this;

      var colHeader = this.model.getColHeaders();
      var rowHeader = this.model.getRowHeaders();

      /* first we draw the col headers */
      var row = $('<tr><td class="corner"></td></tr>');
      for (var i = 1; i <= this.model.getColCount(); i++)
      {
        var headerData = '';
        if (colHeader[i].length > 0)
          headerData = '<div>' + colHeader[i].join('</div><div>') + '</div>';

        var td = $('<td>' + headerData + '</td>');
        row.append(td);
        this.colHeaders[i] = new Header(td, 'col', i, this.model);
      }
      this.element.append(row);

      /* now we draw the fields and the row headers */
      for (var y = 1; y <= this.model.getRowCount(); y++)
      {

        var row = $('<tr></tr>');

        /* the row header */

        var headerData = '';
        var roeHeaderReverse = rowHeader[y].reverse(); /* need to reverse for float: right in design */
        if (roeHeaderReverse.length > 0)
          headerData = '<div>' + roeHeaderReverse.join('</div><div>') + '</div>';

        var td = $('<td>' + headerData + '</td>');
        row.append(td);
        this.rowHeaders[y] = new Header(td, 'row', y, this.model);

        for (var x = 1; x <= this.model.getColCount(); x++)
        {
          if (!this.fields[x])
            this.fields[x] = {};

          var f = $('<td></td>');
          row.append(f);

          var field = new Field(x, y, f, this, this.model.getField(x, y));

          field.events.bind('onChecked', function(event, sender) {
            self.colHeaders[sender.getX()].check();
            self.rowHeaders[sender.getY()].check();

            var percent = (self.model.getCheckedFilledCount() / self.model.getFilledCount() * 100);


            if (percent < 10)
              self.color = 'fff0d5';
            else if (percent < 20) 
              self.color = 'ffe7bc';
            else if (percent < 30) 
              self.color = 'ffdfa7';
            else if (percent < 40) 
              self.color = 'ffd790';
            else if (percent < 50) 
              self.color = 'ffcf7b';
            else if (percent < 60) 
              self.color = 'ffc867';
            else if (percent < 70) 
              self.color = 'ffc154';
            else if (percent < 80) 
              self.color = 'ffb73a';
            else if (percent < 90) 
              self.color = 'ffaf24';
            else if (percent < 99) 
              self.color = 'ffa912';

            $('#playfieldstyle').html('.playfield .checked {background-color: #' + self.color + ';}');
          });

          this.fields[x][y] = field;
        }
        this.element.append(row);
      }
    }

    this.handleOnSolved = function() {
      this.element.addClass('solved');
    }

    this.getField = function(x, y) {
      return this.fields[x][y];
    }

    this.getModel = function() {
      return this.model;
    }

    this.setMode = function(mode) {
      this.mode = mode;
    }

    this.getMode = function() {
      return this.mode;
    }


    this.init();
  }