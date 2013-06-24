describe('design_your_own', function() {

    describe('Gallery View', function() {

        beforeEach(function() {
            browser().navigateTo('/');
        });


        it('should login the user', function() {
            input("user.username").enter("Serfenia");
            input("user.password").enter("test");

            element('#loginButton').click();
            expect(element("form:last label:first").text()).toBe("Gebruikersnaam: Serfenia")
        });
    });
});