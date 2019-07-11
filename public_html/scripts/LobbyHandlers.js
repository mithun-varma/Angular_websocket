/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global LobbyServiceFactory */

var lobby = angular.module('handlers', ['LobbyServices']);

var lobbyHandlers = function(serverProtocolBuilder,lobbyService){       
    var LD_PLAY_POOL = "PP";
    var LD_REAL_POOL = "RP";
    var LD_PLAY_STAKE = "PS";
    var LD_REAL_STAKE = "RS";
    var LD_SESSION = "sid";
    var LD_TOURNEY = "TR";
    var LD_SERVER_DETAILS = "sd";
    var LD_BANNER_DETAILS = "banner";
    var LD_ONLINE_COUNT = "cnt";
    var PLAYPOOL = "PlayPool";
    var REALPOOL = "RealPool";
    var REALSTAKE = "RealStake";
    var REALSTAKE9 = "RealStake9";
    var PLAYSTAKE = "PlayStake";
    var PLAYSTAKE9 = "PlayStake9";
    var POOL_101 = "101 Pool";
    var POOL_201 = "201 Pool";
    var BESTOF3 = "BestOf3";
    var BESTOF2 = "BestOf2";
    
    var handlers = {};
    handlers.scope;
    handlers.model;    
    handlers.game_players = new Array(6);
    handlers.game_levels = new Array(6);
    handlers.setModelAndScope = function(model,scope){       
        handlers.model = model;
        handlers.scope = scope;
    };
    // lobby data handler
    handlers.ld = function(data){       
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
            } else if (message.indexOf(LD_TOURNEY) === 0) {
                lobbyService.processTournamentData(message);
            } else if (message.indexOf(LD_BANNER_DETAILS) === 0) {
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
        handlers.scope.$apply();
    }
    //lobby update
    handlers.lu = function(data){       
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
        var model = handlers.model;       
        model.gameInfo = model.gameInfoDisplay[model.game_info_view];
        if(model.game_info_view === model.POOL_GAME && model.gameInfo['game_object'] !== ""){            
            var gameObject = model.gameInfo['game_object']; // this is the game object stored when user selects the game
            var id = model.gameInfo['game_id'];
            var game_type_code = model.gameInfo['game_type_code'];           
            /*
             * if the registering count of saved state changes with the latest lobby update
             * we call the server to get the latest data again 
             */
            if(model.gameInfo['registering_count'] !== gameObject.getRegisteringTableCount()){              
                model.gameInfo['bet'] = gameObject.getBet();
                model.gameInfo['registering_count'] = gameObject.getRegisteringTableCount();
                model.gameInfo['game_type'] = gameObject.getGameType();               
                model.gameInfo['status'] = gameObject.getStatus();                 
                serverProtocolBuilder.gp(id,game_type_code);
            }
        }else if(model.game_info_view === model.TOURNEY_GAME && model.gameInfo['tourney_object'] !== ""){
            var tourney_object = model.gameInfo['tourney_object'];
            var id = model.gameInfo['tourney_name'];
            /*
             * if one of the entry or cash_prize or  changes with the latest lobby update
             * we call the server to get the latest data again 
             */             
            if(model.gameInfo['entry'] !== tourney_object.getDisplayEntry() || model.gameInfo['cash_prize'] !== tourney_object.getTotalPrize()){               
                model.gameInfo['entry'] = tourney_object.getDisplayEntry();
                model.gameInfo['is_pool_tourney'] = tourney_object.isPoolTourney(); 
                model.gameInfo['tourneyDesc'] = tourney_object.getDescription();
                model.gameInfo['cash_prize'] = tourney_object.getTotalPrize();                               
                model.gameInfo['status'] = tourney_object.getStatus();
                serverProtocolBuilder.TTimings(id);               
            }
        }        
        handlers.scope.$apply();
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
    };
    handlers.RegisterTourneys = function(data){
        lobbyService.updateRegisteredTourneys(data);
    };
    handlers.gp = function(data){        
        var model = handlers.model;
        if(data.indexOf(":") >= 0){
            var gameid = data.split(":")[0];
            var players = data.split(":")[1];                         
            if(players.trim() !== ""){      
                var game_players =  new Array(6);
                model.gameInfo = model.gameInfoDisplay[model.game_info_view];                               
                if(gameid === model.gameInfo['game_id']){
                    if(players.indexOf(",") >= 0){
                        players = players.split(",");
                        for(var i = 0;i < players.length; i++){
                            game_players[i] = players[i];
                        }
                    }else{                   
                        game_players[0] = players;                                     
                    }                                  
                    model.gameInfo['game_players'] = game_players;
                }else{
                    model.gameInfo['game_players'] = handlers.game_players;
                }
            }else{
                model.gameInfo = model.gameInfoDisplay[model.game_info_view];
                model.gameInfo['game_players'] = handlers.game_players;               
            }
            handlers.scope.$apply();
        }else{
            console.log("invalid server data"+data);
        }
    };
    handlers.ttimings = function(data){      
        var model = handlers.model;
        if(data.indexOf("-") >= 0){
            var details = data.split('-'); 
            var tourneyName = details[0]; 
            var tourneyDetails = details[1];
            model.gameInfo = model.gameInfoDisplay[model.game_info_view];
            if(tourneyDetails !== "" && tourneyName === model.gameInfo['tourney_name']){                                    
                if(model.gameInfo['is_pool_tourney']){                     
                    var poolTourneyDetails = tourneyDetails.split(',');                    
                    model.gameInfo['poolType'] = poolTourneyDetails[1];
                    model.gameInfo['entry'] = poolTourneyDetails[2];
                    model.gameInfo['totalWinners'] = poolTourneyDetails[3];
                    model.gameInfo['eachplayerPrize'] = poolTourneyDetails[4];
                    model.gameInfo['prizeExtension'] = poolTourneyDetails[5];
                    model.gameInfo['rejoinAmount'] = poolTourneyDetails[6]; // for pool tourney rejoins
                    model.gameInfo['announcedToRegDate'] = poolTourneyDetails[7];                   
                }else{
                    var levelData = details[1];
                    var level_details =  new Array(6);
                    var level_info = levelData.split('@');
                    var levelDescription;
                    var levels_data;
                    var level;
                    var level_start_time;
                    var level_end_time;
                    var level_bet;
                    var i = 0;
                    for(var index = 0; index < level_info.length; index++){
                        levelDescription = level_info[index];                        
                        if(levelDescription !== ""){ //to avoid processing of empty data
                            levels_data = levelDescription.split(',');
                            level = levels_data[0].toString().replace('Level','');
                            level_start_time = levels_data[1];
                            level_end_time = levels_data[2];
                            level_bet = levels_data[3]; 
                            level_details[i] = new model.levelVo(level,level_start_time,level_end_time,level_bet);                        
                            i = i + 1;
                        }
                    }                     
                    model.gameInfo['game_levels'] = level_details;
                }
            }else{
                 model.gameInfo['game_levels'] = handlers.game_levels;
            }
            handlers.scope.$apply();            
        }else{
            console.log("invalid server data"+data);
        }
    };
    handlers.login = function(data){
         /**
        * Login#0
        * 
        * Response codes description: 
        * a. '0' -- Successful Login;
        * b. '1' or '2' -- Invalid Userid or Password;
        * c. '3' -- Failed while updating database;
        * d. '10' -- Already Logged in;
        * e. '20' -- Account activation pending;
        * f. '100' -- OK (need to confirm with server for description);
        * g. '702' -- Under Age
        * h. '700' -- Invalid IP;
        * 
        * If all the above fails, we receive 'Invalid Userid or Password' (like code 1 or 2);
        * 
        * */
        lobbyService.processLogin(data);
    }
    return handlers;
};

lobby.factory('handlers',['serverProtocolBuilder','lobbyService',lobbyHandlers]);


