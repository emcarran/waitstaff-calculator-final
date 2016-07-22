var app = angular.module('waitStaff', []);

app.controller('WaitStaffController', ['$scope', function ($scope) {

    $scope.resetDetails = function () {
        $scope.mealPrice = '';
        $scope.taxRate = '';
        $scope.tipPercentage = '';
    };

    //create $scope for initial customer charges
    $scope.initCharges = function () {
        $scope.subTotal = 0;
        $scope.tip = 0;
        $scope.total = 0;
    };

    //create a $scope for initial earnings
    $scope.initEarnings = function () {
        $scope.tipTotal = 0;
        $scope.mealCount = 0;
    };

    $scope.init = function () {
        $scope.formError = '';
        $scope.resetDetails();
        $scope.initCharges();
        $scope.initEarnings();
    };

    $scope.init();

    //create $scope for submitting the meal details

    $scope.submitDetails = function () {

        if ($scope.enterPriceForm.$invalid) {
            $scope.formError = "Please enter valid values for the form";
        } else {
            $scope.formError = '';
            $scope.tipTotal += $scope.tip;
            $scope.mealCount++;
        }
    };

    $scope.$watchGroup(['mealPrice', 'taxRate', 'tipPercentage'], function (newValues, oldValues, scope) {
        if ($scope.enterPriceForm.$invalid) {
            $scope.initCharges();
        } else {
            $scope.formError = '';
            $scope.subTotal = $scope.mealPrice + ($scope.mealPrice * ($scope.taxRate / 100));
            $scope.tip = $scope.mealPrice * ($scope.tipPercentage / 100);
            $scope.total = $scope.subTotal + $scope.tip;
        }
    });

    $scope.$watchGroup(['tipTotal', 'mealCount'], function (newValues, oldValues, scope) {
        if ($scope.mealCount != 0) {
            $scope.avgTipPerMeal = $scope.tipTotal / $scope.mealCount;
        } else {
            $scope.avgTipPerMeal = 0;
        }
    });

            }]);
