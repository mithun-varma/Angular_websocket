/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var cachedCollection;
var dataUpdate;
GridCollection = function () {
    Array.call(this);
    this.cachedCollection = new Array();
    this.isUpdated = false;
    //this.dataUpdate = new Phaser.Signal();
};


GridCollection.prototype = Object.create(Array.prototype);
GridCollection.prototype.constructor = GridCollection;
GridCollection.prototype.addGameDefinition = addGameDefinition;
GridCollection.prototype.getCachedCollection = getCachedCollection;
GridCollection.prototype.updateGameDefinition = updateGameDefinition;
GridCollection.prototype.isGridCollection = isGridCollection;
GridCollection.prototype.getGameDefinition = getGameDefinition;
GridCollection.prototype.getGameDefintionByDetails = getGameDefintionByDetails;


function getGameDefintionByDetails(gameType, bet, maxPlayers) {
    for (var index = 0; index < this.length; index++) {
        var gameDefinition = this[index];
        console.log("gameType : " +gameDefinition.getGameType() + ", bet : "+gameDefinition.getBet() +", maxPlayers : "+gameDefinition.getMaxPlayerCount());
        if (bet === gameDefinition.getBet()) {
            if (maxPlayers === gameDefinition.getMaxPlayerCount()) {
                if (gameType === gameDefinition.getGameType()) {
                    return gameDefinition;
                }
            }
        }
    }
    return undefined;
}

function getGameDefinition(definitionId) {
    for (var index = 0; index < this.length; index++) {
        var gameDefinition = this[index];
        if (gameDefinition.getDefinitionId() === definitionId) {
            return gameDefinition;
        }
    }
    return undefined;
}


function isGridCollection() {
    return true;
}


function updateGameDefinition(definitionId, runTableCount, regTableCount, status) {    
    this.isUpdated = true;
    for (var index = 0; index < this.length; index++) {
        var gameDefinition = this[index];
        if (gameDefinition.getDefinitionId() === definitionId) {            
            gameDefinition.runningTableCount(runTableCount);
            gameDefinition.regTableCount(regTableCount);
            gameDefinition.statusData(status);
        }
    }   
    //this.dataUpdate.dispatch(this);    
}

function getCachedCollection() {
    return this.cachedCollection;
}

function removeGameDefinition(definitionId) {
    var definitionIndex;
    var cached_definition_index;   
    for (var index = 0; index < this.length; index++) {
        var gameDefinition = this[index];
        if (gameDefinition.getDefinitionId() === definitionId) {
            definitionIndex = index;
            break;
        }
    }
    for (var index = 0; index < this.cachedCollection.length; index++) {
        var gameDefinition = this.cachedCollection[index];
        if (gameDefinition.getDefinitionId() === definitionId) {
            cached_definition_index = index;
            break;
        }
    }

    if (definitionIndex > 0) {
        this.splice(definitionIndex, 1); 
        this.cachedCollection.splice(cached_definition_index, 1);
        console.log("the definition id indexes are "+definitionId+" "+cached_definition_index)
        return true;
    } else {
        return false;
    }

}

function addGameDefinition(gameDefinition) {
    this.push(gameDefinition);
    this.cachedCollection.push(gameDefinition);
    this.cachedCollection.sort(sortGameDefinitions("numericBet", "getMaxPlayerCount", "getTableType"));
}

function sortGameDefinitions() {
    var properties = arguments;
    return function (obj1, obj2) {
        var i = 0;
        var result = 0;
        var numberOfProperties = properties.length;
        while (result === 0 && i < numberOfProperties) {
            result = dynamicSortGameDefinitions(properties[i], obj1, obj2);
//          console.log("I value "+i);
            i++;
        }
        return result;
    };
}

function dynamicSortGameDefinitions(property, itemA, itemB) {
    var result = doSortGameDefinition(property, itemA, itemB);
    return result;
}

function doSortGameDefinition(property, itemA, itemB) {
    if (itemA[property]() > itemB[property]())
        return 1;
    if (itemA[property]() < itemB[property]())
        return -1;
    return 0;
}

