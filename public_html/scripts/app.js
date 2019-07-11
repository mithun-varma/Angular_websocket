/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



require.config({

  // alias libraries paths
    paths: {        
        'angular': 'angular',
        'angularRoute': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min'

    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular'
        }, 
        'angularRoute': ['angular']
    },

    // kick start application
    deps: ['bootstrap']
});


