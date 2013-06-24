describe('design_your_own', function() {

    describe('Gallery View', function() {

        beforeEach(function() {
            browser().location().path("/");
        });


        it('should filter the phone list as user types into the search box', function() {
            browser().location().path("/producten");

            expect(repeater('.case').count()).toBeGreaterThan(1);
        });
    });
});