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
let draggedItem;
let dragging = false;
let currentColumn;

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

//remove emty items
const filterArray = array => {
 return array.filter(item => item !== null);
};

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.id = index;
  listEl.contentEditable = true;
  listEl.setAttribute('onfocusout', `updateItem(${index},${column})`);
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
  backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressListArray.forEach((progressItem, index) => {
    createItemEl(columnLists[1], 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);
  // Complete Column
  completeListArray.forEach((completeItem, index) => {
    createItemEl(columnLists[2], 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);
  // On Hold Column
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(columnLists[3], 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);
  updatedOnLoad = true;
  updateSavedColumns();
}

//update item or delete if it's blank
const updateItem = (id, column) => {
  const selectedArray = listArrays[column];
  const selectedColumnEl = itemLists[column].children;
  if(!dragging) {
    if(!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
};

const addItemToColumn = column => {
  const text = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(text);
  addItems[column].textContent = '';
  updateDOM();
};

//show add Item input box
const showInputBox= column => {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

//hide add Item input box
const hideInputBox= column => {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addItemToColumn(column);
}

//allows arrays to reflect when drag and drop 
const rebuildArrays = () => {
  backlogListArray = Array.from(backlogList.children).map(el => el.textContent);
  progressListArray = Array.from(progressList.children).map(el => el.textContent);
  completeListArray = Array.from(completeList.children).map(el => el.textContent);
  onHoldListArray = Array.from(onHoldList.children).map(el => el.textContent);
  updateDOM();
};

//when Items start dragging
const drag = e => {
  draggedItem = e.target;
  dragging = true;
};

//when Item enters in a column area
const dragEnter = (column) => {
  itemLists[column].classList.add('over');
  currentColumn = column;
};

//column allows for item to drop
const allowDrop=(e) => {
  e.preventDefault();
};

//dropping Item in Column
const drop=(e) => {
  draggedItem.contentEditable = true;
  e.preventDefault();
  //remove background color and padding
  itemLists.forEach(column => {
    column.classList.remove('over');
  });
  //add item to column
  itemLists[currentColumn].appendChild(draggedItem);
  dragging = false;
  rebuildArrays();
};

updateDOM();