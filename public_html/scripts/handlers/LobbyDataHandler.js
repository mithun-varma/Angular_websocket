/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

LobbyDataHandler = function (scope,model) {
    Handler.call(this);    
    this.scope = scope;
    this.model = model;
};

function execute(data) {    
//    console.log("Message ",message);
    /*var context = ApplicationContext.getContextInstance();*/
    var serviceFactory = LobbyServiceFactory.getLobbyServiceFactoryInstance();
    var lobbyService = serviceFactory.getService(LOBBY_SERVICE);  
    var details = data.split("*");
    for (var index = 0; index < details.length; index++) {   
        var message = details[index];                
        if (message.indexOf(LD_SESSION) === 0) {            
            var sessionDetails = message.split(":");           
            //context.setSessionId(sessionDetails[1]);
            
            /*var lobbyCommunicator = context.getLobbyCommunicator();
            var autoLoginUserName = context.getAutoUserName();
            var autoLoginSession = context.getAutoSessionId();
            
            console.log("LD Handler >>> Auto Login User Details : \nUser Name : "+autoLoginUserName +"\nSession Id : "+autoLoginSession +"\n User ID : " + context.getPlayer().getUserName());
            if (autoLoginUserName !== undefined && autoLoginSession !== undefined) {//undefined
                //('aLogin#uname:'+autoLoginUserId+',wsid:'+webSession);
                lobbyCommunicator.getCommunicationChannel().sendMessage("aLogin#uname:"+autoLoginUserName+",wsid:"+autoLoginSession);
            } else if (!context.getPlayer().getUserName()) { //to send login only once
                //lobbyCommunicator.getCommunicationChannel().sendMessage("Login#userid:TEst32,password:ace2three");
                lobbyCommunicator.getCommunicationChannel().sendMessage("Login#userid:acetest447,password:ace2three");
            }*/

        } else if (message.indexOf(LD_PLAY_POOL) === 0) {                                     
            lobbyService.processPlayPool(message);               
        } else if (message.indexOf(LD_REAL_POOL) === 0) {
            lobbyService.processRealPool(message);
        } else if (message.indexOf(LD_PLAY_STAKE) === 0) {
            lobbyService.processPlayStake(message);
        } else if (message.indexOf(LD_REAL_STAKE) === 0) {
            lobbyService.processRealStake(message);
        }else if (message.indexOf(LD_TOURNEY) === 0) {           
            lobbyService.processTournamentData(message);
        }else if (message.indexOf(LD_BANNER_DETAILS) === 0) {
            //lobbyService.banner(message);
        } else if (message.indexOf(LD_SERVER_DETAILS) === 0) {
            //lobbyService.processServerDetails(message);
        } else if (message.indexOf(LD_ONLINE_COUNT) === 0) {

        }
    }
    /*
        for (var key in this.model.games_to_display_collection) {        
            var display_collection = this.model.games_to_display_collection[key];        
            angular.forEach(this.model.game_source_collection[key].cachedCollection, function(value, key) {              
                display_collection.addGameDefinition(angular.copy(value))
            });        
        }  
     */  
    this.scope.$apply();
    return null;
}

LobbyDataHandler.prototype = Object.create(Handler.prototype);
LobbyDataHandler.prototype.constructor = LobbyDataHandler;
LobbyDataHandler.prototype.execute = execute;
