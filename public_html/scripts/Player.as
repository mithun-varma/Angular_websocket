package com.ace2three.lobby.collections.data
{

	public class Player
	{
		private var _rank:String;
		private var _name:String;
		private var _chips:int;
		
		public function Player()
		{
			
		}
		public function set rank(value:String):void{
			_rank = value;
		}
		
		public function get rank():String{
			return _rank;
		}
		
		public function set name(value:String):void{
			_name = value;
		}
		
		public function get name():String{
			return _name;
		}
		
		public function set chips(value:int):void{
			_chips = value;
		}
		
		public function get chips():int{
			return _chips;
		}
	}
}