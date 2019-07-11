/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';

define(['angular','angularRoute','services/routeResolver'], function (angular) {

    var app = angular.module('test', ['ngRoute','routeResolverServices']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', 
                '$compileProvider', '$filterProvider', '$provide',
        function ($routeProvider, routeResolverProvider, $controllerProvider, 
                  $compileProvider, $filterProvider, $provide) {

            //Change default views and controllers directory using the following:
            //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');
            console.log($controllerProvider);
            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                .when('/view1', route.resolve('consumer'))
                .when('/view2', route.resolve('player'))               
                .otherwise({ redirectTo: '/view1' });

                }]);

            return app;
});