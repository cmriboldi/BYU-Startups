/**
 * 1. We have added a directive with the name 'nav' and handler of
 * avatarDirective to our angular app module
 */
angular.module('loginApp', [])
  .controller('loginCtrl', loginCtrl)
  .directive('login', loginDirective);
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
function loginDirective () {
  console.log("init Directive");
  
  return {
    scope: {
      loggedin: "=loggedin" /* [1] */
    },
    
    restrict: 'E', /* [2] */
    templateUrl: './login.html'
  };
}


function loginCtrl ($scope) {
  $scope.state = "Log in";
  
  $scope.login = function() {
    console.log("The user is trying to login.");
    
    return $http.post('/login').success(function(data){
        console.log("successfully logged In");
      });
  }
  
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
