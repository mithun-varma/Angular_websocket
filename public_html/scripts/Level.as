package com.ace2three.lobby.collections.data
{
	public class Level
	{
		private var _levelName:String;
		private var _startTime:String;
		private var _endTime:String;
		private var _chipsToEnter:String;
		private var _isReubyAllowed:String;
		private var _bet:String;
		private var _buyIn:String;
		private var _rake:String;
		private var _displayReBuy:String;
		
		private var _rebuyChips:String;
		
		public function Level()
		{
		}
		
		public function set rebuyChips(value:String):void{
			_rebuyChips = value;
		}
		
		public function get rebuyChips():String{
			if(reBuyInAllowed == "N"){
				return "NA";
			}else {
				return _rebuyChips;
			}
			
		}
		
		
		public function set levelName(value:String):void{
			_levelName = value;
		}
		
		public function get levelName():String{
			return _levelName;
		}
		
		public function set chipsToEnter(value:String):void{
			_chipsToEnter = value;
		}
		
		public function get chipsToEnter():String{
			return _chipsToEnter;
		}
		
		public function set reBuyInAllowed(value:String):void{
		   _isReubyAllowed = value;
		}
		
		public function get reBuyInAllowed():String{
			return _isReubyAllowed;
		}
		
		public function set bet(value:String):void{
			_bet = value;
		}
		
		public function get bet():String{
			return _bet
		}
		
		public function set rake(value:String):void{
			_rake = value;
		}
		
		public function get rake():String{
			return _rake
		}
		
		public function set buyIn(value:String):void{
			_buyIn = value;
		}
		
		public function get buyIn():String{
			return _buyIn;
		}
		
		public function set startTime(value:String):void{
			_startTime = value;
		}
		
		public function get startTime():String{
			return _startTime;
		}
		
		public function set endTime(value:String):void{
			_endTime = value;
		}
		
		public function get endTime():String{
			return _endTime;
		}
		
		public function get displayLevelName():String{
			return levelName.replace("Level","");
		}
		
		public function get tipRebuy():String{
			return "Hello ................ ";
		}
		
		public function get scheduleTime():String{
			//return startTime+" to "+endTime;
			return startTime+' Min';
		}
		
		public function get displayScheduleTime():String{
			return startTime+" to "+endTime;
		}
		
		public function set displayReBuy(value:String):void{
			_displayReBuy = value;
		}
		
		public function get displayReBuy():String{
			if(reBuyInAllowed == "N"){
				return "NA";
			}else {
				/*return buyIn+"+"+rake;*/
				return _displayReBuy;
			}
		}
		
		
		
	}
}