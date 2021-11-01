const todos = document.querySelectorAll('.todo')
const allStatus = document.querySelectorAll('.status')
let draggableTodo = null
let btnAdd = document.querySelector('#add_btn')
let adDTask = document.querySelector('.add_task')
let closeBtn = document.querySelectorAll('.close')


function dragStart(){
    draggableTodo = this
    setTimeout(()=>{
        this.style.display="none"
    },0)
    //console.log('dragstart')
}
function dragEnd(){
    draggableTodo = null
    setTimeout(()=>{
        this.style.display="block"
    },0)
    console.log('dragend')
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
    todo.addEventListener('dragend', dragEnd)
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
    if(e.target.closest('#cancel')){
        adDTask.classList.add('er_message')
        document.querySelector('.over_modal').style.opacity="0"
    }
})
document.querySelector('#add_newtask').addEventListener('click', createTodo)
 function createTodo(){
    let name=document.querySelector('#editor1').value
    let descr=document.querySelector('#editor2').value
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
    todo_div.addEventListener('dragstart', dragStart)
    todo_div.addEventListener('dragend', dragEnd)
    document.querySelector('#editor1').value=''
    document.querySelector('#editor2').value=''
    removeTodo()
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