'use strict';

$(document).ready(function() {
  DomManipulators.render();
  DomManipulators.addUserForm();
  DomManipulators.handleSubmitNew();
  DomManipulators.handleExpandedClick();
  DomManipulators.handleDeleteClick();
  Api.getBookmarkData((bookmarks) => {
    bookmarks.forEach((bookmark) => Store.addItem(bookmark));
    bookmarks.forEach((bookmark) => bookmark.expanded = false);
    DomManipulators.render();
  });
});