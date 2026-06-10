   const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const modeBtn = document.getElementById("modeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ---------- SAVE TO LOCAL STORAGE ---------- */

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ---------- RENDER TASKS ---------- */

function renderTasks(){
    list.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");
        li.textContent = task.text;

        if(task.completed){
            li.classList.add("completed");
        }

        li.addEventListener("click",()=>{
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";

        delBtn.addEventListener("click",(event)=>{
            event.stopPropagation();
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(delBtn);
        list.appendChild(li);
    });

    updateProgress();
}

/* ---------- ADD TASK ---------- */

addBtn.addEventListener("click",()=>{

    if(input.value.trim()===""){
        alert("Enter Task First!");
        return;
    }

    tasks.push({
        text:input.value,
        completed:false
    });

    input.value="";
    saveTasks();
    renderTasks();
});

/* ---------- PROGRESS BAR ---------- */

function updateProgress(){

    const completed = tasks.filter(t=>t.completed).length;
    const total = tasks.length;

    const percent = total===0 ? 0 : (completed/total)*100;

    progressBar.style.width = percent + "%";
}

/* ---------- DAY NIGHT MODE ---------- */

modeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        modeBtn.textContent="☀️";
    }else{
        modeBtn.textContent="🌙";
    }
});


input.addEventListener("keydown",function(event){
    if(event.key === "Enter") {
        addBtn.click();
    
    }
});    


/* ---------- LOAD TASKS ---------- */

renderTasks();