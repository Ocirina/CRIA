(function() {
    var eventController = new EventController();
    eventController.addEvents();
})();


var Application = function() {
    this.notify = function(type, message) {
        var warning = '<div class="notification-' + type + '">' + message + '</div>';
        $("#notifier").append(warning);
    }
};

var application = new Application();