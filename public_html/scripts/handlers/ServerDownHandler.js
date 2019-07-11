ServerDownHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.serverDown();
}

ServerDownHandler.prototype = Object.create(Handler.prototype);
ServerDownHandler.prototype.constructor = ServerDownHandler;
ServerDownHandler.prototype.execute = execute;



