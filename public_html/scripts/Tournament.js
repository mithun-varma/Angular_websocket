
function Tournament()
{
    this.viewable = true;
    this.levelDetails = new Array();
    this.tables = new Array(); // needed to check
    this.tableName = "no";
    this.duration = '30 mins';
}

function getAnnouncedToRegisteringStartTime() {
    return this.announcedToRegisteringStartTime;
}
function setAnnouncedToRegisteringStartTime(value) {
    this.announcedToRegisteringStartTime = value;
}
function isMobileSpecified() {
    return this.mobileSpecified;
}
function setMobileSpecified(value) {
    this.mobileSpecified = value;
}
function isDataChanged() {
    return this.dataChanged;
}
function setDataChanged(value)
{
    this.dataChanged = value;
}

function checkData(oldData, newData) {
    oldData = oldData.trim();
    newData = newData.trim();
    if (oldData != newData) {
        this.dataChanged = true;
    }
}

function isInitialTournament() {
    return this.initialTournament;
}
function setInitialTournament(value) {
    this.initialTournament = value;
}
function isPoolTourney() {
    return this.poolTourney;
}
function setPoolTourney(value) {
    this.poolTourney = value;
}

function getqualifierType() {
    return this.qualifierType;
}
function setQualifierType(value) {
    this.qualifierType = value;
}
function gethasUpdatedData() {
    return this.hasUpdatedData;
}
function sethasUpdatedData(value) {
    this.hasUpdatedData = value;
}
function gettourneyAceLevel() {
    return this.tourneyAceLevel;
}

function settourneyAceLevel(value) {
    this.tourneyAceLevel = value;
    this.updateAceLevelCollection(value);
}

function updateAceLevelCollection(value) {
    var aceLevels = value.split(':');
    this.tourneyAceLevelCollection = new Array();
    var data;
    for (data in aceLevels) {
        this.tourneyAceLevelCollection.push(data.toLowerCase());
    }
    if (this.tourneyAceLevelCollection.length > 1) {
        var tempLevelStr = this.tourneyAceLevelCollection[0].toString();
        tempLevelStr = tempLevelStr.substr(0, 1).toUpperCase();
        var remLevelStr = this.tourneyAceLevelCollection[0].toString().substring(1).toLowerCase();
        this.aceLevelEntry = tempLevelStr + remLevelStr + " & Above";
    } else if (this.tourneyAceLevelCollection.length === 1) {
        var tmpLevel = this.tourneyAceLevelCollection[0];
        if (tmpLevel.toLowerCase() === 'all') {
            this.aceLevelEntry = this.tourneyAceLevelCollection[0] + ' Levels';
        } else {
            this.aceLevelEntry = this.tourneyAceLevelCollection[0] + " Only";
        }
    }
}

function checkAceLevel(userAceLevel, user_subscription) {
    if (this.tourneyAceLevelCollection.length === 1) {
        var Acelevel = this.tourneyAceLevelCollection[0];
        if (Acelevel.toLowerCase() === "all") {
            if (this.tourneySubType === 'Special') {
                if (user_subscription === 'Regular') {
                    if (this.registeredRegular < this.allowedRegular) {
                        return true;
                    } else {
                        return false;
                    }

                } else {
                    if (this.registeredPremium < this.allowedPremium) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return true;

        } else if (userAceLevel.toLowerCase() === Acelevel.toLowerCase()) {
            return true;
        }

    } else {
        if (this.tourneyAceLevelCollection.contains(userAceLevel.toLowerCase())) {
            return true;
        }
    }
    return false;
}


function checkBeginnerLevel(userConversionDate, userEligibilty) {
    trace("User Conversion Date : " + userConversionDate);
    var monthsArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var monthsCollection = new ArrayCollection(monthsArray);

    var userCD = userConversionDate.split('-');
    var uDate = userCD[1] + "/" + userCD[2] + "/" + userCD[0]; //month/day/year	
    var userDate = new Date(uDate);

    trace("tourneyStartDate : " + this.tourneyStartDate);
    var sD = this.tourneyStartDate.split(' ');


    var tStartDate = sD[0].toString().split('-');
    var tempMonth = tStartDate[3].toString().toUpperCase();
    var trnyMonth = monthsArray.indexOf(tempMonth) + 1;
    var trnyDate = trnyMonth + "/" + tStartDate[2] + "/" + tStartDate[0];

    var tourneyStartDate = new Date(trnyDate);

    var dateDiff = this.differenceBetweenDates(userDate, tourneyStartDate);

    //var userEligibilty = ApplicationContext.getInstance().player.eligibilityTime;

    if (dateDiff <= userEligibilty) {
        return true;
    }

    //Wed-11-Dec
    /* Conversion Date : 2012-01-23
     Eligibility Time : 30 */

    return false;

}

function dateDiff() {
    var tourneyd = new Date('12/17/2013');
    var stdare = new Date('12/17/2013');
}

function differenceBetweenDates(userDate, trnyDate) {

    var MS_PER_DAY = 1000 * 60 * 60 * 24;
    var tempDate = new Date(trnyDate.time - userDate.time);

    var difference = Math.abs(Math.round((tempDate.time / MS_PER_DAY)));

    return difference;
}

function getTourneyAceLevelCollection() {
    return this.tourneyAceLevelCollection;
}

function setTourneyAceLevelCollection(valueCollection) {
    this.tourneyAceLevelCollection = value;
}

function getDisplayAceLevelEntry() {
    return this.aceLevelEntry;
}

function setDisplayAceLevelEntry(value) {
    this.aceLevelEntry = value;
}

function getViewable() {
    return this.viewable;
}

function setViewable(value) {
    this.viewable = value;
}

function getUpdateFlag() {
    return this.updateFlag;
}

function setUpdateFlag(value) {
    this.updateFlag = value;
}

function getTourneyName() {
    return this.tourneyName;
}

function setTourneyName(value) {
    this.tourneyName = value;
}

function getRank() {
    return this.rank;
}

function setRank(value) {
    this.rank = value;
}

function getUrl() {
    return this.url;
}

function setUrl(value) {
    this.url = value;
}

function getDuration() {
    return this.duration;
}

function setDuration(value) {
    this.duration = value;
}

function getBet() {
    return this.bet;
}

function setBet(value) {
    this.bet = value;
}

function getTourneyType() {
    return this.tourneyType;
}

function setTourneyType(value) {
    this.tourneyType = value;
    value = value.trim();
    if (value) {
        if (value != "" && value != "null") {
            if (value.toLowerCase().indexOf("pool") >= 0) {                
                this.poolTourney = true;
            }else{
                this.poolTourney = false;
            }
        }
    }
}

function getTourneySubType() {
    return this.tourneySubType;
}

function setTourneySubType(value) {
    this.tourneySubType = value;
}

function getEntry() {
    return this.entry;
}

function setEntry(value) {
    this.entry = value;
}

function getDisplayEntry() {
    return this.displayEntry;
}

function setDisplayEntry(value) {
    this.displayEntry = value;
}

function getTourneyStartDate() {
    return this.tourneyStartDate;
}

function setTourneyStartDate(value) {
    this.tourneyStartDate = value;
    this.startDate = value.substring(5);
}

function getStartDate() {
    return this.startDate;
}

function setStartDate(value) {
    this.startDate = value;
}

function getdisplayStartDate() {
    if (this.startTime) {
        if (this.startTime == "null") {
            return "-";
        } else if (this.startTime == "NA") {
            return "When Full";
        } else {
            if (this.startDate) {
                var startDetails = this.startDate.split("-");
                return startDetails[0] + "-" + startDetails[1] + " " + this.startTime;
            }
        }
    }
    return null;
}

function getDescription() {
    return this.description;
}

function setDescription(value) {
    this.description = value;
}

function getDisplayDescription() {
    return this.displayDescription;
}

function setDisplayDescription(value) {
    this.displayDescription = value;
}

function getStatus() {
    return this.status;
}

function setStatus(value) {
    this.status = value;
    if (!this.leaderBoard) {
        //this.leaderBoard = new LeaderBoard(null, status);
    } else {
        this.leaderBoard.status = status;
    }
}

function getLeaderBoard() {
    return this.leaderBoard;
}

function setLeaderBoard(value) {
    this.leaderBoard = value;
}

function getMaxPlayerCount() {
    return this.maxPlayerCount;
}

function setMaxPlayerCount(value) {
    this.maxPlayerCount = value;
}

function getPlayerCount() {
    return this.players + "/" + this.maxPlayerCount;
}

function setPlayerCount(value) {
    this.players = value;
}

function getBuyInType() {
    return this.buyInType;
}

function setBuyInType(value) {
    this.buyInType = value;
}

function getStartTime() {
    return this.startTime;
}

function setStartTime(value) {
    this.startTime = value;
}

function getEndDate() {
    return this.endDate;
}

function setEndDate(value) {
    this.endDate = value;
}

function getRunningType() {
    return this.runningType;
}

function setRunningType(value) {
    this.runningType = value;
}

function getCurrentLevel() {
    return this.currentLevel;
}

function setCurrentLevel(value) {
    this.currentLevel = value;
    for (var index = 0; index < this.levelDetails.length; index++) {
        var level = this.levelDetails[index];
        if (level.getLevelName() === this.currentLevel.levelName) {
            if (index < (this.levelDetails.length - 1)) {
                this.setNextLevel(this.levelDetails[index + 1]);
            } else {
                this.setNextLevel(this.currentLevel);
            }
            break;
        }
    }
}

function getNextLevel() {
    return this.nextLevel;
}

function setNextLevel(value) {
    this.nextLevel = value;
}

function getTotalPrize() {
    return this.totalPrize;
}

function setTotalPrize(value) {
    this.totalPrize = value;
}

function getTournamentTotalPrize() {
    if (this.totalPrize.toLowerCase() != 'tba') {
        var prizeString = this.prizeDetails;
        var total = 0;
        if (prizeString) {
            var prizeArray = prizeString.split(',');
            for (var index = 0; index < prizeArray.length; index++) {
                total = total + parseInt(prizeArray[index]);
            }
        }
        if (this.buyInType == 'Free') {
            return total.toString();
        } else {
            return total.toString();
        }
    }
    return totalPrize;
}

function getEndTime() {
    return this.endTime;
}

function setEndTime(value) {
    this.endTime = value;
}

function addLevelDetail(levelDetail) {
    this.levelDetails.push(levelDetail);
    var level = this.levelDetails[0];
    /*var qualifyChips = int(level.chipsToEnter);*/
    var qualifyChips = parseInt((80 * Number(level.bet)).toFixed(2));
    var buyIn = parseInt(level.buyIn);
    var value = parseInt((buyIn / qualifyChips).toFixed(2));
    this.tChipsValue = value.toString();
    this.bet = level.bet;
    //levelDetails.push(levelDetail);
}

function getTChipsValue() {
    return this.tChipsValue + " Real Chips";
}

function setTChipsValue(value) {
    this.tChipsValue = value;
}

function getLevelDetails() {
    return this.levelDetails;
}

function setLevelDetails(value) {
    this.levelDetails = value;
}

function getChips() {
    return this.chips;
}

function setChips(value) {
    this.chips = value;
}

function getPrizeDetails() {
    return this.prizeDetails;
}

function setPrizeDetails(value) {
    this.prizeDetails = value;
}

function getTables() {
    return this.tables;
}

function setTables(value) {
    this.tables = value;
}

function addToLeaderBoard(value) {
    this.leaderBoard.addItem(value);
}

function getnextOpenTime() {
    if (this.status == 'Registering') {
        if (this.startTime != 'NA') {
            return this.startTime;
        } else {
            return " ";
        }

    } else if (status == "Break") {
        var nextLevel = this.nextLevel.getDisplayLevelName();
        for (var index = 0; index < this.levelDetails.length; index++) {
            var level = this.levelDetails[index];
            if (level.getDisplayLevelName() === nextLevel) {
                return level.startTime;
            }
        }
    }
    return " ";
}

function getTableName() {
    return this.tableName;
}

function setTableName(value) {
    this.tableName = value;
}

function addTable(table) {
    this.tables.addItem(table);
}

function removeTable(tableName) {
    this.tables.removeTable(tableName);
    this.tables.refresh();
}

function clearTables() {
    this.tables.clearAllTables();
}

function updateTable(tableName, players, maximumCount, minimumCount) {
    this.tables.updateTourneyTable(tableName, players, maximumCount, minimumCount);
}

function containsTable(tableName) {
    return this.tables.containsTourneyTable(tableName);
}

function updateLevelDetails(levelName) {
    for (var index = 0; index < this.levelDetails.length; index++) {
        var level = this.levelDetails[index]
        if (level.getLevelName() === levelName) {
            this.currentLevel = level;
            break;
        }
    }
}

function updateLevelTimings(levelName, startTime, endTime) {
    for (var index = 0; index < this.levelDetails.length; index++) {
        var level = this.levelDetails[index];
        if (level.getLevelName() === levelName) {
            if (index == 0) {
                this.startTime = startTime;
            } else if (index == (this.levelDetails.length - 1)) {
                this.endTime = endTime;
            }
            level.startTime = startTime;
            level.endTime = endTime;
            break;
        }
    }
}

function getTicker() {
    return this.ticker;
}

function setTicker(value) {
    this.ticker = value;
}

function getAllowedRegular() {
    return this.allowedRegular;
}

function setAllowedRegular(value) {
    this.allowedRegular = value;
}

function getRegisteredRegular() {
    return this.registeredRegular;
}

function setRegisteredRegular(value) {
    this.registeredRegular = value;
}

function getAllowedPremium() {
    return this.allowedPremium;
}

function setAllowedPremium(value) {
    this.allowedPremium = value;
}

function getRegisteredPremium() {
    return this.registeredPremium;
}

function setRegisteredPremium(value) {
    this.registeredPremium = value;
}

function setUserRegisteredStatus(value){
    this.user_registerd = value;
}

function getUserRegisterdStatus(){
    return this.user_registerd;
}




Tournament.prototype = Object.create(Object.prototype);
Tournament.prototype.getAnnouncedToRegisteringStartTime = getAnnouncedToRegisteringStartTime;
Tournament.prototype.setAnnouncedToRegisteringStartTime = setAnnouncedToRegisteringStartTime;
Tournament.prototype.isMobileSpecified = isMobileSpecified;
Tournament.prototype.setMobileSpecified = setMobileSpecified;
Tournament.prototype.isDataChanged = isDataChanged;
Tournament.prototype.setDataChanged = setDataChanged;
Tournament.prototype.checkData = checkData;
Tournament.prototype.isInitialTournament = isInitialTournament;
Tournament.prototype.setInitialTournament = setInitialTournament;
Tournament.prototype.isPoolTourney = isPoolTourney;
Tournament.prototype.setPoolTourney = setPoolTourney;
Tournament.prototype.getqualifierType = getqualifierType;
Tournament.prototype.setQualifierType = setQualifierType;
Tournament.prototype.gethasUpdatedData = gethasUpdatedData;
Tournament.prototype.sethasUpdatedData = sethasUpdatedData;
Tournament.prototype.gettourneyAceLevel = gettourneyAceLevel;
Tournament.prototype.settourneyAceLevel = settourneyAceLevel;
Tournament.prototype.updateAceLevelCollection = updateAceLevelCollection;
Tournament.prototype.checkAceLevel = checkAceLevel;
Tournament.prototype.checkBeginnerLevel = checkBeginnerLevel;
Tournament.prototype.dateDiff = dateDiff;
Tournament.prototype.differenceBetweenDates = differenceBetweenDates;
Tournament.prototype.getTourneyAceLevelCollection = getTourneyAceLevelCollection;
Tournament.prototype.setTourneyAceLevelCollection = setTourneyAceLevelCollection;
Tournament.prototype.getDisplayAceLevelEntry = getDisplayAceLevelEntry;
Tournament.prototype.setDisplayAceLevelEntry = setDisplayAceLevelEntry;
Tournament.prototype.getViewable = getViewable;
Tournament.prototype.setViewable = setViewable;
Tournament.prototype.getUpdateFlag = getUpdateFlag;
Tournament.prototype.setUpdateFlag = setUpdateFlag;
Tournament.prototype.getTourneyName = getTourneyName;
Tournament.prototype.setTourneyName = setTourneyName;
Tournament.prototype.getRank = getRank;
Tournament.prototype.setRank = setRank;
Tournament.prototype.getUrl = getUrl;
Tournament.prototype.setUrl = setUrl;
Tournament.prototype.getDuration = getDuration;
Tournament.prototype.setDuration = setDuration;
Tournament.prototype.getBet = getBet;
Tournament.prototype.setBet = setBet;
Tournament.prototype.getTourneyType = getTourneyType;
Tournament.prototype.setTourneyType = setTourneyType;
Tournament.prototype.getTourneySubType = getTourneySubType;
Tournament.prototype.setTourneySubType = setTourneySubType;
Tournament.prototype.getEntry = getEntry;
Tournament.prototype.setEntry = setEntry;
Tournament.prototype.getDisplayEntry = getDisplayEntry;
Tournament.prototype.setDisplayEntry = setDisplayEntry;
Tournament.prototype.getTourneyStartDate = getTourneyStartDate;
Tournament.prototype.setTourneyStartDate = setTourneyStartDate;
Tournament.prototype.getStartDate = getStartDate;
Tournament.prototype.setStartDate = setStartDate;
Tournament.prototype.getdisplayStartDate = getdisplayStartDate;
Tournament.prototype.getDescription = getDescription;
Tournament.prototype.setDescription = setDescription;
Tournament.prototype.getDisplayDescription = getDisplayDescription;
Tournament.prototype.setDisplayDescription = setDisplayDescription;
Tournament.prototype.getStatus = getStatus;
Tournament.prototype.setStatus = setStatus;
Tournament.prototype.getLeaderBoard = getLeaderBoard;
Tournament.prototype.setLeaderBoard = setLeaderBoard;
Tournament.prototype.getMaxPlayerCount = getMaxPlayerCount;
Tournament.prototype.setMaxPlayerCount = setMaxPlayerCount;
Tournament.prototype.getPlayerCount = getPlayerCount;
Tournament.prototype.setPlayerCount = setPlayerCount;
Tournament.prototype.getBuyInType = getBuyInType;
Tournament.prototype.setBuyInType = setBuyInType;
Tournament.prototype.getStartTime = getStartTime;
Tournament.prototype.setStartTime = setStartTime;
Tournament.prototype.getEndDate = getEndDate;
Tournament.prototype.setEndDate = setEndDate;
Tournament.prototype.getRunningType = getRunningType;
Tournament.prototype.setRunningType = setRunningType;
Tournament.prototype.getCurrentLevel = getCurrentLevel;
Tournament.prototype.setCurrentLevel = setCurrentLevel;
Tournament.prototype.getNextLevel = getNextLevel;
Tournament.prototype.setNextLevel = setNextLevel;
Tournament.prototype.getTotalPrize = getTotalPrize;
Tournament.prototype.setTotalPrize = setTotalPrize;
Tournament.prototype.getTournamentTotalPrize = getTournamentTotalPrize;
Tournament.prototype.getEndTime = getEndTime;
Tournament.prototype.setEndTime = setEndTime;
Tournament.prototype.addLevelDetail = addLevelDetail;
Tournament.prototype.getTChipsValue = getTChipsValue;
Tournament.prototype.setTChipsValue = setTChipsValue;
Tournament.prototype.getLevelDetails = getLevelDetails;
Tournament.prototype.setLevelDetails = setLevelDetails;
Tournament.prototype.getChips = getChips;
Tournament.prototype.setChips = setChips;
Tournament.prototype.getPrizeDetails = getPrizeDetails;
Tournament.prototype.setPrizeDetails = setPrizeDetails;
Tournament.prototype.getTables = getTables;
Tournament.prototype.setTables = setTables;
Tournament.prototype.addToLeaderBoard = addToLeaderBoard;
Tournament.prototype.getnextOpenTime = getnextOpenTime;
Tournament.prototype.getTableName = getTableName;
Tournament.prototype.setTableName = setTableName;
Tournament.prototype.addTable = addTable;
Tournament.prototype.removeTable = removeTable;
Tournament.prototype.clearTables = clearTables;
Tournament.prototype.updateTable = updateTable;
Tournament.prototype.containsTable = containsTable;
Tournament.prototype.updateLevelDetails = updateLevelDetails;
Tournament.prototype.updateLevelTimings = updateLevelTimings;
Tournament.prototype.getTicker = getTicker;
Tournament.prototype.setTicker = setTicker;
Tournament.prototype.getAllowedRegular = getAllowedRegular;
Tournament.prototype.setAllowedRegular = setAllowedRegular;
Tournament.prototype.getRegisteredRegular = getRegisteredRegular;
Tournament.prototype.setRegisteredRegular = setRegisteredRegular;
Tournament.prototype.getAllowedPremium = getAllowedPremium;
Tournament.prototype.setAllowedPremium = setAllowedPremium;
Tournament.prototype.getRegisteredPremium = getRegisteredPremium;
Tournament.prototype.setRegisteredPremium = setRegisteredPremium;
Tournament.prototype.getUserRegisterdStatus = getUserRegisterdStatus;
Tournament.prototype.setUserRegisteredStatus = setUserRegisteredStatus;



