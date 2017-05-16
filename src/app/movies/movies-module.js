angular.module('movies', [])
    .controller('moviesController', ['$scope', 'imdb', 'todoModel', function ($scope, imdb, todoModel) {
            $scope.movieCtrl = this;

            // inject the IMDB service
            // @todo: search for a movie
            // @todo: display the results on the screen
            // @todo: add the ability to add the movie to your todo module           
  

            this.search = function() {
                if(this.movie) {
                    imdb.get(this.movie, function(results) {
                        // movie information is on the data property of results
                        var movie = results.data;
                        this.movieResult = {
                            title: movie.Title,
                            poster: movie.Poster,
                            actors: movie.Actors,
                            imdbRating: movie.imdbRating
                        }
                    }.bind(this));                  
                }    

            }

            this.clear = function(evt) {
                this.movie = '';
                this.movieResult = {};
            }


    }])
    .service('imdb', ['$http', function($http){

        // https://docs.angularjs.org/api/ng/service/$http
        
        //Manage IMDB service
        //@todo: write and expose a get method


        var getMoviesByTitle = function(title, cb) {
            $http({
                method: 'GET',
                url: 'http://www.omdbapi.com/?t=' + title
            })
            .then(cb);
        };


        return {
            get: getMoviesByTitle
        }
    }]);