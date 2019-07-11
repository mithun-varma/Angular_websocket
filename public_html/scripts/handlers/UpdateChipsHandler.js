/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


UpdateChipsHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    lobbyService.updateChips(data);
}

UpdateChipsHandler.prototype = Object.create(Handler.prototype);
UpdateChipsHandler.prototype.constructor = UpdateChipsHandler;
UpdateChipsHandler.prototype.execute = execute;