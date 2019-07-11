/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    function Level() {

    };
    function setRebuyChips(value){
        this.rebuyChips = value;
    }
		
    function getRebuyChips(){
        if(this.getReBuyInAllowed() === "N"){
            return "NA";
        }else {
            return this.rebuyChips;
        }
    }				
    function setLevelName(value){
        this.levelName = value;
    }

    function getLevelName(){
        return this.levelName;
    }	
    
    function setChipsToEnter(value){
        this.chipsToEnter = value;
    }
    function getChipsToEnter(){
        return this.chipsToEnter;
    }
		
    function setReBuyInAllowed(value){
        this.isRebuyAllowed = value;
    }

    function getReBuyInAllowed(){
        return this.isRebuyAllowed;
    }
		
    function setBet(value){
        this.bet = value;
    }

    function getBet(){
        return this.bet
    }
		
    function setRake(value){
        this.rake = value;
    }

    function getRake(){
        return this.rake
    }
		
    function setBuyIn(value){
        this.buyIn = value;
    }

    function getBuyIn(){
        return this.buyIn;
    }
		
    function setStartTime(value){
        this.startTime = value;
    }

    function getStartTime(){
        return this.startTime;
    }
		
    function setEndTime(value){
        this.endTime = value;
    }

    function getEndTime(){
        return this.endTime;
    }
		
    function getDisplayLevelName(){
        return this.levelName.replace("Level","");
    }
    
    function getTipRebuy(){
        return "Hello ................ ";
    }
		
    function getScheduleTime(){
        //return startTime+" to "+endTime;
        return this.startTime+' Min';
    }

    function getDisplayScheduleTime(){
        return this.startTime+" to "+this.endTime;
    }
		
    function setDisplayReBuy(value){
            this.displayReBuy = value;
    }

    function getDisplayReBuy(){
        if(this.getReBuyInAllowed() === "N"){
            return "NA";
        }else {
            /*return buyIn+"+"+rake;*/
            return this.displayReBuy;
        }
    }
    
    Level.prototype = Object.create(Object.prototype);
    Level.prototype.setRebuyChips = setRebuyChips;
    Level.prototype.getRebuyChips = getRebuyChips;
    Level.prototype.setLevelName = setLevelName;
    Level.prototype.getLevelName = getLevelName;
    Level.prototype.setChipsToEnter = setChipsToEnter;
    Level.prototype.getChipsToEnter = getChipsToEnter;
    Level.prototype.setReBuyInAllowed = setReBuyInAllowed;
    Level.prototype.getReBuyInAllowed = getReBuyInAllowed;
    Level.prototype.setBet = setBet;
    Level.prototype.getBet = getBet;
    Level.prototype.setRake = setRake;
    Level.prototype.getRake = getRake;
    Level.prototype.setBuyIn = setBuyIn;
    Level.prototype.getBuyIn = getBuyIn;
    Level.prototype.setStartTime = setStartTime;
    Level.prototype.getStartTime = getStartTime;
    Level.prototype.setEndTime = setEndTime;
    Level.prototype.getEndTime = getEndTime;
    Level.prototype.getDisplayLevelName = getDisplayLevelName;
    Level.prototype.getTipRebuy = getTipRebuy;
    Level.prototype.getScheduleTime = getScheduleTime;
    Level.prototype.getDisplayScheduleTime = getDisplayScheduleTime;
    Level.prototype.setDisplayReBuy = setDisplayReBuy;
    Level.prototype.getDisplayReBuy = getDisplayReBuy;
    
    

