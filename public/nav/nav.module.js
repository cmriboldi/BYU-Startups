/**
 * 1. We have added a directive with the name 'nav' and handler of
 * avatarDirective to our angular app module
 */
angular.module('navApp', [])
  .controller('navCtrl', navCtrl)
  .directive('navHeader', navDirective);
/**
 * 1. this defines the api of our avatar directive. This means we are
 * expecting a user property whose value should be interpreted as an object.
 * 2. This simply means we want this directive to be used as an element.
 * 3. You can see here we've moved the html that was in our template before
 * and give it as the template for this directive. This means wherever we use
 * <avatar /> this html will also be placed there.
 * 4. Here we are implementing the feature where if there is no user avatar url,
 * we go ahead and give it a default
 */
function navDirective () {
  console.log("init Directive");


  return {
    scope: {
      loggedin: "=loggedin",
    },

    restrict: 'E', /* [2] */
    templateUrl: 'nav/nav.html'
  };
}


function navCtrl ($scope,$http) {
  console.log("inside NavController");
  if($scope.loggedin) {
    console.log("$scope.loggedIn is: " , $scope.loggedin);
  }


  $scope.currentUser = {};
  console.log("user is1: ", $scope.currentUser);

  $scope.getUser = function() {
    console.log("called get user ----------");
    return $http.get('/currentUser').then(function(data) {
      console.log("user is2: ", data.data);
      angular.copy(data.data, $scope.currentUser);
    });
  };
  $scope.getUser();
  console.log("user is3: ", $scope.currentUser);
  // $scope.users = [];
  //
  // $scope.addNew = function (user) {
  //   $scope.users.push({
  //     name: user.name,
  //     avatarUrl: user.url
  //   }); /* [1] */
  //
  //   user.name = ''; /* [2] */
  //   user.url = ''; /* [2] */
  // };
}
