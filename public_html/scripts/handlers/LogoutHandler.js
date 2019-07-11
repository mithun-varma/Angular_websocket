LogoutHandler = function () {

};

function execute(data) {
    /**Logout#0 
     * Four types of logout codes: 
     * 0 -- Relogin from another client
     * 1 -- Session Expired
     * 2 -- Idle TimeOut
     * 3 -- UCID Block
     * 4 -- Version Mismatch (only DL client)*/
    
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.showLogoutMessage(data);
}


LogoutHandler.prototype = Object.create(Handler.prototype);
LogoutHandler.prototype.constructor = LogoutHandler;
LogoutHandler.prototype.execute = execute;