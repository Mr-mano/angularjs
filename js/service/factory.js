myApp.factory('PostFactory', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {

    var factory = {
        posts: false,
        getPosts: function () {
            var deferred = $q.defer();
            if (factory.posts !== false) {
                deferred.resolve(factory.posts);
            } else {
                $http.get('posts.json').then(successCallback, errorCallback);

                function successCallback(reponse) {
                    factory.posts = reponse.data;
                    $timeout(function () {
                        deferred.resolve(factory.posts);
                    }, 1000);
                }

                function errorCallback() {
                    deferred.reject('Impossible de récupérer les articles');
                };
            }
            return deferred.promise;
        },
        getPost: function (id) {
            var deferred = $q.defer();
            var post = {};
            factory.getPosts().then(function (posts) {
                angular.forEach(posts, function (value) {
                    if (value.id == id) {
                        post = value
                    }
                });
                deferred.resolve(post);
            }, function (msg) {
                deferred.reject(msg);
            })
            return deferred.promise;
        },
        
    };
    return factory
}])