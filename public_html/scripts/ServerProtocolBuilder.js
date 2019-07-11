/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var serverProtocolBuilder = angular.module('server_protocols',[]);

function ServerProtocolBuilder(){
   var builder = {};
   builder.setCommunicationChannel = function(communicationChannel){
       builder.communicationChannel = communicationChannel;
   };
   builder.gp = function(id,gameTypeCode){
       builder.communicationChannel.sendMessage("gp#"+id+":"+gameTypeCode);
   };
   builder.TTimings = function(id){
       builder.communicationChannel.sendMessage("TTimings#"+id);
   };
   builder.login = function(userid,password){
       builder.communicationChannel.sendMessage("Login#userid:"+userid+",password:"+password);
   };
   builder.lack = function(){
       builder.communicationChannel.sendMessage("lack#");
   }
   return builder;
    
}

serverProtocolBuilder.factory('serverProtocolBuilder', [ServerProtocolBuilder]);


