

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
        timeout: 10000,
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
  .controller('HomeCtrl', function ($ionicPlatform, $cordovaInAppBrowser, $ionicLoading, $cordovaGeolocation, $scope, $state, $cordovaLocalNotification, $http, $timeout, $interval, $ionicModal, $ionicPopup, ionicToast, dataService) {

    $scope.status = "true";

    //dataService.startDatabase();

    // var myPopup = $ionicPopup.show({
    //   template: '<input type="text" ></input>',
    //   title: '<b>Enter Pass Key</b>',
    //   subTitle: '',
    //   scope: $scope,
    //   buttons: [
    //     { text: 'Cancel' },
    //     {
    //       text: '<b>Login</b>',
    //       type: 'button button-assertive',
    //       onTap: function (e) {
    //         $scope.status = "true";

    //       }
    //     }
    //   ]
    // });
    // myPopup.then(function (res) {
    //   console.log('Tapped!', res);
    //   $scope.status = "true";
    // });

    function future(){
      $ionicPopup.alert({
        title: 'Functionality to be implemented soon'
      });
    }

    $scope.notify = function () {
      future();
      //$state.go('map');
    };
    
    $scope.profile = function () {
      future();
      //$state.go('profile');

    };
    
    $scope.nearByHospital = function () {
      future();
    };
    
    $scope.insurancePolicy = function () {
      future();
    };
    
    $scope.settings = function () {
      future();
    };

    $scope.contact = function () {
      $state.go('contact');
    };

    $scope.ping = function () {
      $state.go('ping');

    };

    $scope.hospital = function () {
      $state.go('hospital');
    };

    $scope.locationMaps = function (params) {
      future();
      //$state.go('locationMaps');
    }

    $scope.feedback = function () {
      $state.go('feedback');
    }

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
            title: "longitute:" + long + "  latitute:" + lat + "<br />Maps to be implemented soon"
          }).then(function (res) {

          });
        }, function (err) {
          $ionicLoading.hide();
          alert("Cannot get location due to: " + err)
        });

    };

  })
  .controller('profileCtrl', function ($ionicPlatform, $cordovaSms, $ionicModal, $ionicPopup, $scope, $state, $cordovaLocalNotification, $http, $timeout, $interval, ionicToast) {



  })
  .controller('feedbackCtrl', function ($scope) {
    $scope.emailText = [];
    $scope.sendEmail = function () {
      if (window.plugins && window.plugins.emailComposer) {
        window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
          alert(result);
        },
          "Feedback From " + $scope.emailText[0].name + " For Engro Health Insurance(Phase I) ", // Subject
          $scope.emailText[0].body,                      // Body
          ["mtalhajamil93@gmail.com", "ameerhamza810@gmail.com", "s.wasiq.muhammad@gmail.com"],    // To
          null,                    // CC
          null,                    // BCC
          false,                   // isHTML
          null,                    // Attachments
          null);                   // Attachment Data
      }
    }
  })
  .controller('PingCtrl', function ($cordovaSms, $scope, $ionicPopup) {
    $scope.listdata = [];
    $scope.contacts = [];
    // $scope.listdata[0].msg = "Not Defined by sender";
    // $scope.listdata[0].name = "Not Defined by sender";
    // $scope.listdata[0].location = "Not Defined by sender";
    // $scope.listdata[0].pno = "Not Defined by sender" ;
    $scope.contacts.push({ "name": "Talha", "number": "03126995968" });
    $scope.contacts.push({ "name": "Hamza", "number": "03126995968" });

    $scope.sendSMS = function () {
      var failed = 0;
      var sent = 0;
      var SMS = "Dear Insurance Members:\n\nEmergency MSG:" + $scope.listdata[0].msg + "\n\nName:"
        + $scope.listdata[0].name + "\n\nPNo:" + $scope.listdata[0].pno + "\n\nLocation:" + $scope.listdata[0].location;
      for (var index = 0; index < $scope.contacts.length; index++) {
        $cordovaSms
          .send($scope.contacts[index].number, SMS, 'options')
          .then(function () {
            sent++

            if (sent == $scope.contacts.length) {
              $ionicPopup.alert({
                title: 'SMS sent'
              });
            }

          }, function (error) {
            failed++;
            if (failed == $scope.contacts.length) {
              $ionicPopup.alert({
                title: 'SMS Sending Failed. Make sure you have sufficient balance'
              });
            }
          });


      }


    }
  })
  .controller('HospitalCtrl', function ($cordovaSms, $scope, $state, $ionicPopup, dataService, cityService) {

    $scope.listdata = [];
    $scope.listdata = dataService.getCities();

    $scope.selectCity = function (cityName) {
      cityService.setCityName(cityName);
      $state.go('hospitalList');
    }

  })
  .controller('HospitalListCtrl', function ($cordovaGeolocation, $cordovaSms, $scope, $state, $ionicPopup, dataService, cityService) {

    $scope.listdata = [];
    $scope.listdata = dataService.getCityHospitals(cityService.getCityName());

    $scope.showDetails = function (SNo) {
      for (var index = 0; index < $scope.listdata.length; index++) {
        if ($scope.listdata[index].SNo == SNo) {
          var element = $scope.listdata[index];
          break;
        }
      }

      $ionicPopup.show({
        title: element.HospitalName + '<br /><br />' + element.Telephone,
        subTitle: element.Address + '<br />' + element.City
        + "(" + element.Extension + ")"
        + '<br />Latitiude: ' + element.lat
        + '<br />Longitude: ' + element.lon,
        scope: $scope,
        buttons: [
          { text: 'Cancel' }
        ]
      });

    }

    
    //console.log($scope.listdata);
    //console.log($scope.listdata);

  })
  .controller('locationMapsCtrl', function ($scope, NgMap) {

    var vm = this;
    NgMap.getMap().then(function (map) {
      vm.showCustomMarker = function (evt) {
        map.customMarkers.foo.setVisible(true);
        map.customMarkers.foo.setPosition(this.getPosition());
      };
      vm.closeCustomMarker = function (evt) {
        this.style.display = 'none';
      };
    });
  })
  .controller('ContactCtrl', function ($cordovaSms, $scope, $state, $ionicPopup) {

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
      // $ionicPopup.alert({
      //   title: '<b>' + $scope.listdata[num].name + '<br />' + $scope.listdata[num].number + '</b>'
      // }).then(function (res) {

      // });
      
      $ionicPopup.show({
        title: $scope.listdata[num].name,
        subTitle: $scope.listdata[num].number,
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Call</b>',
            type: 'button-positive',
            onTap: function (e) {
              window.open('tel:' + $scope.listdata[num].number, '_system', 'location=yes')
              //window.location.href = 'tel:' + $scope.listdata[num].number;
            }
          },
        ]
      });

    }

  });

