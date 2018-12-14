'use strict';
const Store = (function() {

  
  
  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const addItem = function(item) {
    this.bookmarks.push(item);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const setError = function(error) {
    this.error = error;
  };
  
  



  return{
    bookmarks: [],
    addingBookmark: false,
    errorMessage: '',
    filterValue: 1,
    
    
    findById,
    addItem,
    findAndDelete,
    setError
  };

}());