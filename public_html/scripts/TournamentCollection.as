package com.ace2three.lobby.collections
{
	import com.ace2three.lobby.ApplicationContext;
	import com.ace2three.lobby.collections.data.Level;
	import com.ace2three.lobby.collections.data.Tournament;
	import com.ace2three.lobby.commons.Constants;
	import com.ace2three.lobby.components.LobbyCanvas;
	import com.ace2three.lobby.events.CollectionEvent;
	import com.ace2three.lobby.events.CollectionEventKind;
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.IEventDispatcher;
	
	public dynamic class TournamentCollection extends Array implements IEventDispatcher
	{
		private var eventDispatcher:EventDispatcher;
		private var _cachedCollection:Array;
		private var _months:Array;
		private var _statusArray:Array;
		private var vector:Vector.<Tournament>;
		private var selectedFilters:Array;
		
		public function TournamentCollection(...parameters)
		{
			super(parameters);
			months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
			statusArray = ['Re','Fu','Ru','Br','An','Co','Ca'];
			this.popAll();
			cachedCollection = new Array();
			eventDispatcher = new EventDispatcher(this);
			vector = new Vector.<Tournament>();
		}
		
		public function addTournamentPrize(tourneyName:String,prizeDetail:String):void{
			if(this.list){
				for each(var tournament:Tournament in this){
					/*var currentItem:Tournament =  list.getItemAt(index) as Tournament;*/
					if(tournament.tourneyName == tourneyName){
						tournament.prizeDetails = prizeDetail;
						tournament.hasUpdatedData = true;
						var event:Event = new Event(Event.CHANGE, true);
						tournament.dispatchEvent(event);
						break;
					}
				}
			}
		}
		
		public function get statusArray():Array
		{
			return _statusArray;
		}
		
		public function set statusArray(value:Array):void
		{
			_statusArray = value;
		}
		
		public function get months():Array
		{
			return _months;
		}
		
		public function set months(value:Array):void
		{
			_months = value;
		}
		
		public function get cachedCollection():Array
		{
			return _cachedCollection;
			//			return [];
		}
		
		public function set cachedCollection(value:Array):void
		{
			_cachedCollection = value;
		}
		
		public function addEventListener(type:String, listener:Function, useCapture:Boolean=false, priority:int=0, useWeakReference:Boolean=false):void
		{
			eventDispatcher.addEventListener(type,listener,useCapture,priority,useWeakReference);
		}
		
		public function removeEventListener(type:String, listener:Function, useCapture:Boolean=false):void
		{
			eventDispatcher.removeEventListener(type,listener,useCapture);
		}
		
		public function dispatchEvent(event:Event):Boolean
		{
			return eventDispatcher.dispatchEvent(event);
		}
		
		public function hasEventListener(type:String):Boolean
		{
			return eventDispatcher.hasEventListener(type);
		}
		
		public function willTrigger(type:String):Boolean
		{
			return eventDispatcher.willTrigger(type);
		}
		
		private function popAll():void{
			while( this.length != 0){
				this.pop();
			}
		}
		
		
		public function containsTournament(tourneyName:String):Boolean{
			for each(var tournament:Tournament in this){
				if(tournament.tourneyName == tourneyName){
					return true;
				}
			}
			return false;
		}
		
		public function updateTournamentChips(tourneyName:String,chips:String,rank:String):void{
			for each(var currentItem:Tournament in this){
				if( currentItem.tourneyName == tourneyName ){
					currentItem.chips = chips;
					currentItem.rank = rank;
					break;	
				}
			}
		}
		
		public function updateTournamentDetails(tourneyName:String,totalPrize:String,startDate:String,description:String,
												status:String,playerCount:String,maxPlayerCount:int):void{
			try{
				for each(var currentItem:Tournament in this){
					if( currentItem.tourneyName == tourneyName ){
						currentItem.totalPrize = totalPrize;
						/*currentItem.startDate = startDate;*/
						currentItem.tourneyStartDate = startDate;
						currentItem.description = description;
						currentItem.status = status;
						currentItem.playerCount = playerCount;
						currentItem.maxPlayerCount = maxPlayerCount;
						
					}
				}
				
			}catch(e:Error){
				//add error debug print here
			}
		}
		
		public function addTournament(value:Tournament):void{
			this.push(value);
			this.cachedCollection.push(value);
		}
		
		public function removeTournament(tourneyName:String):void{
			
			if(containsTournament(tourneyName)){
				
				var definitionIndex:int = this.indexOf(getTournament(tourneyName));
				//				var index:int;
				//				var currentTournament:Tournament;
				//				for(index = 0; index < this.length; index++){ //index starts from 1
				//					currentTournament = this[index];
				//					if(currentTournament.tourneyName == tourneyName){
				//						this.splice(index,1);
				//					}
				//				}
				if(definitionIndex >= 0){
					
					this.splice(definitionIndex,1);
				}
				//				for(index = 0; index < this.length; index++){
				//					currentTournament = this[index];
				//				}
			}
			try{
				if(cachedCollection){
					
					this.cachedCollection.splice(definitionIndex,1);
				}
			} catch(e:Error)  {
				//add error debug print here
				
			}
		}
		
		public function doFinalSorting():void{
			//			trace("Length before sorting ******************  "+this.length+" cached collection "+this.cachedCollection.length);
			//by kanthi june11th to fix data missing case from main collection and cached collection
			if(this.cachedCollection.length != this.length){
				this.cachedCollection = new Array();
				for each(var tournament:Tournament in this){
					this.cachedCollection.push(tournament);
				}
			}
			this.cachedCollection.sort(statusSortFunction);
			//			trace("Length after status sorting  ******************  "+this.length+" cached collection "+this.cachedCollection.length);
			this.performDateSorting();
			//			trace("Length after date sorting ******************  "+this.length+" -------------- "+this.cachedCollection.length);
			//By kanthi june 11th
			//			trace("Selected filters ******************* "+this.selectedFilters);
			//			if(this.selectedFilters){
			//				this.applyFilters();		
			//			}
			
		}
		
		
		//By kanthi June 11
		public function applyFilters():void{
			this.filtersChanged(this.selectedFilters);
		}
		
		private function performDateSorting():void{
			
			//			statusArray = ['Re','Fu','Ru','Br','An','Co','Ca'];
			var registeringTournaments:Array = new Array();
			var fullTournaments:Array = new Array();
			var runningTournaments:Array = new Array();
			var breakTournaments:Array = new Array();
			var announcedTournaments:Array = new Array();
			var completedTournaments:Array = new Array();
			var cancelledTournaments:Array = new Array();
			var tournament:Tournament
			for each(tournament in this.cachedCollection){
				var status:String = tournament.status;
				if( status.toLowerCase().search("re") == 0 ){
					registeringTournaments.push(tournament);
				}
				else if( status.toLowerCase().search("fu") == 0 ){
					fullTournaments.push(tournament);
				}
				else if( status.toLowerCase().search("ru") == 0 ){
					runningTournaments.push(tournament);
				}
				else if( status.toLowerCase().search("br") == 0 ){
					breakTournaments.push(tournament);
				}
				else if( status.toLowerCase().search("an") == 0 ){
					announcedTournaments.push(tournament);
				}
				else if( status.toLowerCase().search("co") == 0 ){
					completedTournaments.push(tournament);
				}
				else if( status.toLowerCase().search("ca") == 0 ){
					cancelledTournaments.push(tournament);
				}
			}
			
			var sum:int = registeringTournaments.length + fullTournaments.length + runningTournaments.length + breakTournaments.length + announcedTournaments.length 
				+ completedTournaments.length + cancelledTournaments.length;
			
			//trace("sum of all tournament lenght is "+sum);
			
			registeringTournaments.sort(dateSortFunction);
			//			registeringTournaments.sort(playerSortFunction);
			
			fullTournaments.sort(dateSortFunction);
			//			fullTournaments.sort(playerSortFunction);
			
			runningTournaments.sort(dateSortFunction);
			//			runningTournaments.sort(playerSortFunction);
			
			breakTournaments.sort(dateSortFunction);
			//			breakTournaments.sort(playerSortFunction);
			
			announcedTournaments.sort(dateSortFunction);
			//			announcedTournaments.sort(playerSortFunction);
			
			completedTournaments.sort(dateSortFunction);
			//			completedTournaments.sort(playerSortFunction);
			
			cancelledTournaments.sort(dateSortFunction);
			//			cancelledTournaments.sort(playerSortFunction);
			
			this.cachedCollection = new Array();
			this.splice(0);
			
			
			for each(tournament in registeringTournaments){
				this.cachedCollection.push(tournament);
				this.push(tournament);
			}
			
			for each(tournament in fullTournaments){
				this.cachedCollection.push(tournament);
				this.push(tournament);
			}
			
			for each(tournament in runningTournaments){
				this.cachedCollection.push(tournament);
				this.push(tournament);
			}
			
			for each(tournament in breakTournaments){
				this.cachedCollection.push(tournament);
				this.push(tournament);
			}
			
			for each(tournament in announcedTournaments){
				this.cachedCollection.push(tournament);
				this.push(tournament);
			}
			
			for each(tournament in completedTournaments){
				this.cachedCollection.push(tournament);
				this.push(tournament);
			}
			
			for each(tournament in cancelledTournaments){
				this.cachedCollection.push(tournament);
				this.push(tournament);
			}
			
		}
		
		private function statusSortFunction(itemA:Tournament,itemB:Tournament):int{
			try{
				var statusA:String =  itemA.status;
				var statusB:String = itemB.status;
				statusA = statusA.substring(0,2);
				statusB = statusB.substring(0,2);
				if(statusArray.indexOf(statusA) > statusArray.indexOf(statusB)){
					return 1;
				}else if(statusArray.indexOf(statusA) < statusArray.indexOf(statusB)){
					return -1;
				}
			}catch(e:Error){
				//add error debug print here
			}
			return 0;
		}
		
		public function getCompareDateString(data:String):String{
			
			var date:Date = new Date();
			var year:String;
			var details:Array = data.split(" ");
			var dateDetails:Array = details[0].split('-');
			var searchString:String = dateDetails[3].toString().toUpperCase();
			return (months.indexOf(searchString,0)+1)+"/"+dateDetails[2]+"/"+dateDetails[0];
			/*return (months.indexOf(searchString,0)+1)+"/"+dateDetails[1]+"/"+date.fullYear;*/
			/*return months.indexOf(dateDetails[1],0)+1+"/"+dateDetails[0]+"/"+date.fullYear;*/
		}
		
		public function updateTourneyTableName(tourneyName:String, tableName:String):void{
			/**
			 * Need to Check the Utility of this function.
			 **/
			for each(var currentItem:Tournament in this){
				if( currentItem.tourneyName == tourneyName ){
					currentItem.tableName = tableName;
					break;	
				}
			}
		}
		
		private function playerSortFunction(itemA:Tournament,itemB:Tournament):int{
			var countA:int = itemA.playerCount.split('/')[0];
			var countB:int = itemB.playerCount.split('/')[0];
			if(countA > countB){
				return 1;
			}else if(countA < countB){
				return -1;
			}else{
				return 0;
			}
		}
		
		private function dateSortFunction(itemA:Tournament,itemB:Tournament):int{
			try{
				var startDateA:String = itemA.tourneyStartDate;
				var startDateB:String = itemB.tourneyStartDate;
				var dateDetailsA:Array = startDateA.split(' ');
				var dateDetailsB:Array = startDateB.split(' ');
				var startTimeA:String = dateDetailsA[1];
				var startTimeB:String = dateDetailsB[1];
				var dateStringA:String = getCompareDateString(startDateA);
				var dateStringB:String = getCompareDateString(startDateB);
				
				if(startTimeA != "NA"){
					var dateStartTimeA:String = startTimeA.substring(0,2)+":"+startTimeA.substring(3,startTimeA.length)+":00";
					dateStringA = dateStringA+" "+dateStartTimeA;
				}else{
					
				}
				if(startTimeB != "NA"){
					var dateStartTimeB:String = startTimeB.substring(0,2)+":"+startTimeB.substring(3,startTimeB.length)+":00";
					dateStringB = dateStringB+" "+dateStartTimeB;
				}else{
					
				}
				var dateA:Date = new Date(Date.parse(dateStringA));
				var dateB:Date = new Date(Date.parse(dateStringB));
				
				if(dateA.getTime() > dateB.getTime()){
					return 1;
				}else if(dateA.getTime() < dateB.getTime()){
					return -1;
				}else{
					return 0;
				}
			}catch(e:Error){
				//add error debug print here
			} 
			return 0;
		}
		
		
		public function filtersChanged(selectedFilters:Array):void{
			if(! selectedFilters )return;
			
			var low:Boolean;
			var medium:Boolean;
			var high:Boolean;
			var registered:Boolean;
			var viewAll:Boolean;
			var tournament:Tournament;
			var mobileExcluded:Boolean;
			
			if( selectedFilters.length > 0 ){
				for each(tournament in this){
					tournament.viewable = false;
				}	
			}else{
				for each(tournament in this){
					tournament.viewable = true;
				}
			}
			
			for each(var type:String in selectedFilters){
				if(type == Constants.FILTER_VIEW_ALL ){
					viewAll = true;
				}
				else if(type == Constants.FILTER_LOW_BET){
					low = true 
				}
				else if(type == Constants.FILTER_MEDIUM_BET){
					medium = true;
				}
				else if(type == Constants.FILTER_HIGH_BET){
					high = true;
				}
				else if(type == Constants.REGISTERED){
					registered = true;
					
				}else if(type == Constants.EXCLUDE_MOBILE){
					mobileExcluded = true;
				}
				
			}
			
			var context:ApplicationContext = ApplicationContext.getInstance();
			if( viewAll ){
				for each(tournament in this){
					tournament.viewable = true;
				}
			}
			else if( registered ){
				if( context.isPlayerLoggedIn){
					for each(tournament in this){
						var flag:Boolean = context.player.registeredTournaments.contains(tournament.tourneyName);
						if(flag){
							if( low || medium || high ){
								tournament.viewable = false;
								doTournamentBetFilters(tournament,low,medium,high,mobileExcluded);
								
							}else if(mobileExcluded){
								if(tournament.isMobileSpecified){
									tournament.viewable = false;
								}else{
									tournament.viewable = true;
								}
							}else{
								tournament.viewable = true;							
							}
						}else{
							tournament.viewable = false;
						}
					}
				}else{
					context.lobbyCanvas.addLoginWindow();
				}
			}
			else if( low || medium || high){
				for each(tournament in this){
					doTournamentBetFilters(tournament,low,medium,high, mobileExcluded);
					//					doTournamentBetFilters(tournament,low,medium,high);
				}
			}
				
			else if(mobileExcluded){
				for each(tournament in this){
					if(!tournament.isMobileSpecified){
						tournament.viewable = true;
						
					}else{
						tournament.viewable = false;
					}
				}
			}
			
			this.cachedCollection = new Array();
			for each(tournament in this){
				if(tournament.viewable){
					this.cachedCollection.push(tournament);
				}
			}
			this.refresh();
			//Change by Kanthi June 11
			this.selectedFilters = selectedFilters;
			//			trace("After execting filters "+this.length+" and this cached colleciton length "+this.cachedCollection.length);;
		}
		
		private function doTournamentBetFilters(tournament:Tournament,low:Boolean,medium:Boolean,high:Boolean, mobileExcluded:Boolean = false):void{
			var entry:Number = Number(tournament.entry);
			if(tournament.tourneySubType.toLowerCase().search("acepoint") >= 0){
				if(low){
					if(entry <= 500){
						
						tournament.viewable = true;
					}
				}
				if(medium){
					if(entry >= 500 && entry <= 2000){
						tournament.viewable = true;
					}
				}
				if(high){
					if(entry > 2000){
						tournament.viewable = true;
					}
				}
			}else{
				if(low){
					if(entry <= 50){
						
						tournament.viewable = true;
					}
				}
				if(medium){
					if(entry >= 50 && entry <= 200){
						tournament.viewable = true;
					}
				}
				if(high){
					if(entry > 200){
						tournament.viewable = true;
					}
				}
			}
			
			if(mobileExcluded){
				
				if(tournament.isMobileSpecified && tournament.viewable){
					tournament.viewable = false;
				}
			}
			
		}
		
		private function getTournamentIndex(tourneyName:String):int{
			for each(var tournament:Tournament in this){
				if( tournament.tourneyName == tourneyName ){
					return indexOf(tournament)+1;
				}
			}
			return 0;
		}
		
		public function addLevelDetail(tourneyName:String,levelName:String,chipsToEnter:String,rebuyInAllowed:String
									   ,levelBet:String,levelBuyIn:String,levelRake:String,
										levelStartTime:String,levelEndTime:String, tourneySubType:String):void{
			
			var level:Level = new Level();
			level.levelName = levelName;
			/*level.chipsToEnter = chipsToEnter;*/
			level.rebuyChips = chipsToEnter;
			level.reBuyInAllowed = rebuyInAllowed;
			level.bet = levelBet;
			level.buyIn = levelBuyIn;
			level.rake = levelRake;
			level.startTime =  levelStartTime;
			level.endTime = levelEndTime;
			level.chipsToEnter = (80*(Number(level.bet))).toString();
			
			if(tourneySubType == 'Acepoint'){
				level.displayReBuy = levelBuyIn+" AP";
			}else{
				level.displayReBuy = levelBuyIn;
			}
			
			var currentItem:Tournament = this.getTournament(tourneyName);
			if(currentItem){
				currentItem.addLevelDetail(level);
			}
			
		}
		
		
		public function getTournament(tourneyName:String):Tournament{
			for each(var tourney:Tournament in this){
				if(tourney.tourneyName == tourneyName){
					return tourney;
				}
			}
			return null;
		}
		
		private function refresh(kind:String = CollectionEventKind.FILTER_REFRESH,tourneyName:String = null):void{
			if( kind == CollectionEventKind.SORT_REFRESH ){
				this.doFinalSorting();
			}
			var event:CollectionEvent = new CollectionEvent(CollectionEvent.COLLECTION_CHANGE);
			event.kind = kind;
			event.tourneyName = tourneyName;
			this.dispatchEvent(event);
		}
		
		public function containsTournamentInCache(tourneyName:String):Boolean{
			for each(var tournament:Tournament in this.cachedCollection){
				if( tournament.tourneyName == tourneyName){
					return true;
				}
			}
			return false;
		}
		
		public function updateRegistrationCount(tourneyName:String,regCount:String,totalCount:String):void{
			for each(var tournament:Tournament in this){
				if( tournament.tourneyName == tourneyName ){
					tournament.playerCount = regCount;
					tournament.maxPlayerCount = int(totalCount);
					tournament.hasUpdatedData = true;
					var event:Event = new Event(Event.CHANGE, true);
					tournament.dispatchEvent(event);
					break;
				}
			}
		}
		
		public function updateTournamentStatus(tourneyName:String,levelName:String,status:String):void{
			
			for each(var currentItem:Tournament in this ){
				if(currentItem.tourneyName ==  tourneyName){
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
					currentItem.status = status;
					//						currentItem.updateLevelDetails(levelName);
					if(levelName != null){  //if condition is added as null is being passed for level name during status update @yashwanth
						currentItem.updateLevelDetails(levelName);
					}
					
					currentItem.hasUpdatedData = true;
					var event:Event = new Event(Event.CHANGE,true);
					currentItem.dispatchEvent(event);
					//					refresh(CollectionEventKind.SORT_REFRESH,tourneyName);
					
					var lobbyCanvas:LobbyCanvas = ApplicationContext.getInstance().lobbyCanvas;
					if(lobbyCanvas.selectedTourneyName == tourneyName){ //updates game information
						lobbyCanvas.updateGameInformation(currentItem);
					}
					
					break;
				}
			}
		}
	}
}
