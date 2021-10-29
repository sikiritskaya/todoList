
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
        addTask.classList.remove('er_message')
        document.querySelector('.modal_window').style.opacity="0.5"
    }
    if(e.target.closest('#cancel')){
        addTask.classList.add('er_message')
        document.querySelector('.modal_window').style.opacity="0"
    }
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
    }
})
//поиск
search.addEventListener('focus', ()=>{
    search.style.width = '100%'
    search.nextElementSibling.style.cssText=`
    display: block;        
    right: -42px;
    top: 9px;
    `  
})
const setTaskLocalStorage =() =>{
    let currentTitle = document.querySelector('#editor3').value
    let currentDescr = document.querySelector('#editor4').value
    let allTasks =  JSON.parse(localStorage.getItem('AllTasks')) 
    let allStory={
        title: currentTitle,
        descr: currentDescr
    }
    allTasks.push(allStory)
    console.log(allTasks)
    localStorage.setItem('AllTasks', JSON.stringify(allTasks))
}
document.querySelector('#add_newtask2').addEventListener('click', setTaskLocalStorage)

//приветствие


/* let hello = setTimeout(()=>{
    helloModal.classList.remove('er_message')
    document.querySelector('.modal_window').style.opacity="0.5"
}, 2000)
document.addEventListener('DOMContentLoaded', hello) */