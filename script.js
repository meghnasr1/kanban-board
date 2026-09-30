
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
console.log(todo,progress,done);
let dragElement=null;
const columns = [todo,progress,done];
let taskData ={};

function addTask(title,desc,column){
    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")
    div.innerHTML = `
  <h2>${title}</h2>
  <p>${desc}</p>
  <button>Delete</button>`
   column.appendChild(div);
  
  div.addEventListener("drag",(e)=>{
    dragElement=div;
  })

  const deleteBtn = div.querySelector("button");
  deleteBtn.addEventListener("click",(e)=>{
    div.remove();
    updateTaskCount();
  })

 
  
  return div;
}

function updateTaskCount(){
     columns.forEach(col=>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
            taskData[col.id]=Array.from(tasks).map(t=>{
                return {
                    title: t.querySelector("h2").innerHTML,
                    desc: t.querySelector("p").innerHTML
                }
            })
            
            localStorage.setItem("tasks",JSON.stringify(taskData));
            count.innerHTML=tasks.length;
        })
}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"))
    for (const col in data) {
  const column = document.querySelector(`#${col}`);
  data[col].forEach(task => {
    addTask(task.title,task.desc,column);
  })
  updateTaskCount();
}
}

const tasks = document.querySelectorAll(".task");
tasks.forEach(task => {
    task.addEventListener("drag",(e)=>{
        dragElement=task;
       //console.log("dragging",e);
    })
});

// progress.addEventListener("dragenter",(e)=>{
//     progress.classList.add("hover-over");
//     console.log("drag enter",e);
// })
// progress.addEventListener("dragleave",(e)=>{
//     progress.classList.remove("hover-over");
// })
// done.addEventListener("dragenter",(e)=>{
//     done.classList.add("hover-over");
//     //console.log("drag enter",e);
// })
// done.addEventListener("dragleave",(e)=>{
//     done.classList.remove("hover-over");
// })
// todo.addEventListener("dragenter",(e)=>{
//     todo.classList.add("hover-over");
//     //console.log("drag enter",e);
// })
// todo.addEventListener("dragleave",(e)=>{
//     todo.classList.remove("hover-over");
// })
function addDragEventsONColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    })
    column.addEventListener("drop",(e)=>{
        e.preventDefault();
        console.log("dropped",dragElement,column);
        //column.appendChild(dragElement);
        
        if (dragElement) {
    column.appendChild(dragElement);
}
        column.classList.remove("hover-over");
       


    //   columns.forEach(col=>{
    //         const tasks = col.querySelectorAll(".task");
    //         const count = col.querySelector(".right");

    //         count.innerHTML=tasks.length;
    //     })
    updateTaskCount();

    })

}
addDragEventsONColumn(todo);
addDragEventsONColumn(progress);
addDragEventsONColumn(done);

//Modal Related logic
const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");
toggleModalButton.addEventListener("click",(e)=>{
    
    modal.classList.toggle("active");
})

modalbg.addEventListener("click",(e)=>{
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click",(e)=>{
    e.preventDefault();  
    const taskTitle=document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;
    // const template = `<div draggable="true" class="task">
    //                 <h2>${taskTitle}</h2>
    //                 <p>${taskDesc}</p>
    //                 <button>Delete</button>
    //             </div>`
addTask(taskTitle,taskDesc,todo);

updateTaskCount();

modal.classList.remove("active");
 taskTitle=document.querySelector("#task-title-input").value="";
     taskDesc = document.querySelector("#task-desc-input").value="";
               
})