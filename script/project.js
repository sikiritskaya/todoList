const todos = document.querySelectorAll('.todo')
const allStatus = document.querySelectorAll('.status')
let draggableTodo = null
let btnAdd = document.querySelector('#add_btn')
let adDTask = document.querySelector('.add_task_todo')
let closeBtn = document.querySelectorAll('.close')
let dataset_num = 1

function dragStart(){
    draggableTodo = this
    setTimeout(()=>{
        this.style.display="none"
    },0)
    //console.log('dragstart')
}
function dragEnd(e){
    draggableTodo = null
    setTimeout(()=>{
        this.style.display="block"
    },0)
    dataset_num = e.target.parentElement.dataset.num
    console.log('dragend',e.target.parentElement.dataset.num)
    patchProjectData(dataset_num)
    //switch case
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

closeBtn.forEach((close)=>{
    close.addEventListener('click', ()=>{
        close.parentElement.remove()
    })
})

document.addEventListener('click',(e)=>{
    if(e.target === btnAdd){
        adDTask.classList.remove('er_message')
        document.querySelector('.over_modal').style.opacity="0.5"
    }
    if(e.target.closest('#cancel3')){
        adDTask.classList.add('er_message')
        document.querySelector('.over_modal').style.opacity="0"
    }
})
document.querySelector('#add_newtask3').addEventListener('click',(e)=>{
    createTodo()
} )
 function createTodo(){
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
    
    document.querySelector('#no_status').appendChild(todo_div)
    dataset_num=todo_div.parentElement.dataset.num
    todo_div.addEventListener('dragstart', dragStart)
    todo_div.addEventListener('dragend', dragEnd)
    
    document.querySelector('#editor5').value=''
    document.querySelector('#editor6').value=''
    removeTodo()
    postDataProject(name, descr, dataset_num)
}
function removeTodo(){
    let closeBtn = document.querySelectorAll('.close')
    closeBtn.forEach((close)=>{
        close.addEventListener('click', ()=>{
            close.parentElement.remove()
        })
    })
}

//removeTodo()