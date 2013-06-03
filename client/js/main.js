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
            var inlogNav = document.getElementById("inloggen");
            inlogNav.onclick = function() {
                show();
            };

            var show = function() {
                $("#loginContainer").slideDown();
                inlogNav.onclick = function() {
                    hide();
                };
            };

            var hide = function() {
                $("#loginContainer").slideUp();
                inlogNav.onclick = function() {
                    show();
                };
            };
        };
}
