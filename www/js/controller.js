

angular.module('starter.controllers',[])
.controller('AppCtrl', function($state) {
	//$state.go('app.map');

	 	})
.controller('mapCtrl', function( $ionicPlatform, $ionicModal,$ionicPopup,ionicToast,$scope, $cordovaGeolocation, $ionicLoading) {
	//$state.go('profile');
	
	
      document.addEventListener("deviceready", onDeviceReady, false);
     
    function onDeviceReady() {
        	  $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = 24.892249;
            var long = 67.074715;
             
            var myLatlng = new google.maps.LatLng(lat, long);
             
            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
             
            $scope.map = map;   
            $ionicLoading.hide();           
             
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    }              
})
.controller('HomeCtrl', function($ionicPlatform, $scope, $state,$cordovaLocalNotification, $http, $timeout, $interval, $ionicModal,$ionicPopup,ionicToast) {
	
	$scope.status = "true";
	
	 var myPopup = $ionicPopup.show({
    template: '<input type="text" ></input>',
    title: '<b>Enter Pass Key</b>',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Login</b>',
        type: 'button button-assertive',
        onTap: function(e) {
    		$scope.status = "true";     
		  	
        }
      }
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
		$scope.status = "true";
  });
		
        $scope.notify = function() {
			$state.go('map');

        };
		 $scope.profile = function() {
			$state.go('profile');

        };
		 $scope.parking = function() {
			$state.go('parking');

        };
		$scope.audi = function() {
			$state.go('auditorium');

        };
			$scope.civil = function() {
			$state.go('civil');

        };
})
.controller('profileCtrl', function($ionicPlatform, $ionicModal,$ionicPopup,$scope, $state,$cordovaLocalNotification, $http, $timeout, $interval,ionicToast) {
	
	
  
});

