var Popup = function(language) {
    this.element;
    this.language = language;

    this.init = function() {
        this.element = $('<div class="popup ' + this.language + '">' +
                         '  <ul class="buttons"></ul> ' +
                         '</div>');
        $('body').append(this.element);

        this.element.fadeIn();
    }

    this.addButton = function(cls, callback) {
        var button = $('<li class="' + cls + '"></li>')
        $('.buttons', this.element).append(button);
        button.click(callback);
    }

    this.close = function() {
        this.element.remove();
    }

    this.fadeOut = function() {
        var self = this;
        this.element.fadeOut(400, function() {
            self.close();
        })
    }

    this.init();
}