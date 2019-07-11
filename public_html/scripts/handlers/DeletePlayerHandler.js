/* 
    * 
 */

DeletePlayerHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.setDeletedPlayer();
}

DeletePlayerHandler.prototype = Object.create(Handler.prototype);
DeletePlayerHandler.prototype.constructor = DeletePlayerHandler;
DeletePlayerHandler.prototype.execute = execute;



