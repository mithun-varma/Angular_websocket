CloseGameDefinitionHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    var details = data.message.split(":");
    lobbyService.updateGamesStatus(details[1],"Closed");
}


CloseGameDefinitionHandler.prototype = Object.create(Handler.prototype);
CloseGameDefinitionHandler.prototype.constructor = CloseGameDefinitionHandler;
CloseGameDefinitionHandler.prototype.execute = execute;
