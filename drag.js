let draggable = document.getElementsByClassName("todo-item");


let isMouseDown = []

let mouseOffset = { x: 0, y: 0 };

let lastClickedElement

let lastClickedIndex

let globalMouseDown = false;

let dropContainer = document.getElementById("drop-container");
let dropContainerBox = dropContainer.getBoundingClientRect( ) ;


let viewBox = viewport.getBoundingClientRect( ) ;










setInterval(() => {


  

let viewBoxDynamic = viewport.getBoundingClientRect( ) ;

let listBoxDynamic = list.getBoundingClientRect();
let listBoxRight = listBoxDynamic.x + listBoxDynamic.width;
let listBoxCentre = listBoxDynamic.x + listBoxDynamic.width/2;


let delta = viewBoxDynamic.width - viewBox.width;



if ( delta >= 120  ){
     
for (i = 0 ; i < isMouseDown.length; i++ ){   

let item = document.getElementById("item" + i);

if (item !== null){   
let box = item.getBoundingClientRect();
let boxRight = box.x + box.width;
let adjust = box.width / 2;



if( box.x > listBoxDynamic.x  ){

item.style.left = listBoxCentre - adjust + "px";


}
}

}

}

viewBox = viewBoxDynamic;
}


, 100);








setInterval(() => {


    for (let i = 0; i < isMouseDown.length; i++) {


        let item = document.getElementById("item" + i)







        if (item !== null && isCollide(item, dropContainer)) {

            item.style.backgroundColor = "red";
            
            adjustRed(item)



            
        }


        if (item !== null && !isCollide(item, dropContainer)) {

            item.style.backgroundColor = "#89e498ad";

            adjustGreen(item)

        }

 if( i == isMouseDown.length - 1 ){

        let dropContainerBoxDynamic = dropContainer.getBoundingClientRect( ) ;
    
        dropContainerBox.x  = dropContainerBoxDynamic.x;
       
         

        let listBoxDynamic = list.getBoundingClientRect( ) ;
listBox.x = listBoxDynamic.x;

        }
        


     

    }




}

    , 10);


 


 function isCollide(item, container) {

    a = item.getBoundingClientRect() ;
    
    b = container.getBoundingClientRect() ;
        
    
        return !(
    
    
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
    
            ((a.x + a.width) < (b.x)) ||
            (a.x > (b.x + b.width))
    
    
        );
    
    }







document.addEventListener("mousedown", (e) => {

    globalMouseDown = true;


    if (e.target.className == "todo-item") {

        onMouseDown(e)


    }


})




document.addEventListener("mouseup", (e) => {




    globalMouseDown = false;




    if (e.target.className == "todo-item selected") {

        onMouseUp(e)

    }


})







function adjustRed(item){
   
    let dropContainerBoxDynamic = dropContainer.getBoundingClientRect( ) ;


    if ( dropContainerBoxDynamic.x !== dropContainerBox.x){
   
        
    let delta = dropContainerBoxDynamic.x - dropContainerBox.x;
   
    let element = item.style.left;
    
    let noPX = element.replace("px","");
    let coordinate = Number(noPX)
    
    
    let adjust = coordinate + delta ;
    
    item.style.left = adjust + "px";
    
    }


}




function adjustGreen(item) {

    let listBoxDynamic = list.getBoundingClientRect( ) ;

if ( listBoxDynamic.x !== listBox.x){
 
let element = item.style.left;

let delta = listBoxDynamic.x - listBox.x;


let noPX = element.replace("px","");
let numeric = Number(noPX)


let adjust = numeric + delta ;

item.style.left = adjust + "px";


}
}





document.addEventListener("mousemove", (e) => {


    onMouseMove(e)

    if (e.target.className == "todo-item") {


    }


})





function onMouseDown(e) {

    isMouseDown[getIndex(e)] = true
    let item = e.target;

    item.classList.add("selected");


    mouseOffset = { x: item.offsetLeft - e.clientX, y: item.offsetTop - e.clientY };

    getClickedElementInfo(e);
    getLastClickedIndex(e)
}



function adjustRelativeTop(){

   

    let string = lastClickedElement.style.top.replace("px", "");
    let elementTop = Number(string);  
    let adjust = elementTop - 100 + "px";

 return adjust


}

function adjustRelativeLeft(){

    

    let string = lastClickedElement.style.left.replace("px", "");
    let elementLeft = Number(string);  
    let adjust = elementLeft - 58 + "px";

 return adjust


}



function onMouseUp(e) {


    let test = document.getElementById("itemd");

    let adjustTop = adjustRelativeTop();
    let adjustLeft = adjustRelativeLeft();

     test.style.top = adjustTop;
     test.style.left = adjustLeft;

    // test.style.left = mouseOffset.x

    lastClickedElement.classList.remove("selected");

    isMouseDown[getIndex(e)] = false

 


}




function onMouseMove(e) {


    cursorEscape(e)

   let string = lastClickedElement.style.top.replace("px", "");
   let elementTop = Number(string);  
   let adjust = elementTop - 100 + "px";


//     console.log(lastClickedElement.style.top);





    let item = e.target;

    if (isMouseDown[getIndex(e)] == true) {


        item.style.left = e.clientX + mouseOffset.x + "px";
        item.style.top = e.clientY + mouseOffset.y + "px";

    }
}





function cursorEscape(e) {



    if (e.toElement !== lastClickedElement && isMouseDown[lastClickedIndex] == true && globalMouseDown == true) {


lastClickedElement.style.left = e.clientX + mouseOffset.x + "px";
lastClickedElement.style.top = e.clientY + mouseOffset.y + "px";

    }

}





// gets all the item's information on mouse down and stores it in a variable
function getClickedElementInfo(e) {


    lastClickedElement = e.toElement;

}




// reduces item id to its number , then returns this value
// used to access items associated Boolean in the array
function getIndex(e) {

    string = e.toElement.id.replace("item", "")
    index = Number(string);


    return index

}


// reduces item id to its number , stored on variable
// us
function getLastClickedIndex(e) {

    string = e.toElement.id.replace("item", "")
    index = Number(string);
    lastClickedIndex = index;

}


// getIndex will return whatever e is hovered over
// getLast will store the number of the last clicked item