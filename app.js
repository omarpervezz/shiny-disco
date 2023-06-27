import { windowsKeys } from "./data.js";


function printShortcuts(){
    const number_content = document.querySelector('.number_content');
    windowsKeys.clrlPlusNum.forEach((key,index) => {
        let contentDiv = document.createElement('div');
        let lastWord = key.split(" ").pop();
        contentDiv.classList.add('key_container', lastWord.toLowerCase())
        contentDiv.innerHTML+= `${index + 1 }: <span class="key__">${key}</span>`;
        number_content.append(contentDiv);


    })
}

// filtering the value based on the user input
function filtering(){
   const searchText = document.getElementById('search__bar');
   const searchContainer = document.getElementById('search_container');
  
   const  close = document.createElement('span');
   close.classList.add('close')
        close.innerText = 'x';
        searchContainer.appendChild(close)
   let valueAdd;
   // get user value from iniput box
   searchText.addEventListener('input', function(e){
    if(e.target.value){
       valueAdd = e.target.value;
       if(valueAdd != '' && valueAdd){
        filterElement(valueAdd.toLowerCase());
        addActiveClass(valueAdd);
        // show the close button if the value is not empty
        close.style.display = 'block';
    }
    }

   })   

}

function filterElement(c){
    const elementKey = document.getElementsByClassName('key_container');
    if(c == 'all') c = "";
    for(let x = 0; x < elementKey.length; x++){
        removeClassRemoveFromElement(elementKey[x], 'show'); // remove the show class from the element
        if(elementKey[x].className.indexOf(c) > -1){ 
            showClassRemoveFromElement(elementKey[x], 'show');
        }
    }
}

// add show class to element
function showClassRemoveFromElement(element, name){
    let i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for(i = 0; i < arr2.length; i++){
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

// remove show class from element
function removeClassRemoveFromElement(element, name){
    let i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for(i = 0; i < arr2.length; i++){
         while(arr1.indexOf("show") > -1){
            arr1.splice(arr1.indexOf(arr2[i]), 1);
         }
    }

    element.className = arr1.join(' ');
}

// clear input from input field
function clearInputBox(){
    const searchText = document.getElementById('search__bar');
    const close = document.querySelector('.close');
      // clear the input element
  close.addEventListener('click', function(){
    if(searchText.value == ''){
        return;
    }else{
        searchText.value = "";
        filterElement('all');
        // hide the close element if there is no search text
        close.style.display = 'none';
        searchText.classList.remove('active_input')
    }
    addActiveClass();
 })
}


const searchText = document.getElementById('search__bar');

searchText.addEventListener('keydown', function(event) {
    const close = document.querySelector('.close');
  if (event.key === 'Backspace') {
    close.style.display = 'none';
    filterElement('all');
    addActiveClass();
    searchText.classList.remove('active_input')
  }
});



function addActiveClass(value){
    const elementKey = document.getElementsByClassName('key_container');
    for(let i = 0; i < elementKey.length; i++){
        let nameSpliting = elementKey[i].className.split(" ");
      if(nameSpliting[1] == value){
        elementKey[i].classList.add('active')
      }else{
        elementKey[i].classList.remove('active')
      }
    }
}

window.addEventListener('scroll', function() {
    var myDiv = document.getElementById('search_main');
    var scrolledClass = 'scrolled';

    // Get the current scroll position
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Check if the scroll position is greater than 0
    if (scrollPosition > 0) {
      // Add the class to the div
      myDiv.classList.add(scrolledClass);
    } else {
      // Remove the class from the div
      myDiv.classList.remove(scrolledClass);
    }
  });
  
  // shortcut command settup
  document.addEventListener('keydown', function(event) {
    const searchText = document.getElementById('search__bar');
    // Check if the Ctrl key (or Command key on Mac) and the desired key is pressed
    if ((event.altKey || event.metaKey) && event.key === 'c') {
      // Perform your desired action here
      searchText.focus();
      searchText.classList.add('active_input')
    }
  });
  

printShortcuts()
filtering();
filterElement('all');
clearInputBox();




