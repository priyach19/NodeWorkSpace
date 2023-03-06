let tasks=[];
const tasksList=document.getElementById('list');
const addTask=document.getElementById('input');
const taskCounter=document.getElementById('task-counter');
const addButton=document.getElementById('add-button');
//var checkBox = document.querySelector(".custom-checkbox");

console.log("working");
//adding li item to the ul  list
function addTaskToDom(task){
    const li=document.createElement('li');
    // const input=document.createElement('input');
    // input.className='custom-checkbox';
    // input.type='checkbox';
    // input.id='${task.id}';
    // const label=document.createElement('label');
    // label.for=id;
    // const i=document.createElement('i');
    // i.className='fa-solid fa-circle-xmark';
    // i.dataset.id=id;
    // i.className='delete';
    // li.appendChild(input);
    // li.appendChild(label);
    // li.appendChild(i)


    li.innerHTML=`<input type="checkbox" id="${task.id}" ${task.done ? checked:" "} class="custom-checkbox" data='hello'></input>  
    <label for="${task.id}" class='label'> ${task.text} </label>
    <i class="fa-solid fa-circle-xmark" data-id=${task.id} className="delete"></i>`;
   //tried this not working --><i class="fa-solid fa-circle-xmark" data-id=${task.id}  onclick='deleteTask(${task.id})' className="delete"></i>
   
   tasksList.append(li);
}

//render list after manipulation
function renderList(){
    tasksList.innerHTML="";
    for(let i=0;i<tasks.length;i++){
        addTaskToDom(tasks[i]);
    }
    taskCounter.innerHTML=tasks.length; 


}
//change the status of task 
function markTaskAsComplete(taskId){
    const task=tasks.filter(function(task){
        return task.id===taskId
    });
    if(task.length>0){
        const currentTask=task[0];
        currentTask.done=!currentTask;
        renderList();
        return;
    }

}

//notify that something is happened
function showNotification(text){
    alert(text);
  }

//To delete the task
function deleteTask(taskId){
    const newTasks=tasks.filter(function(task){
    return task.id!==taskId
 });
    tasks=newTasks;
    renderList();
    showNotification("task deleted succeessfully");
    
    return;
}

//add task to array
function addTasks(task){
  if(task){
    tasks.push(task);
    renderList();
    showNotification("your task added successfully");
    return;
  }
  showNotification("task cannot be added");
}

//handle input through 'Enter' key press
function handleInputByEnter(e){

    if(e.key=='Enter'){
    const text=e.target.value;
    if(!text){
            alert("Please enter something!!!");
            return;
        }
    const task= {
            text:text,
            id:Date.now().toString(),
            done:false
         }
    e.target.value="";
    addTasks(task);
        
    }
}
//handle add button
function handleInputByButton(e){
    const target=document.getElementById('input');
    const text=target.value;
    console.log(text);
    const task= {
        text:text,
        id:Date.now().toString(),
        done:false
     }
    target.value="";
    addTasks(task);
    renderList(task);
    return;
}

//click event to delete task
function handleClickEvent(e){
 const target=e.target;
 if(target.className==='delete'){
    const taskId=target.id;
    deleteTask(taskId);
    return;

 }else 
 if(target.className==='custom-checkbox'){
    const taskId=target.id;
    markTaskAsComplete(taskId);
    return;

 }
}

addButton.addEventListener('click',handleInputByButton);
addTask.addEventListener('keyup',handleInputByEnter);
document.addEventListener('click',handleClickEvent);
