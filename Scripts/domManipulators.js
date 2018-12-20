'use strict';
const DomManipulators = (function(){

  function serverError(error) {
    let message = '';
    if (error.responseJSON && error.responseJSON.message) {
      message = error.responseJSON.message;
    } else {
      message = `${error.code}: Server Error`;
    }

    return `
      <section class="error-content">
        <p>Uh oh! Something's Wrong!</p>
        <button id="cancel-error">Clear Error</button>
        <p>${message}</p>
      </section>`;
    
  }

  const addUserForm = function(){
    $('.js-bookmark-adder').on('click', (event => {
      event.preventDefault();
      console.log('youre clicking add a bookmark');
      Store.addingBookmark = !Store.addingBookmark;
      $('.bookmark-staging-area').html(`
          <form action = "" class = "add-a-bookmark">
          <fieldset class="add-bookmark-fields">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" class = "new-title">
            <label for="url">URL</label>
            <input type="url" name="url" id="url" class = "new-url">
            <label for="description">Description</label>
            <input type="text" name="desc" id="description" class ="new-desc"></input>
            <label for="rating">Rating</label>
            <input type="number" name="rating" id="rating" class = "new-rating" value = 1 min = 1 max = 5 >
            <button type="submit">Add Bookmark</button>
          </fieldset>
          </form>`);
      
    }

    ));
  };

    
  
  
  const handleFilterClick = function(){
    $('.js-filter').on('click', (event => {
      event.preventDefault();
      console.log('you have targeted the filter button');
      let filterval = $('#sort-selector').val();
      Store.filterValue = filterval;
      console.log(filterval);
      render();
    }));
  };

  const generateHtml = function(bookmark){
    if(!bookmark.expanded){
      return  `<div style="border: 1px solid black;">
                <header>${bookmark.title}</header>
                <p>Rating: ${bookmark.rating}</p>
                <label for = "expand"></label>
                <input type="button" id ="expand" class = "expand" value = "expand" data-item-id = ${bookmark.id}>
                <div class = "js-expanded-placeholder">
                </div>
                </div>`;}
    if(bookmark.expanded){
      return `<div>
      <header>${bookmark.title}</header>
      <p>Rating: ${bookmark.rating}</p>
      <label for = "expand"></label>
      <input type="button" id ="expand" class = "expand" value = "collapse" data-item-id = ${bookmark.id}>
      <p>${bookmark.desc}</p>
      <label for = "delete"></label>
      <input type ="button" id ="delete" class = "js-delete" value = "delete" data-item-id = ${bookmark.id}>
      <a target="_blank" href="${bookmark.url}">Visit Site</a>
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

  function closeError() {
    $('.js-error-stage').on('click', '#cancel-error', () => {
      Store.setError(null);
      render();
    });
  }

  const render = function(){
    if (Store.errorMessage) {
      const someError = serverError(Store.errorMessage);
      $('.js-error-stage').html(someError);
    } else {
      $('.js-error-stage').empty();
    }

    let items = Store.bookmarks;

    if(Store.filterValue){
      items = Store.bookmarks.filter(item => item.rating >= Store.filterValue);
    }
    
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

  const handleSubmitNew = function(){ //this function sends the userform input to the server
    $('.bookmark-staging-area').submit(event => {
      event.preventDefault();
      
     

      const userjson = $(event.target).serializeJson();
      console.log(userjson);
      Api.addBookmarktoServer(userjson, function(response){
        console.log(response);
        response.expanded = false;
        Store.addItem(response);
        Store.addingBookmark = !Store.addingBookmark;
        $('.bookmark-staging-area').html('');
        render();
      }, (error) => {
        Store.setError(error);
        render();
      });
        
      
    });
    render();
  }; 
    
  function handleItAll(){
    handleExpandedClick();
    handleDeleteClick();
    handleFilterClick();
    closeError();
    handleSubmitNew();
    addUserForm();
  }
    
  
  

 
  

  return{
    handleItAll,
    render
  };




}());