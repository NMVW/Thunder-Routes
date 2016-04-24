angular.module('roadtrippin.mapsFactory', [])

  .factory('mapFactory', function($http, $q, $window, $location) {

    //send endpoints and array of waypoints to the server
    var saveJourneyWithWaypoints = function (tripObject) {
      tripObject.waypoints = tripObject.waypoints.map(function (pt) {return pt[0]});
      var deferred = $q.defer ();
      $http({
        method: 'POST',
        url: '/saveJourney',
        data: JSON.stringify(tripObject)
      }).then(function (res) {
        deferred.resolve (res);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    };

    var getAllRoutes = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/saveJourney'
      }).then(function (res) {
        deferred.resolve (res.data);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    };

    var signout = function() {
      $window.localStorage.removeItem('com.roadtrippin');
      $location.path('/signin');
    };

    return {
      saveJourneyWithWaypoints: saveJourneyWithWaypoints,
      getAllRoutes: getAllRoutes,
      signout: signout
    };
  });
