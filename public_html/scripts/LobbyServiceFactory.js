/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

LOBBY_SERVICE = "lobby_service";
LOBBYTOGAME_SERVICE = "lobbytogame_service";
LOBBYTOTOURNEYGAME_SERVICE = "lobbytogame_service";
LOBBYTOTLOBBY_SERVICE = "lobbytotlobby_service";

var LobbyServiceFactory = ( function(){
    var serviceFactoryInstance;
    var services;
    initLobbyServiceFactoryInstance = function(){
        
        var getService = function(serviceName){
            return services[serviceName];
        };
        
        var initServices = function(){
            services = [];
            services[LOBBY_SERVICE] = new LobbyService();
        };
        initServices();
        return{
            getService: getService
        };
    };
    return{
        getLobbyServiceFactoryInstance: function(){
           if(!serviceFactoryInstance){
               serviceFactoryInstance = initLobbyServiceFactoryInstance();
           }
           return serviceFactoryInstance;
        }
    };
})();

