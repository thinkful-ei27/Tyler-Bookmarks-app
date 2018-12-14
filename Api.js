'use strict';
const Api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tyler/bookmarks';

  
  
 
  
  function addBookmarktoServer(jsonobject, onSuccess, onError){
    $.ajax({
      url:BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: jsonobject,
      success: onSuccess,
      error: onError
    });
  }

  const getBookmarkData = function(callback){
    $.ajax({
      url: BASE_URL,
      method: 'GET',
      success: callback
    });
  };

  const deleteItem = function(id, callback){
    $.ajax({
      url: BASE_URL+'/'+id,
      method: 'DELETE',
      success: callback,
    });
  };
  

  //   const populateStore = function(callback) {
  //     $.getJSON(BASE_URL, response => {
  //         callback(response);
  //       });
      
  //   };
  
  //   const deleteItem = function()
  
 


  return{
    deleteItem,
    getBookmarkData,
    // populateStore,
    addBookmarktoServer
  };


}());