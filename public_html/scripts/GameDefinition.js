/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

GameDefinition = function () {
    this._definitionId;
    this._gameType;
    this._maxPlayers;
    this._gamePlayType;
    this._viewable;
    this._closed = false;
    this._regTableCount;
    this._runTableCount;
    this._seats;
    this._status;
    this._minBuyIn;
    this._jokerType;
    this._tableType = 0;
    this._isTurboGame = false;
    this._rejoinType;
    this._statusData = 0;
    this._betLimit = 1;
    this._hasUpdatedData = false;
    this._serverType;
    this.isDropAndGoEnabled;
};

GameDefinition.prototype = Object.create(Object.prototype);
GameDefinition.prototype.constructor = GameDefinition;
GameDefinition.prototype.viewable = viewable;
GameDefinition.prototype.getViewable = getViewable;
GameDefinition.prototype.serverType = serverType;
GameDefinition.prototype.getServerType = getServerType;
GameDefinition.prototype.hasUpdatedData = hasUpdatedData;
GameDefinition.prototype.getHasUpdatedData = getHasUpdatedData;
GameDefinition.prototype.jokerType = jokerType;
GameDefinition.prototype.getJokerType = getJokerType;
GameDefinition.prototype.betLimit = betLimit;
GameDefinition.prototype.getBetLimit = getBetLimit;
GameDefinition.prototype.minBuyIn = minBuyIn;
GameDefinition.prototype.getMinBuyIn = getMinBuyIn;
GameDefinition.prototype.gamePlayType = gamePlayType;
GameDefinition.prototype.getGamePlayType = getGamePlayType;
GameDefinition.prototype.statusData = statusData;
GameDefinition.prototype.getStatusData = getStatusData;
GameDefinition.prototype.rejoinType = rejoinType;
GameDefinition.prototype.getRejoinType = getRejoinType;
GameDefinition.prototype.tableType = tableType;
GameDefinition.prototype.getTableType = getTableType;
GameDefinition.prototype.definitionId = definitionId;
GameDefinition.prototype.getDefinitionId = getDefinitionId;
GameDefinition.prototype.gameType = gameType;
GameDefinition.prototype.getGameType = getGameType;
GameDefinition.prototype.bet = bet;
GameDefinition.prototype.getBet = getBet;
GameDefinition.prototype.maxPlayerCount = maxPlayerCount;
GameDefinition.prototype.getMaxPlayerCount = getMaxPlayerCount;
GameDefinition.prototype.listPlayerCount = listPlayerCount;
GameDefinition.prototype.numericBet = numericBet;
GameDefinition.prototype.closed = closed;
GameDefinition.prototype.getClosed = getClosed;
GameDefinition.prototype.regTableCount = regTableCount;
GameDefinition.prototype.getRegTableCount = getRegTableCount;
GameDefinition.prototype.runningTableCount = runningTableCount;
GameDefinition.prototype.getRunningTableCount = getRunningTableCount;
GameDefinition.prototype.status = status;
GameDefinition.prototype.getStatus = getStatus;
GameDefinition.prototype.getRegisteringTableCount = getRegisteringTableCount;
GameDefinition.prototype.isTurboGame = isTurboGame;
GameDefinition.prototype.getIsTurboGame = getIsTurboGame;
GameDefinition.prototype.setIsDropAndGoEnabled = setIsDropAndGoEnabled;
GameDefinition.prototype.getIsDropAndGoEnabled = getIsDropAndGoEnabled;
GameDefinition.prototype.getIsGameDefinition = getIsGameDefinition;
GameDefinition.prototype.getGameTypeDescription = getGameTypeDescription;


function getIsGameDefinition() {
    return true;
}

function viewable(value) {
    this._viewable = value;
}

function getViewable() {
    return this._viewable;
}

function getServerType(value) {
    this._serverType = value;
}

function serverType() {
    return this._serverType;
}

function hasUpdatedData(value) {
    this._hasUpdatedData = value;
}

function getHasUpdatedData() {
    return this._hasUpdatedData;
}

function jokerType(value) {
    this._jokerType = value;
}

function getJokerType() {   
    if (this._jokerType) {
        if (this._jokerType.search('No') >= 0) {
            return 'PR - No Joker';
        } else {
            return 'PR - Joker';
        }
    }
    return "";
}

function betLimit(value) {
    this._betLimit = value;
}

function getBetLimit() {
    return this._betLimit;
}

function minBuyIn(value) {
    this._minBuyIn = value;
}

function getMinBuyIn() {
    return this._minBuyIn;
}

function gamePlayType(value) {
    this._gamePlayType = value;
}

function getGamePlayType() {
    return this._gamePlayType;
}

function statusData(value) {    
    this._statusData = value;
}

function getStatusData() {
    return this._statusData;
}

function rejoinType(value) {
    this._rejoinType = value;
}

function getRejoinType() {
    return this._rejoinType;
}

function tableType(value) {
    this._tableType = value;
    if (value === 1) {
        this.isTurboGame(true);
    }
}

function getTableType() {
    return this._tableType;
}

function definitionId(value) {
    this._definitionId = value;
}

function getDefinitionId() {
    return this._definitionId;
}

function gameType(value) {
    this._gameType = value;
}

function getGameType() {
    return this._gameType;
}

function bet(value) {
    this._bet = value;
}

function getBet() {
    return this._bet;
}

function maxPlayerCount(value) {
    this._maxPlayerCount = value;
}

function getMaxPlayerCount() {
    return this._maxPlayerCount;
}

function listPlayerCount() {
    return this.maxPlayerCount() + " Player";
}

function numericBet() {
    return Number(this.getBet().trim());
}

function closed(value) {
    this._closed = value;
}

function getClosed() {
    return this._closed;
}

function regTableCount(value) {
    this._regTableCount = value;
}

function getRegTableCount() {
    return this._regTableCount;
}

function runningTableCount(value) {
    this._runningTableCount = value;
}

function getRunningTableCount() {
    return this._runningTableCount;
}

function status(value) {
    this._status = value;
}

function getStatus() {
    if (this.getClosed()) {
        return "Closed";
    }
    if (this.getRegTableCount() === "0" && this.getStatusData() === "0") {
        return 'Open';
    }
    if (this.getRegTableCount() === "0" && this.getStatusData() === "1") {
        return 'Full';
    }
    if (this.getGameType().indexOf('Stake') >= 0) {
        return 'Seating';
    }
    return 'Registering';
}

function getRegisteringTableCount() {
    return this.getRegTableCount() + "/" + this.getMaxPlayerCount();
}

function isTurboGame(value) {
    this._isTurboGame = value;
}

function getIsTurboGame() {
    return this._isTurboGame;
}

function setIsDropAndGoEnabled(value) {
    this.isDropAndGoEnabled = value;
}

function getIsDropAndGoEnabled() {
    return this.isDropAndGoEnabled;
}

function getGameTypeDescription(){     
    if(this._rejoinType === "0" && this._gameType.indexOf("Best") < 0){
        return this._gameType+" - NR";
    }else{
        return this._gameType;
    }
}
