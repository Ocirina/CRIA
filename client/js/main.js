/*global Application, app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */

function EventController() {
    "use strict";

    this.addEvents = function () {
        this.addSlideEvents();
    };

    this.addSlideEvents = function () {
        this.addNavigationEvents();
    };

    this.addNavigationEvents = function () {
        this.showLoginForm();
    };

    this.showLoginForm = function () {
        var inlogNav, show, hide;

        inlogNav = document.getElementById("inloggen");
        inlogNav.onclick = function () {
            show();
        };

        show = function () {
            $("#loginContainer").slideDown();
            inlogNav.onclick = function () {
                hide();
            };
        };

        hide = function () {
            $("#loginContainer").slideUp();
            inlogNav.onclick = function () {
                show();
            };
        };
    };
}