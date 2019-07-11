/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['config','services/commonServices'], function(app){      
   return app.register.controller('playerController', ['$scope','$aceurls' , function ($scope,aceurls){
        console.log("test");
        this.testclick = function(){
            console.log("clicked "+aceurls.checkMobileNum);
        }
   }]);
});
