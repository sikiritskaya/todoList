
document.querySelector('header').addEventListener('click', (e)=>{
    if(e.target.closest('.burger')){
        document.querySelector('.menu').classList.toggle('er_message')
    }
})
let accord = document.querySelectorAll('.accordeon')
    for(let some of accord){
        some.addEventListener('click',()=>{
            some.nextElementSibling.classList.toggle('panel') 
            some.classList.toggle('test')
    })
}



//modals
let user = document.querySelector('#user')
let modalRegist = document.querySelector('#regist_form2')
let modalLogin = document.querySelector('#regist_form')
let header = document.querySelector('header')
let search = document.querySelector('#search')
let addTask = document.querySelector('.add_task')
let helloModal=document.querySelector('#hello')
let nameMain = document.querySelector('#name_folder')
let addTask2 = document.querySelector('.add_task2')

//закрыть окно
/* document.querySelector('#closeModal2').addEventListener('click',()=>{
    modalRegist.classList.add('er_message')
    document.querySelector('.modal_window').style.opacity="0"
})
modalLogin.addEventListener('click',(e)=>{
    if(e.target.closest('#closeModal1')){
    modalLogin.classList.add('er_message')
    document.querySelector('.modal_window').style.opacity="0"
    }
}) */

//открыть окно
document.addEventListener('click',(e)=>{
    if(e.target.closest('#user')){
        modalLogin.classList.remove('er_message')
        document.querySelector('.modal_window').style.opacity="0.5"
    }
    if(e.target.closest('#registration')){
        modalLogin.classList.add('er_message')
        modalRegist.classList.remove('er_message')
    }
    if(e.target.closest('#plus')){
        addTask2.classList.remove('er_message')
        addTask2.classList.add('add_task')
        document.querySelector('.modal_window').style.opacity="0.5"
    }
    /* if(e.target.closest('#cancel')){
        addTask.classList.add('er_message')
        document.querySelector('.modal_window').style.opacity="0"
    } */
    if(e.target.closest('#closeModal1')){
        modalLogin.classList.add('er_message')
        document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target.closest('#closeModal2')){
        modalRegist.classList.add('er_message')
        document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target.closest('#closeModal3')){
        helloModal.classList.add('er_message')
        document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target.closest('#inbox')){
        nameMain.textContent = document.querySelector('#inbox').lastElementChild.textContent
    }
    if(e.target.closest('#today')){
        nameMain.textContent = document.querySelector('#today').lastElementChild.textContent
    }
    if(e.target.closest('#plus2')){
        addTask2.classList.remove('er_message')
    }
    if(e.target.closest('#cancel2')){
        addTask2.classList.add('er_message')
        addTask2.classList.remove('add_task')
        document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target === search.nextElementSibling){
        search.style.width = 'auto'
        search.nextElementSibling.classList.add('er_message')
    }
    if(e.target.closest('.check')){
        let checkboxes = document.querySelectorAll('.check')
        for(let check of checkboxes){
            check.onclick =()=>{
                check.parentElement.parentElement.remove()
                /* let local = JSON.parse(localStorage.getItem('AllTasks'))
                console.log(local) */
                counter()
            }
    
        }
    }
})
//поиск
search.addEventListener('focus', ()=>{
    search.style.width = '100%'
    search.nextElementSibling.classList.remove('er_message')
})
search.addEventListener('blur', ()=>{
    search.style.width = 'auto'
    search.nextElementSibling.classList.add('er_message')
})


const counter=()=>{
    let count = document.querySelectorAll('.task_list').length
    document.querySelector('#task-inbox').textContent = count
    if(count===0){
        document.querySelector('#task-inbox').style.opacity='0'
        document.querySelector('#footer_main').classList.remove('busy_pic')
        document.querySelector('#footer_main').classList.add('free_pic') 
        document.querySelector('#footer_main').innerHTML=`
        <p>All clear! Get some rest!</p>
        `
    }
    if(count!==0){
        document.querySelector('#task-inbox').style.opacity='1'
        document.querySelector('#footer_main').classList.remove('free_pic')
        document.querySelector('#footer_main').classList.add('busy_pic') 
        document.querySelector('#footer_main').innerHTML=`
        <p>Let's do it!</p>
        `
    }
}

let setLocalStorage=()=>{
    if(!JSON.parse(localStorage.getItem('AllTasks'))){
        localStorage.setItem('AllTasks', JSON.stringify([]))
    }
}
const setTaskLocalStorage =() =>{
    let currentTitle = document.querySelector('#editor3').value
    let currentDescr = document.querySelector('#editor4').value
    let allTasks =  JSON.parse(localStorage.getItem('AllTasks')) 
    let allStory={
        title: currentTitle,
        descr: currentDescr
    }
    allTasks.push(allStory)
    localStorage.setItem('AllTasks', JSON.stringify(allTasks))
}
//document.querySelector('#add_newtask2').addEventListener('click', setTaskLocalStorage)

const generateAllTasks =()=>{
    let allTasks =  JSON.parse(localStorage.getItem('AllTasks')) 
    let view=''
    let containerTasks = document.querySelector('.lists')
    allTasks.forEach(item => {
        view +=`
            <div class="task_list">
                <div>
                    <span class="check"><input type="checkbox" class="done"></span>
                    <span class="title_task">${item.title}</span>
                    <p class="descr_task">${item.descr}</p>
                </div>
                <div class="edit">
                    <a href=#>
                        <i class="far fa-edit"></i>
                    </a>
                </div>
            </div>
        `
    })
    containerTasks.innerHTML = view
    counter()

}


//приветствие


/* let hello =()=>{ setTimeout(()=>{
    helloModal.classList.remove('er_message')
    document.querySelector('.modal_window').style.opacity="0.5"
}, 2000)}
document.addEventListener('DOMContentLoaded', hello)*/
//setLocalStorage() 
//document.querySelector('#add_newtask2').addEventListener('click', generateAllTasks)
//generateAllTasks()
//counter()