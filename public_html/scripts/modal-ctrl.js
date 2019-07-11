/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var modal_dir = angular.module('modal_popup',['server_protocols']);


var modalDisplay = function(serverProtocolBuilder){   
    var modalController = function($scope){           
        var model = this;    
        var login
        model.doLogin = function(){
            console.log("the values are "+model.userid+" "+model.password);
            serverProtocolBuilder.login(model.userid,model.password);
        }  
        $scope.$watch('modalCtrl.gameDetails.cachedCollection',function() {            
            model.game_details = model.gameDetails.cachedCollection;                 
        });
        
    };   
    return{
        restrict: 'E',
        templateUrl: function(element, attrs) {           
            return "angular-partials/"+attrs.templateSrc;
        },               
        scope: {
            lobbyData: '=',
            templateSrc : '@'
        },                
        controller: modalController,
        controllerAs: 'modalCtrl',
        bindToController: true
    };
}; 
modal_dir.directive('modalDisplay', ['serverProtocolBuilder',modalDisplay]);
