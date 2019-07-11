/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

LobbyListener = function(){    
    alert("here");
}

LobbyListener.prototype.onClientConnect = function(){
    alert(this.communicationChannel)
}

LobbyListener.prototype = new ClientListener();
LobbyListener.prototype.constructor = LobbyListener;