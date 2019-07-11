
IpblockHandler = function(){
    
};


function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.showIpblockMessage(data);
}


IpblockHandler.prototype = Object.create(Handler.prototype);
IpblockHandler.prototype.constructor = IpblockHandler;
IpblockHandler.prototype.execute = execute;