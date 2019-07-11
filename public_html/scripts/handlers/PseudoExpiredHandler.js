 
PseudoExpiredHandler = function(){
    
};


function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.setPseudoExpired();
}


PseudoExpiredHandler.prototype = Object.create(Handler.prototype);
PseudoExpiredHandler.prototype.constructor = PseudoExpiredHandler;
PseudoExpiredHandler.prototype.execute = execute;