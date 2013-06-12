app.controller('DesignCtrl', function($scope, $location, $http, $resource, $routeParams) {
    /**
     * Set the certain type of phone.
     *
     * @param {Number} phoneId
     */
    $scope.activatePhone = function(phoneId) {
        $scope.phone.phone = phoneId;

        $.event.trigger('StartEditor');

        $scope.backgroundsRowOne = [];
        $scope.backgroundsRowTwo = {};

        $scope.fillBackgrounds();
    };

    /**
     * Set the Case type id.
     *
     * @param {Number} caseTypeId
     */
    $scope.setCaseType = function(caseTypeId) {
        $scope.phone.case = caseTypeId;
    };

    $scope.getCanvasDesign = function() {
        if(window.sessionStorage["loggedInUser"]) {
            var caseId = $routeParams.id,

                Design = $resource('http://autobay.tezzt.nl\\:43083/casedesign/' + caseId,{},
                {charge: {method:'GET', params:{charge:true}}}
            );

            Design.get(function(data) {
                $scope.design = data.result;
            });

            //TODO: get json canvas with the case id & load it in the editor.
        } else {
            // niet ingelogd
        }
    }

    $scope.fillBackgrounds = function() {
        $scope.backgroundsRowOne = [
            {
                image:  "img/patterns/dogs.png",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/dogs&pussies.png",
                alt:    "Dogs and cats"
            },
            {
                image:  "img/patterns/dots_1.png",
                alt:    "Dots"
            },
            {
                image:  "img/patterns/paarstreepjesG.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern1.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern2.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern3.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern4.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern5.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern6.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern7.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern8.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern9.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pattern10.png",
                alt:    "Stripes"
            },
            {
                image:  "img/patterns/pittig_pattern.png",
                alt:    "Stripes"
            }
        ];

        $scope.backgroundsRowTwo = [
            {
                image:  "img/patterns/skull.png",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/VF_pattern08.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern09.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern10.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern11.jpg",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/VF_pattern12.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern13.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern14.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern15.jpg",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/VF_pattern16.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern17.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern18.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/VF_pattern19.jpg",
                alt:    "Dogs"
            },
            {
                image:  "img/patterns/VF_pattern20.jpg",
                alt:    "Skull"
            },
            {
                image:  "img/patterns/winterswag.png",
                alt:    "Skull"
            }
        ];
    };
});