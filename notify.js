var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyCkzLOzVdzLj_FLh2Y2X2k4cKfRt0L8TsQ');
var registrationIds = [];
 
// Value the payload data to send...

message.addData('message'," phonegap notification: cool! 'Laptop wants to connect to Lamp'");
message.addData('title','Shiqi Push Notification' );
message.addData('id','11111111111111111111111111111111');
message.addData('image','1');
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('port','4');
message.addData('des_ip','35.8.1.1');
message.addData('src_ip','192.168.1.1');
//message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
//registrationIds.push('c9atmu0htUk:APA91bGWLokm-vtMdPI14Vuu3XjrMW18_EfpmXoDGSvtqCYpEf8ETJ3BTPpsjijuzSMk5LBGqAImFlRO0nXqYm9IYr_FyhXqPDP_qd9eJsl0ha8_bxJe2Doy-dxfRMuoR1sYWmwJCerp');
//registrationIds.push(' fuNfN3w646k:APA91bF09PmuCnUwPYK29-DMNHNdEUa92slZbxV-l3VOxDmRSbUWuwhTWqI95O4h-glR51yRzLhgEttblcgzxa_M4stgp8XMJtZt3TYPOHdudd-gaH4hZ7nEgUnw_IHKB0z61jpqKb1P');
//registrationIds.push('csVcDdBifVU:APA91bEFRLAyaNVjjDx17UCIPm3qXKYmmZnx6vMP0pSQBnPpN0EzvLVVSl7gjWAOQBKha_KrWJolc462Xps6v49jIPuF4DrNUQBtoMEyHhiHuvorfW-BE5xiR1Gc_2YkHN-8UrwJGJvR');
registrationIds.push(' fwrbjjv8rU8:APA91bFqvoUb6iIhVNepcn1-nqxA0hxSnhPd8hZHrMgOy52aoQYeY6XYL9jyBmceYeaibw8XohqGqqLeVTWJ8yMxehr4UkDGWSVugN5iIK1gbuam407lNwWqv-6Gm-GgZ6Zt9gvIsanz');

/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});

//phonegap push --deviceID fbHkAoF7Juo:APA91bGlvpWTMpliL1dWcwGErVC72brfwp94Dm9vY4ELuJO4GVsmqwh8nLpdymv8Rvau28jc7tNkak9ZzHBXsYxVPZBSg5vy68EdoT1QxHB3wsJ7MT5RnpSYgCdotC4DaBfrPHplz5ql --service gcm --payload "{ \"data\": { \"title\": \"Hello\", \"message\": \"World\"} }"

//phonegap push --deviceID fbHkAoF7Juo:APA91bGlvpWTMpliL1dWcwGErVC72brfwp94Dm9vY4ELuJO4GVsmqwh8nLpdymv8Rvau28jc7tNkak9ZzHBXsYxVPZBSg5vy68EdoT1QxHB3wsJ7MT5RnpSYgCdotC4DaBfrPHplz5ql --service gcm --payload "{ \"data\": { \"title\": \"Hello\", \"message\": \"World\"} }"