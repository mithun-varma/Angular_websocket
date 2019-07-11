


SdHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.processServerDetails(data);
}


SdHandler.prototype = Object.create(Handler.prototype);
SdHandler.prototype.constructor = SdHandler;
SdHandler.prototype.execute = execute;