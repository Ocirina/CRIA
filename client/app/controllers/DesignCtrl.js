"use-strict";

/* global app, $ */
/*jslint browser: true, node: true, nomen: true, plusplus: true */

/**
 * The Design Controller.
 * Sets the types of phone and cases and is able to trigger the Editor.
 */
app.controller('DesignCtrl', function($scope, $location, $http, $resource, $routeParams) {
    /**
     * Set the certain type and case of a phone.
     *
     * @param {Number} phoneId
     */
    $scope.activatePhone = function(phoneId) {
        $scope.phone.phone = phoneId;
        $scope.setCaseType(1);
    };

    /**
     * Sets the type of case of a phone and triggers the editor.
     *
     * @param {Number} caseTypeId
     */
    $scope.setCaseType = function(caseTypeId) {
        $scope.phone.case = caseTypeId;
        $scope.triggerEditor();
    };

    /**
     * This will get the canvas design when you're logged in.<br>
     * It gets the canvas with the given caseId.<br>
     * Once the request is done the result will be saved to the scope and the editor event will be triggered<br>
     * With information of the scope.
     *
     * If you're not logged in it will show a message that you have to log in to edit the phone case.
     */
    $scope.getCanvasDesign = function() {
        if(window.sessionStorage.loggedInUser) {
            var caseId = $routeParams.id,

                Design = $resource('http://autobay.tezzt.nl\\:43083/canvas/' + caseId,{},
                {charge: {method:'GET', params:{charge:true}}}
            );

            Design.get(function(data) {
                $scope.design = data.result;
                $scope.phone.phone = $scope.design.phone;
                $scope.phone.case = $scope.design.case;
                $.event.trigger('StartEditor',
                    {
                        phone:  $scope.phone.phone,
                        case: $scope.phone.case,
                        design: $scope.design
                    }
                );
            });

        } else {
            Application.notify('error', 'U bent niet ingelogd, u moet ingelogd zijn om dit hoesje te bewerken.');
        }
    };

    /**
     * Loads the canvas that is saved in the session if it exists.
     * Else it will set the phone and case type by default.
     */
    $scope.loadSessionCanvas = function() {
        if(window.sessionStorage["design"]) {
            var design = JSON.parse(window.sessionStorage["design"]);
            $scope.phone.phone = design.phone;
            $scope.phone.case = design.case;
            $scope.triggerEditor();
        } else {
            $scope.activatePhone(4);
        }
    };

    /**
     * Triggers the editor according to existing values.<br>
     * <br>
     * -If the design exists in the session it will check if the case exists in the model phone in the scope.<br>
     * <br>
     *   -- If thats true, the editor will be triggered and the case and phone type will be given along with the design
     *   in the session.<br>
     *   -- Else it will trigger the editor without the case type, but with the phone type of the phone and the design
     *   in the session<br>
     * <br>
     * -Else it will check if the case attribute exists on the phone model, if thats true it will trigger the editor
     * with the case and phone type.
     * - Else it will just trigger the editor with the phone type, as that value always exists.
     */
    $scope.triggerEditor = function() {
        if (window.sessionStorage["design"]) {
            if($scope.phone.case) {
                $.event.trigger('StartEditor',
                    {
                        phone:  $scope.phone.phone,
                        case:$scope.phone.case,
                        design: JSON.parse(window.sessionStorage["design"])
                    }
                );
            } else {
                $.event.trigger('StartEditor',
                    {
                        phone:  $scope.phone.phone,
                        design: JSON.parse(window.sessionStorage["design"])
                    }
                );
            }
        } else if($scope.phone.case) {
            $.event.trigger('StartEditor',
                {
                    phone:  $scope.phone.phone,
                    case: $scope.phone.case
                }
            );
        } else {
            $.event.trigger('StartEditor',
                {
                    phone:  $scope.phone.phone
                }
            );
        }
    };

    /**
     * Fills the arrays for the backgrounds and objects selection with the defined JSON Objects.
     */
    $scope.fillObjectArrays = function () {
        $scope.backgroundsRowOne = [];
        $scope.backgroundsRowTwo = [];
        $scope.objectsRowOne = [];
        $scope.objectsRowTwo = [];

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