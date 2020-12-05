var app = angular.module("beerlist", ['angularUtils.directives.dirPagination']);
app.controller("beerlistctrl",function($scope,$rootScope,$http){
  $http.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json").then(function (response) {
      $scope.beers = response.data;
      $scope.getimages();
      $scope.beerbackup = $scope.beers;
});
$http.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json").then(function (response) {
          $scope.beerimages = response.data;
          console.log($scope.beerimages);
});
    $scope.getimages = function () {
        
        var i, j;
            for (  i = 0,   j = 0; j< $scope.beers.length; i++, j++) {
                $scope.beers[j]["image"] = $scope.beerimages[i].image;
                if (i == 4) {
                    i = -1;
                }
                
            }
        console.log($scope.beers);
    }
    $scope.searchitem = function (search) {
        $scope.filteredcontacts = [];
        $scope.beers = $scope.beerbackup;
        var searchlower = search.toLowerCase();
        console.log(searchlower);
        if (search) {
            $scope.filteredcontacts = $scope.beers.filter(function (value, index, arr) {

                if (value["name"] && value["name"].toLowerCase().includes(search.toLowerCase())) {
                    return value;
                }
                
            });
            $scope.beers = $scope.filteredcontacts;
        }
        else {
            $scope.beers = $scope.beerbackup;
        }
        console.log($scope.beers);
    }

});
