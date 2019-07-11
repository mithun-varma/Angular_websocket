PanHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.updatePanStatus(data);
}


PanHandler.prototype = Object.create(Handler.prototype);
PanHandler.prototype.constructor = PanHandler;
PanHandler.prototype.execute = execute;