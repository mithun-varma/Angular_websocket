/*
    *We have three cases here:
    * 
    * Case 1: Users who are less than highest level Platinum+
    * ACELEVEL#Bronze:45:Silver:2404
    * 
    * First parameter: Current AceLevel name
    * Second parameter: Lifetime acepoints
    * Third parameter: Next AceLevel name
    * Fourth parameter: Required acepoints to upgrade to next level
    * 
    * Case 2: Users who are reached highest level Platinum+
    * ACELEVEL#Platinum+:22836::99969164
    * --Third parameter will be empty in this case
    * 
    * Case 3: Pseudo players: (25 RealChips with expiry date for mobile players) 
    * ACELEVEL#Bronze:0::0:0
    * 
    * --NEED TO CONFIRM ABOUT THIRD PARAMETER AT SERVER IN THIS CASE 
*/

AceLevelHandler = function(){
    
};

function execute(data){
    var lobbyService = LobbyServiceFactory.getLobbyServiceFactoryInstance().getService(LOBBY_SERVICE);
    var aceLevelDetails = data.split("");
    
    var aceLevelDetailsVO = new AceLevelDetailsVO();
    
    aceLevelDetailsVO.setCurrentAceLevel(aceLevelDetails[0]);
    aceLevelDetailsVO.setLifeTimeAcePoints(aceLevelDetails[1]);
    aceLevelDetailsVO.setNextAceLevel(aceLevelDetails[2]);
    
    if(aceLevelDetails[2] === ''){  
        aceLevelDetailsVO.highestAceLevelReached = true;
        aceLevelDetailsVO.setRequiredAcePoints(aceLevelDetails[1]);
    }else{
        aceLevelDetailsVO.setRequiredAcePoints(aceLevelDetails[3]);
    }

     
    
    
    lobbyService.setPlayerAceLevelDetails(aceLevelDetailsVO);
}

AceLevelHandler.prototype = Object.create(Handler.prototype);
AceLevelHandler.prototype.constructor = AceLevelHandler;
AceLevelHandler.prototype.execute = execute;

