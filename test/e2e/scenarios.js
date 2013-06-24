describe('design_your_own', function() {

    describe('User functions', function() {

        beforeEach(function() {
            browser().navigateTo('/');
        });


        it('should login the user', function() {
            input("user.username").enter("Serfenia");
            input("user.password").enter("test");

            element('#loginButton').click();

            expect(element("form:last label:first").text()).toBe("Gebruikersnaam: Serfenia");
        });
    });
});