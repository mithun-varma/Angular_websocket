/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global LD_REAL_POOL, LD_PLAY_POOL, LD_PLAY_STAKE, LD_REAL_STAKE, LobbyServiceFactory, LOBBY_SERVICE */

lobbyUpdateHandler = function (scope,model) {
    Handler.call(this);
    this.scope = scope;
    this.model = model;
};

function execute(data) {       
    var serviceFactory = LobbyServiceFactory.getLobbyServiceFactoryInstance();
    var lobbyService = serviceFactory.getService(LOBBY_SERVICE); 
    var details = data.split("*");    
    for (var index = 0; index < details.length; index++) {
        var updateData = details[index];
        if (updateData.search('@') >= 0) {
            var updateDetails = updateData.split("@");              
            if (updateDetails[0].toString() === LD_REAL_POOL) {
                
                lobbyService.updateRealPoolData(updateDetails[1]);
                
            } else if (updateDetails[0].toString() === LD_PLAY_POOL) {

                lobbyService.updatePlayPoolData(updateDetails[1]);

            } else if (updateDetails[0].toString().toLowerCase() === LD_ONLINE_COUNT) {
                //Update online count
                //lobbyService.updateOnlineCount(updateDetails[1]);

            } else if (updateDetails[0].toString() === LD_PLAY_STAKE) {
                
                lobbyService.updatePlayStakeData(updateDetails[1]);

            } else if (updateDetails[0].toString() === LD_REAL_STAKE) {    
                
                lobbyService.updateRealStakeData(updateDetails[1]);
                
            }
        }
    }
    this.scope.$apply();
    /*      
        var collection = this.model.game_source_collection[this.model.grid_view];    
        if(collection.isUpdated){
            collection.isUpdated = false;
            var view_update_value = this.model.view_updated_status[this.model.grid_view];   
            alert("before "+view_update_value)
            this.model.view_updated_status[this.model.grid_view] = view_update_value === 0 ? 1 : 0;
            alert("after"+this.model.view_updated_status[this.model.grid_view])
            this.scope.$apply();
        }
    */
}

lobbyUpdateHandler.prototype = Object.create(Handler.prototype);
lobbyUpdateHandler.prototype.constructor = lobbyUpdateHandler;
lobbyUpdateHandler.prototype.execute = execute;
