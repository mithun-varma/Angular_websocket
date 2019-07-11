/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['config'], function(app){      
   return app.register.service('$aceurls', function(){       
    return{
        checkMobileNum : 'CheckMobileExistorNot.servlet', 
        verifyMobile : 'mverify.do',
        verifyOTP : 'otpverification.do',
        emailVerify : 'emailVerification.do',
        checkVerificationStatus : 'checkVerificationStatus.do',
        dwnldLinkSms : 'smsSender.do'
    };
   });
});
