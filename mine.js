var input = document.getElementById("input");
var addBtn = document.getElementById("addBtn");
var taskSection= document.querySelectorAll(".tasksSection");
var data = [];
var item = {};
var listItemDrag;




addBtn.addEventListener("click",function(e){
    e.preventDefault();
    item = JSON.parse(localStorage.getItem("inProgress"))
    if(!item)
    {
        item ={};
    }

    if(!input.value)
    {
        alert("please enter data")
    }

    else
    {

    data.push(input.value);
    var li = document.createElement("li");
    taskSection[0].appendChild(li);
    li.append(input.value);
    li.id=input.value;
    li.className="list-item";
    li.draggable=true;
    listItemDrag = document.querySelectorAll(".list-item");
    input.value ="";
    item["inProgress"]=[...data];//deep copy from array

    localStorage.setItem("inProgress",JSON.stringify(item));

    }
    listItemDrag.forEach(function(element)
    {
        element.addEventListener("dragstart",dragstart)
    })
    
})

function dragstart(event)
{
    event.dataTransfer.setData("text",this.id)
}

taskSection.forEach(function(element){
    element.addEventListener("dragover",dragover);
    element.addEventListener("drop",drop);

})

function dragover(event)
{
    event.preventDefault();
}

var newData = [];

function drop(event)
{
    var droppedItem = event.dataTransfer.getData('text');
    var newDropped = document.getElementById(droppedItem);
   var keyValue = newDropped.parentElement.parentElement.className;
   var localStorageData = JSON.parse(localStorage[keyValue]);
   for(var i = 0 ; i<localStorageData[keyValue].length ; i++)
   {
       if(localStorageData[keyValue][i]===droppedItem)
       {
           localStorageData[keyValue].splice(i,1);
           newData.push(newDropped.textContent);
       }
   }

   console.log(newData)

   localStorage.setItem(keyValue, JSON.stringify(localStorageData));
   this.append(newDropped);

   var parnetName = this.parentElement.className ; 
   var newStorage = JSON.parse(localStorage.getItem(parnetName));
   if(!newStorage)
   {
       newStorage={};
       newStorage[parnetName]=[];
   }
   
   newStorage[parnetName].push(...newData);
   localStorage.setItem(parnetName, JSON.stringify(newStorage));
   newData = [];
   
}

window.addEventListener("load",function(){
    for (var i = 0; i < taskSection.length; i++) {
        var storedData = JSON.parse(localStorage.getItem(taskSection[i].parentElement.className))
        var newStoredData ;
        if(!storedData && !newStoredData)
        {
            storedData={};
            newStoredData=[];
        }
       newStoredData = storedData[taskSection[i].parentElement.className];
        
        for (var j = 0; j < newStoredData.length; j++) {

            taskSection[i].innerHTML+=`<li class="list-item" id="${newStoredData[j]}"draggable="true">${newStoredData[j]}</li>`
            
        }
         
    }
    listItemDrag.forEach(function(element)
    {
        element.addEventListener("dragstart",dragstart)
    })
})