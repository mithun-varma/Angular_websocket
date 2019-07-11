PseudoToPremiumHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.setPseudoToPremium();
}


PseudoToPremiumHandler.prototype = Object.create(Handler.prototype);
PseudoToPremiumHandler.prototype.constructor = PseudoToPremiumHandler;
PseudoToPremiumHandler.prototype.execute = execute;
