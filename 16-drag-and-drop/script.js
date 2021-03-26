const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];
let columnLists = [backlogList, progressList, completeList, onHoldList];


// Drag Functionality


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  listArrays.forEach((item, index)=> {
    localStorage.setItem(`${arrayNames[index]}Items`, JSON.stringify(item));
  });
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  if(!updatedOnLoad) getSavedColumns();
  //loop through each list.
  columnLists.forEach((listItem) => {
    listItem.textContent = '';
  });

  // Backlog Column
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(columnLists[0], 0, backlogItem, index);
  });
  // Progress Column
  progressListArray.forEach((progressItem, index) => {
    createItemEl(columnLists[1], 1, progressItem, index);
  });
  // Complete Column
  completeListArray.forEach((completeItem, index) => {
    createItemEl(columnLists[2], 2, completeItem, index);
  });
  // On Hold Column
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(columnLists[3], 3, onHoldItem, index);
  });

}

updateDOM();