/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(["./credit","./product"], function(credits,products) {

  console.log("Function : purchaseProduct");

  return {
    purchaseProduct: function() {

      var credit = credits.getCredits();
      if(credit > 0){
        products.reserveProduct();
        return true;
      }
      return false;
    }
  }
});