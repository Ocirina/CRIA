(function() {
    var eventController = new EventController();
    eventController.addEvents();
})();


var Application = function() {
    Application.notify = function(type, message) {
        var warning = '<div style="display: none;" class="notification-' + type + '">' + message + '</div>';
        $("#notifier").children().remove();
        $("#notifier").append(warning);
        $("#notifier div").fadeIn(500);
        $("#notifier div").fadeIn(500).delay(3000).fadeOut(500);
    };
};

var application = new Application();