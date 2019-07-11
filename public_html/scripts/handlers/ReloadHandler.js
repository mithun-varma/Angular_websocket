/* 
    * For reload#pc:chips protocol.
    * Need to send the reload protocol to the server.
 */

ReloadHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    var details = data.split(":");
    lobbyService.reloadChips(details[1]);
}

ReloadHandler.prototype = Object.create(Handler.prototype);
ReloadHandler.prototype.constructor = ReloadHandler;
ReloadHandler.prototype.execute = execute;
