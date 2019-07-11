/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


ClientListener = function(){
    console.log("Inside constructor");
};


function onClientConnect(){
    //sub class implementation required for onClientConnect   
    console.log("On client connect of super method ");
}
/*
@param {isACleanClose} specifies if the client socket is 
closed with a clean handshake from the peer
{true} --- Clean close
{false} --- Abrupt close
*/
function onClientDisconnect(isACleanClose){
//  Return true to attempt reconnection;
    console.log("Inside super class client listener ");
}

function onClientReconnect(){
    console.log("On client reconnect");
}

function onReadTimedout(){
    
}

function onConnectTimeout(){
    
}

function setCommunicationChannel(value){
    this.communicationChannel = value;
}


function getCommunicationChannel(){
    return this.communicationChannel;
}

function startHeartbeat(){
    this.getCommunicationChannel().startHeartbeat();
}

function resetHeartbeat(){
    this.getCommunicationChannel().resetHeartbeat();
}

function setHeartbeatGapCount(value){
    
}

function validateListeners(){
    var toBeImplemented = [EVENT_ON_CLIENT_CONNECT,EVENT_ON_CLIENT_DISCONNECT,EVENT_ON_CLIENT_READ_TIMED_OUT,EVENT_ON_CLIENT_CONNECT_TIME_OUT,EVENT_ON_CLIENT_RE_CONNECT];
    for(var key in toBeImplemented){
        var toBeImplementedFunctionName = toBeImplemented[key];
        function checkFunctionImplementation(toBeImplementedFunctionName){
            for(var functionKey in ClientListener.prototype){
                if(typeof ClientListener.prototype[functionKey] === "function"){
                    if(functionKey !== "constructor" && functionKey !== "validateListeners"){
                        if(toBeImplementedFunctionName === functionKey){
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        var isFunctionImplemented = checkFunctionImplementation(toBeImplementedFunctionName);
        if(!isFunctionImplemented){
            throw new Error("Found no implementation for "+toBeImplementedFunctionName);
        }
    }
    return true;
}

ClientListener.prototype = Object.create(Object.prototype);
ClientListener.prototype.constructor = ClientListener;
ClientListener.prototype.validateListeners = validateListeners;
ClientListener.prototype.onClientConnect = onClientConnect;
ClientListener.prototype.onClientDisconnect = onClientDisconnect;
ClientListener.prototype.onClientReconnect = onClientReconnect;
ClientListener.prototype.onReadTimedout = onReadTimedout;
ClientListener.prototype.onConnectTimeout = onConnectTimeout;
ClientListener.prototype.startHeartbeat = startHeartbeat;
ClientListener.prototype.resetHeartbeat = resetHeartbeat;
ClientListener.prototype.setCommunicationChannel = setCommunicationChannel;
ClientListener.prototype.getCommunicationChannel = getCommunicationChannel;
ClientListener.prototype.setHeartbeatGapCount = setHeartbeatGapCount;