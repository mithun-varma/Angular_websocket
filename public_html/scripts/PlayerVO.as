package com.ace2three.lobby.vo
{
	import com.ace2three.lobby.ApplicationContext;
	import com.ace2three.lobby.collections.ArrayCollection;
	
	public class PlayerVO
	{
		private var _userName:String;
		private var _firstName:String;
		private var _lastName:String;
		private var _email:String;
		private var _gender:String;
		private var _subscription:String;
		private var _realBalance:String;
		private var _playBalance:String;
		private var _playInPlay:String;
		private var _realInPlay:String;
		private var _userCode:String;
		private var _eligibilityTime:Number;
		private var _registeredTournaments:ArrayCollection;
		private var _conversionDate:String;
		private var _aceLevel:String = "-1";
		private var _acePoints:String;
		private var _aceStars:String;
		private var _panUpdated:Boolean;
		
		//Bonus variables
		
		private var _claimableBonus:String = "";
		private var _pendingBonus:String = "";
		private var _nextExpiringBonus:String = "";
		private var _bonusExpireDate:String = "";
		private var _bonusExpireTime:String = "";
		private var _virtualBonus:String;
		private var _nextBonusWagerAmount:String;
		private var _bonusChunkAvailable:String;
		private var _previousBonus:String;
		
		private var _passwordStrengthValue:String;
		private var _passwordExpiryDate:String;
		private var _loginDate:String;
		private var _whExpireDate:String;
		
		private var _position:int;
		private var _status:int;
		
		private var _displayName:String;
		private var _displayBalance:String;
		
		private var _aceLevelStarsCount:int;
		private var _source:String;
		private var _cutSeatCard:String;
		private var _isHighCard:Boolean;
		
		public var aceLevels:ArrayCollection = new ArrayCollection();
		private var _aceLevelNumeric:int = -1;
		
		private var _playerMobileNumber:String;
		private var _isMobileNumberVerified:Boolean;
		private var _isPseudoPlayer:Boolean;
		private var _pseudoPlayerEligibleBet:Number;
		private var _isPseudoBonusExpired:Boolean;
		
		private var _isWinningsKeptInHold:Boolean;
		private var _whAmountExpiryDate:String;
		private var _whAmountDuration:int;
		private var _bonusRelesedMessage:String;
		
		private var _registeredPTCollection:ArrayCollection;
		private var _isDeletedPlayer:Boolean;
		
		public function PlayerVO()
		{
			registeredTournaments = new ArrayCollection();
			registeredPTCollection = new ArrayCollection();
			
			aceLevels.push('bronze');
			aceLevels.push('silver');
			aceLevels.push('gold');
			aceLevels.push('platinum');
			aceLevels.push('platinum+');
		}
		
		
		public function get aceLevelNumeric():int
		{
			return _aceLevelNumeric;
		}
		
		public function set aceLevelNumeric(value:int):void
		{
			_aceLevelNumeric = value;
		}
		
		public function get whAmountDuration():int
		{
			return _whAmountDuration;
		}
		
		public function set whAmountDuration(value:int):void
		{
			_whAmountDuration = value;
		}
		
		public function get whAmountExpiryDate():String
		{
			return _whAmountExpiryDate;
		}
		
		public function set whAmountExpiryDate(value:String):void
		{
			_whAmountExpiryDate = value;
		}
		
		public function get isWinningsKeptInHold():Boolean
		{
			return _isWinningsKeptInHold;
		}
		
		public function set isWinningsKeptInHold(value:Boolean):void
		{
			_isWinningsKeptInHold = value;
		}
		
		public function get isPseudoBonusExpired():Boolean
		{
			return _isPseudoBonusExpired;
		}
		
		public function set isPseudoBonusExpired(value:Boolean):void
		{
			_isPseudoBonusExpired = value;
		}
		
		public function get pseudoPlayerEligibleBet():Number
		{
			return _pseudoPlayerEligibleBet;
		}
		
		public function set pseudoPlayerEligibleBet(value:Number):void
		{
			_pseudoPlayerEligibleBet = value;
		}
		
		public function get isPseudoPlayer():Boolean
		{
			return _isPseudoPlayer;
		}
		
		public function set isPseudoPlayer(value:Boolean):void
		{
			_isPseudoPlayer = value;
		}
		
		public function get playerMobileNumber():String
		{
			return _playerMobileNumber;
		}
		
		public function set playerMobileNumber(value:String):void
		{
			_playerMobileNumber = value;
		}
		
		public function get isMobileNumberVerified():Boolean
		{
			return _isMobileNumberVerified;
		}
		
		public function set isMobileNumberVerified(value:Boolean):void
		{
			_isMobileNumberVerified = value;
		}
		
		public function get whExpDifference():Number{
			var diff:Number;
			if(whAmountExpiryDate){
				if(whAmountExpiryDate != "null" && whAmountExpiryDate != ""){
					diff = this.whAmountExpiredDiffernce(whAmountExpiryDate);
				}
			}
			
			return diff;
		}
		
		public function whAmountExpiredDiffernce(whAmtExpireDate:String):Number{
			var context:ApplicationContext = ApplicationContext.getInstance();
			//25-Apr-2015
			var whDateArr:Array = whAmtExpireDate.split('-');
			var whDate:String = whDateArr[1]+"/"+whDateArr[0]+"/"+whDateArr[2]; //month/day/year	
			var whExpireDate:Date = new Date(whDate);
			
			// year-month-day
			var lobDate:Array =  context.lobbyDate.split('-');
			var dateStr:String = lobDate[1]+"/"+lobDate[2]+"/"+lobDate[0]
			var lDate:Date = new Date(dateStr);
			
			var dateDiff:Number = this.differenceBetweenDates(whExpireDate, lDate);
			
			//Wed-11-Dec
			/* Conversion Date : 2012-01-23
			Eligibility Time : 30 */
			
			return dateDiff;
		}
		
		private function differenceBetweenDates(whExpDate:Date, logginDate:Date):Number{
			
			var MS_PER_DAY:uint = 1000 * 60 * 60 * 24;
			var tempDate:Date = new Date(whExpDate.time - logginDate.time);
			var difference:Number =  Math.round((tempDate.time / MS_PER_DAY));
			
			return difference;
		}
		
		public function get whExpireDate():String
		{
			return _whExpireDate;
		}
		
		public function set whExpireDate(value:String):void
		{
			_whExpireDate = value;
		}
		
		public function get playerVOString():String
		{
			var registertourney:String = registeredTournaments.toString();
			var details:Array = registertourney.split(',');
			var tourneyString:String = "";
			
			for (var i:int = 0; i < details.length; i++) {
				if(tourneyString == ""){
					tourneyString = details[i];
				}else{
					tourneyString = tourneyString+'-'+details[i];
				}
				
			}
			return "userName:"+userName+
				",firstName:"+firstName+
				",lastName:"+lastName+
				",email:"+email+
				",gender:"+gender+
				",subscription:"+subscription+
				",realBalance:"+realBalance+
				",playBalance:"+playBalance+
				",playInPlay:"+playInPlay+
				",realInPlay:"+realInPlay+
				",userCode:"+userCode+
				",eligibilityTime:"+eligibilityTime+
				",registeredTournaments:"+tourneyString+//registeredTournaments.toString().replace(",","-")+
				",conversionDate:"+conversionDate+
				",aceLevel:"+aceLevel+
				",acePoints:"+acePoints+
				",aceStars:"+aceStars+
				",panUpdated:"+panUpdated;
		}
		
		public function get panUpdated():Boolean
		{
			return _panUpdated;
		}
		
		public function set panUpdated(value:Boolean):void
		{
			_panUpdated = value;
		}
		
		public function get previousBonus():String
		{
			return _previousBonus;
		}
		
		public function set previousBonus(value:String):void
		{
			_previousBonus = value;
		}
		
		public function get bonusChunkAvailable():String
		{
			return _bonusChunkAvailable;
		}
		
		public function set bonusChunkAvailable(value:String):void
		{
			_bonusChunkAvailable = value;
		}
		
		public function get nextBonusWagerAmount():String
		{
			return _nextBonusWagerAmount;
		}
		
		public function set nextBonusWagerAmount(value:String):void
		{
			_nextBonusWagerAmount = value;
		}
		
		public function get virtualBonus():String
		{
			return _virtualBonus;
		}
		
		public function set virtualBonus(value:String):void
		{
			_virtualBonus = value;
		}
		
		public function get bonusExpireDate():String
		{
			return _bonusExpireDate;
		}
		
		public function set bonusExpireDate(value:String):void
		{
			_bonusExpireDate = value;
		}
		
		public function get bonusExpireTime():String
		{
			return _bonusExpireTime;
		}
		
		public function set bonusExpireTime(value:String):void
		{
			_bonusExpireTime = value;
		}
		
		public function get nextExpiringBonus():String
		{
			return _nextExpiringBonus;
		}
		
		public function set nextExpiringBonus(value:String):void
		{
			_nextExpiringBonus = value;
		}
		
		public function get pendingBonus():String
		{
			return _pendingBonus;
		}
		
		public function set pendingBonus(value:String):void
		{
			_pendingBonus = value;
		}
		
		public function get claimableBonus():String
		{
			return _claimableBonus;
		}
		
		public function set claimableBonus(value:String):void
		{
			_claimableBonus = value;
		}
		
		public function get aceStars():String
		{
			return _aceStars;
		}
		
		public function set aceStars(value:String):void
		{
			_aceStars = value;
		}
		
		public function get realInPlay():String
		{
			return _realInPlay;
		}
		
		public function set realInPlay(value:String):void
		{
			_realInPlay = value;
		}
		
		public function get playInPlay():String
		{
			return _playInPlay;
		}
		
		public function set playInPlay(value:String):void
		{
			_playInPlay = value;
		}
		
		public function get acePoints():String
		{
			return _acePoints;
		}
		
		public function set acePoints(value:String):void
		{
			_acePoints = value;
		}
		
		public function get aceLevel():String
		{
			return _aceLevel;
		}
		
		public function set aceLevel(value:String):void
		{
			var userAceLevel:int = aceLevels.getItemIndex(value);
			var context:ApplicationContext = ApplicationContext.getInstance();
			
			//in place of 'int(aceLevel)' we are now using 'aceLevelNumeric' which contains the index of aceLevel name (Array Collection)
			if(aceLevelNumeric >= 0){
				if(aceLevelNumeric < userAceLevel){
					context.lobby.showAceLevelMessage(true, value, aceStars);
				}else if(aceLevelNumeric > userAceLevel){
					context.lobby.showAceLevelMessage(false, value, aceStars);
				}
			}else{
				if(context.lobbyUserSubscription != 'Premium' ){
					if(aceLevelNumeric < userAceLevel){
						context.lobby.showAceLevelMessage(true, value, aceStars);
					}
				}
			}
			
			aceLevelNumeric = userAceLevel;
			_aceLevel = value;
		}
		
		public function get conversionDate():String
		{
			return _conversionDate;
		}
		
		public function set conversionDate(value:String):void
		{
			_conversionDate = value;
		}
		
		public function get registeredTournaments():ArrayCollection
		{
			return _registeredTournaments;
		}
		
		public function set registeredTournaments(value:ArrayCollection):void
		{
			_registeredTournaments = value;
		}
		
		public function get eligibilityTime():Number
		{
			return _eligibilityTime;
		}
		
		public function set eligibilityTime(value:Number):void
		{
			_eligibilityTime = value;
		}
		
		public function get userCode():String
		{
			return _userCode;
		}
		
		public function set userCode(value:String):void
		{
			_userCode = value;
		}
		
		public function get playBalance():String
		{
			return _playBalance;
		}
		
		public function set playBalance(value:String):void
		{
			_playBalance = value;
		}
		
		public function get realBalance():String
		{
			return _realBalance;
		}
		
		public function set realBalance(value:String):void
		{
			_realBalance = value;
		}
		
		public function get subscription():String
		{
			return _subscription;
		}
		
		public function set subscription(value:String):void
		{
			_subscription = value;
		}
		
		public function get gender():String
		{
			return _gender;
		}
		
		public function set gender(value:String):void
		{
			_gender = value;
		}
		
		public function get email():String
		{
			return _email;
		}
		
		public function set email(value:String):void
		{
			_email = value;
		}
		
		public function get lastName():String
		{
			return _lastName;
		}
		
		public function set lastName(value:String):void
		{
			_lastName = value;
		}
		
		public function get firstName():String
		{
			return _firstName;
		}
		
		public function set firstName(value:String):void
		{
			_firstName = value;
		}
		
		public function get userName():String
		{
			return _userName;
		}
		
		public function set userName(value:String):void
		{
			_userName = value;
		}
		
		public function get passwordStrengthValue():String
		{
			return _passwordStrengthValue;
		}
		
		public function set passwordStrengthValue(value:String):void
		{
			_passwordStrengthValue = value;
		}
		
		public function get passwordExpiryDate():String
		{
			return _passwordExpiryDate;
		}
		
		public function set passwordExpiryDate(value:String):void
		{
			_passwordExpiryDate = value;
		}
		
		public function get loginDate():String
		{
			return _loginDate;
		}
		
		public function set loginDate(value:String):void
		{
			_loginDate = value;
		}
		
		public function get position():int
		{
			return _position;
		}
		
		public function set position(value:int):void
		{
			_position = value;
		}
		
		public function get status():int
		{
			return _status;
		}
		
		public function set status(value:int):void
		{
			_status = value;
		}
		
		public function get displayName():String
		{
			return _displayName;
		}
		
		public function set displayName(value:String):void
		{
			_displayName = value;
		}
		
		public function get bonusRelesedMessage():String
		{
			return _bonusRelesedMessage;
		}
		
		public function set bonusRelesedMessage(value:String):void
		{
			_bonusRelesedMessage = value;
		}
		
		public function get registeredPTCollection():ArrayCollection
		{
			return _registeredPTCollection;
		}
		
		public function set registeredPTCollection(value:ArrayCollection):void
		{
			_registeredPTCollection = value;
		}
		
		public function get isDeletedPlayer():Boolean
		{
			return _isDeletedPlayer;
		}
		
		public function set isDeletedPlayer(value:Boolean):void
		{
			_isDeletedPlayer = value;
		}
		
		
	}
}