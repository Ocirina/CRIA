function EventController() {
        this.addEvents = function() {
            this.addSlideEvents();
        };

        this.addSlideEvents = function() {
            this.addNavigationEvents();
        };

        this.addNavigationEvents = function () {
            this.showLoginForm();
        };

        this.showLoginForm = function() {
            document.getElementById("inloggen").onclick = function() {
                $("#loginContainer").slideDown();
            }
        };
}
