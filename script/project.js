const todos = document.querySelectorAll('.todo')
const allStatus = document.querySelectorAll('.status')
let draggableTodo = null

let adDTask = document.querySelector('.add_task_todo')
let closeBtn = document.querySelectorAll('.close')
let dataset_num = 1

function dragStart(){
    draggableTodo = this 
    setTimeout(()=>{
        this.style.display="none"
    },0)
    //console.log(this)
    //console.log('dragstart')
}
function dragEnd(e){
    draggableTodo = null
    console.log(this.dataset.id)
   // dataset_num = getIdProject(e)
    setTimeout(()=>{
        this.style.display="block"
    },0)
    this.dataset_num = currentId
    dataset_num = e.target.parentElement.dataset.num
    console.log(dataset_num)
    console.log('dragend',e.target.parentElement.dataset.num)
    patchProjectData(this.dataset.id, dataset_num)
    
}
function dragOver(e){
    e.preventDefault()
    //console.log('dragover')
}
function dragEnter(){
    console.log('dragenter')
}
function dragLeave(){
    console.log('dragleave')
}
function dragDrop(){
    this.appendChild(draggableTodo)
    console.log("dragDrop")
}


todos.forEach((todo)=>{
    todo.addEventListener('dragstart', dragStart)
    todo.addEventListener('dragend', (e)=>{
        dragEnd(e)
        
    })
})
allStatus.forEach((status)=>{
    status.addEventListener('dragover', dragOver)
    status.addEventListener('dragenter', dragEnter)
    status.addEventListener('dragleave', dragLeave)
    status.addEventListener('drop', dragDrop)
})

/* closeBtn.forEach((close)=>{
    close.addEventListener('click', ()=>{
        close.parentElement.remove()
    })
}) */

document.addEventListener('click',(e)=>{
    let btnAdd = document.querySelector('#add_btn')
    if(e.target === btnAdd){
        console.log('222')
        adDTask.classList.remove('er_message')
        document.querySelector('.over_modal').style.opacity="0.5"
    }
    if(e.target.closest('#cancel3')){
        adDTask.classList.add('er_message')
        document.querySelector('.over_modal').style.opacity="0"
    }
})
 document.querySelector('#add_newtask3').addEventListener('click',()=>{
    postDataProject()
    closeTodo()
} ) 
 function closeTodo(){
    adDTask.classList.add('er_message')
    document.querySelector('.over_modal').style.opacity="0"
} 

/* function createTodo(){
    let name=document.querySelector('#editor5').value
    let descr=document.querySelector('#editor6').value
    let todo_div = document.createElement('div')
    adDTask.classList.add('er_message')
    document.querySelector('.over_modal').style.opacity="0" 
    todo_div.innerHTML=`
        <p>${name}</p>
        <p>${descr}</p>
        <span class="close"><i class="fas fa-times"></i></span>
    `
    todo_div.classList.add('todo')
    todo_div.setAttribute('draggable', 'true')
    //todo_div.dataset.id="1"
    document.querySelector('#no_status').appendChild(todo_div)
    dataset_num=todo_div.parentElement.dataset.num
    todo_div.addEventListener('dragstart', dragStart)
    todo_div.addEventListener('dragend', dragEnd)
    document.querySelector('#editor5').value=''
    document.querySelector('#editor6').value=''
    //removeTodo()
    //postDataProject(name, descr, dataset_num)
}

/* function removeTodo(){
    let closeBtn = document.querySelectorAll('.close')
    closeBtn.forEach((close)=>{
        close.addEventListener('click', ()=>{
            close.parentElement.remove()
        })
    })
} */

//removeTodo()