/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['config'], function(app){   
   return app.register.controller('consumerController', ['$scope' ,function ($scope){
        console.log("index");
   }]);
});
/*define(['require'], function(require){   
   var app = require(['./controllers'],function (app){
       return app.controller('consumerController', ['$scope' ,function ($scope){
            console.log("index");
       }]);
   });  
   
});*/