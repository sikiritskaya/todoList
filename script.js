
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
let header = document.querySelector('header')
let search = document.querySelector('#search')
let helloModal=document.querySelector('#hello')
let nameMain = document.querySelector('#name_folder')
let addTask2 = document.querySelector('.add_task2')
let addTask = document.querySelector('.add_task')
//modal Login
let btnEnter = document.querySelector('#btn_enter')
let modalLogin = document.forms.regist_form
let inputName = modalLogin.elements.q1
let inputPas = modalLogin.elements.q2
//let stayOn = modalLogin.elements.stayOn
let error1 = document.querySelector('#er-mes1')
let error2 = document.querySelector('#er-mes2')

//modal Register
let btnSubmit = document.querySelector('#btn_submit')
let modalRegist = document.forms.regist_form2
let creator = modalRegist.elements.creator
let inputEmail = modalRegist.elements.q11
let inputPassword = modalRegist.elements.q21
let repeatPassword = modalRegist.elements.q22
let confirmUser = modalRegist.elements.agrSign
let error3 = document.querySelector('#er-mes3')
let error4 = document.querySelector('#er-mes4')
let error5 = document.querySelector('#er-mes5')
let error6 = document.querySelector('#er-mes6')
let error7 = document.querySelector('#er-mes7')
let error8 = document.querySelector('#er-mes8')



function firstValid(){
    if(inputName.value.length < 1){
        error1.classList.remove('er_message')
        inputName.style.borderColor="red"
    }
}
function secondValid(){
    if(inputPas.value.length < 1){
        error2.classList.remove('er_message')
        inputPas.style.borderColor="red"
    }
}

inputName.addEventListener('blur', firstValid)
inputPas.addEventListener('blur', secondValid)
inputName.addEventListener('focus',()=>{
    error1.classList.add('er_message')
    inputName.style.borderColor="black"
})
inputPas.addEventListener('focus',()=>{
    error2.classList.add('er_message')
    inputPas.style.borderColor="black"
})
btnEnter.addEventListener('click',(e)=>{
    firstValid()
    secondValid()
    e.preventDefault()
})

//2 форма
creator.addEventListener('blur', firstValid2)
inputEmail.addEventListener('blur', secondValid2)
inputPassword.addEventListener('blur', passwordValid)
repeatPassword.addEventListener('blur', passwordRepeat)
function firstValid2(){
    if(creator.value.length < 3){
        error3.classList.remove('er_message')
        creator.style.borderColor="red"
    }
}
function secondValid2(){
    if(inputEmail.value.length < 1){
        error4.classList.remove('er_message')
        inputEmail.style.borderColor="red"
    }
}
function passwordValid(){
    if(inputPassword.value.length < 6){
        error5.classList.remove('er_message')
        inputPassword.style.borderColor ="red"
    }
}
function passwordRepeat(){
    if(repeatPassword.value.length < 1){
        error6.classList.remove('er_message')
        repeatPassword.style.borderColor="red"
    }
}
function passwordRepeat2(){
    if(repeatPassword.value !== inputPassword.value){
        error7.classList.remove('er_message')
        repeatPassword.style.borderColor="red"
    }
}
function agreement(){
    if(!confirmUser.checked){
        error8.classList.remove('er_message')
    }
}
creator.addEventListener('focus',()=>{
    error3.classList.add('er_message')
    creator.style.borderColor="black"
})
inputEmail.addEventListener('focus',()=>{
    error4.classList.add('er_message')
    inputEmail.style.borderColor="black"
})
inputPassword.addEventListener('focus',()=>{
    error5.classList.add('er_message')
    inputPassword.style.borderColor="black"
})
repeatPassword.addEventListener('focus',()=>{
    error6.classList.add('er_message')
    error7.classList.add('er_message')
    inputPassword.style.borderColor="black"
})

btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    firstValid2()
    secondValid2()
    passwordValid()
    passwordRepeat()
    passwordRepeat2()
    agreement()
})



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
        //addTask.classList.add('add_task')
        //document.querySelector('#q1').focus()
        document.querySelector('.modal_window').style.opacity="0.5"
    }
    if(e.target.closest('#add_newtask')){
        document.querySelector('.modal_window').style.opacity="0"
        addTask.classList.add('er_message')
    }
    if(e.target.closest('#cancel')){
        addTask.classList.add('er_message')
        //addTask2.classList.remove('add_task')
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
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('.main_page').style.display='block'
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
                counter()
            }
    
        }
    }
    if(e.target.closest('#marks')){
        document.querySelector('#label').classList.remove('er_message')
        document.querySelector('.modal_window').style.opacity="0.5"
    }

    //переключение между окнами
    if(e.target.closest('#projects')){
        document.querySelector('.drag_drop').style.display="flex"
        document.querySelector('.main_page').style.display="none"
    }
  /*   if(!e.target.closest('#projects')){
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('.main_page').style.display='block'
    } */

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
// отправить на сервер
const postData = (title,descr) => {
    const name_input = document.querySelector(title).value;
    const descr_input= document.querySelector(descr).value;
    document.querySelector(title).value=''
    document.querySelector(descr).value=''
    fetch('http://localhost:3000/tasks',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "title": name_input,
                "description": descr_input
                
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    }).then(
        (response) => {
            return response.json();
        }
    ).then(
        (data)=>{
            console.log(data);
        }
    )
   
}
document.querySelector('#add_newtask2').addEventListener('click',()=>{ 
    postData('#editor3', '#editor4')
    getData()
})
document.querySelector('#add_newtask').addEventListener('click',()=>{ 
    postData('#editor1', '#editor2')
    getData()
})

//загрузить с сервера
const getData = () =>{
    fetch('http://localhost:3000/tasks')
    .then(
        (req)=>{
            return req.json();
        }
    )
    .then(
        (data) => {
            //console.log(data);
            let containerTasks = document.querySelector('.lists');
            containerTasks.innerHTML = '';
            data.forEach((item)=>{
                containerTasks.innerHTML += `
                <div class="task_list">
                    <div data-id="${item.id}">
                        <span class="check"><input type="checkbox" class="done"></span>
                        <span class="title_task"">${item.title}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>
                `
            })
        }
    )
    .catch( 
        err =>{
            console.log(err);
        }
        
        )
        
}

getData();
//document.querySelector('#add_newtask2').addEventListener('click',getData)
counter()

let currentId = 0;

const getIdUser = (e) =>{
    //console.log(e.target.closest('.edit').previousElementSibling.dataset.id);
    if(e.target.closest('.edit')){
        return e.target.closest('.edit').previousElementSibling.dataset.id
    }
}
document.addEventListener('click', (e)=>{
    if(e.target.closest('.edit')){
        currentId = getIdUser(e);
        addTask2.classList.remove('er_message')
        document.querySelector(title).value= ``
        document.querySelector(descr).value= ``
        document.querySelector('#add_newtask2').addEventListener('click', ()=>{
            putData(currentId)
            getData()
        })
    }
    
})

//изменить данные
const putData = (curId) => {
    const name_input = document.querySelector('#editor1').value;
    const descr_input= document.querySelector('#editor2').value;
    fetch(`http://localhost:3000/tasks/${curId}`,
    {
        method: 'PUT',
        body: JSON.stringify(
            {
                "title": name_input,
                "description": descr_input 
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    }).then(
        (response) => {
            return response.json();
        }
    ).then(
        (data)=>{
            console.log(data);
        }
    )
}

//удалить

const deleteId = (e) =>{
    //console.log(e.target.closest('.edit').previousElementSibling.dataset.id);
    if(e.target.closest('.check')){
        return e.target.closest('.check').parentElement.dataset.id
    }
}
document.addEventListener('click', (e)=>{
    if(e.target.closest('.check')){
        currentId = deleteId(e);
        deleteData(currentId)
    }
    
})
const deleteData = (curId) => {
    fetch(`http://localhost:3000/tasks/${curId}`,
    {
        method: 'DELETE'
    })
}



//приветствие


/* let hello =()=>{ setTimeout(()=>{
    helloModal.classList.remove('er_message')
    document.querySelector('.modal_window').style.opacity="0.5"
}, 2000)}
document.addEventListener('DOMContentLoaded', hello)*/

