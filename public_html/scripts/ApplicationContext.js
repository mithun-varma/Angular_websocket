/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

ApplicationContext = (function () {
    var contextInstance;
    var passwordElement;
    var defaultInputElement;
    var numericInputElement;
    var play201Collection;
    var play101Collection;
    var playStakeCollection;
    var playBOXCollection;
    var real201Collection;
    var real101Collection;
    var realStakeCollection;
    var realBOXCollection;
    var serverDetails;
    var lobbyCommunicator;
    var player;
    var clientVersion = "1.0"; //Application version
    var clientAPIVersion = "2.6.1"; //Phaser version minJS
    var sessionId;
    var oldSessionId;
    var styleManager;
    var alertStates;
    var gameWindowsCount;

    var mGameContexts = {};
    var cardSourceMappings = {};
    var gameWindowKeys = new Array();

    var autoUserName;
    var autoSessionId;
    var autoGameType;
    var autoBet;
    var autoMaxPlayers;
    var autoIsPlayGame;


    init = function () {

        var setKeyInputHandlerFunction = function (value) {
            this.keyInputHandlerFunction = value;
        };
        var getKeyInputHandlerFunction = function () {
            return this.keyInputHandlerFunction;
        };
        var setKeyboardInputConsumer = function (value) {
            this.keyboardInputConsumer = value;
        };

        var getKeyboardInputConsumer = function () {
            return this.keyboardInputConsumer;
        };
        var getPasswordInputElement = function () {
            return passwordElement;
        };
        var getDefaultInputElement = function () {
            return defaultInputElement;
        };
        var getNumericInputElement = function () {
            return numericInputElement;
        };
        var createInputElements = function () {
            passwordElement = document.createElement("input");
            passwordElement.type = "password";
            passwordElement.style.cssText = "position:absolute; left:-1px; top: -1px; width:1px; height:1px; opacity:0";

            defaultInputElement = document.createElement("input");
            defaultInputElement.type = "text";
            defaultInputElement.style.cssText = "position:absolute; left:-1px; top: -1px; width:1px; height:1px; opacity:0";

            numericInputElement = document.createElement("input");
            numericInputElement.type = "number";
            numericInputElement.style.cssText = "position:absolute; left:-1px; top: -1px; width:1px; height:1px; opacity:0";

            // Append now or upon request
            //document.body.appendChild(input);
        };

        var initializeLobbyConnection = function () {
            console.log("Creating lobby connection here ********** ");
//             return;

            var configuration = new Configuration();
//            configuration.setServerAddress("welcome.ace2three.com"); //Live
//            configuration.setServerAddress("10.0.21.3"); //Dev
            configuration.setServerAddress("10.0.20.6"); //QA
            configuration.setServerPort("7789");

            var handlersList = new Array();
            handlersList["ld"] = new LobbyDataHandler();
            handlersList["login"] = new LoginHandler();
            handlersList["update"] = new UpdateChipsHandler();
            handlersList["reload"] = new ReloadHandler();
            handlersList["gu"] = new GuHandler();
            handlersList["pan"] = new PanHandler();
            handlersList["closegamedef"] = new CloseGameDefinitionHandler();
            handlersList["opengamedef"] = new OpenGameDefinitionHandler();
            handlersList["sd"] = new SdHandler();
            handlersList["serverdown"] = new ServerDownHandler();
            handlersList["lack"] = new LackHandler();
            handlersList["acelevel"] = new AceLevelHandler();
            handlersList["ipblock"] = new IpblockHandler();

            handlersList["pseudotopremium"] = new PseudoToPremiumHandler();
            handlersList["deleteplayer"] = new DeletePlayerHandler();
            handlersList["pseudoexpired"] = new PseudoExpiredHandler();
            handlersList["logout"] = new LogoutHandler();

            configuration.setHandlersList(handlersList);
            configuration.setHeartBeatMessage("ping#");
            configuration.setHeartBeatInterval(5);
            configuration.setConnectionTimeout(10);
            configuration.setReadTimeout(30);
            configuration.setReconnectionTimeout(10);
            configuration.setProtocolDelimiter("#");

            var clientListener = new LobbyClientListener();
            var baseClient = new BaseClient(configuration, clientListener);
            clientListener.setCommunicationChannel(baseClient);

            baseClient.start();
            lobbyCommunicator = clientListener;
        };

        var getClientVersion = function () {
            return clientVersion;
        };

        var getClientAPIVersion = function () {
            return clientAPIVersion;
        };

        var setGameWindowsCount = function (value) {
            gameWindowsCount = value;
        };

        var getGameWindowsCount = function () {
            return gameWindowsCount;
        };
        var setGameKey = function (value) {
            gameWindowKeys.push(value);
        };

        var getGameKeys = function () {
            return gameWindowKeys;
        };

        var setSessionId = function (value) {
            sessionId = value;
        };

        var getSessionId = function () {
            return sessionId;
        };

        var setOldSessionId = function (value) {
            oldSessionId = value;
        };

        var getOldSessionId = function () {
            return oldSessionId;
        };

        var getLobbyCommunicator = function () {
            return lobbyCommunicator;
        };

        var getPlay201Collection = function () {
            return play201Collection;
        };

        var getPlay101Collection = function () {
            return play101Collection;
        };

        var getPlayBOXCollection = function () {
            return playBOXCollection;
        };

        var getPlayStakeCollection = function () {
            return playStakeCollection;
        };

        var getReal201Collection = function () {
            return real201Collection;
        };

        var getReal101Collection = function () {
            return real101Collection;
        };

        var getRealBOXCollection = function () {
            return realBOXCollection;
        };

        var getRealStakeCollection = function () {
            return realStakeCollection;
        };

        var createGridCollections = function () {
            play101Collection = new GridCollection();
            play201Collection = new GridCollection();
            playBOXCollection = new GridCollection();
            playStakeCollection = new GridCollection();

            real101Collection = new GridCollection();
            real201Collection = new GridCollection();
            realBOXCollection = new GridCollection();
            realStakeCollection = new GridCollection();
        };
        var setAutoUserName = function (value) {
            autoUserName = value;
        };

        var getAutoUserName = function () {
            return autoUserName;
        };

        var setAutoSessionId = function (value) {
            autoSessionId = value;
        };

        var getAutoSessionId = function () {
            return autoSessionId;
        };

        var setAutoGameType = function (value) {
            autoGameType = value;
        };

        var getAutoGameType = function () {
            return autoGameType;
        };

        var setAutoBet = function (value) {
            autoBet = value;
        };

        var getAutoBet = function () {
            return autoBet;
        };

        var setAutoMaxPlayers = function (value) {
            autoMaxPlayers = value;
        };

        var getAutoMaxPlayers = function () {
            return autoMaxPlayers;
        };

        var setAutoIsPlayGame = function (value) {
            autoIsPlayGame = value;
        };

        var getAutoIsPlayGame = function () {
            return autoIsPlayGame;
        };

        var initServerDetails = function () {
            serverDetails = new ServerDetails();
        };

        var getServerDetails = function () {
            return serverDetails;
        };

        var getPlayer = function () {
            return player;
        };

        function getGameDefinitionByDetails(isPlayGame, gameType, bet, maxPlayers) {
            var gameDefinition;
            console.log("is play game : " + isPlayGame + ",game Type : " + gameType + ", Bet : " + bet + ", max : " + maxPlayers);
            if (isPlayGame === "false") {
                gameDefinition = real101Collection.getGameDefintionByDetails(gameType, bet, maxPlayers);
                if (gameDefinition !== undefined) {
                    return gameDefinition.getDefinitionId();
                } else {
                    gameDefinition = real201Collection.getGameDefintionByDetails(gameType, bet, maxPlayers);
                    if (gameDefinition !== undefined) {
                        return gameDefinition.getDefinitionId();
                    } else {
                        gameDefinition = realBOXCollection.getGameDefintionByDetails(gameType, bet, maxPlayers);
                        if (gameDefinition !== undefined) {
                            return gameDefinition.getDefinitionId();
                        } else {
                            gameDefinition = realStakeCollection.getGameDefintionByDetails(gameType, bet, maxPlayers);
                            if (gameDefinition !== undefined) {
                                return gameDefinition.getDefinitionId();
                            }
                        }
                    }
                }

            } else if (isPlayGame === "true") {
                console.log("Entered in play>>>>>>");
                gameDefinition = play101Collection.getGameDefintionByDetails(gameType, bet, maxPlayers);
                if (gameDefinition !== undefined) {
                    return gameDefinition.getDefinitionId();
                } else {
                    gameDefinition = play201Collection.getGameDefintionByDetails(gameType, bet, maxPlayers);
                    if (gameDefinition !== undefined) {
                        return gameDefinition.getDefinitionId();
                    } else {
                        gameDefinition = playBOXCollection.getGameDefintionByDetails(gameType, bet, maxPlayers);
                        if (gameDefinition !== undefined) {
                            return gameDefinition.getDefinitionId();
                        } else {
                            gameDefinition = playStakeCollection.getGameDefintionByDetails(gameType, bet, maxPlayers);
                            if (gameDefinition !== undefined) {
                                return gameDefinition.getDefinitionId();
                            }
                        }
                    }
                }
            }

            return undefined;
        }
        function getGameDefinition(definitionId) {
            var gameDefinition;
            gameDefinition = real201Collection.getGameDefinition(definitionId);
            if (gameDefinition !== undefined) {
                return gameDefinition;
            } else {
                gameDefinition = real101Collection.getGameDefinition(definitionId);
                if (gameDefinition !== undefined) {
                    return gameDefinition;
                } else {
                    gameDefinition = realBOXCollection.getGameDefinition(definitionId);
                    if (gameDefinition !== undefined) {
                        return gameDefinition;
                    } else {
                        gameDefinition = realStakeCollection.getGameDefinition(definitionId);
                        if (gameDefinition !== undefined) {
                            return gameDefinition;
                        } else {
                            gameDefinition = play201Collection.getGameDefinition(definitionId);
                            if (gameDefinition !== undefined) {
                                return gameDefinition;
                            } else {
                                gameDefinition = play101Collection.getGameDefinition(definitionId);
                                if (gameDefinition !== undefined) {
                                    return gameDefinition;
                                } else {
                                    gameDefinition = playBOXCollection.getGameDefinition(definitionId);
                                    if (gameDefinition !== undefined) {
                                        return gameDefinition;
                                    } else {
                                        gameDefinition = playStakeCollection.getGameDefinition(definitionId);
                                        if (gameDefinition !== undefined) {
                                            return gameDefinition;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return undefined;
        }

        var loadStyles = function () {
            styleManager = ModernThemeManager.getModernThemeInstance().
                    loadModernThemeXML(this.game.cache.getXML("ModernTheme"));
        };

        //new additions related to Mobile Game Contexts @yashwanth
        //new additions are to be made always above init method @Kanthi
        var getMGameContext = function (mGameContextId) {
            return mGameContexts[mGameContextId];
        };

        var setMGameContext = function (mGameContextId, mGameContext) {
            mGameContexts[mGameContextId] = mGameContext;
        };

        var getStyleInstanceByName = function (styleName) {
            return styleManager[styleName];
        };

        var loadGameAlertStates = function () {
            alertStates = GameAlertStateManager.getAlertStateInstance().
                    loadGameAlertStates(this.game.cache.getXML("MGameAlertStates"));
        };

        var getMGameAlertStateByName = function (stateName) {
            return alertStates[stateName];
        };

        var getCardFrameBySource = function (source) {
            return cardSourceMappings[source];
        };

        var createCardSourceMappings = function () {
            var source;
            var cardIndex = 1;

            //cards in sprite sheet, start count 0, end count 53, total 54 cards

            for (var index = 0; index <= 54; index++) {
                if (index >= 0 && index <= 12) { //Clubs
                    source = "c";
                    cardSourceMappings[source + cardIndex] = index;
                    cardIndex++;
                } else if (index > 12 && index <= 25) { //Diamonds
                    if (index === 13)
                        cardIndex = 1;
                    source = "d";
                    cardSourceMappings[source + cardIndex] = index;
                    cardIndex++;
                } else if (index > 25 && index <= 38) { //Hearts
                    if (index === 26)
                        cardIndex = 1;
                    source = "h";
                    cardSourceMappings[source + cardIndex] = index;
                    cardIndex++;
                } else if (index > 38 && index <= 51) { //Spades
                    if (index === 39)
                        cardIndex = 1;
                    source = "s";
                    cardSourceMappings[source + cardIndex] = index;
                    cardIndex++;
                } else if (index === 52) { //Jokers jr and jb
                    cardSourceMappings["jb"] = 52;
                    cardIndex++;
                } else if (index === 53) {
                    cardSourceMappings["jr"] = 53;
                    cardIndex++;
                }
                else if( index === 54 ){
                    cardSourceMappings["empty"] = 54;
                    cardIndex++;
                }

            }
            console.log("Final cardsource mapping -------- ", cardSourceMappings);
        };


        var init = function () {
            createInputElements();
            createGridCollections();
            initServerDetails();
            loadStyles();
            loadGameAlertStates();
            createCardSourceMappings();
            player = Player.getPlayerInstance();

        };
        init();

        return{
            setKeyInputHandlerFunction: setKeyInputHandlerFunction,
            getKeyInputHandlerFunction: getKeyInputHandlerFunction,
            setKeyboardInputConsumer: setKeyboardInputConsumer,
            getKeyboardInputConsumer: getKeyboardInputConsumer,
            getDefaultInputElement: getDefaultInputElement,
            getPasswordInputElement: getPasswordInputElement,
            getNumericInputElement: getNumericInputElement,
            initializeLobbyConnection: initializeLobbyConnection,
            getLobbyCommunicator: getLobbyCommunicator,
            getClientVersion: getClientVersion,
            getClientAPIVersion: getClientAPIVersion,
            setSessionId: setSessionId,
            getSessionId: getSessionId,
            setOldSessionId: setOldSessionId,
            getOldSessionId: getOldSessionId,
            getReal201Collection: getReal201Collection,
            getReal101Collection: getReal101Collection,
            getRealStakeCollection: getRealStakeCollection,
            getRealBOXCollection: getRealBOXCollection,
            getPlay201Collection: getPlay201Collection,
            getPlay101Collection: getPlay101Collection,
            getPlayStakeCollection: getPlayStakeCollection,
            getPlayBOXCollection: getPlayBOXCollection,
            getGameDefinition: getGameDefinition,
            getGameDefinitionByDetails: getGameDefinitionByDetails,
            getServerDetails: getServerDetails,
            getPlayer: getPlayer,
            getMGameContext: getMGameContext,
            setMGameContext: setMGameContext,
            getStyleInstanceByName: getStyleInstanceByName,
            getMGameAlertStateByName: getMGameAlertStateByName,
            getCardFrameBySource: getCardFrameBySource,
            setGameWindowsCount: setGameWindowsCount,
            getGameWindowsCount: getGameWindowsCount,
            getGameKeys: getGameKeys,
            setGameKey: setGameKey,
            setAutoUserName: setAutoUserName,
            getAutoUserName: getAutoUserName,
            setAutoSessionId: setAutoSessionId,
            getAutoSessionId: getAutoSessionId,
            setAutoGameType: setAutoGameType,
            getAutoGameType: getAutoGameType,
            setAutoBet: setAutoBet,
            getAutoBet: getAutoBet,
            setAutoMaxPlayers: setAutoMaxPlayers,
            getAutoMaxPlayers: getAutoMaxPlayers,
            setAutoIsPlayGame: setAutoIsPlayGame,
            getAutoIsPlayGame: getAutoIsPlayGame

        };
    };
    return{
        getContextInstance: function () {
            if (!contextInstance) {
                contextInstance = init();
            }
            return contextInstance;
        }
    };
})();
