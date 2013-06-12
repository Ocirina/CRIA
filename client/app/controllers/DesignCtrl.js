app.controller('DesignCtrl', function($scope, $location, $http, $resource, $routeParams) {
    /**
     * Set the certain type of phone.
     *
     * @param {Number} phoneId
     */
    $scope.activatePhone = function(phoneId) {
        $scope.phone.phone = phoneId;

        $.event.trigger('StartEditor',
            {
                phone: phoneId
            }
        );

        $scope.backgroundsRowOne = [];
        $scope.backgroundsRowTwo = [];
        $scope.objectsRowOne = [];
        $scope.objectsRowTwo = [];

        $scope.fillObjectArrays();
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

    $scope.fillObjectArrays = function() {
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
                image:  "img/patterns/VF_pattern21.jpg",
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

        $scope.objectsRowOne = [
            {
                image:  "img/objects/hartje.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/patrickster.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/rarezeshoekl.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/rondje.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/sterretje.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/thumb.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/gewoon.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/davidster.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/zeshoekmetschevecirkel.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/chick1.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/chick2.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/chick3.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/boy1.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/peace.svg",
                alt:    "Rondje"
            }
        ];

        $scope.objectsRowTwo = [
            {
                image:  "img/objects/applelogogekleurd.svg",
                alt:    "Sterretje"
            },
            {
                image:  "img/objects/applelogozwart.svg",
                alt:    "Zeester"
            },
            {
                image:  "img/objects/cirkel.svg",
                alt:    "Zeshoek"
            },
            {
                image:  "img/objects/gewoon.svg",
                alt:    "Sterretje"
            },
            {
                image:  "img/objects/zeester.svg",
                alt:    "Zeester"
            },
            {
                image:  "img/objects/zeshoek.svg",
                alt:    "Zeshoek"
            },
            {
                image:  "img/objects/sterretje.svg",
                alt:    "Sterretje"
            },
            {
                image:  "img/objects/zeester.svg",
                alt:    "Zeester"
            },
            {
                image:  "img/objects/zeshoek.svg",
                alt:    "Zeshoek"
            },
            {
                image:  "img/objects/chick4.svg",
                alt:    "Gewoon"
            },
            {
                image:  "img/objects/chick5.svg",
                alt:    "Davidster"
            },
            {
                image:  "img/objects/chick6.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/iambuddhabiath.svg",
                alt:    "Rondje"
            },
            {
                image:  "img/objects/yinyang.svg",
                alt:    "Rondje"
            }
        ];
    };
});