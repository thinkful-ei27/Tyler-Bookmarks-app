'use strict';
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tyler/bookmarks';
const Store = (function() {

  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
  };

  



  return{
    bookmarks: [],
    addingBookmark: false,
    errorMessage: '',
    filterValue: 1,
    addBookmark
    
  };

}());