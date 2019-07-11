/* 
 *  
 */

GuHandler = function () {

};

function execute(data) {
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);

    var details = data.split('-');
    var gameDetails;
    var definitionDetails;
    if (details[0] === "add") {//'add'
        gameDetails = details[1].split('@');
        if (gameDetails[0].toString() === LD_REAL_POOL) {
            lobbyService.processRealPool(details[1]);
        } else if (gameDetails[0].toString() === LD_PLAY_POOL) {
            lobbyService.processPlayPool(details[1]);
        } else if (gameDetails[0].toString() === LD_PLAY_STAKE) {
            lobbyService.processPlayStake(details[1]);
        } else if (gameDetails[0].toString() === LD_REAL_STAKE) {
            lobbyService.processRealStake(details[1]);
        }
    } else if (details[0] === "delete") { //delete
        gameDetails = details[1].split('@');
        if (gameDetails[0].toString() === LD_PLAY_POOL) {
            definitionDetails = gameDetails[1].split(':');
            if (definitionDetails[0].toString().toLowerCase() === 'gid') {
                lobbyService.removeGameDefinition(int(definitionDetails[1]), PLAYPOOL);
            }
        } else if (gameDetails[0].toString().toLowerCase() === LD_REAL_POOL) {
            definitionDetails = gameDetails[1].split(':');
            if (definitionDetails[0].toString().toLowerCase() === 'gid') {
                lobbyService.removeGameDefinition(int(definitionDetails[1]), REALPOOL);
            }
        } else if (gameDetails[0].toString().toLowerCase() === LD_REAL_STAKE) {
            definitionDetails = gameDetails[1].split(':');
            if (definitionDetails[0].toString().toLowerCase() === 'gid') {
                lobbyService.removeGameDefinition(int(definitionDetails[1]), REALSTAKE);
            }
        } else if (gameDetails[0].toString().toLowerCase() === LD_PLAY_STAKE) {
            definitionDetails = gameDetails[1].split(':');
            if (definitionDetails[0].toString().toLowerCase() === 'gid') {
                lobbyService.removeGameDefinition(int(definitionDetails[1]), PLAYSTAKE);
            }
        }
    }


}

GuHandler.prototype = Object.create(Handler.prototype);
GuHandler.prototype.constructor = GuHandler;
GuHandler.prototype.execute = execute;




