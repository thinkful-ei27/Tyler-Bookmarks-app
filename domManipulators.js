'use strict';
const DomManipulators = (function(){

  const addUserForm = function(){
    $('.js-bookmark-control').submit(event => {
      event.preventDefault();
      console.log('youre clicking add a bookmark');
      Store.addingBookmark = !Store.addingBookmark;
      $('div.bookmark-staging-area').html(`
          <form action = "" class = "add-a-bookmark">
          <fieldset class="add-bookmark-fields">
            <label for="title">Title</label>
            <input type="text" name="title" id="title">
            <label for="url">URL</label>
            <input type="url" name="url" id="url">
            <label for="description">Description</label>
            <textarea name="desc" id="description"></textarea>
            <label for="rating">Rating</label>
            <input type="number" name="rating" id="rating">
            <button type="submit">Add Bookmark</button>
          </fieldset>
          </form>`);
    });
  };
   

  const generateHtml = function(bookmark){
    if(bookmark.expanded === false){
      return  `<div style="border: 1px solid black;">
                <header>${bookmark.title}</header>
                <p>${bookmark.rating}</p>
                <label for = "expand">Expand</label>
                <input type="button" id ="expand" class = "expand" data-item-id = ${bookmark.id}>
                <div class = "js-expanded-placeholder">
                </div>
                </div>`;}
    else if(bookmark.expanded === true){
      return `<div style="border: 1px solid black;">
      <header>${bookmark.title}</header>
      <p>${bookmark.rating}</p>
      <label for = "expand">Expand</label>
      <input type="button" id ="expand" class = "expand" data-item-id = ${bookmark.id}>
      <p>${bookmark.desc}</p>
      <label for = "delete">Delete Bookmark</label>
      <input type ="button" id ="delete" class = "js-delete" data-item-id = ${bookmark.id}>
      <label for = "visit">Visit Site</label>
      <input type = "button" id = "visit">
      </div>`;
    }
  };

  function getItemIdFromElement(item) {
    return $(item)
      .closest('input')
      .data('item-id');
  }

  const handleExpandedClick = function(){
    $('.js-bookmark-list').on('click', '.expand', function(event){
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);
      console.log('you are still clicking expand');
      const item = Store.findById(id);
      item.expanded = !item.expanded;
      render();
    });
  };              
  
  const handleDeleteClick = function(){
    $('.js-bookmark-list').on('click', '.js-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      console.log('you clicked delete');
      Api.deleteItem(id, function(){
        Store.findAndDelete(id);
        render();
      });
    });
  };

  const render = function(){
    let items = Store.bookmarks;
    const bookmarksString = generateString(items);
    $('.js-bookmark-list').html(bookmarksString);
  };
  
  function generateString(bookmarks) {
    const items = bookmarks.map((item) => generateHtml(item));
    return items.join('');       
  }

  $.fn.extend({
    serializeJson: function () {
      const formData = new FormData(this[0]);
      const jsonObj = {};
      formData.forEach((val, key) => {
        jsonObj[key] = val;
      });
      return JSON.stringify(jsonObj);
    }
  });

  const captureInput = function(){ //this function sends the userform input to the server
    $('.bookmark-staging-area').submit(event => {
      event.preventDefault();
      const userjson = $(event.target).serializeJson();
      console.log(userjson);
      Api.addBookmarktoServer(userjson, testSuccess, testError); 
      render();
    });
    
  };
  const testSuccess = function(){console.log('something worked');};
  const testError = function(){console.log('something is wrong');};

 
  

  return{
    addUserForm,
    render,
    captureInput,
    handleExpandedClick,
    handleDeleteClick

  };




}());