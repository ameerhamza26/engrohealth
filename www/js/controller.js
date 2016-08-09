angular.module('starter.controllers', [])
    .controller('AppCtrl', function($state) {
        //$state.go('app.map');

    })
    .controller('mapCtrl', function($ionicPlatform, $ionicModal, $ionicPopup, ionicToast, $scope, $cordovaGeolocation, $ionicLoading) {
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
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
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

            }, function(err) {
                $ionicLoading.hide();
                console.log(err);
            });
        }
    })
    .controller('HomeCtrl', function($cordovaFileOpener2, localStorageService, $rootScope, $ionicPlatform, $cordovaFile, $cordovaInAppBrowser, $ionicLoading, $scope, $state, $cordovaLocalNotification, $http, $timeout, $interval, $ionicModal, $ionicPopup, ionicToast, dataService, $ionicLoading) {

        $scope.header = {
                texta: 'eng',
                textb: 'sure',
                img: 'img/icons/logo.png'
            }
            //$cordovaGeolocation,
        $scope.isLoading = false;
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        console.log(localStorageService.get())
        $timeout(function() {

            if (isEmpty(localStorageService.get("loggedUser"))) {
                $state.go('register')
                $ionicLoading.hide();
            } else {
                $scope.isLoading = true;
                $ionicLoading.hide();
            }

        }, 1000)

        $scope.status = "true";
        var count;

        function future() {
            $ionicPopup.alert({
                title: 'Functionality to be implemented in the next Phase'
            });
        }

        $scope.notify = function() {
            future();
            //$state.go('map');
        };

        $scope.profile = function() {
            future();
            //$state.go('profile');

        };

        $scope.nearByHospital = function() {
            future();
        };

        $scope.insurancePolicy = function() {
            future();
        };

        $scope.settings = function() {
            future();
        };

        $scope.contact = function() {
            $state.go('contact');
        };

        $scope.ping = function() {
            $state.go('ping');

        };

        $scope.hospital = function() {
            $state.go('hospital');
        };

        $scope.locationMaps = function(params) {
            future();
            //$state.go('locationMaps');
        }

        $scope.feedback = function() {
            $state.go('feedback');
        }

        $scope.insurance_benefits = function() {
            $state.go('benefits');
        }

        $scope.insurance_category = function() {
            future();
        }

        $scope.form = function() {

            // var options = {
            //   location: 'no',
            //   clearcache: 'yes',
            //   toolbar: 'no',
            //   hardwareback: 'no',
            //   clearsessioncache: 'yes'
            // };

            // $cordovaInAppBrowser.open('https://www.dropbox.com/s/l0leid0f4uzahoj/In-Patient%20Claim%20Form.pdf', '_system', options)
            //   .then(function (event) {
            //     // success
            //   })
            //   .catch(function (event) {
            //     alert("Error");
            //   });

            console.log("External:" + cordova.file.external);
            console.log("Documents Directory:" + cordova.file.documentsDirectory);
            console.log("Data Directory:" + cordova.file.dataDirectory);
            console.log("External Directory:" + cordova.file.externalDataDirectory);
            $cordovaFile.copyFile("file:///android_asset/www/", "claimForm.pdf", "file:///storage/emulated/0/", "In-Patient Claim Form.pdf")
                .then(function(success) {

                    count = 0;

                    cordova.plugins.notification.local.schedule({
                        id: 0,
                        message: "Check form in Device Storage",
                        title: "File Saved",
                        autoCancel: true,
                        sound: null,
                        icon: "img/icons/logo.png",
                    })


                }, function(error) {
                    alert(error.message);
                });

            cordova.plugins.notification.local.on("click", function(notification) {
                if (count == 0) {

                    $cordovaFileOpener2.open(
                        'file:///storage/emulated/0/In-Patient Claim Form.pdf',
                        'application/pdf'
                    ).then(function() {
                        // file opened successfully
                    }, function(err) {
                        alert(err.message)
                    });


                    count++;
                }
            });

            //$cordovaFile.copyFile("file:///android_asset/www/","claimForm.pdf","files/");
            //window.open("file:///android_asset/www/claimForm.pdf", '_blank', ""); 

        };

        // $scope.location = function () {
        //   $ionicLoading.show({
        //     template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        //   });
        //   var posOptions = { timeout: 10000, enableHighAccuracy: false };
        //   $cordovaGeolocation
        //     .getCurrentPosition(posOptions)
        //     .then(function (position) {
        //       var lat = position.coords.latitude;
        //       var long = position.coords.longitude;
        //       $ionicLoading.hide();
        //       $ionicPopup.alert({
        //         title: "longitute:" + long + "  latitute:" + lat + "<br />Maps to be implemented soon"
        //       }).then(function (res) {

        //       });
        //     }, function (err) {
        //       $ionicLoading.hide();
        //       alert("Cannot get location. Please check your internet connectivity")
        //     });

        // };

    })
    .controller('profileCtrl', function($ionicPlatform, $cordovaSms, $ionicModal, $ionicPopup, $scope, $state, $cordovaLocalNotification, $http, $timeout, $interval, ionicToast) {



    })
    .controller('feedbackCtrl', function($scope) {
        $scope.header = {
            texta: 'feedback',
            textb: '',
            img: 'img/icons/engsure app icon for PNG-14.png',
            subicon: true
        }
        $scope.emailText = [];
        $scope.sendEmail = function() {
            if (window.plugins && window.plugins.emailComposer) {
                window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                        alert(result);
                    },
                    "Feedback From " + $scope.emailText[0].name + " For Engro Health Insurance(Phase I) ", // Subject
                    $scope.emailText[0].body, // Body
                    ["wkhawar@engrofoods.com", "mtalhajamil93@gmail.com", "ameerhamza810@gmail.com", "s.wasiq.muhammad@gmail.com"], // To
                    null, // CC
                    null, // BCC
                    false, // isHTML
                    null, // Attachments
                    null); // Attachment Data
            }
        }
    })
    .controller('PingCtrl', function($cordovaSms, $scope, $ionicPopup, localStorageService) {
        $scope.header = {
            texta: 'emergency',
            textb: 'ping',
            img: 'img/icons/engsure app icon for PNG-09.png',
            subicon: true
        }
        $scope.user = localStorageService.get("loggedUser")
        console.log($scope.user)
        $scope.listdata = [];
        $scope.listdata[0] = {
            name: $scope.user.name,
            pno: $scope.user.po_no,
            msg: $scope.user.message
        }
        
        $scope.contacts = [];
        $scope.contacts.push({ "name": "Anis", "location": "Adamjee Team", "number": "03400004389", "team":"", "enabled":false});
        $scope.contacts.push({ "name": "Mohsin", "location": "Adamjee Team", "number": "03028228254", "team":"", "enabled":false});
        $scope.contacts.push({ "name": "Zulfiqar Ali", "location": "Sahiwal - Plant","number": "03028690677", "team":"Engro HR", "enabled":false});
        $scope.contacts.push({ "name": "Shumaila Sheikh", "location": "Sukkur - Plant","number": "080000242", "team":"Engro HR", "enabled":false});
        $scope.contacts.push({ "name": "Saqib Riaz", "location": "Ice Cream","number": "03005193279", "team":"Engro HR", "enabled":false});
        $scope.contacts.push({ "name": "Syed Sajjad Ali", "location": "Marketing","number": "03002611012", "team":"Engro HR", "enabled":false});
        $scope.contacts.push({ "name": "Muhammad Atif - Nara", "location": "Nara","number": "03413764484", "team":"Engro HR", "enabled":false});
        $scope.contacts.push({ "name": "Vanessa", "location": "Dairy Sales","number": "03000200627", "team":"Engro HR", "enabled":false});
        $scope.contacts.push({ "name": "Shakeel", "location": "Dairy Sales","number": "03074920297", "team":"Engro HR", "enabled":false});
        $scope.contacts.push({ "name": "Naeem Ahmed", "location": "MPAS Head Office","number": "03077772316", "team":"Engro HR", "enabled":false});
         $scope.contacts.push({ "name": "Ali Mubeen", "location": "MPAS - Skr","number": "0302-8693282", "team":"Engro HR", "enabled":false});
         $scope.contacts.push({ "name": "Ameerzada Mumtaz", "location": "MPAS - Jhang","number": "03028690673", "team":"Engro HR", "enabled":false});
         $scope.contacts.push({ "name": "Hassan Nazir", "location": "MPAS - Swl Zone 3","number": "03028266312", "team":"Engro HR", "enabled":false});
         $scope.contacts.push({ "name": "Muhammad Asif", "location": "MPAS - Bhawalpur","number": "03028245389", "team":"Engro HR", "enabled":false});
        $scope.contacts.push({ "name": "Muhammad Ahsan", "location": "C & B (Head Office)","number": "03000200676", "team": "", "enabled":false});
        $scope.contacts.push({ "name": "Waleed Khawar", "location": "C & B (Head Office)","number": "03028285155", "team":"", "enabled":false});
        
           // $scope.contacts.push({ "name": "Ameer hamza", "location": "MPAS - Bhawalpur","number": "03462651725", "team":"Engro HR", "enabled":false});
           // $scope.contacts.push({ "name": "Talha Jamil", "location": "C & B (Head Office)","number": "03126995968", "team":"", "enabled":false});
           // $scope.contacts.push({ "name": "Waleed Khawar", "location": "C & B (Head Office)","number": "03028285155", "team":"", "enabled":false});

        $scope.sendSMS = function() {
            $ionicPopup.show({
                title: "Are you sure you want to send this SMS?",
                scope: $scope,
                buttons: [
                    { text: 'Cancel' }, {
                        text: '<b>Send</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            send();
                        }
                    },
                ]
            });
        }
        
        

        function send() {
            var failed = 0;
            var sent = 0;
            var SMS = "Dear Insurance Members:\n\nEmergency MSG:" + $scope.listdata[0].msg + "\n\nName:" + $scope.listdata[0].name + "\n\nPNo:" + $scope.listdata[0].pno + "\n\nLocation:" + $scope.listdata[0].location;
            
            var enabled = 0;
            
            for(var index = 0; index < $scope.contacts.length; index++){
                if($scope.contacts[index].enabled == true){
                    enabled++;
                }
            }
            
            for (var index = 0; index < $scope.contacts.length; index++) {
                if($scope.contacts[index].enabled == true){
                $cordovaSms
                    .send($scope.contacts[index].number, SMS, 'options')
                    .then(function() {
                        sent++

                        if (sent == enabled) {
                            $ionicPopup.alert({
                                title: 'SMS sent'
                            });
                        }

                    }, function(error) {
                        failed++;
                        if (failed == enabled) {
                            $ionicPopup.alert({
                                title: 'SMS Sending Failed. Make sure you have sufficient balance'
                            });
                        }
                    });
                }
            }
        }

    })
    .controller('HospitalCtrl', function($cordovaSms, $scope, $state, $ionicPopup, dataService, cityService) {
        $scope.header = {
            texta: 'hospital',
            textb: 'list',
            img: 'img/icons/engsure app icon for PNG-12.png',
            subicon: true
        }
        $scope.listdata = [];
        $scope.listdata = dataService.getCities();

        $scope.selectCity = function(cityName) {
            cityService.setCityName(cityName);
            $state.go('hospitalList');
        }

    })

.controller('RegisterCtrl', function($scope, localStorageService, $state) {
    $scope.user = {}
    $scope.header = {
        texta: 'eng',
        textb: 'sure',
        img: 'img/icons/logo.png'
    }
    $scope.submit = function() {
        console.log($scope.user)
        localStorageService.set("loggedUser", $scope.user)
        $state.go('home');
    }
})

.controller('HospitalListCtrl', function($ionicModal, $cordovaGeolocation, appModalService, $cordovaSms, $scope, $state, $ionicPopup, dataService, cityService, $rootScope) {

    $scope.listdata = [];
    $scope.listdata = dataService.getCityHospitals(cityService.getCityName());
    $scope.header = {
        texta: 'hospital',
        textb: 'list',
        img: 'img/icons/engsure app icon for PNG-12.png',
        subicon: true
    }
    $scope.showDetails = function(SNo) {
        for (var index = 0; index < $scope.listdata.length; index++) {
            if ($scope.listdata[index].SNo == SNo) {
                var element = $scope.listdata[index];
                break;
            }
        }

        $ionicPopup.show({
            title: element.HospitalName + '<br /><br />' + element.Telephone,
            subTitle: element.Address + '<br />' + element.City + "(" + element.Extension + ")" + '<br />Latitiude: ' + element.lat + '<br />Longitude: ' + element.lon,
            scope: $scope,
            buttons: [
                { text: 'Cancel' }, {
                    text: '<b>Call</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        var numbersToCall = element.Telephone.replace(" ", '');
                        var indices = [];
                        var numbers = [];
                        var startingIndex = 0;
                        for (var i = 0; i < numbersToCall.length; i++) {
                            if (numbersToCall[i] === "/") indices.push(i);
                        }
                        indices.push(numbersToCall.length);

                        for (var i = 0; i < indices.length; i++) {
                            numbers.push(numbersToCall.substr(startingIndex, indices[i]));
                            startingIndex = indices[i] + 1;
                        }
                        console.log(indices);
                        for (var i = 0; i < numbers.length; i++) {
                            numbers[i] = numbers[i].replace(" ", '');
                            console.log(numbers);
                            if (numbers[i][0] != "0") {

                                var indexOfDash = numbers[i].indexOf("-");
                                if (indexOfDash != -1) {
                                    numbers[i] = numbers[i].substr(0, indexOfDash);
                                }

                                numbers[i] = element.Extension + numbers[i];

                            }
                            numbers[i] = numbers[i].substring(1);
                            numbers[i] = numbers[i].replace(/\D/g, '');
                            numbers[i] = "0092" + numbers[i];
                        }
                        console.log(numbers);
                        $rootScope.numberToDial = numbers;

                        if (numbers.length <= 1) {
                            window.open('tel:' + numbers[0], '_system', 'location=yes')
                        } else {

                            appModalService.show('templates/hospital-call-modal.html', 'HospitalModalCtrl as vm', { num: numbers }).then(function(res) {
                                console.log(res)
                                if (res != null) {

                                }
                            })
                        }

                    }
                }
            ]
        });

    }



})

.controller('HospitalModalCtrl', function($scope, $rootScope) {

    console.log($rootScope.numberToDial)
    $scope.numbers = $rootScope.numberToDial;
    $scope.dial = function(index) {
        window.open('tel:' + $scope.numbers[index], '_system', 'location=yes')
    }

    $scope.cancel = function() {
        $scope.closeModal(null);
    };
})

.controller('benefitsCtrl', function($cordovaSms, $scope, $state, $ionicPopup, dataService, benefitsService) {
        $scope.header = {
            texta: 'insurance',
            textb: 'category',
            img: 'img/icons/engsure app icon for PNG-16.png',
            subicon: true
        }
        $scope.listData = ["Category A", "Category B", "Category C"];

        $scope.selectGrade = function(index) {
            benefitsService.setGrade(index);
            $state.go('benefitsTopList');
        }

    })
    .controller('benefitsTopListCtrl', function($location, $cordovaSms, $scope, $state, $ionicPopup, dataService, benefitsService) {
        $scope.header = {
            texta: 'insurance',
            textb: 'category',
            img: 'img/icons/engsure app icon for PNG-16.png',
            subicon: true
        }
        $scope.listDataOptional = [];
        $scope.listDataOptional = dataService.getBenefitsTopLayer("optional");

        $scope.listDataUnOptional = [];
        $scope.listDataUnOptional = dataService.getBenefitsTopLayer("unoptional");

        $scope.showSubList = function(title) {
            benefitsService.setTitle(title);
            console.log($state);
            //$state.go('benefitsSubList');
            $location.url('benefitsSubList')
        }

    })
    .controller('benefitsSubListCtrl', function($cordovaSms, $scope, $state, $ionicPopup, dataService, benefitsService) {
        console.log("Reached here");
        console.log($state);
        $scope.header = {
            texta: 'insurance',
            textb: 'amount',
            img: 'img/icons/engsure app icon for PNG-15.png',
            subicon: true
        }
        $scope.listData = [];
        var tempList = dataService.getBenefitsSubList(benefitsService.getTitle());
        console.log(tempList);
        console.log(benefitsService.getGrade());
        var grade = benefitsService.getGrade();
        for (var index = 0; index < tempList.length; index++) {
            if ("GradeAll" in tempList[index]) {
                $scope.listData.push({ "Title": tempList[index].Title, "Info": tempList[index].GradeAll })
            } else {
                switch (grade) {
                    case 0:
                        $scope.listData.push({ "Title": tempList[index].Title, "Info": tempList[index].GradeA })
                        break;
                    case 1:
                        $scope.listData.push({ "Title": tempList[index].Title, "Info": tempList[index].GradeB })
                        break;
                    case 2:
                        $scope.listData.push({ "Title": tempList[index].Title, "Info": tempList[index].GradeC })
                        break;
                }

            }
        }
        benefitsService.setTitle("");
    })
    // .controller('locationMapsCtrl', function ($scope, NgMap) {

//   var vm = this;
//   NgMap.getMap().then(function (map) {
//     vm.showCustomMarker = function (evt) {
//       map.customMarkers.foo.setVisible(true);
//       map.customMarkers.foo.setPosition(this.getPosition());
//     };
//     vm.closeCustomMarker = function (evt) {
//       this.style.display = 'none';
//     };
//   });
// })
.controller('ContactCtrl', function($cordovaSms, $scope, $state, $ionicPopup) {
    $scope.header = {
        texta: 'emergency',
        textb: 'contacts',
        img: 'img/icons/engsure app icon for PNG-10.png',
        subicon: true
    }
    $scope.listdata = [];
    $scope.listdata.push({ "name": "Medical Hotline South (Dr. Salman) 1", "number": "03002018246" });
    $scope.listdata.push({ "name": "Medical Hotline South (Dr. Salman) 2", "number": "0340004489" });
    $scope.listdata.push({ "name": "Landline Number", "number": "02132410054" });
    $scope.listdata.push({ "name": "Call Centre", "number": "0800-00242" });
    $scope.listdata.push({ "name": "Medical Hotline Central (Dr. Munazza)", "number": "03317333200" });
    $scope.listdata.push({ "name": "Manager Relationship (Mohsin Murtaza Hussain)", "number": "03028228254" });
    $scope.listdata.push({ "name": "Officer Relationship (Zafar Ahmed)", "number": "03400004468" });
    $scope.listdata.push({ "name": "Head of Misc. Dept. (Shaikh Babar)", "number": "0302-8297044" });
    $scope.listdata.push({ "name": "Waleed Khawar", "number": "03028285155" });

    $scope.showContact = function(num) {

        $ionicPopup.show({
            title: $scope.listdata[num].name,
            subTitle: $scope.listdata[num].number,
            scope: $scope,
            buttons: [
                { text: 'Cancel' }, {
                    text: '<b>Call</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        window.open('tel:' + $scope.listdata[num].number, '_system', 'location=yes')
                            //window.location.href = 'tel:' + $scope.listdata[num].number;
                    }
                },
            ]
        });

    }

});
