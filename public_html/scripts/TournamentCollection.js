/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var TOURNEY_CACHED_COLLECTION = "TOURNEY_CACHED_COLLECTION";
var TOURNEY_COLLECTION = "TOURNEY_COLLECTION"
function TournamentCollection() {
    Array.call(this);
    //this.months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    //this.statusArray = ['Re', 'Fu', 'Ru', 'Br', 'An', 'Co', 'Ca'];
    this.cachedCollection = new Array();
}
function addTournamentPrize(tourneyName, prizeDetail) {
    if (this.length) {
        for (var index = 0; index < this.length; index++) {
            var currentItem = this[index];
            if (currentItem.getTourneyName() === tourneyName) {
                currentItem.setPrizeDetails(prizeDetail);
                currentItem.hasUpdatedData(true);
                break;
            }
        }
    }
}
function getStatusArray(){
    return this.statusArray;
}

function setStatusArray(value){
    this.statusArray = value;
}

function getMonths(){
    return this.months;
}

function setMonths(value){
    this.months = value;
}

function getCachedCollection(){
    return this.cachedCollection;
}

function setCachedCollection(value){
    this.cachedCollection = value;
}

function containsTournament(tourneyName) {
    for (var index = 0; index < this.length; index++) {
        var tournament = this[index];
        if (tournament.getTourneyName() === tourneyName) {
            return true;
        }
    }
    return false;
}

function updateTournamentChips(tourneyName, chips, rank) {
    for (var index = 0; index < this.length; index++) {
        var tournament = this[index];
        if (tournament.getTourneyName() === tourneyName) {
            tournament.setChips(chips);
            tournament.setRank(rank);
            break;
        }
    }
}

function updateTournamentDetails(tourneyName, totalPrize, startDate, description,
        status, playerCount, maxPlayerCount) {
    for (var index = 0; index < this.length; index++) {
        var tournament = this[index];
        if (tournament.getTourneyName() === tourneyName) {
            tournament.setTotalPrize(totalPrize);
            tournament.setTourneyStartDate(startDate);
            tournament.setDescription(description);
            tournament.setStatus(status);
            tournament.setPlayerCount(playerCount);
            tournament.setMaxPlayerCount(maxPlayerCount);
        }
    }

}

function addTournament(value) {
    this.push(value);
    this.cachedCollection.push(value);
}

function removeTournament(tourneyName){
    var tourneyIndex = this.getTournamentIndex(tourneyName,TOURNEY_COLLECTION);
    var cached_tourneyIndex = this.getTournamentIndex(tourneyName,TOURNEY_CACHED_COLLECTION);
    console.log("the definition id indexes are "+tourneyIndex+" "+cached_tourneyIndex);
    if(tourneyIndex >= 0 && cached_tourneyIndex >= 0){               
        this.splice(tourneyIndex,1);          
        this.cachedCollection.splice(cached_tourneyIndex,1)
    }else{
        console.log("unable to find the tourney  "+tourneyName+" "+tourneyIndex+" "+cached_tourneyIndex);
    }    
}

function getTournament(tourneyName){
    for (var index = 0; index < this.length; index++) {
        var tournament = this[index];
        if (tournament.getTourneyName() === tourneyName) {
            return tournament;
        }
    }
    return null;
}

function getTournamentIndex(tourneyName,collectionType){
    if(collectionType === TOURNEY_COLLECTION){
        for (var index = 0; index < this.length; index++) {
            var tournament = this[index];
            if (tournament.getTourneyName() === tourneyName) {
                return index;
            }
        }
    }else if(collectionType === TOURNEY_CACHED_COLLECTION){
        for (var index = 0; index < this.cachedCollection.length; index++) {
            var tournament = this.cachedCollection[index];
            if (tournament.getTourneyName() === tourneyName) {
                return index;
            }
        }
    }
    return -1;
    
}

function doFinalSorting(){ 
        if(this.cachedCollection.length !== this.length){
            this.cachedCollection = new Array();
            for (var index = 0; index < this.length; index++) {
                var tournament = this[index];
                this.cachedCollection.push(tournament);
            }
        }                  
        this.cachedCollection.sort(this.statusSortFunction);               
        //console.log("Length after status sorting  ******************  "+this.length+" cached collection "+this.cachedCollection.length);
        this.performDateSorting();
        //			trace("Length after date sorting ******************  "+this.length+" -------------- "+this.cachedCollection.length);
        //By kanthi june 11th
        //			trace("Selected filters ******************* "+this.selectedFilters);
        //			if(this.selectedFilters){
        //				this.applyFilters();		
        //			}

}
function statusSortFunction(itemA, itemB) {    
    var statusArray = TournamentCollection.prototype.statusArray;
    var statusA = itemA.getStatus();
    var statusB = itemB.getStatus();
    statusA = statusA.substring(0, 2);
    statusB = statusB.substring(0, 2);     
    if (statusArray.indexOf(statusA) > statusArray.indexOf(statusB)) {
        return 1;
    } else if (statusArray.indexOf(statusA) < statusArray.indexOf(statusB)) {
        return -1;
    }
    return 0;
}

function performDateSorting() {
    //			statusArray = ['Re','Fu','Ru','Br','An','Co','Ca'];
    var registeringTournaments = new Array();
    var fullTournaments = new Array();
    var runningTournaments = new Array();
    var breakTournaments = new Array();
    var announcedTournaments = new Array();
    var completedTournaments = new Array();
    var cancelledTournaments = new Array();
    for (var index = 0; index < this.cachedCollection.length; index++) {
        var tournament = this.cachedCollection[index];
        var status = tournament.getStatus();        
        if (status.toLowerCase().indexOf("re") === 0) {
            registeringTournaments.push(tournament);
        }
        else if (status.toLowerCase().indexOf("fu") === 0) {
            fullTournaments.push(tournament);
        }
        else if (status.toLowerCase().indexOf("ru") === 0) {
            runningTournaments.push(tournament);
        }
        else if (status.toLowerCase().indexOf("br") === 0) {
            breakTournaments.push(tournament);
        }
        else if (status.toLowerCase().indexOf("an") === 0) {
            announcedTournaments.push(tournament);
        }
        else if (status.toLowerCase().indexOf("co") === 0) {
            completedTournaments.push(tournament);
        }
        else if (status.toLowerCase().indexOf("ca") === 0) {
            cancelledTournaments.push(tournament);
        }
    }

    var sum = registeringTournaments.length + fullTournaments.length + runningTournaments.length + breakTournaments.length + announcedTournaments.length
            +completedTournaments.length + cancelledTournaments.length;
        
    
    registeringTournaments.sort(this.dateSortFunction);
    //			registeringTournaments.sort(playerSortFunction);

    fullTournaments.sort(this.dateSortFunction);
    //			fullTournaments.sort(playerSortFunction);

    runningTournaments.sort(this.dateSortFunction);
    //			runningTournaments.sort(playerSortFunction);

    breakTournaments.sort(this.dateSortFunction);
    //			breakTournaments.sort(playerSortFunction);

    announcedTournaments.sort(this.dateSortFunction);
    //			announcedTournaments.sort(playerSortFunction);

    completedTournaments.sort(this.dateSortFunction);
    //			completedTournaments.sort(playerSortFunction);

    cancelledTournaments.sort(this.dateSortFunction);
    //			cancelledTournaments.sort(playerSortFunction);

    this.cachedCollection = new Array();
    this.splice(0);
    for(var index = 0; index < registeringTournaments.length; index++){
        var tournament = registeringTournaments[index];
        this.cachedCollection.push(tournament);
        this.push(tournament);
    }   

    for(var index = 0; index < fullTournaments.length; index++){
        var tournament = fullTournaments[index];
        this.cachedCollection.push(tournament);
        this.push(tournament);
    }    
    for(var index = 0; index < runningTournaments.length; index++){  
        var tournament = runningTournaments[index];
        this.cachedCollection.push(tournament);
        this.push(tournament);
    }   
    for(var index = 0; index < breakTournaments.length; index++){   
        var tournament = breakTournaments[index];
        this.cachedCollection.push(tournament);
        this.push(tournament);
    }   
    for(var index = 0; index < announcedTournaments.length; index++){  
        var tournament = announcedTournaments[index];
        this.cachedCollection.push(tournament);
        this.push(tournament);
    }   
    for(var index = 0; index < completedTournaments.length; index++){
        var tournament = completedTournaments[index];
        this.cachedCollection.push(tournament);
        this.push(tournament);
    }   
    for(var index = 0; index < cancelledTournaments.length; index++){ 
        var tournament = cancelledTournaments[index];
        this.cachedCollection.push(tournament);
        this.push(tournament);
    }   
}

function dateSortFunction(itemA,itemB){   
    var startDateA = itemA.getTourneyStartDate();
    var startDateB = itemB.getTourneyStartDate();
    var dateDetailsA = startDateA.split(' ');
    var dateDetailsB = startDateB.split(' ');
    var startTimeA = dateDetailsA[1];
    var startTimeB = dateDetailsB[1];
    var dateStringA = this.getCompareDateString(startDateA);
    var dateStringB = this.getCompareDateString(startDateB);
        

    if(startTimeA !== "NA"){
        var dateStartTimeA = startTimeA.substring(0,2)+":"+startTimeA.substring(3,startTimeA.length)+":00";
        dateStringA = dateStringA+" "+dateStartTimeA;
    }else{

    }
    if(startTimeB !== "NA"){
        var dateStartTimeB = startTimeB.substring(0,2)+":"+startTimeB.substring(3,startTimeB.length)+":00";
        dateStringB = dateStringB+" "+dateStartTimeB;
    }else{

    }
    var dateA = new Date(Date.parse(dateStringA));
    var dateB = new Date(Date.parse(dateStringB));        

    if(dateA.getTime() > dateB.getTime()){
            return 1;
    }else if(dateA.getTime() < dateB.getTime()){
            return -1;
    }else{
            return 0;
    }    
    return 0;
}

function getCompareDateString(data){
    var months = TournamentCollection.prototype.months;
    var date = new Date();
    var year;
    var details = data.split(" ");
    var dateDetails = details[0].split('-');
    var searchString = dateDetails[3].toString().toUpperCase();    
    return (months.indexOf(searchString,0)+1)+"/"+dateDetails[2]+"/"+dateDetails[0];
    /*return (months.indexOf(searchString,0)+1)+"/"+dateDetails[1]+"/"+date.fullYear;*/
    /*return months.indexOf(dateDetails[1],0)+1+"/"+dateDetails[0]+"/"+date.fullYear;*/
}

function updateTourneyTableName(tourneyName, tableName){
    /**
     * Need to Check the Utility of this function.
     **/
    for (var index = 0; index < this.length; index++) {
        var currentItem = this[index];
        if( currentItem.getTourneyName() === tourneyName ){
            currentItem.setTourneyName(tableName);
            break;	
        }
    }
}
		
function playerSortFunction(itemA,itemB){
    var countA = itemA.getPlayerCount().split('/')[0];
    var countB = itemB.getPlayerCount().split('/')[0];
    if(countA > countB){
        return 1;
    }else if(countA < countB){
        return -1;
    }else{
        return 0;
    }
}

function addLevelDetail(tourneyName,levelName,chipsToEnter,rebuyInAllowed
                                ,levelBet,levelBuyIn,levelRake,
            levelStartTime,levelEndTime, tourneySubType){

            var level = new Level();
            level.setLevelName(levelName);
            /*level.chipsToEnter = chipsToEnter;*/
            level.setRebuyChips(chipsToEnter);
            level.setReBuyInAllowed(rebuyInAllowed);
            level.setBet(levelBet);
            level.setBuyIn(levelBuyIn);
            level.setRake(levelRake);
            level.setStartTime(levelStartTime);
            level.setEndTime(levelEndTime);
            level.setChipsToEnter((80*(Number(level.bet))).toString());			

            if(tourneySubType === 'Acepoint'){
                level.setDisplayReBuy(levelBuyIn+" AP");
            }else{
                level.setDisplayReBuy(levelBuyIn);
            }			
            var currentItem = this.getTournament(tourneyName);
            if(currentItem){
                currentItem.addLevelDetail(level);
            }			
    }
    function containsTournamentInCache(tourneyName){       
        for (var index = 0; index < this.cachedCollection.length; index++) {
            var tournament = this.cachedCollection[index];
                if(tournament.getTourneyName() === tourneyName){
                    return true;
                }
        }
        return false;
    }
		
    function updateRegistrationCount(tourneyName,regCount,totalCount){
        var tournament;
        for (var index = 0; index < this.length; index++) {
            tournament = this[index];
            if(tournament.getTourneyName() === tourneyName){
                tournament.setPlayerCount(regCount);
                tournament.setMaxPlayerCount(parseInt(totalCount));
                tournament.sethasUpdatedData(true);                              
                break;
            }
        }
    } 
    function updateTournamentStatus(tourneyName,levelName,status){			
       var currentItem;
        for (var index = 0; index < this.length; index++) {
            currentItem = this[index];
            if(currentItem.getTourneyName() ===  tourneyName){
                if(status.toLowerCase() == "reg"){
                    status = "Registering";
                }else if(status.toLowerCase() == "run"){
                    status = "Running";
                }else if(status.toLowerCase() == "close"){
                    status = "Completed";
                }else if(status.toLowerCase() == "cancel"){
                    status = "Cancelled";
                }else if(status.toLowerCase() == "break"){
                    status = "Break";
                }else if(status.toLowerCase() == "announced"){
                    status = "Announced";
                }else if(status.toLowerCase() == "full"){
                    status = "Full";
                }
                currentItem.setStatus(status);
                //currentItem.updateLevelDetails(levelName);
                if(levelName != null){  //if condition is added as null is being passed for level name during status update @yashwanth
                    currentItem.updateLevelDetails(levelName);
                }
                currentItem.sethasUpdatedData(true);                 
                break;
            }
        }
    }

TournamentCollection.prototype = Object.create(Array.prototype);
TournamentCollection.prototype.months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
TournamentCollection.prototype.statusArray = ['Re', 'Fu', 'Ru', 'Br', 'An', 'Co', 'Ca'];
TournamentCollection.prototype.addTournamentPrize = addTournamentPrize;
TournamentCollection.prototype.getStatusArray = getStatusArray;
TournamentCollection.prototype.setStatusArray = setStatusArray;
TournamentCollection.prototype.getMonths = getMonths;
TournamentCollection.prototype.setMonths = setMonths;
TournamentCollection.prototype.getCachedCollection = getCachedCollection;
TournamentCollection.prototype.setCachedCollection = setCachedCollection;
TournamentCollection.prototype.containsTournament = containsTournament;
TournamentCollection.prototype.updateTournamentChips = updateTournamentChips;
TournamentCollection.prototype.updateTournamentDetails = updateTournamentDetails;
TournamentCollection.prototype.addTournament = addTournament;
TournamentCollection.prototype.removeTournament = removeTournament;
TournamentCollection.prototype.getTournament = getTournament;
TournamentCollection.prototype.getTournamentIndex = getTournamentIndex;
TournamentCollection.prototype.doFinalSorting = doFinalSorting;
TournamentCollection.prototype.statusSortFunction = statusSortFunction;
TournamentCollection.prototype.performDateSorting = performDateSorting;
TournamentCollection.prototype.dateSortFunction = dateSortFunction;
TournamentCollection.prototype.getCompareDateString = getCompareDateString;
TournamentCollection.prototype.updateTourneyTableName = updateTourneyTableName;
TournamentCollection.prototype.playerSortFunction = playerSortFunction;
TournamentCollection.prototype.addLevelDetail = addLevelDetail;
TournamentCollection.prototype.containsTournamentInCache = containsTournamentInCache;
TournamentCollection.prototype.updateRegistrationCount = updateRegistrationCount;
TournamentCollection.prototype.updateTournamentStatus = updateTournamentStatus;