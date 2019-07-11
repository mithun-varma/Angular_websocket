OpenGameDefinitionHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    var details = data.message.split(":");
    lobbyService.updateGamesStatus(details[1],"Open");
}


OpenGameDefinitionHandler.prototype = Object.create(Handler.prototype);
OpenGameDefinitionHandler.prototype.constructor = OpenGameDefinitionHandler;
OpenGameDefinitionHandler.prototype.execute = execute;


