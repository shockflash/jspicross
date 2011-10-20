  var PlayFieldModel = function() {

    /* VARS */

    this.data = {};
    this.colCount = 0;
    this.rowCount = 0;

    this.solved = false;
    this.failed = false;

    /* how many fields are filled */
    this.filledCount = 0;

    /* how many of the filled fields are checked */
    this.checkedFilledCount = 0;

    /* EVENTS */

    this.events = new EventManager(this, [
        'onSolved',
        'onFailed',
        'onMistake'
      ])

    /* FUNCTIONS */

    this.init = function() {

    }

    this.setData = function(data) {
      var self = this;

      fields = data.split("|");

      for (var y = 1; y <= fields.length; y++)
      {
        for (var x = 1; x <= fields[y-1].length; x++)
        {
          if (!this.data[x])
            this.data[x] = {};

          var value = false;
          if (fields[y-1][x-1] == 'x')
          {
            this.filledCount = this.filledCount + 1;
            value = true;
          }
          var field = new FieldModel(x, y, value);
          field.events.bind('onChecked', function(event, field) {
            self.handleOnChecked(field);
          });
          this.data[x][y] = field;
        }
      }

      /* the last values are the highest */
      this.colCount = x-1;
      this.rowCount = y-1;
    }

    this.isSolved = function() {
      return this.solved;
    }

    this.isFailed = function() {
      return this.failed;
    }

    this.setFailed = function(value) {
      this.failed = value;

      if (!value)
        this.trigger('onFailed');
    }


    this.getColCount = function() {
      return this.colCount;
    }

    this.getRowCount = function() {
      return this.rowCount;
    }

    this.getColHeaders = function() {
      var result = {};

      for (var x = 1; x <= this.colCount; x++)
      {
        result[x] = [];

        var startNew = true;
        var current = 0;
        for (var y = 1; y <= this.rowCount; y++)
        {
          if (this.data[x][y].isFilled())
            current = current + 1;

          if (!this.data[x][y].isFilled() && current > 0)
          {
            result[x].push(current);
            current = 0;
          }
        }
        if (current > 0)
          result[x].push(current);
      }

      return result;
    }

    this.getRowHeaders = function() {
      var result = {};

      for (var y = 1; y <= this.rowCount; y++)
      {
        result[y] = [];

        var startNew = true;
        var current = 0;

        for (var x = 1; x <= this.colCount; x++)
        {
          if (this.data[x][y].isFilled())
            current = current + 1;

          if (!this.data[x][y].isFilled() && current > 0)
          {
            result[y].push(current);
            current = 0;
          }
        }
        if (current > 0)
          result[y].push(current);
      }

      return result;
    }

    this.getField = function(x, y) {
      return this.data[x][y];
    }


    /**
     * React on the check of a field.
     */
    this.handleOnChecked = function(fieldModel) {
      if (fieldModel.isFilled())
        this.checkedFilledCount = this.checkedFilledCount + 1;

      if (!fieldModel.isFilled())
        this.events.trigger('onMistake', fieldModel);

      if (this.checkedFilledCount == this.filledCount)
      {
        this.solved = true;
        this.events.trigger('onSolved');
      }
    }

    this.init();
  }