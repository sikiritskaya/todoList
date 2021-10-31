const todos = document.querySelectorAll('.todo')
const allStatus = document.querySelectorAll('.status')
let draggableTodo = null



function dragStart(){
    draggableTodo = this
    console.log('dragstart')
}
function dragEnd(){
    draggableTodo = null
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

