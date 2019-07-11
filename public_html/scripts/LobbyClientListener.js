/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global ClientListener */

LobbyClientListener = function () {
    ClientListener.call(this);
};

function onClientConnect() {
    ClientListener.prototype.onClientConnect.call(this);
    console.log("Inside onclient connect");
//    this.getCommunicationChannel().sendMessage("Connect#type:aps,ucid:NA");
    this.getCommunicationChannel().sendMessage("Connect#type:nd,ucid:NA");// ndh5, mnd, macnd (mobile, android, mac) ND.
    //this.getCommunicationChannel().sendMessage("Connect#type:gps,ucid:NA");
    this.getCommunicationChannel().startHeartbeat();
}

function onClientDisconnect() {
    console.log("Inside child class ");
    ClientListener.prototype.onClientDisconnect.call(this);
    return true; //reconnection is initiated only if true is returned
}

function onClientReconnect() {
    console.log("Client reconnected inside lobby client listener " + ApplicationContext.getContextInstance().getOldSessionId());
    var context = ApplicationContext.getContextInstance();
    var oldSession = context.getOldSessionId();
    if (oldSession) {
        this.getCommunicationChannel().sendMessage("Connect#type:ng,ucid:NA,sid:" + ApplicationContext.getContextInstance().getSessionId() + ",osid:" + ApplicationContext.getContextInstance().getOldSessionId());
    } else {
        this.getCommunicationChannel().sendMessage("Connect#type:nd,ucid:NA,sid:" + ApplicationContext.getContextInstance().getSessionId());
    }

    this.getCommunicationChannel().startHeartbeat();
}

function onReadTimedout() {
//    this.getCommunicationChannel().resetHeartbeat();
}

//function setSessionId(value) {
//    this.sessionId = value;
//}
//
//function getSessionId() {
//    return this.sessionId;
//}
//
//function setOldSessionId(value) {
//    this.oldSessionId = value;
//}
//
//function getOldSessionId() {
//    return this.oldSessionId;
//}

LobbyClientListener.prototype = Object.create(ClientListener.prototype);
LobbyClientListener.prototype.constructor = LobbyClientListener;

LobbyClientListener.prototype.onClientConnect = onClientConnect;
LobbyClientListener.prototype.onClientDisconnect = onClientDisconnect;
LobbyClientListener.prototype.onReadTimedout = onReadTimedout;
//LobbyClientListener.prototype.setSessionId = setSessionId;
//LobbyClientListener.prototype.getSessionId = getSessionId;
//LobbyClientListener.prototype.setOldSessionId = setOldSessionId;
//LobbyClientListener.prototype.getOldSessionId = getOldSessionId;
LobbyClientListener.prototype.onClientReconnect = onClientReconnect;