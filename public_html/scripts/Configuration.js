/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Constants go here

var SERVER_ADDRESS_FUNCTION = "getServerAddress";
var SERVER_PORT_FUNCTION = "getServerPort";
var SERVER_HEART_BEAT_MESSAGE_FUNCTION = "getHeartBeatMessage";
var SERVER_HEART_BEAT_INTERVAL_FUNCTION = "getHeartBeatInterval";
var SERVER_CONNECTION_TIME_OUT_FUNCTION = "getConnectionTimeout";
var SERVER_READ_TIMEDOUT_FUNCTION = "getReadTimeout";
var SERVER_HANDLERS_LIST_FUNCTION = "getHandlersList";
var SERVER_HANDLERS_FUNCTION = "getHandlers";
var CLIENT_RECONNECTION_INTERVAL_FUNCTION = "getReconnectionTimeout";
var CLIENT_PROTOCOL_DELIMITER_FUNCTION = "getProtocolDelimiter";
var EVENT_ON_CLIENT_CONNECT = "onClientConnect";
var EVENT_ON_CLIENT_DISCONNECT = "onClientDisconnect";
var EVENT_ON_CLIENT_READ_TIMED_OUT = "onReadTimedout";
var EVENT_ON_CLIENT_CONNECT_TIME_OUT = "onConnectTimeout";
var EVENT_ON_CLIENT_RE_CONNECT = "onClientReConnect";
var CLIENT_INACTIVE_TIMEOUT_FUNCTION = "getClientInactiveTimeout";


// End constants

Configuration = function(){
    
};

function setServerAddress(value){
   this.serverAddress = value; 
}

function getServerAddress(){
    return this.serverAddress;
}

function setServerPort(value){
    this.serverPort = value;
}

function getServerPort(){
    return this.serverPort;
}

function setHandlersList(value){
    this.handlersList = value;
}

function getHandlersList(){
    return this.handlersList;
}

function setHandlers(value){
    this.handlers = value;
}

function getHandlers(){
    return this.handlers;
}

function setHeartBeatMessage(value){
    this.heartBeatMessage = value;
}

function getHeartBeatMessage(){
    return this.heartBeatMessage;
}

function setHeartBeatInterval(value){
    this.heartBeatInterval = value;
}

function getHeartBeatInterval(){
    return this.heartBeatInterval;
}

function setConnectionTimeout(value){
    this.connectionTimeOut = value;
}

function getConnectionTimeout(){
    return this.connectionTimeOut;
}

function setReadTimeout(value){
    this.readTimeOut = value;
}

function getReadTimeout(){
    return this.readTimeOut;
}

function setReconnectionTimeout(value){
    this.reconnectionAttemptInterval = value;
}

function getReconnectionTimeout(){
    return this.reconnectionAttemptInterval;
}


function setProtocolDelimiter(value){
    this.protocolDelimiter = value;
}

function getProtocolDelimiter(){
    return this.protocolDelimiter;
}


function setClientInactiveTimeout(value){
    this.clientInactiveTimeout = value;
}


function getClientInactiveTimeout(){
    return this.clientInactiveTimeout;
}

function setLobbyScope(value){
   this.lobbyScope = value; 
}

function getLobbyScope(){
   return this.lobbyScope; 
}

function setLobbyModel(value){
    this.lobbyModel = value;
}

function getLobbyModel(){
    return this.lobbyModel;
}


function validateConfiguration(){
    for(var key in this){
        if( typeof this[key] === "function" ){
            if( key !== "constructor" ){
                key = key.toString();
                if(key.indexOf("set") === -1 && key.indexOf("get") === 0 ){                   
                    if( key === SERVER_ADDRESS_FUNCTION){
                        var serverAddress = Configuration.prototype[key].call(this);
                        if(serverAddress === undefined){
                            throw new Error("Server Address cannot be undefined");
                        }
                    }
                    else if( key === SERVER_PORT_FUNCTION ){
                        var serverPort = Configuration.prototype[key].call(this);
                        if( serverPort === undefined ){
                            throw new Error("Server Port cannot be undefined");
                        }
                    }
                    else if( key === SERVER_HEART_BEAT_MESSAGE_FUNCTION ){
                        var heartBeatMessage = Configuration.prototype[key].call(this);
                        if( heartBeatMessage === undefined ){
                            throw new Error("Heart beat message cannot be undefined");
                        }
                    }
                    else if( key === SERVER_HEART_BEAT_INTERVAL_FUNCTION ){
                        var heartBeatInterval = Configuration.prototype[key].call(this);
                        if( heartBeatInterval === undefined ){
                            throw new Error("Heart beat interval cannot be undefined");
                        }
                    }
                    else if( key === SERVER_CONNECTION_TIME_OUT_FUNCTION ){
                        var connectionTimeOut = Configuration.prototype[key].call(this);
                        if( connectionTimeOut === undefined ){
                            throw new Error("Connection timeout cannot be undefined");
                        }
                    }
                    
                    else if( key === SERVER_READ_TIMEDOUT_FUNCTION ){
                        var readTimeOut = Configuration.prototype[key].call(this);
                        if( readTimeOut === undefined ){
                            throw new Error("Readtime out cannot be undefined");
                        }
                    }
                    else if( key === CLIENT_RECONNECTION_INTERVAL_FUNCTION ){
                        var reconnectionInterval = Configuration.prototype[key].call(this);
                        if(reconnectionInterval === undefined){
                            throw new Error("Reconnection interval cannot be undefined");
                        }
                    }
                    else if( key === CLIENT_PROTOCOL_DELIMITER_FUNCTION ){
                        var protocoloDelimiter = Configuration.prototype[key].call(this);
                        if( protocoloDelimiter === undefined ){
                            throw new Error("Protocol delimiter cannot be undefined");
                        }
                    }
//                    else if( key === CLIENT_INACTIVE_TIMEOUT_FUNCTION ){
//                        var clientInactiveTimeout = Configuration.prototype[key].call(this);
//                        if( clientInactiveTimeout === undefined ){
//                            throw new Error("Client inactive time out cannot be undefined and must be specified in minutes ");
//                        }
//                    }
                    else if( key === SERVER_HANDLERS_FUNCTION ){
                        var handlersList = Configuration.prototype[key].call(this);
                        if( handlersList === undefined ){
                            throw new Error("Handlers list cannot be undefined ");
                        }else{                                  
                            if((handlersList instanceof Object)){                                
                                if(Object.keys(handlersList).length === 0 ){
                                   throw new Error("Handlers list cannot be empty");                                    
                                }                                
                            }else{
                                throw new Error("Handlers list is not an array");
                            }
                        }
                    }
                }
            }
        }
    }
    return true;
}

Configuration.prototype = Object.create(Object.prototype);
Configuration.prototype.constructor = Configuration;
Configuration.prototype.setServerAddress = setServerAddress;
Configuration.prototype.getServerAddress = getServerAddress;
Configuration.prototype.setServerPort = setServerPort;
Configuration.prototype.getServerPort = getServerPort;
Configuration.prototype.setHandlersList = setHandlersList;
Configuration.prototype.getHandlersList = getHandlersList;
Configuration.prototype.setHandlers = setHandlers;
Configuration.prototype.getHandlers = getHandlers;
Configuration.prototype.setHeartBeatMessage = setHeartBeatMessage;
Configuration.prototype.getHeartBeatMessage = getHeartBeatMessage;
Configuration.prototype.setHeartBeatInterval = setHeartBeatInterval;
Configuration.prototype.getHeartBeatInterval = getHeartBeatInterval;
Configuration.prototype.setConnectionTimeout = setConnectionTimeout;
Configuration.prototype.getConnectionTimeout = getConnectionTimeout;
Configuration.prototype.setReadTimeout = setReadTimeout;
Configuration.prototype.getReadTimeout = getReadTimeout;
Configuration.prototype.setReconnectionTimeout = setReconnectionTimeout;
Configuration.prototype.getReconnectionTimeout = getReconnectionTimeout;
Configuration.prototype.setProtocolDelimiter = setProtocolDelimiter;
Configuration.prototype.getProtocolDelimiter = getProtocolDelimiter;
/*Configuration.prototype.setIdleTimeout = setIdleTimeout;
Configuration.prototype.getIdleTimeout = getIdleTimeout;*/
Configuration.prototype.setClientInactiveTimeout = setClientInactiveTimeout;
Configuration.prototype.getClientInactiveTimeout = getClientInactiveTimeout;
Configuration.prototype.validateConfiguration = validateConfiguration;
Configuration.prototype.setLobbyScope = setLobbyScope;
Configuration.prototype.getLobbyScope = getLobbyScope;
Configuration.prototype.setLobbyModel = setLobbyModel;
Configuration.prototype.getLobbyModel = getLobbyModel;



