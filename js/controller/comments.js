myApp.controller('CommentsCtrl', ['$scope', 'PostFactory', '$routeParams', function ($scope, PostFactory, $routeParams) {
        $scope.loading = true;
        $scope.newComment = {};
        

    PostFactory.getPost($routeParams.id).then(function (post) {
        $scope.loading = false;
        $scope.title = post.company;
        $scope.comments = post.comments;
    }, function (msg) {
        alert(msg);
    })
    
    $scope.addComment = function(){
        $scope.comments.push($scope.newComment);
        $scope.newComment= {};
    }
   
    console.log($scope.newComment);
    
}]);