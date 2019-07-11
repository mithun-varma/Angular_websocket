/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * bootstraps angular onto the window.document node
 */
/*define([
    'require',
    'scripts/angular',    
], function (require, ng) {
    'use strict';    
    ng.bootstrap(document,['app']);
    
})*/
require(["my/purchase","jquery",'angular','config'],function(purchase,$,angular,config){
    purchase.purchaseProduct();       
    console.log("here")
    angular.bootstrap(document, ['test']);
});
/*require(["my/purchase","jquery",'angular','angularRoute','services/routeResolver','controllers/playerController','controllers/consumerController'],function(purchase,$,angular){
    purchase.purchaseProduct();       
    var app = angular.module('test', ['ngRoute','routeResolverServices','controllersModule']);     
    app.config(['$routeProvider','routeResolverProvider' , function ($routeProvider,routeResolverProvider) {        
        routeResolverProvider.routeConfig.setBaseDirectories('partials/','scripts/controllers/');       
        $routeProvider.when('/view1', 
        {
            controller: 'consumerController',
            templateUrl: 'partials/consumer.html',
            controllerAs : 'ctrl'
        });

        $routeProvider.when('/view2',{
            controller: 'playerController',
            templateUrl: 'partials/player.html',
            controllerAs : 'ctrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/view1'
        });
    }]);    
    angular.bootstrap(document, ['test']);
});*/