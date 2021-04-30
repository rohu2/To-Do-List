const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");

const itemInput = document.getElementById("itemInput");
let listArray =  [];

const list = document.getElementById("list");
const itemWrapper = document.getElementsByClassName("item-container");

let goToTop = false;

let lastid = 0;

let listBox = list.getBoundingClientRect( ) ;

let listHeight = listBox.height;

let addHeight = 0;






function addListItem(){

const input  = document.getElementById("itemInput").value;


if(input !== "") {

// If the screen has been adjusted before item0 has been appended this will ensure the item does not jump , to accomodate any perceived change in delta
let listBoxDynamic = list.getBoundingClientRect( ) ;
listBox = listBoxDynamic;

nextLine()




const listItem = document.createElement("div");
listItem.classList.add("todo-item") ;


let itemContainer = document.createElement("div");
itemContainer.classList.add("item-container") ;

const entry = document.createTextNode(input);
const deleteButton = document.createElement("button")
const x = document.createTextNode("X")


appendListItem( entry, listItem, itemContainer, deleteButton, x  )

addIdentity( listItem , deleteButton, itemContainer);

clear(input)

}

}



function appendListItem(entry, listItem, itemContainer, deleteButton, x ){


itemContainer.appendChild(listItem);
listItem.appendChild(entry);
listItem.appendChild(deleteButton);
deleteButton.appendChild(x);

list.appendChild(listItem)

springUp()


}





function addIdentity ( listItem , deleteButton, itemContainer  ) {



listItem.setAttribute( "id" , "item"+lastid);
itemContainer.setAttribute( "id" , "container"+lastid);
deleteButton.setAttribute( "onClick" , 'removeItem("' + 'item' + lastid + '")')

lastid = lastid + 1;


pushArrays(listItem);

elementOffset()

atBottom()


}




  // if this is the first button press at the top of the page we do not skip a line down

firstClick = true;

function nextLine(){



   if (firstClick == false){
       
      let lessHeight = listHeight -= 40;
      addHeight += 40;

   list.style.height = lessHeight + "px";
   list.style.paddingTop = addHeight + "px";

   }
  
   if (firstClick == true){
       

      let lessHeight = listHeight += 0;
      addHeight += 0;
     
      list.style.height = lessHeight + "px";
      list.style.paddingTop = addHeight + "px";


  firstClick = false
   
   console.log(firstClick)
   }



   }


function springUp(){

   if (goToTop == true){
   

   list.style.height = 622 + "px";
   list.style.paddingTop = 0 + "px";
   
   listHeight = 622;
   addHeight = 0;

 
   console.log(firstClick)
   goToTop = false;


   }
   
   }

   


// detects when the print line has reached the bottom of the page
function atBottom(){  

  
   
   let number = lastid - 1 ;
   let mostRecent = document.getElementById("item" + number );
   let mostRecentTop = mostRecent.offsetTop ;
   
   
   
   if (listBox.height < mostRecentTop ) {
   
      goToTop = true ;
      
   
   }
   
   
   }





function pushArrays(listItem){


   listArray.push(listItem);
   isMouseDown.push(false);



}




function elementOffset(){

   if (isMouseDown.length > 0){
   
      for(i = 0 ; i < isMouseDown.length ; i++ ){
   
      let item = document.getElementById("item" + [i] );
      
   
   
   if( item !== null) {
      item.style.top = item.offsetTop + "px";
      item.style.left = item.offsetLeft + "px";
   
      }
      }
   
   }
   }







function removeItem(id){



b = document.getElementById(id);
console.log (id);


let string = id.replace("item", "");
let index = Number(string);


let container = document.getElementById("container"+index)


isMouseDown[index] = 0;


list.removeChild(b)

}





function findLastAppend(){

consoleLastid = Number(lastid) - 1;
let item = document.getElementById("item"+consoleLastid);
let box = item.getBoundingClientRect();
let beneath = box.bottom + 30 + "px";



}




















function clear(){
const input = document.getElementById("itemInput").value = "";
}






let button = document.getElementById("submitButton");


 document.addEventListener("keypress" , (e)=> {

   const input = document.getElementById("itemInput").value;
  
    if (e.key === 'Enter' && input !== "" ){

      
button.classList.add("active")
addListItem()
     clear()
     

    }

 }
);

setInterval(()=>{

   button.classList.remove("active");

}, 200)