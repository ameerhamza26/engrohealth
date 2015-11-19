

angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($state) {
    //$state.go('app.map');

  })
  .controller('mapCtrl', function ($ionicPlatform, $ionicModal, $ionicPopup, ionicToast, $scope, $cordovaGeolocation, $ionicLoading) {
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
        var lat = 24.892249;
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

      }, function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    }
  })
  .controller('HomeCtrl', function ($ionicPlatform, $cordovaInAppBrowser, $ionicLoading, $cordovaGeolocation, $scope, $state, $cordovaLocalNotification, $http, $timeout, $interval, $ionicModal, $ionicPopup, ionicToast) {

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
          onTap: function (e) {
            $scope.status = "true";

          }
        }
      ]
    });
    myPopup.then(function (res) {
      console.log('Tapped!', res);
      $scope.status = "true";
    });



    $scope.notify = function () {
      $state.go('map');

    };
    $scope.profile = function () {
      $state.go('profile');

    };

    $scope.contact = function () {
      $state.go('contact');
    };

    $scope.ping = function () {
      $state.go('ping');

    };

    $scope.form = function () {

      var options = {
        location: 'no',
        clearcache: 'yes',
        toolbar: 'no',
        hardwareback: 'no',
        clearsessioncache: 'yes'
      };

      $cordovaInAppBrowser.open('https://www.dropbox.com/s/l0leid0f4uzahoj/In-Patient%20Claim%20Form.pdf', '_system', options)
        .then(function (event) {
          // success
        })
        .catch(function (event) {
          alert("Error");
        });

      //$cordovaInAppBrowser.close();
      //window.open('https://www.dropbox.com/s/l0leid0f4uzahoj/In-Patient%20Claim%20Form.pdf', '_system', 'location=yes')

    };

    $scope.location = function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
      });
      var posOptions = { timeout: 10000, enableHighAccuracy: false };
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: "longitute:" + long + "  latitute:" + lat
          }).then(function (res) {

          });
        }, function (err) {
          $ionicLoading.hide();
          alert("Cannot get location due to: " + err)
        });

    };

  })
  .controller('profileCtrl', function ($ionicPlatform, $cordovaSms, $ionicModal, $ionicPopup, $scope, $state, $cordovaLocalNotification, $http, $timeout, $interval, ionicToast) {



  }).controller('PingCtrl', function ($cordovaSms, $scope, $ionicPopup) {
	
    // $scope.SMSText = "";
    // $cordovaSms
    //     .send('03126995968', 'SMS content', 'options')
    //     .then(function() {
    //       alert('SMS was sent');
    //     }, function(error) {
    //       alert('SMS sending failed');
    //     });
  
    $scope.listdata = [];
     
    //$scope.listdata.push({ "SMS" : "empty" });
    $scope.sendSMS = function () {
      $cordovaSms
        .send('03028285155', $scope.listdata[0], 'options')
        .then(function () {
          $ionicPopup.alert({
            title: 'SMS Sent!!'
          }).then(function (res) {

          });
        }, function (error) {
          alert('SMS sending failed');
        });
    }

  }).controller('ContactCtrl', function ($cordovaSms, $scope, $state, $ionicPopup) {

    $scope.listdata = [];
    $scope.listdata.push({ "name": "Medical Hotline South (Dr. Salman) 1", "number": "03002018246" });
    $scope.listdata.push({ "name": "Medical Hotline South (Dr. Salman) 2", "number": "0340004489" });
    $scope.listdata.push({ "name": "Landline Number", "number": "02132410054" });
    $scope.listdata.push({ "name": "Call Centre", "number": "0800-00242" });
    $scope.listdata.push({ "name": "Medical Hotline Central (Dr. Munazza)", "number": "03317333200" });
    $scope.listdata.push({ "name": "Manager Relationship (Mohsin Murtaza Hussain)", "number": "03028228254" });
    $scope.listdata.push({ "name": "Officer Relationship (Zafar Ahmed)", "number": "03400004468" });
    $scope.listdata.push({ "name": "Head of Misc. Dept. (Shaikh Babar)", "number": "0302-8297044" });

    $scope.showContact = function (num) {
      $ionicPopup.alert({
        title: '<b>' + $scope.listdata[num].name + '<br />' + $scope.listdata[num].number + '</b>'
      }).then(function (res) {

      });
    }

  });

