/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
this.PlayerVO = function(){
    var userName;
    var firstName;
    var lastName;
    var email;
    var gender;
    var subscription;
    var realBalance;
    var playBalance;
    var playInPlay;
    var realInPlay;
    var userCode;
    var eligibilityTime;
    var registeredTournaments;
    var conversionDate;
    var aceLevel = "-1";
    var acePoints;
    var aceStars;
    var panUpdated;

    //Bonus variables

    var claimableBonus = "";
    var pendingBonus = "";
    var nextExpiringBonus = "";
    var bonusExpireDate = "";
    var bonusExpireTime = "";
    var virtualBonus;
    var nextBonusWagerAmount;
    var bonusChunkAvailable;
    var previousBonus;

    var passwordStrengthValue;
    var passwordExpiryDate;
    var loginDate;
    var whExpireDate;

    var position;
    var status;

    var displayName;
    var displayBalance;

    var aceLevelStarsCount;
    var source;
    var cutSeatCard;
    var isHighCard;

    var aceLevels = new Array();
    var aceLevelNumeric = -1;

    var playerMobileNumber;
    var isMobileNumberVerified;
    var isPseudoPlayer;
    var pseudoPlayerEligibleBet;
    var isPseudoBonusExpired;

    var isWinningsKeptInHold;
    var whAmountExpiryDate;
    var whAmountDuration;
    var bonusRelesedMessage;

    var registeredPTCollection;
    var isDeletedPlayer;
    
    this.getUserName = function() {
        return userName;
    }

    this.setUserName = function(userName) {
        this.userName = userName;
    }

    this.getFirstName = function() {
        return firstName;
    }

    this.setFirstName = function(firstName) {
        this.firstName = firstName;
    }

    this.getLastName = function() {
        return lastName;
    }

    this.setLastName = function(lastName) {
        this.lastName = lastName;
    }

    this.getEmail = function() {
        return email;
    }

    this.setEmail = function(email) {
        this.email = email;
    }

    this.getGender = function() {
        return gender;
    }

    this.setGender = function(gender) {
        this.gender = gender;
    }

    this.getSubscription = function() {
        return subscription;
    }

    this.setSubscription = function(subscription) {
        this.subscription = subscription;
    }

    this.getRealBalance = function() {
        return realBalance;
    }

    this.setRealBalance = function(realBalance) {
        this.realBalance = realBalance;
    }

    this.getPlayBalance = function() {
        return playBalance;
    }

    this.setPlayBalance = function(playBalance) {
        this.playBalance = playBalance;
    }

    this.getPlayInPlay = function() {
        return playInPlay;
    }

    this.setPlayInPlay = function(playInPlay) {
        this.playInPlay = playInPlay;
    }

    this.getRealInPlay = function() {
        return realInPlay;
    }

    this.setRealInPlay = function(realInPlay) {
        this.realInPlay = realInPlay;
    }

    this.getUserCode = function() {
        return userCode;
    }

    this.setUserCode = function(userCode) {
        this.userCode = userCode;
    }

    this.getEligibilityTime = function() {
        return eligibilityTime;
    }

    this.setEligibilityTime = function(eligibilityTime) {
        this.eligibilityTime = eligibilityTime;
    }

    this.getRegisteredTournaments = function() {
        return registeredTournaments;
    }

    this.setRegisteredTournaments = function(registeredTournaments) {
        this.registeredTournaments = registeredTournaments;
    }

    this.getConversionDate = function() {
        return conversionDate;
    }

    this.setConversionDate = function(conversionDate) {
        this.conversionDate = conversionDate;
    }

    this.getAceLevel = function() {
        return aceLevel;
    }

    this.setAceLevel = function(aceLevel) {
        this.aceLevel = aceLevel;
    }

    this.getAcePoints = function() {
        return acePoints;
    }

    this.setAcePoints = function(acePoints) {
        this.acePoints = acePoints;
    }

    this.getAceStars = function() {
        return aceStars;
    }

    this.setAceStars = function(aceStars) {
        this.aceStars = aceStars;
    }

    this.getPanUpdated = function() {
        return panUpdated;
    }

    this.setPanUpdated = function(panUpdated) {
        this.panUpdated = panUpdated;
    }

    this.getClaimableBonus = function() {
        return claimableBonus;
    }

    this.setClaimableBonus = function(claimableBonus) {
        this.claimableBonus = claimableBonus;
    }

    this.getPendingBonus = function() {
        return pendingBonus;
    }

    this.setPendingBonus = function(pendingBonus) {
        this.pendingBonus = pendingBonus;
    }

    this.getNextExpiringBonus = function() {
        return nextExpiringBonus;
    }

    this.setNextExpiringBonus = function(nextExpiringBonus) {
        this.nextExpiringBonus = nextExpiringBonus;
    }

    this.getBonusExpireDate = function() {
        return bonusExpireDate;
    }

    this.setBonusExpireDate = function(bonusExpireDate) {
        this.bonusExpireDate = bonusExpireDate;
    }

    this.getBonusExpireTime = function() {
        return bonusExpireTime;
    }

    this.setBonusExpireTime = function(bonusExpireTime) {
        this.bonusExpireTime = bonusExpireTime;
    }

    this.getVirtualBonus = function() {
        return virtualBonus;
    }

    this.setVirtualBonus = function(virtualBonus) {
        this.virtualBonus = virtualBonus;
    }

    this.getNextBonusWagerAmount = function() {
        return nextBonusWagerAmount;
    }

    this.setNextBonusWagerAmount = function(nextBonusWagerAmount) {
        this.nextBonusWagerAmount = nextBonusWagerAmount;
    }

    this.getBonusChunkAvailable = function() {
        return bonusChunkAvailable;
    }

    this.setBonusChunkAvailable = function(bonusChunkAvailable) {
        this.bonusChunkAvailable = bonusChunkAvailable;
    }

    this.getPreviousBonus = function() {
        return previousBonus;
    }

    this.setPreviousBonus = function(previousBonus) {
        this.previousBonus = previousBonus;
    }

    this.getPasswordStrengthValue = function() {
        return passwordStrengthValue;
    }

    this.setPasswordStrengthValue = function(passwordStrengthValue) {
        this.passwordStrengthValue = passwordStrengthValue;
    }

    this.getPasswordExpiryDate = function() {
        return passwordExpiryDate;
    }

    this.setPasswordExpiryDate = function(passwordExpiryDate) {
        this.passwordExpiryDate = passwordExpiryDate;
    }

    this.getLoginDate = function() {
        return loginDate;
    }

    this.setLoginDate = function(loginDate) {
        this.loginDate = loginDate;
    }

    this.getWhExpireDate = function() {
        return whExpireDate;
    }

    this.setWhExpireDate = function(whExpireDate) {
        this.whExpireDate = whExpireDate;
    }

    this.getPosition = function() {
        return position;
    }

    this.setPosition = function(position) {
        this.position = position;
    }

    this.getStatus = function() {
        return status;
    }

    this.setStatus = function(status) {
        this.status = status;
    }

    this.getDisplayName = function() {
        return displayName;
    }

    this.setDisplayName = function(displayName) {
        this.displayName = displayName;
    }

    this.getDisplayBalance = function() {
        return displayBalance;
    }

    this.setDisplayBalance = function(displayBalance) {
        this.displayBalance = displayBalance;
    }

    this.getAceLevelStarsCount = function() {
        return aceLevelStarsCount;
    }

    this.setAceLevelStarsCount = function(aceLevelStarsCount) {
        this.aceLevelStarsCount = aceLevelStarsCount;
    }

    this.getSource = function() {
        return source;
    }

    this.setSource = function(source) {
        this.source = source;
    }

    this.getCutSeatCard = function() {
        return cutSeatCard;
    }

    this.setCutSeatCard = function(cutSeatCard) {
        this.cutSeatCard = cutSeatCard;
    }

    this.getIsHighCard = function() {
        return isHighCard;
    }

    this.setIsHighCard = function(isHighCard) {
        this.isHighCard = isHighCard;
    }

    this.getAceLevels = function() { 
        return aceLevels;
    }

    this.setAceLevels = function(aceLevels) {
        this.aceLevels = aceLevels;
    }

    this.getAceLevelNumeric = function() {
        return aceLevelNumeric;
    }

    this.setAceLevelNumeric = function(aceLevelNumeric) {
        this.aceLevelNumeric = aceLevelNumeric;
    }

    this.getPlayerMobileNumber = function() {
        return playerMobileNumber;
    }

    this.setPlayerMobileNumber = function(playerMobileNumber) {
        this.playerMobileNumber = playerMobileNumber;
    }

    this.getIsMobileNumberVerified = function() {
        return isMobileNumberVerified;
    }

    this.setIsMobileNumberVerified = function(isMobileNumberVerified) {
        this.isMobileNumberVerified = isMobileNumberVerified;
    }

    this.getIsPseudoPlayer = function() {
        return isPseudoPlayer;
    }

    this.setIsPseudoPlayer = function(isPseudoPlayer) {
        this.isPseudoPlayer = isPseudoPlayer;
    }

    this.getPseudoPlayerEligibleBet = function() {
        return pseudoPlayerEligibleBet;
    }

    this.setPseudoPlayerEligibleBet = function(pseudoPlayerEligibleBet) {
        this.pseudoPlayerEligibleBet = pseudoPlayerEligibleBet;
    }

    this.getIsPseudoBonusExpired = function() {
        return isPseudoBonusExpired;
    }

    this.setIsPseudoBonusExpired = function(isPseudoBonusExpired) {
        this.isPseudoBonusExpired = isPseudoBonusExpired;
    }

    this.getIsWinningsKeptInHold = function() {
        return isWinningsKeptInHold;
    }

    this.setIsWinningsKeptInHold = function(isWinningsKeptInHold) {
        this.isWinningsKeptInHold = isWinningsKeptInHold;
    }

    this.getWhAmountExpiryDate = function() {
        return whAmountExpiryDate;
    }

    this.setWhAmountExpiryDate = function(whAmountExpiryDate) {
        this.whAmountExpiryDate = whAmountExpiryDate;
    }

    this.getWhAmountDuration = function() {
        return whAmountDuration;
    }

    this.setWhAmountDuration = function(whAmountDuration) {
        this.whAmountDuration = whAmountDuration;
    }

    this.getBonusRelesedMessage = function() {
        return bonusRelesedMessage;
    }

    this.setBonusRelesedMessage = function(bonusRelesedMessage) {
        this.bonusRelesedMessage = bonusRelesedMessage;
    }

    this.getRegisteredPTCollection = function() {
        return registeredPTCollection;
    }

    this.setRegisteredPTCollection = function(registeredPTCollection) {
        this.registeredPTCollection = registeredPTCollection;
    }

    this.getIsDeletedPlayer = function() {
        return isDeletedPlayer;
    }

    this.setIsDeletedPlayer = function(isDeletedPlayer) {
        this.isDeletedPlayer = isDeletedPlayer;
    }
    
    this.setUCID = function(ucid){
        this.ucid = ucid;
    }
    
    this.getUCID = function(){
        return this.ucid;
    }
}

