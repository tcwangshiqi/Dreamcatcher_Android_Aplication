/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var additionaldata1={"key":"value"};
var additionaldatastring="";
var decision = 'ok';
var regId;
var addr = "https://192.168.1.1/cgi-bin/luci/admin/security/rule/rules_1";
var buttonPress = true;
var buttonPress1 = true;
var buttonPress2 = true;
var detailsRes = "";
//var registrationIdPush = true;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        localwife = false;
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        //alert("deviceready");

        app.setupPush();
        
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        var type = connection.type;
        alert("connection:"+connection.type); 
   
        
    },
    setupPush: function() {
        //alert("push init");
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "692143330873",
                "icon": "drawable-ldpi-icon"
            },
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);
            alert('registration event: ' + JSON.stringify(data));
            regId = data.registrationId;
            
            /*
            if(registrationIdPush) {
                JSON.stringify(data)},false);
                registrationIdPush = false;    
            }
            */
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
            alert("error"+e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            console.log('data:'+JSON.stringify(data));
            additionaldata1 = data.additionalData;
            
            console.log('addtionaldata1:'+JSON.stringify(additionaldata1));
            navigator.notification.confirm(
                data.message,         // message
                onConfirm,                 // callback
                data.title,           // title
                ['Ok','details']                  // buttonName
            );

       });

        function onConfirm(buttonIndex) { 
            if(buttonIndex=="1") {
            	console.log("ok");
            	//sendData({'decision':'ok'});
            	decision="ok";
                window.open(addr,"_self");
            }
            if(buttonIndex=="2") {
            	console.log("details");
            	decision="details";
            	additionaldatastring = ''+JSON.stringify(additionaldata1);
            	var res = additionaldatastring.replace(/,/g ,'<br />');
            	res = res.replace('{','');
            	res = res.replace('}','');
            	res = res.replace("\"collapse_key\":\"do_not_collapse\"","");
            	res = res.replace("\"foreground\":true","");
                detailsRes = res;
            	
            }
         }
    }
};


//phonegap push --deviceID fuNfN3w646k:APA91bF09PmuCnUwPYK29-DMNHNdEUa92slZbxV-l3VOxDmRSbUWuwhTWqI95O4h-glR51yRzLhgEttblcgzxa_M4stgp8XMJtZt3TYPOHdudd-gaH4hZ7nEgUnw_IHKB0z61jpqKb1P --service gcm --payload "{ \"data\": { \"title\": \"Hello\", \"message\": \"World\"} }"