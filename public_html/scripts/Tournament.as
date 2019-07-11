package com.ace2three.lobby.collections.data
{
	import com.ace2three.lobby.ApplicationContext;
	import com.ace2three.lobby.collections.ArrayCollection;
	import com.ace2three.lobby.collections.LeaderBoard;
	import com.ace2three.lobby.collections.TableCollection;
	
	import flash.events.EventDispatcher;
	
	import mx.utils.StringUtil;
	
	public class Tournament extends EventDispatcher
	{
		private var _tourneyName:String;
		private var _buyInType:String; //for play tournament it'll be "Free", for real "Paid"
		private var _tourneyType:String;
		private var _qualifierType:String;
		private var _tourneySubType:String;
		private var _entry:String;
		private var _displayEntry:String;
		private var _startDate:String;
		private var _tourneyStartDate:String;
		private var _startTime:String;
		private var _description:String;
		private var _displayDescription:String;
		private var _status:String;
		private var _players:String;
		private var _maxPlayerCount:int;
		private var _endDate:String;
		private var _runningType:String;
		private var _currentLevel:Level;
		private var _nextLevel:Level;
		private var _totalPrize:String;
		private var _endTime:String;
		private var _levelDetails:Array;
		private var _chips:String;
		private var _leaderBoard:LeaderBoard;
		private var _prizeDetails:String;
		private var _tables:TableCollection;
		private var _tableName:String;
		private var _compareStartTime:String;
		private var _ticker:String;
		private var _tChipsValue:String;
		private var _duration:String;
		private var _bet:String;
		private var _rank:String;
		private var _updateFlag:Boolean;
		private var _url:String;
		private var _viewable:Boolean;
		private var _tourneyAceLevel:String;
		private var _tourneyAceLevelCollection:ArrayCollection;
		private var _aceLevelEntry:String;
		public var _isWomensSpecialTourney:Boolean = false;
		
		private var _allowedRegular:Number;
		private var _registeredRegular:Number;
		private var _allowedPremium:Number;
		private var _registeredPremium:Number;
		private var _hasUpdatedData:Boolean;
		
		private var _isPoolTourney:Boolean;
		private var _isInitialTournament:Boolean = true;
		
		private var _isDataChanged:Boolean;
		private var _isMobileSpecified:Boolean;
		private var _announcedToRegisteringStartTime:String;
		
		public function Tournament(){
			this.viewable = true;
			levelDetails = new Array();
			tables = new TableCollection();
			tableName = "no";
			duration = '30 mins'
		}
		
		public function get announcedToRegisteringStartTime():String
		{
			return _announcedToRegisteringStartTime;
		}

		public function set announcedToRegisteringStartTime(value:String):void
		{
			_announcedToRegisteringStartTime = value;
		}

		public function get isMobileSpecified():Boolean
		{
			return _isMobileSpecified;
		}
		
		public function set isMobileSpecified(value:Boolean):void
		{			
			_isMobileSpecified = value;
		}
		
		public function get isDataChanged():Boolean
		{
			return _isDataChanged;
		}
		
		public function set isDataChanged(value:Boolean):void
		{
			_isDataChanged = value;
		}
		
		public function checkData(oldData:String, newData:String):void{
			oldData = StringUtil.trim(oldData);
			newData = StringUtil.trim(newData);
			if(oldData != newData){
				this.isDataChanged = true;
			}
		}
		
		public function get isInitialTournament():Boolean
		{
			return _isInitialTournament;
		}
		
		public function set isInitialTournament(value:Boolean):void
		{
			_isInitialTournament = value;
		}
		
		public function get isPoolTourney():Boolean
		{
			return _isPoolTourney;
		}
		
		public function set isPoolTourney(value:Boolean):void
		{
			_isPoolTourney = value;
		}
		
		public function get qualifierType():String
		{
			return _qualifierType;
		}
		
		public function set qualifierType(value:String):void
		{
			_qualifierType = value;
		}
		
		public function get hasUpdatedData():Boolean
		{
			return _hasUpdatedData;
		}
		
		public function set hasUpdatedData(value:Boolean):void
		{
			_hasUpdatedData = value;
		}
		
		public function get tourneyAceLevel():String{
			return _tourneyAceLevel;
		}
		
		public function set tourneyAceLevel(value:String):void{
			_tourneyAceLevel = value;
			this.updateAceLevelCollection(value);
		}
		
		public function get isWomensSpecialTourney():Boolean{
			return _isWomensSpecialTourney;
		}
		
		public function set isWomensSpecialTourney(value:Boolean):void{
			_isWomensSpecialTourney = value;
		}
		
		public function updateAceLevelCollection(value:String):void{
			var aceLevels:Array = value.split(':');
			_tourneyAceLevelCollection = new ArrayCollection();
			for each(var data:String in aceLevels){
				_tourneyAceLevelCollection.addItem(data.toLowerCase());
			}
			if(_tourneyAceLevelCollection.length > 1){
				var tempLevelStr:String = tourneyAceLevelCollection.getItemAt(0).toString();
				tempLevelStr = tempLevelStr.substr(0,1).toUpperCase();
				var remLevelStr:String = tourneyAceLevelCollection.getItemAt(0).toString().substring(1).toLowerCase();
				displayAceLevelEntry = tempLevelStr+remLevelStr + " & Above";
			}else if (_tourneyAceLevelCollection.length == 1){
				var tmpLevel:String = tourneyAceLevelCollection.getItemAt(0) as String;
				if(tmpLevel.toLowerCase() == 'all'){
					displayAceLevelEntry = tourneyAceLevelCollection.getItemAt(0) + ' Levels';
				}else{
					displayAceLevelEntry = tourneyAceLevelCollection.getItemAt(0) + " Only";
				}
			}
		}
		
		public function checkAceLevel(userAceLevel:String):Boolean{
			
			if(this.tourneyAceLevelCollection.length == 1){
				var Acelevel:String = tourneyAceLevelCollection.getItemAt(0) as String;
				var context:ApplicationContext = ApplicationContext.getInstance();
				if(Acelevel.toLowerCase() == "all"){
					if(this.tourneySubType == 'Special'){
						if(context.player.subscription == 'Regular'){
							if(this.registeredRegular < this.allowedRegular){
								return true;
							}else{
								return false;
							}
							
						}else{
							if(this.registeredPremium < this.allowedPremium){
								return true;
							}else{
								return false;
							}
						}
					}
					
					return true;
					
				}else if(userAceLevel.toLowerCase() == Acelevel.toLowerCase()){
					return true;
				}
				
			}else{
				if(tourneyAceLevelCollection.contains(userAceLevel.toLowerCase())){
					return true;
				}
			}
			return false;
		}
		
		
		public function checkBeginnerLevel(userConversionDate:String):Boolean{
			trace("User Conversion Date : "+ userConversionDate);
			var monthsArray:Array = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
			var months:ArrayCollection = new ArrayCollection(monthsArray);
			
			var userCD:Array = userConversionDate.split('-');
			var uDate:String = userCD[1]+"/"+userCD[2]+"/"+userCD[0]; //month/day/year	
			var userDate:Date = new Date(uDate);
			
			trace("tourneyStartDate : "+ this.tourneyStartDate);
			var sD:Array = this.tourneyStartDate.split(' ');
			
			
			var tStartDate:Array = sD[0].toString().split('-');
			var tempMonth:String = tStartDate[3].toString().toUpperCase();
			var trnyMonth:int = monthsArray.indexOf(tempMonth)+1;
			var trnyDate:String = trnyMonth+"/"+tStartDate[2]+"/"+tStartDate[0];
			
			var tourneyStartDate:Date = new Date(trnyDate);
			
			var dateDiff:Number = this.differenceBetweenDates(userDate, tourneyStartDate);
			
			var userEligibilty:Number = ApplicationContext.getInstance().player.eligibilityTime;
			
			if( dateDiff <= userEligibilty){
				return true;
			}
			
			//Wed-11-Dec
			/* Conversion Date : 2012-01-23
			Eligibility Time : 30 */
			
			return false;
			
		}
		
		public function dateDiff():void{
			var tourneyd:Date = new Date('12/17/2013');
			var stdare:Date = new Date('12/17/2013');
		}
		
		private function differenceBetweenDates(userDate:Date, trnyDate:Date):Number{
			
			var MS_PER_DAY:uint = 1000 * 60 * 60 * 24;
			var tempDate:Date = new Date(trnyDate.time - userDate.time);
			
			var difference:Number = Math.abs(Math.round((tempDate.time / MS_PER_DAY)));
			
			return difference;
		}
		
		public function get tourneyAceLevelCollection():ArrayCollection{
			return _tourneyAceLevelCollection;
		}
		
		public function set tourneyAceLevelCollection(value:ArrayCollection):void{
			_tourneyAceLevelCollection = value;
		}
		
		public function get displayAceLevelEntry():String{
			return _aceLevelEntry;
		}
		
		public function set displayAceLevelEntry(value:String):void{
			_aceLevelEntry = value;
		}
		
		public function get viewable():Boolean{
			return _viewable;
		}
		
		public function set viewable(value:Boolean):void{
			_viewable = value;
		}
		
		public function get updateFlag():Boolean{
			return _updateFlag;
		}
		
		public function set updateFlag(value:Boolean):void{
			_updateFlag = value;
		}
		
		public function get tourneyName():String{
			return _tourneyName;
		}
		
		public function set tourneyName(value:String):void{
			_tourneyName = value;
		}
		
		public function get rank():String{
			return _rank;
		}
		
		public function set rank(value:String):void{
			_rank = value;
		}
		
		public function get url():String{
			return _url;
		}
		
		public function set url(value:String):void{
			_url = value;
		}
		
		public function get duration():String{
			return _duration;
		}
		
		public function set duration(value:String):void{
			_duration= value;
		}
		
		public function get bet():String{
			return _bet;
		}
		
		public function set bet(value:String):void{
			_bet = value;
		}
		
		public function get tourneyType():String{
			return _tourneyType;
		}
		
		public function set tourneyType(value:String):void{
			_tourneyType = value;
			
			try{
				if(value){
					if(StringUtil.trim(value) != "" && StringUtil.trim(value) != "null"){
						if(StringUtil.trim(value).toLowerCase().search("pool") >= 0){
							isPoolTourney = true;
						}
					}
				}
			} catch(e:Error) {
				//add error debug print here
			}finally{
				_tourneyType = value;
			}
			
		}
		
		public function get tourneySubType():String{
			return _tourneySubType;
		}
		
		public function set tourneySubType(value:String):void{
			_tourneySubType = value;
		}
		
		public function get entry():String{
			return _entry;
		}
		
		public function set entry(value:String):void{
			_entry = value;
		}
		
		public function get displayEntry():String{
			return _displayEntry;
		}
		
		public function set displayEntry(value:String):void{
			_displayEntry = value;
		}
		
		public function get tourneyStartDate():String{
			return _tourneyStartDate;
		}
		
		public function set tourneyStartDate(value:String):void{
			_tourneyStartDate = value;
			_startDate = value.substring(5);
		}
		
		public function get startDate():String{
			return _startDate;
		}
		
		public function set startDate(value:String):void{
			_startDate = value;
		}
		
		public function get displayStartDate():String{
			if(this.startTime){
				if(this.startTime == "null"){
					return "-";
				}else if(this.startTime == "NA"){
					return "When Full";
				}else {
					if(this.startDate){
						var startDetails:Array =  this.startDate.split("-");
						return startDetails[0]+"-"+startDetails[1]+" "+this.startTime;
					}
				}
			}
			return null;
		}
		
		public function get description():String{
			return _description;
		}
		
		public function set description(value:String):void{
			_description = value;
		}
		
		public function get displayDescription():String{
			return _displayDescription;
		}
		
		public function set displayDescription(value:String):void{
			_displayDescription = value;
		}
		
		public function get status():String{
			return _status;
		}
		
		public function set status(value:String):void{
			_status = value;
			if(!leaderBoard){
				leaderBoard = new LeaderBoard(null,status);
			}else{
				leaderBoard.status = status;
			}
		}
		
		public function get leaderBoard():LeaderBoard{
			return _leaderBoard;
		}
		
		public function set leaderBoard(value:LeaderBoard):void{
			_leaderBoard = value;
		}
		
		public function get maxPlayerCount():int{
			return _maxPlayerCount;
		}
		
		public function set maxPlayerCount(value:int):void{
			_maxPlayerCount = value;
		}
		
		public function get playerCount():String{
			return _players+"/"+maxPlayerCount;
		}
		
		public function set playerCount(value:String):void{
			_players = value;
		}
		
		public function get buyInType():String{
			return _buyInType;
		}
		
		public function set buyInType(value:String):void{
			_buyInType = value;
		}
		
		public function get startTime():String{
			return _startTime;
		}
		
		public function set startTime(value:String):void{
			_startTime = value;
		}
		
		public function get endDate():String{
			return _endDate;
		}
		
		public function set endDate(value:String):void{
			_endDate = value;
		}
		
		public function get runningType():String{
			return _runningType;
		}
		
		public function set runningType(value:String):void{
			_runningType = value;
		}
		
		public function get currentLevel():Level{
			return _currentLevel;
		}
		
		public function set currentLevel(value:Level):void{
			_currentLevel = value;
			for (var index:int=0;index<levelDetails.length;index++){
				var level:Level = levelDetails[index];
				if(level.levelName == currentLevel.levelName){
					if(index < (levelDetails.length-1)){
						nextLevel = levelDetails[index+1];
					}else{
						nextLevel = currentLevel;
					}
					break;
				}
			}
		}
		
		public function get nextLevel():Level{
			return _nextLevel;
		}
		
		public function set nextLevel(value:Level):void{
			_nextLevel = value;
		}
		
		public function get totalPrize():String{
			return _totalPrize;
		}
		
		public function set totalPrize(value:String):void{
			_totalPrize = value;
		}
		
		public function get tournamentTotalPrize():String{
			try{
				if(totalPrize.toLowerCase() != 'tba'){
					var prizeString:String = prizeDetails;
					var total:Number = 0;
					if(prizeString){
						var prizeArray:Array = prizeString.split(',');
						for(var index:int=0;index<prizeArray.length;index++){
							total = total+Number(prizeArray[index]);
						}
					}
					if(this.buyInType == 'Free'){
						return total.toString();
					}else{
						return total.toString();
					}
				}
			}catch(e:Error){
				//add error debug print here
			}
			return totalPrize;
		}
		
		public function get endTime():String{
			return _endTime;
		}
		
		public function set endTime(value:String):void{
			_endTime = value;
		}
		
		public function addLevelDetail(levelDetail:Level):void{
			levelDetails.push(levelDetail);
			var level:Level = levelDetails[0];
			/*var qualifyChips:int = int(level.chipsToEnter);*/
			var qualifyChips:Number= Number((80*Number(level.bet)).toFixed(2));
			var buyIn:Number = Number(level.buyIn);
			var value:Number = Number((buyIn/qualifyChips).toFixed(2));
			this.tChipsValue = value.toString();
			this.bet = level.bet;
			//levelDetails.push(levelDetail);
		}
		
		public function get tChipsValue():String{
			return _tChipsValue+" Real Chips";
		}
		
		public function set tChipsValue(value:String):void{
			_tChipsValue = value;
		}
		
		public function get levelDetails():Array{
			return _levelDetails;
		}
		
		public function set levelDetails(value:Array):void{
			_levelDetails = value;
		}
		
		public function get chips():String{
			return _chips;
		}
		
		public function set chips(value:String):void{
			_chips = value;
		}
		
		public function get prizeDetails():String{
			return _prizeDetails;
		}
		
		public function set prizeDetails(value:String):void{
			_prizeDetails = value;
		}
		
		public function get tables():TableCollection{
			return _tables;
		}
		
		public function set tables(value:TableCollection):void{
			_tables = value;
		}
		
		public function addToLeaderBoard(value:Player):void{
			leaderBoard.addItem(value);
		}
		
		public function get nextOpenTime():String{
			try{
				if(this.status == 'Registering'){
					if(startTime != 'NA'){
						return startTime;	
					}else{
						return " ";
					}
					
				}else if(status == "Break"){
					var nextLevel:String =  this.nextLevel.displayLevelName;
					for(var index:int=0;index<levelDetails.length;index++){
						var level:Level = levelDetails[index];
						if(level.displayLevelName == nextLevel){
							return level.startTime;
						}
					}
				}
			}catch(e:Error){
				//add error debug print here
			}
			return " ";
		}
		
		public function get tableName():String{
			return _tableName;
		}
		
		public function set tableName(value:String):void{
			_tableName = value;	
		}
		
		public function addTable(table:Table):void{
			tables.addItem(table);
		}
		
		public function removeTable(tableName:String):void{
			tables.removeTable(tableName);
			tables.refresh();
		}
		
		public function clearTables():void{
			tables.clearAllTables();
		}
		
		public function updateTable(tableName:String,players:String,maximumCount:String,minimumCount:String):void{
			tables.updateTourneyTable(tableName,players,maximumCount,minimumCount);
		}
		
		public function containsTable(tableName:String):Boolean{
			return tables.containsTourneyTable(tableName);
		}
		
		public function updateLevelDetails(levelName:String):void{
			for (var index:int=0;index<levelDetails.length;index++){
				var level:Level = levelDetails[index] 
				if( level.levelName == levelName){
					this.currentLevel = level;
					break;
				}
			}
		}
		
		public function updateLevelTimings(levelName:String,startTime:String,endTime:String):void{
			for (var index:int=0;index<levelDetails.length;index++){
				var level:Level = levelDetails[index];
				if(level.levelName == levelName){
					if(index == 0){
						this.startTime = startTime;
					}else if(index == (levelDetails.length-1)){
						this.endTime = endTime;
					}
					level.startTime = startTime;
					level.endTime = endTime;
					break;
				}
			}
		}
		
		public function get ticker():String{
			return _ticker;
		}
		
		public function set ticker(value:String):void{
			_ticker = value;
		}
		
		public function get allowedRegular():Number{
			return _allowedRegular;
		}
		
		public function set allowedRegular(value:Number):void{
			_allowedRegular = value;
		}
		
		public function get registeredRegular():Number{
			return _registeredRegular;
		}
		
		public function set registeredRegular(value:Number):void{
			_registeredRegular = value;
		}
		
		public function get allowedPremium():Number{
			return _allowedPremium;
		}
		
		public function set allowedPremium(value:Number):void{
			_allowedPremium = value;
		}
		
		public function get registeredPremium():Number{
			return _registeredPremium;
		}
		
		public function set registeredPremium(value:Number):void{
			_registeredPremium = value;
		}
		
	}
}


