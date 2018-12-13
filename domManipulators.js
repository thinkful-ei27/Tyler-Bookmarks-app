'use strict';
const DomManipulators = (function(){

  const addUserForm = function(){
    $('.js-bookmark-adder').submit(event => {
      event.preventDefault();
    });

  };

  return{
    addUserForm
  };




}());