/**
 * 1. We have added a directive with the name 'nav' and handler of
 * avatarDirective to our angular app module
 */
angular.module('navApp', [])
  .controller('navCtrl', navCtrl)
  .directive('nav-bar', navDirective);
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
  return {
    scope: {
      loggedIn: '=' /* [1] */
    },
    restrict: 'E', /* [2] */
    templateUrl: 'nav/nav.html'
  };
}


function navCtrl ($scope) {

  console.log("inside NavController");
  console.log("$scope.loggedIn is: " , $scope.loggedIn);
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