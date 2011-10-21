var Popup = function(text) {
    this.element;

    this.init = function() {
        this.element = $('<div class="popup">' +
                         '  <div class="text">' + text + '</div> ' +
                         '  <ul class="buttons"></ul> ' +
                         '</div>');
        $('body').append(this.element);
    }

    this.addButton = function(title, callback) {
        var button = $('<li>' + title + '</li>')
        $('.buttons', this.element).append(button);
        button.click(callback);
    }

    this.close = function() {
        this.element.remove();
    }

    this.init();
}