/*global Application, app, $, EventController */
/*jslint browser: true, node: true, nomen: true, plusplus: true */

(function () {
    "use strict";

    var eventController = new EventController();
    eventController.addEvents();
}());

var Application = {
    notify: function (type, message) {
        "use strict";
        var warning, notifier;

        warning = '<div style="display: none;" class="notification-' + type + '">' + message + '</div>';

        notifier = $("#notifier");
        notifier.children().remove();
        notifier.append(warning);

        $("#notifier div").fadeIn(500).delay(3000).fadeOut(500);
    }
};