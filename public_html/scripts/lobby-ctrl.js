/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global LOBBY_SERVICE, LobbyServiceFactory, angular */

var lobby = angular.module('clientLobby', ['handlers','modal_popup','server_protocols','LobbyServices']);



var LobbyController = function(scope,handlers,serverProtocolBuilder,lobbyService) {
    var model = this;
    model.play201Collection;
    model.play101Collection;
    model.playStakeCollection;
    model.playBOXCollection;
    model.real201Collection;
    model.real101Collection;
    model.realStakeCollection;
    model.realBOXCollection;
    model.playTourneyCollection;
    model.realTourneyCollection;
    model.cashTourneyCollection;   
    model.acePointsTourneyCollection;
    model.specialTourneyCollection;
    model.beginnerTourneyCollection;
    model.freerollTourneyCollection;
    model.serverDetails;   
    model.lobbyCommunicator;
    model.player = new PlayerVO();
    model.clientVersion = "1.0"; //Application version
    model.clientAPIVersion = "2.6.1"; //Phaser version minJS
    model.sessionId;
    model.oldSessionId;
    model.styleManager;
    model.alertStates;
    model.gameWindowsCount;
    model.mGameContexts = {};
    model.cardSourceMappings = {};
    model.gameWindowKeys = new Array();

    model.autoUserName;
    model.autoSessionId;
    model.autoGameType;
    model.autoBet;
    model.autoMaxPlayers;
    model.autoIsPlayGame;
    
    
    //user activity stats ex login status , singup status, email veriification status etc..
    model.user_activity_status = {
        sign_in_status : -1,
        
        
    }
    
    //gameConstants
    model.PREMIUM_SUBSCRIPTION = "Premium";
    model.REGULAR_SUBSCRIPTION = "Regular";
    
                        
    
    // gameType Constants
    model.play101 = "play_101_Pool";
    model.play201 = "play_201_Pool";
    model.playBOX = "play_BOX";
    model.playStake = "PlayStake";
    model.real101 = "real_101_Pool";
    model.real201 = "real_201_Pool";
    model.realBOX = "real_BOX";
    model.realStake = "RealStake";   
    model.cashTourney = "cash_tourney";
    model.specialTourney = "special_tourney";
    model.acePointsTourney = "acepoint_tourney";
    model.beginnerTourney = "beginner_tourney";
    model.freerollTourney = "freeroll_tourney";
    
    model.PLAY_POOL_CODE = "pp";
    model.REAL_POOL_CODE = "rp";
    model.PLAY_STAKE_CODE = "ps";
    model.REAL_STAKE_CODE = "rs";
    model.SESSION_CODE = "sid";
    model.TOURNEY_CODE = "tr";
    
    
    model.POOL_GAME = "pool";
    model.TOURNEY_GAME = "tourney";
        
        
    //game details info
    model.gameInfoDisplay = {
        pool : {
            game_id : "",
            bet: "",
            registering_count: "",
            game_type: "",
            game_variant: "",
            status: "",
            game_type_code: "",
            game_players: new Array(6),
            game_object :""
        },
        tourney: {
            tourney_name : "",
            is_pool_tourney: false,
            tourneyDesc :  "",            
            poolType:  "",
            entry:  "",
            totalWinners:  "",
            eachplayerPrize:  "",
            prizeExtension:  "",
            rejoinAmount:  "", 
            announcedToRegDate:  "",           
            cash_prize: "",           
            status: "",
            game_levels: new Array(6),
            tourney_object : ""
        }
    };     
    
    model.levelVo = function(level,start_time,end_time,bet){
        this.level = level;
        this.level_starttime = start_time;
        this.level_endtime = end_time;
        this.bet = bet;
        this.get_level_info = function(){
            return this.level_starttime+" To "+this.level_endtime;
        };
    };
    
         
    
   /* model.view_updated_status = {   
        'play_101 Pool':0,
        'play_201 Pool':0,
        'play_BOX':0,                              
        'PlayStake' : 0,
        'real_101 Pool':0,
        'real_201 Pool':0,                              
        'real_BOX':0,
        'RealStake':0
    };*/
            
    //filterType Constants
    model.viewAll = 'viewAll';
    model.two_player = '2';
    model.six_player = '6';
    model.nine_player = "9";
    model.BO2 = 'BO2';
    model.BO3 = 'BO3';   
    model.low_bet = 'Low';
    model.medium_bet = 'Medium';
    model.high_bet = 'High';
    model.registered = 'registered'; 
    model.exclude_mobile = 'exclude_mobile';    
   
    //model bet Ranges
    model.gameBetRanges =  {
        POOL : {'Low' : '0:100','Medium' : '100:500','High' : '500:5000'},
        BOX :  {'Low' : '0:100','Medium' : '100:500','High' : '500:5000'}, 
        Stake : {'Low' : '0.05:0.1','Medium' : '1.0:5.0', 'High' : '5.0:25.0'},
        general_tourney : {'Low' : '0:50','Medium' : '50:200', 'High' : '200:1000'},
        acepoint_tourney : {'Low' : '0:500','Medium' : '500:2000', 'High' : '2000:5000'}
        
    };
    
    //model Filter Type Values    
    model.FilterValues =  {
        POOL : {'viewAll' : 'viewAll','two_player' : '2','six_player' : '6','low_bet' : 'Low','medium_bet' : 'Medium', 'high_bet' : 'High'} ,
        BOX : {'viewAll' : 'viewAll','BO2' : 'BestOf2','BO3' : 'BestOf3','low_bet' : 'Low','medium_bet' : 'Medium', 'high_bet' : 'High'}, 
        Stake : {'viewAll' : 'viewAll','two_player' : '2','six_player' : '6', 'nine_player' : '9', 'low_bet' : 'Low','medium_bet' : 'Medium', 'high_bet' : 'High'},
        Tourney : {'viewAll' : 'viewAll','registered' : 'registered','exclude_mobile' : false,'low_bet' : 'Low','medium_bet' : 'Medium', 'high_bet' : 'High'},        
    }; 
    
    //model Filters to display    
    
    model.Filters =  {
        POOL : {'viewAll' : false,'two_player' : false,'six_player' : false,'low_bet' : false,'medium_bet' : false, 'high_bet' : false} ,
        BOX : {'viewAll' : false,'BO2' : false,'BO3' : false,'low_bet' : false,'medium_bet' : false, 'high_bet' : false}, 
        Stake : {'viewAll' : false,'two_player' : false,'six_player' : false, 'nine_player' : false, 'low_bet' : false,'medium_bet' : false, 'high_bet' : false},
        Tourney : {'viewAll' : false,'registered' : false,'exclude_mobile' : false,'low_bet' : false,'medium_bet' : false, 'high_bet' : false},        
    };                 
    
    model.getPlay201Collection = function () {
        return model.play201Collection;
    };

    model.getPlay101Collection = function () {
        return model.play101Collection;
    };

    model.getPlayBOXCollection = function () {
        return model.playBOXCollection;
    };

    model.getPlayStakeCollection = function () {
        return model.playStakeCollection;
    };

    model.getReal201Collection = function () {
        return model.real201Collection;
    };

    model.getReal101Collection = function () {
        return model.real101Collection;
    };

    model.getRealBOXCollection = function () {
        return model.realBOXCollection;
    };

    model.getRealStakeCollection = function () {
        return model.realStakeCollection;
    };    
    model.initServerDetails = function () {
        model.serverDetails = new ServerDetails();
    };

    model.getServerDetails = function () {
        return model.serverDetails;
    };
    model.getLobbyCommunicator = function(){
        return model.lobbyCommunicator;
    };
    model.getPlayer = function () {
        return model.player;
    };
    model.setSessionId = function (value) {
        model.sessionId = value;
    };
    model.getSessionId = function () {
        return model.sessionId;
    };
    model.setOldSessionId = function (value) {
        model.oldSessionId = value;
    };
    model.getOldSessionId = function () {
        return model.oldSessionId;
    };    
        
    
    
    model.createGridCollections = function () {
        model.play101Collection = new GridCollection();
        model.play201Collection = new GridCollection();
        model.playBOXCollection = new GridCollection();
        model.playStakeCollection = new GridCollection();

        model.real101Collection = new GridCollection();
        model.real201Collection = new GridCollection();
        model.realBOXCollection = new GridCollection();
        model.realStakeCollection = new GridCollection();
        
        model.playTourneyCollection = new TournamentCollection();
        model.realTourneyCollection = new TournamentCollection();        
        model.cashTourneyCollection = new TournamentCollection();       
        model.acePointsTourneyCollection = new TournamentCollection();
        model.specialTourneyCollection = new TournamentCollection();
        model.beginnerTourneyCollection = new TournamentCollection(); 
        model.freerollTourneyCollection = new TournamentCollection();
    };       

    model.createGridCollections();
    //model.initServerDetails();
    model.realPoolGameDefinitions = {};
    model.playPoolGameDefinitions = {};
    
    //used for dynamically upating the game definition 
    //at the time of lobby Update Service.
    model.real_game_type_based_collections = {'101 Pool' : model.real101Collection,'201 Pool':model.real201Collection,'BestOf3' : model.realBOXCollection,'BestOf2' : model.realBOXCollection};
    model.play_game_type_based_collections = {'101 Pool' : model.play101Collection,'201 Pool':model.play201Collection,'BestOf3' : model.playBOXCollection,'BestOf2' : model.playBOXCollection};
    
    //collection of all games
    model.game_source_collection = {   
        'play_101_Pool':model.play101Collection,
        'play_201_Pool':model.play201Collection,
        'play_BOX':model.playBOXCollection,                              
        'PlayStake' : model.playStakeCollection,
        'real_101_Pool':model.real101Collection,
        'real_201_Pool':model.real201Collection,                              
        'real_BOX':model.realBOXCollection,
        'RealStake':model.realStakeCollection
    };
    
   /* model.games_to_display_collection = {   
        'play_101 Pool':new GridCollection(),
        'play_201 Pool':new GridCollection(),
        'play_BOX':new GridCollection(),                              
        'PlayStake' : new GridCollection(),
        'real_101 Pool':new GridCollection(),
        'real_201 Pool':new GridCollection(),                              
        'real_BOX':new GridCollection(),
        'RealStake':new GridCollection()
    }; */   
    
    var clientConfig = new Configuration();
    clientConfig.setHandlersList([]);
    clientConfig.setHeartBeatMessage("ping#");
    clientConfig.setHeartBeatInterval(5);
    clientConfig.setConnectionTimeout(10);
    clientConfig.setReadTimeout(30);
    clientConfig.setReconnectionTimeout(10);
    clientConfig.setProtocolDelimiter("#");
    clientConfig.setServerAddress("10.0.20.6"); //Dev
    clientConfig.setServerPort("7789");
    clientConfig.setLobbyScope(scope);
    clientConfig.setLobbyModel(model);
        
    
    //LobbyService    
    lobbyService.setLobbyScope(scope);
    lobbyService.setLobbyContext(model);    // this is the lobby controller instance          
       
                
    model.outLander = "test";
    /*var handlersList = new Array();    
    handlersList["ld"] = new LobbyDataHandler(scope,model);
    handlersList["lu"] = new lobbyUpdateHandler(scope,model);
    handlersList["RegisterTourneys"] = new lobbyUpdateHandler(scope,model);
    clientConfig.setHandlersList(handlersList);  */
    handlers.setModelAndScope(model,scope);     
    clientConfig.setHandlers(handlers);           

    var lobbyListener = new LobbyClientListener();
    var client = new BaseClient(clientConfig,lobbyListener);
    lobbyListener.setCommunicationChannel(client);    
    serverProtocolBuilder.setCommunicationChannel(client);
    client.start();    
    
    model.displayGameBasedGrid = function(game_type){      
        model.grid_view = game_type;        
    }    
    model.grid_view = model.realStake;
    //(pool_stake or tourney default it to pool_stake)
    model.game_info_view = model.POOL_GAME; // to display the game info for pool games and tourney games.
    
    model.testData = function(){   
        $scope.apply();
        alert(model.grid_view+" "+model.games_to_display_collection[model.grid_view])
        model.test = "newtest";
        model.outLander = "new outlander"+42       
    }    

};

var gameInformation = function(){
     var gameInformationController = function($scope) {
        var model = this;              
        model.gameDetails = model.lobbyData.gameInfoDisplay[model.gameCategeory];        
     }
    
    return{
        restrict: 'E',
        scope: {
            gameCategeory: '@',
            lobbyData: '='                
        },        
        templateUrl: "angular-partials/gameinfo.html",
        controller: gameInformationController,
        controllerAs: 'gameInfo',
        bindToController: true
    };
}

var gameDefinition = function gameDefinition(serverProtocolBuilder){
    
    var lobbyController = function($scope) {         
        var model = this; 
        model.user_subscription = model.lobbyData.getPlayer().getSubscription();                  
        if(model.gameType.indexOf('real') >= 0){
            model.cash_or_fun = 'Cash';
        }else{
            model.cash_or_fun = 'Fun';
        }               
        if(model.gameType.indexOf('Pool') >= 0){  
            model.gridDisplay = "POOL-BOX";    // grid is common for POOL & BOX  
            model.filterDisplay = "POOL";      // filter specific to POOL     
            model.bet_range = "POOL";
        }else if(model.gameType.indexOf('BOX') >= 0){
            model.gridDisplay = "POOL-BOX";    // grid is common for POOL & BOX 
            model.filterDisplay = "BOX";       // filter specific to BOX  
            model.bet_range = "BOX";
        }else if(model.gameType.indexOf('Stake') >= 0){
            model.gridDisplay = "Stake";    // grid for stake  
            model.filterDisplay = "Stake";  // filter for stake
            model.bet_range = "Stake";
        }else if(model.gameType.indexOf('tourney') >= 0){                        
            model.gridDisplay = "Tourney";
            model.filterDisplay = "Tourney";                
            if(model.gameType === model.lobbyData.acePointsTourney){
                model.bet_range = "acepoint_tourney"; // if acepoints tourney we get respective bet_range
            }else{
                model.bet_range = "general_tourney"; // else bet_range is common for all tourneys
            }            
        }else{
            model.gridDisplay = model.gameType;
            model.filterDisplay = "Others";
        }                         
        var gameObj;
        model.displayGameInfo = function(id){                            
            model.selectedRow = id;
            model.gameInfo = model.lobbyData.gameInfoDisplay[model.lobbyData.game_info_view];
            gameObj = model.gameDetails.getGameDefinition(id);            
            if(gameObj != "" && gameObj.hasOwnProperty('_definitionId')){                  
                model.gameInfo['game_id'] = id;
                model.gameInfo['bet'] = gameObj.getBet();
                model.gameInfo['registering_count'] = gameObj.getRegisteringTableCount();
                model.gameInfo['game_type'] = gameObj.getGameType();
                model.gameInfo['game_variant'] = model.cash_or_fun;
                model.gameInfo['status'] = gameObj.getStatus(); 
                model.gameInfo['game_type_code'] = model.gameTypeCode;
                model.gameInfo['game_object'] = gameObj;
                serverProtocolBuilder.gp(id,model.gameTypeCode);
            }else{
                console.log("gameObj is not available for game id "+id);
            }                        
        };
        model.displayTourneyInfo = function(id){     
            model.selectedRow = id;
            model.gameInfo = model.lobbyData.gameInfoDisplay[model.lobbyData.game_info_view];
            gameObj = model.gameDetails.getTournament(id);            
            if(gameObj != "" && gameObj.hasOwnProperty('tourneyName')){                 
                model.gameInfo['tourney_name'] = id;               
                model.gameInfo['entry'] = gameObj.getDisplayEntry();                
                model.gameInfo['is_pool_tourney'] = gameObj.isPoolTourney(); 
                model.gameInfo['tourneyDesc'] = gameObj.getDescription();
                model.gameInfo['cash_prize'] = gameObj.getTotalPrize();  
                var status = gameObj.getStatus();
                if(status === "Announced"){
                    status = "Registration opens ";
                }
                model.gameInfo['status'] = status;  
                model.gameInfo['tourney_object'] = gameObj;
                serverProtocolBuilder.TTimings(id);                                
            }else{
                console.log("gameObj is not available for game id "+id);
            }                                  
        };
        model.joinGame = function(id){
           if(model.user_subscription === "" || model.user_subscription === undefined){                
               $("#login").modal('show'); 
           } 
        }
        model.game_details = model.gameDetails.cachedCollection;
        /*  model.game_details = model.lobbyData.games_to_display_collection[model.gameType];
            $scope.$watch('lobbyController.lobbyData.view_updated_status[lobbyController.gameType]',
            function(newValue,oldValue) {                
               alert("what the hell");
            });
        */       
        $scope.$watch('lobbyController.gameDetails.cachedCollection',function() {            
            model.game_details = model.gameDetails.cachedCollection;                 
        });
        model.display_grid_id = model.gameType;
        model.display_grid_table_id = model.gameType + "t_id";
        model.displayEmptyRecords = false;
        model.no_empty_records = 12;
        model.get_empty_records = function (num) {
            return new Array(num);
        }        
    }
    
    return{
        restrict: 'E',
        scope: {
            gameDetails: '=', 
            gameType: '@',
            lobbyData: '=',
            gameTypeCode: '@'
        },        
        templateUrl: "angular-partials/gamedefinitions.html",
        controller: lobbyController,
        controllerAs: 'lobbyController',
        bindToController: true
    };
    
};

var gameFilterDisplay = function(filterService){   
    var filterController = function($scope) {
        var model = this;
        model.lobbyData = model.filterData.lobbyData;   // contoller model data     
        model.filter_display = model.filterData.filterDisplay;   //  Type of the filter to display (POOL,STAKE,BESTOFX .... )                        
        model.bet_range = model.filterData.bet_range;
        $scope.filters = jQuery.extend(true, {}, model.lobbyData.Filters[model.filter_display]); //  list of filter Options ex (ViewAll , two_player, six_player ...) all values set to false;
        model.filter_values = model.lobbyData.FilterValues[model.filter_display]; // values for the filters ex {ViewAll : viewAll : two_player : 2 , BO2 : BestOf2 , low_bet : Low etc ..}
        model.bet_ranges = model.lobbyData.gameBetRanges[model.bet_range]; // range of bets based on game_type ex for pool game {low ->  0:100 , medium 100:500 etc ..}  , for stake {'0.05:0.1','Medium' : '1.0:5.0', 'High' : '5.0:25.0'}                                   
        model.game_type = model.filterData.gameType;      
        model.bets_display = true;//sets bets_display to true of false to display {HIGH,LOW,MEDIUM} in the filter.
        if(model.game_type === model.lobbyData.freerollTourney){ // if the game is free roll dont show bet filters            
            model.bets_display = false;                     
        }
        
                     
        model.filterGameDetails = function(filter_type){             
            filterService.filterGames(filter_type,model,$scope.filters);
            var grid_id = "#"+model.filterData.display_grid_id;
            //var grid_table_id = "#"+model.filterData.display_grid_table_id;
            $(grid_id).removeClass('scroll_hide');
            var hasScrollBar = $(grid_id).hasScrollBar();              
            if(!hasScrollBar){                
                /*var scroll_diff = $(grid_id).getScrollDifference(grid_table_id); 
                model.filterData.no_empty_records = parseInt(scroll_diff/20)*/
                model.filterData.displayEmptyRecords = true;
                $(grid_id).addClass('scroll_hide');               
            }else{
                model.filterData.displayEmptyRecords = false;
            }                             
        }; 
       
    };           
    return{
        restrict: 'E',
        scope: {
            filterData: '='           
        },           
        templateUrl: "angular-partials/gamefilters.html",
        controller: filterController,
        controllerAs: 'filter',
        bindToController: true
    };
};

var filterService = function(){
    var serviceObject = {};    
    serviceObject.filterGames = function(filter_type,controller,filterOptions) {         
         if(filter_type === controller.lobbyData.viewAll){
            var count = 0; 
            var isFilterApplied = false;
            angular.forEach(filterOptions, function (value, key) {
                if (key !== controller.lobbyData.viewAll) {
                    if (value) {
                        isFilterApplied = true;
                        filterOptions[key] = false;
                    }
                }
            });
            if (isFilterApplied) {
                angular.forEach(controller.filterData.game_details, function (item) {
                    serviceObject.applyEvenOdd(item, count);
                    count++;
                    $("#" + item._definitionId).show();
                });
            }            
        }else{                      
            var applied_filters = [];       // filters like 2,6,BO2 etc                
            var applied_ranges = [];     // filters like low,high,medium
            var range_check = false; // if range check is true we will evaluate the range of the bet.
            var filter_check = false;          
            angular.forEach(filterOptions, function(value, key) {                  
                if(value){ 
                    var value = controller.filter_values[key];                      
                    if(controller.bets_display && (value === controller.lobbyData.low_bet || value === controller.lobbyData.medium_bet
                        || value === controller.lobbyData.high_bet)){                            
                        applied_ranges.push({range_type : value}); 
                        range_check = true;
                    }else{
                        filter_check = true;
                        applied_filters.push(value);
                    }
                }                
            }); 
            if(controller.filter_display === "Tourney"){                               
                serviceObject.filterTourneyDetails(controller,applied_filters,applied_ranges,filter_check,range_check);
            }else{
                serviceObject.filterGameDetails(controller,applied_filters,applied_ranges,filter_check,range_check);
            }
            
        }                                                       
    };
    serviceObject.filterTourneyDetails = function(controller,applied_filters,applied_ranges,filter_check,range_check){
        var count = 0;            
        if (filter_check && range_check) {
            angular.forEach(controller.filterData.game_details, function (item) {               
                if (($.inArray(item.user_registerd, applied_filters) > -1 || $.inArray(item.mobileSpecified , applied_filters) > -1) 
                        && serviceObject.isInRange(item.entry, applied_ranges, controller)) {
                    serviceObject.applyEvenOdd(item, count);
                    count++;
                    $("#" + item.tourneyName).show();
                } else {
                    $("#" + item.tourneyName).hide();
                }
            });
        } else if (filter_check || range_check) {            
            angular.forEach(controller.filterData.game_details, function (item) {                  
                if (filter_check && ($.inArray(item.user_registerd, applied_filters) > -1 ||
                                    $.inArray(item.mobileSpecified, applied_filters) > -1)
                     || (range_check && serviceObject.isInRange(item.entry, applied_ranges, controller))) {
                    serviceObject.applyEvenOdd(item, count);
                    count++;
                    $("#" + item.tourneyName).show();
                } else {
                    $("#" + item.tourneyName).hide();
                }
            });
        } else {
            angular.forEach(controller.filterData.game_details, function (item) {
                serviceObject.applyEvenOdd(item, count);
                count++;
                $("#" + item.tourneyName).show();
            });
        }      
    };
    
    serviceObject.filterGameDetails = function(controller,applied_filters,applied_ranges,filter_check,range_check){
        var count = 0;     
        if(filter_check && range_check){                
                angular.forEach(controller.filterData.game_details, function (item) {
                if (($.inArray(item._maxPlayerCount, applied_filters) > -1 || $.inArray(item._gameType, applied_filters) > -1) 
                        && serviceObject.isInRange(item._bet, applied_ranges, controller)) {
                    serviceObject.applyEvenOdd(item, count);
                    count++;
                    $("#" + item._definitionId).show();
                } else {
                    $("#" + item._definitionId).hide();
                }
            });
        } else if (filter_check || range_check) {
            angular.forEach(controller.filterData.game_details, function (item) {
                if (filter_check && ($.inArray(item._maxPlayerCount, applied_filters) > -1 || 
                        $.inArray(item._gameType, applied_filters) > -1) || 
                        (range_check && serviceObject.isInRange(item._bet, applied_ranges, controller))) {
                    serviceObject.applyEvenOdd(item, count);
                    count++;
                    $("#" + item._definitionId).show();
                } else {
                    $("#" + item._definitionId).hide();
                }
            });
        } else {
            angular.forEach(controller.filterData.game_details, function (item) {
                serviceObject.applyEvenOdd(item, count);
                count++;
                $("#" + item._definitionId).show();
            });
        }
    };
    serviceObject.isInRange = function(bet, applied_ranges ,model) {       
        var range_type;
        var min_bet_value;
        var max_bet_value;
        var bet_range;        
        bet = parseFloat(bet);         
        for (var i = 0; i < applied_ranges.length; i++) { //
            range_type = applied_ranges[i].range_type; // type of the range Low ,Medium ,High
            bet_range = model.bet_ranges[range_type]; // bet_range for specific game  {low ->  0:100 , medium 100:500 etc ..}                 
            min_bet_value = parseFloat(bet_range.split(':')[0]);
            max_bet_value = parseFloat(bet_range.split(':')[1]);            
            if (bet >= min_bet_value && bet <= max_bet_value) {
                return true;
            }
            
            //alert(bet+" "+min_bet_value+" "+max_bet_value+" "+(bet >= min_bet_value && bet <= max_bet_value))
            /*if (range_type === model.lobbyData.low_bet) {
                if (bet <= max_bet_value) {
                    return true;
                }
            } else if (range_type === model.lobbyData.medium_bet) {
                if (bet >= min_bet_value && bet <= max_bet_value) {
                    return true;
                }
            } else if (range_type === model.lobbyData.high_bet) {
                if (bet >= min_bet_value) {
                    return true;
                }
            }*/
        }
        return false;
    };
    serviceObject.isString = function(o) {
        return (typeof o == "string" || (typeof o == "object" && o.constructor === String));
    }
    serviceObject.applyEvenOdd = function(item,count){
        if(parseInt(count) % 2 === 0) {                               
            $("#"+item._definitionId).hasClass('tab_clr1') ?  $("#"+item._definitionId).removeClass('tab_clr1').addClass('tab_clr2')  : "";
        }else{                                
            $("#"+item._definitionId).hasClass('tab_clr2') ?  $("#"+item._definitionId).removeClass('tab_clr2').addClass('tab_clr1')  : "";
        }        
    };        
    return serviceObject;
};

lobby.controller('LobbyController', ['$scope','handlers','serverProtocolBuilder','lobbyService',LobbyController]);
lobby.directive('gameDefinition',['serverProtocolBuilder',gameDefinition]);
lobby.directive('gameFilter',['$filterService',gameFilterDisplay]);
lobby.directive('gameInformation',[gameInformation]);
lobby.service('$filterService', [filterService]);

(function($) {
    $.fn.hasScrollBar = function() {        
        return this.get(0).scrollHeight > (this.height() + 3);
    };
    $.fn.getScrollDifference = function(tab_id) {
        var diff = this.get(0).scrollHeight - $(tab_id).height();        
        return diff;
    };
})(jQuery);

