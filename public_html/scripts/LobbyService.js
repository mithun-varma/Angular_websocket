/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Constans related to lobby data processing


LobbyService = function () {

    this.PLAY_POOL = "PlayPool";
    this.REAL_POOL = "RealPool";
    this.REAL_STAKE = "RealStake";
    //this.REALSTAKE9 = "RealStake9"; //no 9 player games
    this.PLAY_STAKE = "PlayStake";
    //this.PLAYSTAKE9 = "PlayStake9"; //no 9 player games
    this.POOL_101 = "101 Pool";
    this.POOL_201 = "201 Pool";
    this.BESTOF3 = "BestOf3";
    this.BESTOF2 = "BestOf2";
};

function processPlayPool(data) {
//    console.log("process play pool "+data);
    var gameDefinitions;
    var gameDefinitionDetails;
    var gameDefinition;
    var definitionDetails;
    gameDefinitions = data.split("@");
    if (gameDefinitions[1].indexOf('$') >= 0) {
        definitionDetails = gameDefinitions[1].split('$');
        for (var index = 0; index < definitionDetails.length; index++) {
            gameDefinition = definitionDetails[index];
            if (gameDefinition.indexOf(",") >= 0) {
                gameDefinitionDetails = gameDefinition.split(',');
                this.addGameDefinition(this.PLAY_POOL, gameDefinitionDetails);
            }
        }
    }
}

function processPlayStake(data) {
    var gameDefinitions;
    var gameDefinitionDetails;
    var gameDefinition;
    var definitionDetails;
    gameDefinitions = data.split("@");
    if (gameDefinitions[1].indexOf('$') >= 0) {
        definitionDetails = gameDefinitions[1].split('$');
        for (var index = 0; index < definitionDetails.length; index++) {
            gameDefinition = definitionDetails[index];
            if (gameDefinition.indexOf(",") >= 0) {
                gameDefinitionDetails = gameDefinition.split(',');
                this.addGameDefinition(this.PLAY_STAKE, gameDefinitionDetails);
            }
        }
    }
}

function processRealStake(data) {
    var gameDefinitions;
    var gameDefinitionDetails;
    var gameDefinition;
    var definitionDetails;
    gameDefinitions = data.split("@");
    if (gameDefinitions[1].indexOf('$') >= 0) {
        definitionDetails = gameDefinitions[1].split('$');
        for (var index = 0; index < definitionDetails.length; index++) {
            gameDefinition = definitionDetails[index];
            if (gameDefinition.indexOf(",") >= 0) {
                gameDefinitionDetails = gameDefinition.split(',');
                this.addGameDefinition(this.REAL_STAKE, gameDefinitionDetails);
            }
        }
    }
}

function processRealPool(data) {
    var gameDefinitions;
    var gameDefinitionDetails;
    var gameDefinition;
    var definitionDetails;
    gameDefinitions = data.split("@");
    if (gameDefinitions[1].indexOf('$') >= 0) {
        definitionDetails = gameDefinitions[1].split('$');
        for (var index = 0; index < definitionDetails.length; index++) {
            gameDefinition = definitionDetails[index];
            if (gameDefinition.indexOf(",") >= 0) {
                gameDefinitionDetails = gameDefinition.split(',');
                this.addGameDefinition(this.REAL_POOL, gameDefinitionDetails);
            }
        }
    }
}

function processTournamentData(data) {
    //JB0033685,0,1000,2015-Sat-06-Jun 17:35 ,Premium Freeroll,announced,0,10,BRONZE:SILVER:GOLD:PLATINUM:PLATINUM+,Freeroll,Four Free Roll,JUMBOPR,NA
    data = data.replace("TR@", "");
    var details = data.split("$");
    var tournamentData;
    for (var index = 0; index < details.length; index++) {
        tournamentData = details[index];
        if (tournamentData.indexOf(",") >= 0) {
            var tourneyDetails = tournamentData.split(",");
            var tourneyType = tourneyDetails[1];            
            if (tourneyType === 'Free') {
                this.addPlayTournament(tourneyDetails,true);
            } else {                
                this.addRealTournament(tourneyDetails,true);
            }
        }
    }
    var context = this.getLobbyContext();      
    context.playTourneyCollection.doFinalSorting();  
    if (context.player && context.player.subscription === context.PREMIUM_SUBSCRIPTION) {       
        context.freerollTourneyCollection = context.realTourneyCollection;
    } else {
        context.freerollTourneyCollection = context.playTourneyCollection;       
    }   
    context.cashTourneyCollection.doFinalSorting();    
    context.specialTourneyCollection.doFinalSorting();     
    context.acePointsTourneyCollection.doFinalSorting();    
    context.beginnerTourneyCollection.doFinalSorting();        
}

function addRealTournament(tourneyDetails, isInitailTournament) {
    //JB0033685,0,1000,2015-Sat-06-Jun 17:35 ,Premium Freeroll,announced,0,10,
    //BRONZE:SILVER:GOLD:PLATINUM:PLATINUM+,Freeroll,Four Free Roll,JUMBOPR,NA,isMobile,11-JUL-16 12:49
    var tournament = new Tournament();        
    if (!isInitailTournament) {
        tournament.isInitialTournament(false);
    }
    tournament.setTourneyName(tourneyDetails[0]);
    tournament.setBuyInType('Paid');
    tournament.setEntry(tourneyDetails[1]);
    tournament.setTotalPrize(tourneyDetails[2]);
    tournament.setTourneyStartDate(tourneyDetails[3]);
    tournament.setDisplayDescription(tourneyDetails[4]);
    
    /*
    tournament.tourneyName = tourneyDetails[0];
    tournament.buyInType = 'Paid';
    tournament.entry = tourneyDetails[1];
    tournament.totalPrize = tourneyDetails[2];
    tournament.tourneyStartDate = tourneyDetails[3];
    var tempDesc = tourneyDetails[4];
    tournament.displayDescription = tourneyDetails[4];*/

    var status = tourneyDetails[5];   
    if (status.toLowerCase() === "close") {
        status = "Completed";
    } else if (status.toLowerCase() === "reg") {
        status = "Registering";
    } else if (status.toLowerCase() === "run") {
        status = "Running";
    } else if (status.toLowerCase() === "break") {
        status = "Break";
    } else if (status.toLowerCase() === "cancel") {
        status = "Cancelled";
    } else if (status.toLowerCase() === "announced") {
        status = "Announced";
    } else if (status.toLowerCase() === "full") {
        status = "Full";
    }
    
    tournament.setStatus(status);
    tournament.setPlayerCount(tourneyDetails[6]);
    tournament.setMaxPlayerCount(tourneyDetails[7]);
    tournament.settourneyAceLevel(tourneyDetails[8]);
    tournament.setTourneySubType(tourneyDetails[9]);
    tournament.setDescription(tourneyDetails[10]);
    
    
    /*tournament.status = status;
    tournament.playerCount = tourneyDetails[6];
    tournament.maxPlayerCount = tourneyDetails[7];
    tournament.tourneyAceLevel = tourneyDetails[8];
    tournament.tourneySubType = tourneyDetails[9];
    tournament.description = tourneyDetails[10];*/
    
    var tourneySubType = tournament.getTourneySubType();    
    /*if(tourneyDetails[0].toString().search('JB') == 0){
     if(tournament.entry != '0'){
     tournament.tourneyType = 'JUMBOPR';
     }else{
     tournament.tourneyType = 'JUMBOFR';
     }
     }*/
    /*JB0070,5,0,2016-Thu-02-Jun 05:00 ,Premium Freeroll,reg,0,6,BRONZE:SILVER:GOLD:PLATINUM:PLATINUM+,Freeroll,fghfgjfg,JUMBOPOOL,NA,false*/
    tournament.setTourneyType(tourneyDetails[11]);
    tournament.setQualifierType(tourneyDetails[12]);
    
    /*tournament.tourneyType = tourneyDetails[11];
    tournament.qualifierType = tourneyDetails[12];*/          
    
    var isMobileSpecified = tourneyDetails[13].trim();   
    var announcedToRegisteringStartTime = tourneyDetails[14];

    if (isMobileSpecified) {
        if ((isMobileSpecified.toLowerCase()) === "true") {
            tournament.setMobileSpecified(true);
        }else{
            tournament.setMobileSpecified(false);
        }
    }
    if (announcedToRegisteringStartTime) {
        tournament.setAnnouncedToRegisteringStartTime(announcedToRegisteringStartTime);
    }

    if (tourneySubType.indexOf('Acepoint') < 0) {
        if (tournament.getEntry() === '0') {
            tournament.setDisplayEntry('Free');
        } else {
            tournament.setDisplayEntry(tourneyDetails[1]);
        }
    } else {
        tournament.setDisplayEntry(tournament.getEntry() + " AP");
    }    
    if (tourneySubType.indexOf('Special') >= 0) {
        if (tourneyDetails[10]) {
            if (tourneyDetails[10] != "") {
                if (tourneyDetails[10].toString().toLowerCase().indexOf('women') >= 0) {
                    tournament.isWomensSpecialTourney(true);
                }
            }
        }
    }
    var context = this.getLobbyContext();
    if (tourneySubType.indexOf('Special') >= 0) {
        if (!context.specialTourneyCollection.containsTournament(tournament.tourneyName)) {
            context.specialTourneyCollection.addTournament(tournament);
        }
    } else if (tourneySubType.indexOf('Acepoint') >= 0) {
        if (!context.acePointsTourneyCollection.containsTournament(tournament.tourneyName)) {
            context.acePointsTourneyCollection.addTournament(tournament);
        }
    } else if (tourneySubType.indexOf('Cash') >= 0) {
        if (!context.cashTourneyCollection.containsTournament(tournament.tourneyName)) {
            context.cashTourneyCollection.addTournament(tournament);
        }
    } else if (tourneySubType.indexOf('Beginner') >= 0) {
        if (!context.beginnerTourneyCollection.containsTournament(tournament.tourneyName)) {
            context.beginnerTourneyCollection.addTournament(tournament);
        }
    } else {
        if (!context.realTourneyCollection.containsTournament(tournament.tourneyName)) {
            context.realTourneyCollection.addTournament(tournament);
        }
    }
}

function addPlayTournament(tourneyDetails, isInitailTournament) {
    var context = this.getLobbyContext();    
    var tournament = new Tournament();    
    var tourneyName = tourneyDetails[0];    
    tournament.setTourneyName(tourneyName);
    var entryType = tourneyDetails[1];
    tournament.setEntry(entryType);
    tournament.setDisplayEntry(entryType);
    if (!isInitailTournament) {
        tournament.setInitialTournament(false);
    }
    if (tournament.getEntry() == '0') {
        tournament.setDisplayEntry('Free');
    } else {
        tournament.setDisplayEntry(tourneyDetails[1]);
    }
    tournament.setBuyInType(entryType);
    tournament.setTotalPrize(tourneyDetails[2]);
    tournament.setTourneyStartDate(tourneyDetails[3]);
    tournament.setDisplayDescription(entryType);
    tournament.settourneyAceLevel(tourneyDetails[8]);

    /*tournament.buyInType = 'Free';
     tournament.totalPrize = tourneyDetails[2];
     tournament.tourneyStartDate = tourneyDetails[3];
     tournament.description = tourneyDetails[4];
     tournament.displayDescription = 'Free';
     tournament.tourneyAceLevel = tourneyDetails[8];*/

    var status = tourneyDetails[5];
    if (status.toLowerCase() === "close") {
        status = "Completed";
    } else if (status.toLowerCase() === "reg") {
        status = "Registering";
    } else if (status.toLowerCase() === "run") {
        status = "Running";
    } else if (status.toLowerCase() === "break") {
        status = "Break";
    } else if (status.toLowerCase() === "cancel") {
        status = "Cancelled";
    } else if (status.toLowerCase() === "announced") {
        status = "Announced";
    } else if (status.toLowerCase() === "full") {
        status = "Full";
    }
    tournament.setStatus(status);
    tournament.setPlayerCount(tourneyDetails[6]);
    tournament.setMaxPlayerCount(tourneyDetails[7]);
    tournament.setTourneySubType(tourneyDetails[9]);
    tournament.setDescription(tourneyDetails[10]);

    /*tournament.status = status;
     tournament.playerCount = tourneyDetails[6];
     tournament.maxPlayerCount = tourneyDetails[7];
     tournament.tourneySubType = tourneyDetails[9];
     tournament.description = tourneyDetails[10];*/
    /* if (tourneyDetails[0].toString().search('JB') == 0) {
     tournament.tourneyType = 'JUMBOFR';
     }*/
    tournament.setTourneyType(tourneyDetails[11]);
    tournament.setQualifierType(tourneyDetails[12]);
    
    tournament.setMobileSpecified(false);

    /*tournament.tourneyType = tourneyDetails[11];
     tournament.qualifierType = tourneyDetails[12];*/

    if (context.playTourneyCollection.containsTournament(tourneyDetails[0])) {
        context.playTourneyCollection.updateTournamentDetails(tournament.tourneyName, tournament.totalPrize, tournament.tourneyStartDate, tournament.description,
                tournament.status, tournament.playerCount, tournament.maxPlayerCount);
    } else {       
        context.playTourneyCollection.addTournament(tournament);
    }

}

function updateRegisteredTourneys(data)
{    
    /**
     * Here we are updating the Only Tourney Grid , 
     * Any other updates will be sent from LobbyToTLobbyService to TLobby
     **/

    var context = this.getLobbyContext();
    var player = context.player;
    console.log("before registration "+player.getRegisteredTournaments().length);
    player.getRegisteredTournaments().length = 0;
    console.log("after registration "+player.getRegisteredTournaments().length);
    if (data.indexOf(",") >= 0) {
        var dataArray = data.split(',');
        for (var index = 0; index < dataArray.length; index++){ 
            var tourney_id = dataArray[index];        
            player.registeredTournaments.push(tourney_id);
        }
    } else {
        player.registeredTournaments.push(data.trim());
    }

    if (context.player.getSubscription() == context.PREMIUM_SUBSCRIPTION) {
        context.realTourneyCollection.doFinalSorting();       
    } else {
        context.playTourneyCollection.doFinalSorting();       
    }  
}

function updateUnRegisteredTourney(data) {

    /**
     * Here we are updating the Only Tourney Grid , 
     * Any other updaets will be sent from LobbyToTLobbyService to TLobby
     **/
    var context = this.getLobbyContext();
    var player = context.player;
    var tourneyName = data.trim();    

    if (player) {
        for (var index = 0; index < player.registeredTournaments.length; index++){ 
            if (player.registeredTournaments[index] === tourneyName) {
                player.registeredTournaments.splice(index, 1);
                break;      
            }
        }        
    }
    if (context.player.getSubscription() == context.PREMIUM_SUBSCRIPTION) {
        context.realTourneyCollection.doFinalSorting();       
    } else {
        context.playTourneyCollection.doFinalSorting();        
    }  
}

function removeGameDefinition(definitionID, typeOfGame) {

    var context = ApplicationContext.getContextInstance();
    var isRemoved;
    if (typeOfGame === PLAYPOOL) {
        console.error(" We are not Handling the Play pool data ");
    } else if (typeOfGame === REALPOOL) {
        if (!isRemoved) {
            isRemoved = context.getReal101Collection().removeGameDefinition(definitionID);
        } else if (!isRemoved) {
            isRemoved = context.getReal201Collection().removeGameDefinition(definitionID);
        } else if (!isRemoved) {
            isRemoved = context.getRealBOXCollection().removeGameDefinition(definitionID);
        }
    } else if (typeOfGame === PLAYSTAKE) {
        console.error(" We are not Handling the Play stake data ");
    } else if (typeOfGame === REALSTAKE) {
        if (!isRemoved) {
            isRemoved = context.getRealStakeCollection().removeGameDefinition(definitionID);
        }
    }

    if (isRemoved) {
        console.warn("Removed Game Definition Id : " + definitionID);
        isRemoved = undefined;
    } else {
        console.error("Not Found the Game Definition Id : " + definitionID);
    }

}





function addGameDefinition(gamePlayType, gameDefinitionDetails) {
    var index = 0;
    var definitionId;
    var gameType;
    var bet;
    var playerCount;
    var regTableCount;
    var runTableCount;
    var jokerType;
    var tableType;
    var reJoinType = 1;
    var displayGameType;
    var status;
    var details = gameDefinitionDetails;
    for (index in details) {
        var gameDefinitionData = details[index];
        if (gameDefinitionData.indexOf(":") >= 0) {
            var dataDetails = gameDefinitionData.split(":");
            if (dataDetails[0] === 'GID') {
                definitionId = dataDetails[1];
            } else if (dataDetails[0] === 'GT') {
                gameType = dataDetails[1];
            } else if (dataDetails[0] === 'BT') {
                bet = dataDetails[1];
            } else if (dataDetails[0] === 'PL') {
                playerCount = dataDetails[1];
            } else if (dataDetails[0] === 'RUNCNT') {
                runTableCount = dataDetails[1];
            } else if (dataDetails[0] === 'RCNT') {
                regTableCount = dataDetails[1];
            } else if (dataDetails[0] === 'JR') {
                jokerType = dataDetails[1];
            } else if (dataDetails[0] === 'TB') {
                tableType = dataDetails[1];
            } else if (dataDetails[0] === 'R') {
                reJoinType = dataDetails[1];
            } else if (dataDetails[0] === 'ST') {
                status = dataDetails[1];
            }
        }
    }
    var gameDefinition = new GameDefinition();
    gameDefinition.gamePlayType(gamePlayType);
    gameDefinition.definitionId(definitionId);
    gameDefinition.gameType(gameType);
    gameDefinition.bet(bet.toString().trim());
    gameDefinition.runningTableCount(runTableCount);
    gameDefinition.maxPlayerCount(playerCount);
    gameDefinition.regTableCount(regTableCount);
    gameDefinition.minBuyIn((80 * (Number(bet))).toString());
    jokerType = parseInt(jokerType);
    if (jokerType === 0) {
        gameDefinition.jokerType('PR - No Joker');
    } else if (jokerType === 1) {
        gameDefinition.jokerType('PR - Joker');
    }
    gameDefinition.rejoinType(reJoinType);    
    gameDefinition.statusData(status);
    var context = this.getLobbyContext();
    if (gamePlayType === 'RealPool') {
        if (gameType === "201 Pool") {
            context.getReal201Collection().addGameDefinition(gameDefinition);
        } else if (gameType === "101 Pool") {
            context.getReal101Collection().addGameDefinition(gameDefinition);
        } else if (gameType.indexOf("Best") >= 0) {
            context.getRealBOXCollection().addGameDefinition(gameDefinition);
        }
        context.realPoolGameDefinitions[definitionId] = gameType;
    } else if (gamePlayType === 'PlayPool') {
        if (gameType === "201 Pool") {
            context.getPlay201Collection().addGameDefinition(gameDefinition);
        } else if (gameType === "101 Pool") {
            context.getPlay101Collection().addGameDefinition(gameDefinition);
        } else if (gameType.indexOf("Best") >= 0) {
            context.getPlayBOXCollection().addGameDefinition(gameDefinition);
        }
        context.playPoolGameDefinitions[definitionId] = gameType;
    } else if (gamePlayType === 'PlayStake') {
        context.getPlayStakeCollection().addGameDefinition(gameDefinition);
    } else if (gamePlayType === 'RealStake') {
        context.getRealStakeCollection().addGameDefinition(gameDefinition);
    }
}
function showIpblockMessage(message) {
    /*
     *  Here we need to show the alert message to the player
     */

}
function processServerDetails(message) {
    var details = message.split('$');
    var name;
    var address;
    var port;
    var context = getLobbyModel();
    var serverDetails = context.getServerDetails();
    for (var index = 0; index < details.length; index++) {
        var serverDetais = details[index].split(',');
        for (var i = 0; i < serverDetais.length; i++) {
            var fieldDetails = serverDetais[i].split(':');
            if (fieldDetails[0] === 'sname') {
                name = fieldDetails[1];
            } else if (fieldDetails[0] === 'port') {
                port = fieldDetails[1];
            } else if (fieldDetails[0] === 'address') {
                address = fieldDetails[1];
            }
        }
        serverDetails.addServerDetails(name, address, port);
    }
    //Moving the below to Lobby data handler
    //var lobbyCommunicator = context.getLobbyCommunicator();
    //lobbyCommunicator.getCommunicationChannel().sendMessage("Login#userid:test135,password:ace2three");
}
function setPseudoExpired() {
    var applicationContext = ApplicationContext.getContextInstance();
    var player = applicationContext.getPlayer();
    player.setIsPseudoBonusExpired(true);
    if (applicationContext.getGameWindowsCount() >= 1) {
        var gameKeys = applicationContext.getGameKeys();
        for (var index = 0; index < gameKeys; index++) {
            var gContext = applicationContext.getMGameContext(gameKeys[index]);
            var tblScreen = gContext.getMGameWindow();
            tblScreen.setIsPseudoBonusExpired(true);
        }
    }
}


function processLogin(data) {
//    console.log("Processing login data  ******************* " + data);
// s:0 * player@n:Test256, rc:10033.8, pc:22227.0, pt:Premium, uc:1kbrs9dlg4hidrd, gd:M, ucid:judtu9hpw0nl96u,
// sid:1hm2zs1wv5f2qum6, PIB:1, PAN:N, ACEPTS:Platinum - 4 - 7201, PWD:1, PED:20JAN2016, MOB:6876468464, M_VERIFY:y,
// PSD:false, PSDBET:500, KYC:true$surl - https://www.ace2three.com/images/postlogin/15k_plp.jpg$curl-saddsadsa,
// TDSEXP:null, TDSBUF:30, CD:2012 - 02 - 17, ET:30, PB:0.0, NEB:0.0, BE:null, VRB:0.0, WRB:0.0, BOC:0.0, CRB:0.0, IsFirst:N,
// chipsAdd:0, FName:asasfafasf, LName:asfasfasfas, PAttempts:0, IsFRCL:N * banner@
// surl - https://www.ace2three.com/images/promotions/mac_dis_client.jpg,
// curl - http://www.experts-exchange.com/^surl-d:/mages/promotions/Car-speakers.swf,
// curl - www.ace2three.com ^ surl - https://10.0.21.2/images/promotions/Car-speakers.swf,
// curl - www.ace2three.com ^ surl - https://www.ace2three.com/images/promotions/mac_dis_client.jpg,
// curl - http://www.experts-exchange.com/^surl-d:/mages/promotions/Car-speakers.swf,
// curl - www.ace2three.com ^ surl - https://10.0.21.2/images/promotions/Car-speakers.swf,
// curl - www.ace2three.com * postlogin@surl - https://10.0.21.2/images/postlogin/5.swf,
// curl - www.ace2three.com * fav:321:N:409, 7, 127, 11 * /

    var context = this.getLobbyContext();   
    var player = context.getPlayer();
    var details = data.split("*");
    var loginStatus = details[0];
    var statusDetails = loginStatus.split(":");
    var playerDetails;
    var loginDetails;
    var starCount;
    var status = parseInt(statusDetails[1]);
    if (status === 3) {

    } else if (status === 0) {
        playerDetails = details[1].split('@');
        loginDetails = playerDetails[1].split(',');
        for (var index in loginDetails) {
            var loginData = loginDetails[index];
            var fieldDetails = loginData.split(':');
            var key = fieldDetails[0];
            var value = fieldDetails[1];
            if (key === "n") {
                player.setUserName(value);
            } else if (key === "rc") {
                player.setRealBalance(value);
            } else if (key === "pc") {
                player.setPlayBalance(value);
            } else if (key === "pt") {
                player.setSubscription(value);
            } else if (key === "uc") {
                player.setUserCode(value);
            } else if (key === "gd") {
                player.setGender(value);
            } else if (key === "ucid") {
                player.setUCID(value);
            } else if (key === "sid") {
                this.processLoginSession(value);
            } else if (key === "PAN") {
                if (value === "N") {
                    player.setIsPANUpdated(false);
                } else if (value === "Y") {
                    player.setIsPANUpdated(true);
                }
            } else if (key === "PSD") {
                value = value.trim();
                if (value === "true") {
                    player.setIsPseudoPlayer(true);
                } else {
                    player.setIsPseudoPlayer(false);
                }
            }
        }        
        //applicationContext.getLobbyCommunicator().getCommunicationChannel().sendMessage("lack#");
        console.log("Running login " + player.getUserName());
    } else {
        console.log("unsuccessful login"+status);
        //Login unsuccessfull message

    }
}

function processLoginSession(value) {
    var applicationContext = ApplicationContext.getContextInstance();
    if (applicationContext.getSessionId() !== value) {
        //applicationContext.getLobbyCommunicator().setOldSessionId(applicationContext.getSessionId());
        applicationContext.setOldSessionId(applicationContext.getSessionId());
        applicationContext.setSessionId(value);
        //applicationContext.getLobbyCommunicator().setSessionId(value);
    }
}

function processLackData(lackGamesArray) {
    var context = ApplicationContext.getContextInstance();
    var player = context.getPlayer();
    if (!lackGamesArray) {
        player.setActiveGames(new Array());
        return;
    }

//   if (lackGamesArray.length === 1) {   
    player.setActiveGames(lackGamesArray);
//       for (var index = 0; index < lackGamesArray.length; index++) {
//           var lackDetails = lackGamesArray[index];
//           /*
//            * Here we need to implement the game related stuff
//            */
//
//       }
//   }
}

function setPseudoToPremium() {
    var context = ApplicationContext.getContextInstance();
    var player = context.getPlayer();
    player.setIsPseudoPlayer(false);
}

function serverDown() {
    var context = ApplicationContext.getContextInstance();
    var lobbyConnection = context.getLobbyCommunicator().getCommunicationChannel();
    lobbyConnection.doCleanUp();
    /*
     * Here we have to show an alert with the following message with the closing app button
     * 
     * "Unable to establish connection to the server." 
     */
}

function updateGamesStatus(definitions, gamesStatus) {
    var isClosed;
    var gidStatus = gamesStatus;
    var defIds = definitions.split(",");
    if (gamesStatus === "Closed") {
        isClosed = true;
    } else {
        isClosed = false;
    }
    var context = ApplicationContext.getContextInstance();
    for (var index = 0; index < defIds.length; index++) {
        var gameDef = context.getGameDefinition(defIds[index]);
        if (gameDef !== undefined) {
            gameDef.closed = isClosed;
            gameDef.staus = gidStatus;
        } else {
            console.error("Game Definition " + defIds[index] + " is not found to update the status : " + gidStatus);
        }
    }
}

function updatePlayPoolData(data) {
    var context = this.getLobbyContext();
    if (data.indexOf("$") === data.length - 1) {
        data = data.substring(0, data.length - 1);
    }
    var details = data.split("$");
    for (var index = 0; index < details.length; index++) {
        var updateData = details[index];
        if (updateData.indexOf(',') >= 0) {
            var updateDetails = updateData.split(',');
            var definitionId;
            var regTableCount;
            var runTableCount;
            var status = 0;
            for (var i = 0; i < updateDetails.length; i++) {
                var definitionDetails = updateDetails[i].split(":");
                if (definitionDetails[0].toString().toLowerCase() === 'gid') {
                    definitionId = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'runcnt') {
                    runTableCount = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'rcnt') {
                    regTableCount = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'st') {
                    status = definitionDetails[1];
                }
            }
            if (context.playPoolGameDefinitions[definitionId]) {
                (context.play_game_type_based_collections[context.playPoolGameDefinitions[definitionId]]).updateGameDefinition(definitionId, runTableCount, regTableCount, status);
            } else {
                console.log("not able to find real game type collection " + context.playPoolGameDefinitions[definitionId]);
            }
        }
    }
}

function updateRealPoolData(data) {
    //GID:338,RUNCNT:1,RCNT:1,ST:0$
    var context = this.getLobbyContext();
    if (data.indexOf("$") === data.length - 1) {
        data = data.substring(0, data.length - 1);
    }
    var details = data.split("$");
    for (var index = 0; index < details.length; index++) {
        var updateData = details[index];
        if (updateData.indexOf(',') >= 0) {
            var updateDetails = updateData.split(',');
            var definitionId;
            var regTableCount;
            var runTableCount;
            var status = 0;
            for (var i = 0; i < updateDetails.length; i++) {
                var definitionDetails = updateDetails[i].split(":");
                if (definitionDetails[0].toString().toLowerCase() === 'gid') {
                    definitionId = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'runcnt') {
                    runTableCount = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'rcnt') {
                    regTableCount = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'st') {
                    status = definitionDetails[1];
                }
            }
        }
        if (context.realPoolGameDefinitions[definitionId]) {
            (context.real_game_type_based_collections[context.realPoolGameDefinitions[definitionId]]).updateGameDefinition(definitionId, runTableCount, regTableCount, status);
        } else {
            console.log("not able to find real game type collection " + context.realPoolGameDefinitions[definitionId]);
        }
    }
}

function updatePlayStakeData(data)
{
    var context = this.getLobbyContext();
    if (data.indexOf("$") === data.length - 1) {
        data = data.substring(0, data.length - 1);
    }
    var details = data.split("$");
    var definitionId;
    var regTableCount;
    var runTableCount;
    var status = 0;
    var updateData;

    for (var index = 0; index < details.length; index++) {
        updateData = details[index];
        if (updateData.indexOf(',') >= 0) {
            var updateDetails = updateData.split(',');
            for (var i = 0; i < updateDetails.length; i++) {
                var definitionDetails = updateDetails[i].split(":");
                if (definitionDetails[0].toString().toLowerCase() === 'gid') {
                    definitionId = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'runcnt') {
                    runTableCount = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'rcnt') {
                    regTableCount = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'st') {
                    status = definitionDetails[1];
                }
            }
        }
        context.playStakeCollection.updateGameDefinition(definitionId, runTableCount, regTableCount, status);
    }
}

function updateRealStakeData(data)
{
    //GID:319,RUNCNT:1,RCNT:0,ST:0  
    var context = this.getLobbyContext();
    if (data.indexOf("$") === data.length - 1) {
        data = data.substring(0, data.length - 1);
    }
    var details = data.split("$");
    var definitionId;
    var regTableCount;
    var runTableCount;
    var status = 0;
    var updateData;
    for (var index = 0; index < details.length; index++) {
        updateData = details[index];
        if (updateData.indexOf(',') >= 0) {
            var updateDetails = updateData.split(',');
            for (var i = 0; i < updateDetails.length; i++) {
                var definitionDetails = updateDetails[i].split(":");
                if (definitionDetails[0].toString().toLowerCase() === 'gid') {
                    definitionId = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'runcnt') {
                    runTableCount = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'rcnt') {
                    regTableCount = definitionDetails[1];
                } else if (definitionDetails[0].toString().toLowerCase() === 'st') {
                    status = definitionDetails[1];
                }
            }
        }
        context.realStakeCollection.updateGameDefinition(definitionId, runTableCount, regTableCount, status);
    }
}





function showLogoutMessage(value) {
    var message;
    var applicationContext = ApplicationContext.getContextInstance();

    //cleans up lobby socket
    var lobbyConnection = applicationContext.getLobbyCommunicator().getCommunicationChannel();
    lobbyConnection.doCleanUp();

    /**
     * Mentioning it as 0, because we are holding only one Game window as of now.
     **/
    var gameKeys = applicationContext.getGameKeys();
    var lContext = applicationContext.getMGameContext(gameKeys[0]);
    var tblScreen = lContext.getMGameWindow();

    if (value === RELOGIN) {
        message = "You are logged out as you logged in from another system.";
    } else if (value === SESSION_EXPIRED) {
        message = "Sorry. Your session expired. Please relogin.";
    } else if (value === IDLE_TIMEOUT) {
        message = "You have been idle for too long.";
    }

    var gameAlertProperties = new GameAlertProperties();
    gameAlertProperties.setMessage(message);
    gameAlertProperties.setAlertType(LOGOUT_ALERT_TYPE);
    gameAlertProperties.setAlertTitle("Logout");

    tblScreen.showMGameAlert(ONE_BUTTON_STATE, gameAlertProperties);
    tblScreen.forceCloseMGame(); //cleans up game socket


}

function updatePanStatus(value) {
    var context = ApplicationContext.getContextInstance();
    var player = context.getPlayer();
    if (player.getUserName.toLowerCase().trim() === value.toLowerCase().trim()) {
        player.setIsPanUpdated(true);
    }
}

function setPlayerAceLevelDetails(aceLevelDetailsVO) {
    /*
     * Here we need to handle the functionality for the player's "AceLevel" related.   
     */
}

function reloadChips(value) {
    console.log("Chips Reloaded in Lobby Service ");
    var context = ApplicationContext.getContextInstance();
    var player = context.getPlayer();
    player.setPlayBalance(value);
}

function updateChips(data) {
    /*var aceLevel;
     var acePoints;
     var aceStars;*/
    var context = ApplicationContext.getContextInstance();
    var player = context.getPlayer();
    if (player) {
        var details = data.split(",");
        for (var index in details) {
            var updateData = details[index].split(":");
            var key = updateData[0];
            var value = updateData[1];
            if (key === "pc") {
                player.setPlayBalance(value);
            } else if (key === "pat") {
                player.setPlayInPlay(value);
            } else if (key === "rc") {
                player.setRealBalance(value);
            } else if (key === "rat") {
                player.setRealInPlay(value);
            } else if (key === "type") {
                player.setSubscription(value);
            }
        }
    }
}

function setLobbyScope(value) {
    this.lobbyScope = value;
}

function getLobbyScope() {
    return this.lobbyScope;
}

function setLobbyContext(value) {
    this.lobbyModel = value;
}

function getLobbyContext() {
    return this.lobbyModel;
}

LobbyService.prototype = Object.create(Object.prototype);
LobbyService.prototype.constructor = LobbyService;
LobbyService.prototype.processPlayPool = processPlayPool;
LobbyService.prototype.processRealPool = processRealPool;
LobbyService.prototype.processPlayStake = processPlayStake;
LobbyService.prototype.processRealStake = processRealStake;
LobbyService.prototype.processTournamentData = processTournamentData;
LobbyService.prototype.addRealTournament = addRealTournament;
LobbyService.prototype.addPlayTournament = addPlayTournament;
LobbyService.prototype.addGameDefinition = addGameDefinition;
LobbyService.prototype.processServerDetails = processServerDetails;
LobbyService.prototype.processLogin = processLogin;
LobbyService.prototype.processLoginSession = processLoginSession;
LobbyService.prototype.updateChips = updateChips;
LobbyService.prototype.updatePanStatus = updatePanStatus;
LobbyService.prototype.reloadChips = reloadChips;
//LobbyService.prototype.getGameDefinition = getGameDefinition;
LobbyService.prototype.updateGamesStatus = updateGamesStatus;

LobbyService.prototype.updatePlayPoolData = updatePlayPoolData;
LobbyService.prototype.updateRealPoolData = updateRealPoolData;
LobbyService.prototype.updatePlayStakeData = updatePlayStakeData;
LobbyService.prototype.updateRealStakeData = updateRealStakeData;

LobbyService.prototype.removeGameDefinition = removeGameDefinition;
//LobbyService.prototype.setDeletedPlayer = setDeletedPlayer;
LobbyService.prototype.processLackData = processLackData;
LobbyService.prototype.setPseudoToPremium = setPseudoToPremium;
LobbyService.prototype.serverDown = serverDown;
LobbyService.prototype.setPlayerAceLevelDetails = setPlayerAceLevelDetails;
LobbyService.prototype.showIpblockMessage = showIpblockMessage;
LobbyService.prototype.setPseudoExpired = setPseudoExpired;
LobbyService.prototype.showLogoutMessage = showLogoutMessage;
LobbyService.prototype.setLobbyScope = setLobbyScope;
LobbyService.prototype.getLobbyScope = getLobbyScope;
LobbyService.prototype.setLobbyContext = setLobbyContext;
LobbyService.prototype.getLobbyContext = getLobbyContext;
