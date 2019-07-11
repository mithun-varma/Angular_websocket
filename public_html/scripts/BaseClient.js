/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

BaseClient = function (configuration, clientListener) {
    if (configuration === undefined) {
        throw new Error("No configuration found");
    }

    if (clientListener === undefined) {
        throw new Error("No listener found");
    }
    this.configuration = configuration;
    this.clientListener = clientListener;
    this.eventListeners = new Array();
    this.isConnected = false;
    this.isConnecting = false;
    this.inReconnectionMode = false;
    this.heartBeatHandle = undefined;
    this.isHeartbeatReceived = false;
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
//    document.addEventListener(visibilityChange, handleVisibilityChange.bind(this));
    console.log("Values for pagevisibility " + hidden + " ---- " + visibilityChange);
};

function handleVisibilityChange() {
    var value = document.hidden;
    if (value === true) {//document is hidden
        this.sleep();
    } else {
        this.wakeUp();
    }
}

function start() {
    var flag = this.configuration.validateConfiguration();
//    if(flag === true){
//       flag = this.clientListener.validateListeners();
//    }
    if (flag) {
        this.createConnection();
    }
}

function createConnection() {
    try {   
        this.isConnecting = true;
        console.log("Creating new connection here " + this.configuration.getServerAddress() + " --- " + this.configuration.getServerPort());
        var openProtocol = this.configuration.getServerAddress() + ":" + this.configuration.getServerPort();
        this.webSocket = new WebSocket("ws://" + openProtocol + "/websocket");
        this.webSocket.onopen = onConnect.bind(this);
        this.webSocket.onclose = onClose.bind(this);
        this.webSocket.onerror = onError.bind(this);
        this.webSocket.onmessage = onMessage.bind(this);

        if (this.connectionTimeoutHandle === undefined && this.inReconnectionMode === false) {
            this.connectionTimeoutHandle = setTimeout(onConnectionTimeout.bind(this), this.configuration.getConnectionTimeout() * 1000);
        } else if (this.inReconnectionMode) {
            if (this.reconnectionTimeoutHandle === undefined) {
                this.reconnectionTimeoutHandle = setTimeout(reconnectionTimeout.bind(this), this.configuration.getReconnectionTimeout() * 1000);
                console.log("trying reconnection");
            }
        } else {
            //Waring Message
        }
    } catch (error) {
        console.log("Error while attempting connection " + error);
    }


}

function onConnect(event) {
    /*if(this.webSocket === null){
     this.doCleanUp();
     this.createConnection();
     return;
     }*/
    this.isConnected = true;
    try {
        if (this.webSocket !== event.target) {
            this.doCleanUp();
            this.createConnection();
            return;
        }
        var clientListener = this.clientListener;
        //use same method
        if (this.inReconnectionMode === true) {
            clientListener.onClientReconnect();
        } else {
            clientListener.onClientConnect();
        }

        console.log("Client listenr ", clientListener);

    } catch (error) {
        console.log("On Connect error " + error);
    } finally {
        //**** clearing time out and nullifying 
        clearTimeout(this.connectionTimeoutHandle);
        this.connectionTimeoutHandle = undefined;
        //

        //***clearing reconnection interval in case of reconnection
        clearInterval(this.reconnectionTimeoutHandle);
        this.reconnectionTimeoutHandle = undefined;
        //
        this.isConnecting = false;
    }
}

function sendHeartBeat() {
    // heartBeatGapCount will be incremented by 1 for every invocation of sendHeartBeat();
    // heartBeatGapCount will be reset to 0 once a heartbeat response is received from server
    var message;
    if (this.isHeartbeatReceived === true) {
        message = this.configuration.getHeartBeatMessage() + "" + this.heartBeatGapCount + ":T";
    } else {
        message = this.configuration.getHeartBeatMessage() + "" + this.heartBeatGapCount + ":F";
    }
    this.sendMessage(message);
    this.isHeartbeatReceived = false;
    this.clientListener.setHeartbeatGapCount(this.heartBeatGapCount);
    this.heartBeatGapCount++;
    console.log("while sending heart beat message " + this.heartBeatGapCount);
    console.log("Read time out count " + (this.heartBeatGapCount * this.configuration.getHeartBeatInterval()));
    var readTimeoutCount = this.heartBeatGapCount * this.configuration.getHeartBeatInterval();
    if (readTimeoutCount === 30) {
        this.clientListener.onReadTimedout();
        this.disconnectClient(null);
    }
}

function onConnectionTimeout() {
    alert("after 10 secs");
    //**** clearing time out and nullifying 
    clearTimeout(this.connectionTimeoutHandle);
    this.connectionTimeoutHandle = undefined;
    //
    if (!this.isConnected) {
        this.doCleanUp();
        this.createConnection();
        console.log("Insibe onConnectionTimeout ******** ");
    }
}

function doCleanUp() {
    try {
        if (this.heartBeatHandle !== undefined) {
            clearInterval(this.heartBeatHandle);
            this.heartBeatHandle = undefined;
        }

        if (this.connectionTimeoutHandle !== undefined) {
            clearTimeout(this.connectionTimeoutHandle);
            this.connectionTimeoutHandle = undefined;
        }
        //Below must be done before cleanup.
        this.webSocket.onopen = function () {
            console.log("In clean up ", this);
            console.log("closing the connection " + this.close());
        };
        this.webSocket.onclose = function () {
        };
        this.webSocket.onmessage = function () {
        };
        this.webSocket.onerror = function () {
        };
        this.isConnecting = false;
        this.isConnected = false;
        console.log("Closing " + this.webSocket.readyState);
        //WebSocket readyState
        //0 ---- Trying to connect
        //1 ---- Open
        //2 ---- Closing
        //3 ---- Closed
        //If we attempt to close the connection while the
        //readyState of the socket is 0 and exception is thrown saying 
        //attempted to close the socket before connecting
        if (this.webSocket.readyState !== 0) {
            this.webSocket.close();
        }
        //Try making websocket undefined
        this.webSocket = null;
    } catch (e) {

    }



}

function onMessage(event) {
    //RegExp implementation required for \n
    //Force protocol delimiter to be implemented in configuration
    var data = event.data;   
    //We are receiving "new line \n" in data, removal is done below
    //
    //Line breaks in text are generally represented in three ways as either \r\n or as \n or \r. 
    //The first type of line break (\r\n) is usually created on a windows computer, 
    //the second (\n) on Linux and 
    //the third kind of line break (\r) on an Apple computer.
    //data = data.replace(/\r?\n|\r/g, ""); //working but not sure whether this removes all 3 types of line breaks
    data = data.replace(/(\r\n|\n|\r)/gm, ""); //removes all 3 types of line breaks
    var protocol = data;
    var details = protocol.split(this.configuration.getProtocolDelimiter());
    var command = details[0];
    command = command.toLowerCase();
    var message = details[1];    
//    var heartBeatMessage = this.configuration.getHeartBeatMessage();
//    if(heartBeatMessage.indexOf("#") >= 0){
//        heartBeatMessage = heartBeatMessage.substring(0,heartBeatMessage.length-1);
//    }
    //Expose startHeartBeat, resetHeartBeat method to client
//    if(command.indexOf(heartBeatMessage) === 0){
//        if(this.heartBeatHandle === undefined){
//            this.heartBeatGapCount = 0;
//            this.heartBeatHandle = setInterval(sendHeartBeat.bind(this),this.configuration.getHeartBeatInterval()*1000);
//        }else{
//            this.heartBeatGapCount--;    
//        }
//    }

    var heartBeatMessage = this.configuration.getHeartBeatMessage();
    if (heartBeatMessage.indexOf("#") >= 0) {
        heartBeatMessage = heartBeatMessage.substring(0, heartBeatMessage.length - 1);
        heartBeatMessage = heartBeatMessage.toLowerCase();
    }
    if (command.indexOf(heartBeatMessage) === 0) {
//        this.heartBeatGapCount--; need to reset the value 
        this.heartBeatGapCount = 0;
        this.isHeartbeatReceived = true;
        console.log("heartBeatMessage : " + heartBeatMessage + ", Command : " + this.heartBeatSentCount);
    }   
    var data = details[1];
    //var handler = this.configuration.getHandlersList()[command];    
    var handler = this.configuration.getHandlers()[command];    
    var date = new Date();    
    if ((typeof handler) !== "undefined") {
        console.log("Message from server " + this.configuration.getServerAddress() + " : " + this.configuration.getServerPort() + " : " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds() + " --- " + command + " --- " + data);        
        handler(message);
    } else {
        console.warn("Handler not found for " + command + " --- " + data);
    }

//    console.log("Message from server " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ---- " + command);
//    handler.execute(data);
//    console.log("handler is "+handler+" command "+command);
//    console.log("On Message "+data);
}

function onError(event) {
    console.log("On Error event ", event);
    //commenting below for now
//    if (this.isConnected) {
//        this.disconnectClient(event);
//    }
}

function onClose(event) {
    console.log("On close event is " + event.wasClean + " is connectec " + this.isConnected);
    if (this.isConnected === true) {
        this.isConnected = false;
        this.isConnecting = false;
        this.inReconnectionMode = false;
        this.disconnectClient(event);
    }
}
function disconnectClient(event) {
    this.doCleanUp();
    this.resetHeartbeat();
    var clientListener = this.clientListener;
    var attemptReconnection;
    if (event) {
        attemptReconnection = clientListener.onClientDisconnect(event.wasClean);
    } else {
        attemptReconnection = clientListener.onClientDisconnect();
    }
    console.log("On disconnect " + attemptReconnection);
    if (attemptReconnection === undefined) {
        console.warn("Client does not attempt reconnection unless specified to do so.Return true from onClientDisconnect to start reconnection");
    }
    if (attemptReconnection) {
        if (this.reconnectionTimeoutHandle === undefined) {
            this.inReconnectionMode = true;
            this.createConnection();
            //       this.doReconnection();
            //       this.reconnectionTimeoutHandle = setInterval(doReconnection.bind(this),this.configuration.getReconnectionAttemptInterval()*1000);
        }
    }
}

function reconnectionTimeout() {
    clearTimeout(this.reconnectionTimeoutHandle);
    this.reconnectionTimeoutHandle = undefined;
    this.doCleanUp();
    this.createConnection();
    console.log("Trying to reconnect ****** ");
    //inform to client 
}

/*function doReconnection(){
 //Pass message here **************
 this.createConnection();
 }*/
function sendMessage(messageToBeSent) {  
    var date = new Date();
    if (this.webSocket) {
        if (this.webSocket.readyState === 1) {
            this.webSocket.send(messageToBeSent + "\n");
            console.log("Sending message to server " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " --- " + messageToBeSent);
        } else {
            console.warn("Websocket cannot send data ready state is : " + this.webSocket.readyState);
        }
    }else{
        console.warn("Websocket is not available "+this.webSocket);
    }

}

function startHeartbeat() {
    if (this.heartBeatHandle === undefined) {
        this.heartBeatGapCount = 0;
        console.log("heartBeatMessage " + this.heartBeatSentCount);
        this.heartBeatHandle = setInterval(sendHeartBeat.bind(this), this.configuration.getHeartBeatInterval() * 1000);
    }
}

function resetHeartbeat() {
    if (this.heartBeatHandle !== undefined) {
        clearInterval(this.heartBeatHandle);
        this.heartBeatHandle = undefined;
    }
    this.heartBeatGapCount = 0;
}



function setSessionId(value) {
    this.sessionId = value;
}

function getSessionId() {
    return this.sessionId;
}

function sleep() {
//    this.closeConnection();
    console.log("Closing connection on device lock");

    this.webSocket.close();
}
function wakeUp() {
    console.log("Waking up the client ");
}

BaseClient.prototype = Object.create(Object.prototype);
BaseClient.prototype.constructor = BaseClient;
BaseClient.prototype.start = start;
BaseClient.prototype.createConnection = createConnection;
BaseClient.prototype.sendMessage = sendMessage;
BaseClient.prototype.disconnectClient = disconnectClient;
BaseClient.prototype.doCleanUp = doCleanUp;
BaseClient.prototype.startHeartbeat = startHeartbeat;
BaseClient.prototype.resetHeartbeat = resetHeartbeat;
BaseClient.prototype.setSessionId = setSessionId;
BaseClient.prototype.getSessionId = getSessionId;
BaseClient.prototype.sleep = sleep;
BaseClient.prototype.wakeUp = wakeUp;


//BaseClient.prototype.validateEventImplementations = validateEventImplementations;

