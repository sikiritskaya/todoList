
/* MONGODB_URL=mongodb+srv://christina:<test1234>@cluster0.02yak.mongodb.net/todo-project?retryWrites=true&w=majority
 */
//modals
let modal_show = document.querySelector('.modal-wrapper')
let user = document.querySelector('#user')
let header = document.querySelector('header')
let search = document.querySelector('#search')
let helloModal=document.querySelector('#hello')
let nameMain = document.querySelector('#name_folder')
let addTask2 = document.querySelector('#add_task2')
let addTask = document.querySelector('#add_task')
let addTaskToday = document.querySelector('#add_task_today')
//modal Login
let btnEnter = document.querySelector('#btn_enter')
let modalLogin = document.forms.regist_form
let inputName = modalLogin.elements.q1
let inputPas = modalLogin.elements.q2
//let stayOn = modalLogin.elements.stayOn
let error1 = document.querySelector('#er-mes1')
let error2 = document.querySelector('#er-mes2')
let error9 = document.querySelector('#er-mes9')

//modal Register
let letters = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i
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
let error10 = document.querySelector('#er-mes10')

//аккордион
let accord = document.querySelectorAll('.accordeon')
    for(let some of accord){
        some.addEventListener('click',()=>{
        some.parentElement.nextElementSibling.classList.toggle('panel') 
        some.classList.toggle('test')
    })
}
//валидация первой формы
function firstValid(){
    if(inputName.value.length < 1){
        error1.classList.add('message-show')
        
    }
    if(inputName.value[0] && !letters.test(inputName.value)){
        error9.classList.add('message-show')
       
    }
}
function secondValid(){
    if(inputPas.value.length < 6){
        error2.classList.add('message-show')
       
    }
}

inputName.addEventListener('blur', firstValid)
inputPas.addEventListener('blur', secondValid)
inputName.addEventListener('focus',()=>{
    error1.classList.remove('message-show')
    error9.classList.remove('message-show')
    
})
inputPas.addEventListener('focus',()=>{
    error2.classList.remove('message-show')
    
})


//валидация 2 формы
creator.addEventListener('blur', firstValid2)
inputEmail.addEventListener('blur', secondValid2)
inputPassword.addEventListener('blur', passwordValid)
repeatPassword.addEventListener('blur', passwordRepeat)
function firstValid2(){
    if(creator.value.length < 3){
        error3.classList.add('message-show')
        
    }
}
function secondValid2(){
    if(inputEmail.value.length < 1){
        error4.classList.add('message-show')
        
    }
    if(inputEmail.value[0] && !letters.test(inputEmail.value)){
        error10.classList.add('message-show')
        
    }
}
function passwordValid(){
    if(inputPassword.value.length < 6){
        error5.classList.add('message-show')
        
    }
}
function passwordRepeat(){
    if(repeatPassword.value.length < 1){
        error6.classList.add('message-show')
        
    }
}
function passwordRepeat2(){
    if(repeatPassword.value !== inputPassword.value){
        error7.classList.add('message-show')
        
    }
}
function agreement(){
    if(!confirmUser.checked){
        error8.classList.add('message-show')
    }
}
creator.addEventListener('focus',()=>{
    error3.classList.remove('message-show')
    
})
inputEmail.addEventListener('focus',()=>{
    error4.classList.remove('message-show')
    error10.classList.remove('message-show')
    
})
inputPassword.addEventListener('focus',()=>{
    error5.classList.remove('message-show')
    
})
repeatPassword.addEventListener('focus',()=>{
    error6.classList.remove('message-show')
    error7.classList.remove('message-show')
    
})


document.addEventListener('click',(e)=>{
    if(e.target.closest('.burger')){
        document.querySelector('.menu').classList.toggle('close_menu')
        document.querySelector('.menu').classList.toggle('mobile')
    }
    if(e.target.closest('#user')){
        modalLogin.classList.remove('er_message')
        modal_show.classList.add('preloader-show')
        //document.querySelector('.modal_window').style.opacity="0.5"
    }
    if(e.target.closest('#registration')){
        modalLogin.classList.add('er_message')
        modalRegist.classList.remove('er_message')
    }
    if(e.target.closest('#plus')){
        addTask.classList.remove('er_message')
        modal_show.classList.add('preloader-show')
        //document.querySelector('.modal_window').style.opacity="0.5"
    }
    if(e.target.closest('#cancel')){
        addTask.classList.add('er_message')
        modal_show.classList.remove('preloader-show')
        //document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target.closest('#closeModal1')){
        inputName.value=""
        inputPas.value =""
        modalLogin.classList.add('er_message')
        modal_show.classList.remove('preloader-show')
       // document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target.closest('#closeModal2')){
        modalRegist.classList.add('er_message')
        modal_show.classList.remove('preloader-show')
        //document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target.closest('#closeModal3')){
        helloModal.classList.add('er_message')
        modal_show.classList.remove('preloader-show')
       // document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target.closest('#inbox') || e.target.closest('.home')){
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('#main_inbox').style.display='block'
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#task_cal').style.display="none"
        document.querySelector('#main_statistics').classList.add('er_message')
        getData()
    }
    if(e.target.closest('.choose_task') || e.target.closest('.accord') || e.target.closest('.plus_acc')){
        document.querySelector('.menu').classList.toggle('mobile')
    }
    if(e.target.closest('#plus2')){
        addTask2.classList.remove('er_message')
    }
    if(e.target.closest('#plusToday')){
        addTaskToday.classList.remove('er_message')
    }
    if(e.target.closest('#statistics')){
        document.querySelector('#main_statistics').classList.remove('er_message')
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('#main_inbox').style.display='none'
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#task_cal').style.display="none"
    }
    if(e.target.closest('#cancel2')){
        if(document.querySelector('#change').style.display='inline'){
            document.querySelector('#change').style.display='none'
            document.querySelector('#add_newtask2').style.display='inline'
        }
        addTask2.classList.add('er_message')
        addTask2.classList.remove('add_task')
        document.querySelector('#editor3').value=''
        document.querySelector('#editor4').value=''
        modal_show.classList.remove('preloader-show')
        //document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target === search.nextElementSibling){
        search.style.width = 'auto'
        search.nextElementSibling.classList.add('er_message')
        search.value = ''
        //getData()
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
    if(e.target.closest('.priority_panel')){
        console.log(e.target.textContent)
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('#main_inbox').style.display='block'
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#task_cal').style.display="none"
        document.querySelector('#main_statistics').classList.add('er_message')
        getDataFiltr(e.target.textContent)
    }
    if(e.target.closest('.label_panel')){
        console.log(e.target.textContent)
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('#main_inbox').style.display='block'
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#task_cal').style.display="none"
        document.querySelector('#main_statistics').classList.add('er_message')
        getSortLabel(e.target.textContent)
    }
    if(e.target.closest('#marks')){
        if( document.querySelector('#label_container').children.length<5){
            document.querySelector('#label').classList.remove('er_message')
            modal_show.classList.add('preloader-show')
           // document.querySelector('.modal_window').style.opacity="0.5"
        }
        if(document.querySelector('#label_container').children.length>=5){
            document.querySelector('.error2').classList.remove('er_message')
            modal_show.classList.add('preloader-show')
            //document.querySelector('.modal_window').style.opacity="0.5"
        }

    }
    if(e.target.closest('#cancel_error2')){
        document.querySelector('.error2').classList.add('er_message')
        modal_show.classList.remove('preloader-show')
       // document.querySelector('.modal_window').style.opacity="0"
    }
    /* if(e.target.closest('#statistics')){
        document.querySelector('.error3').classList.remove('er_message')
        modal_show.classList.add('preloader-show')
       // document.querySelector('.modal_window').style.opacity="0.5"
    } */
    if(e.target.closest('#cancel_error3')){
        document.querySelector('.error3').classList.add('er_message')
        modal_show.classList.remove('preloader-show')
       // document.querySelector('.modal_window').style.opacity="0"
    }
    if(e.target.closest('#cancel_label') || e.target.closest('#cancel_label2') || e.target.closest('#delete_label')){
        document.querySelector('#inputLabel').value=''
        document.querySelector('#label').classList.add('er_message')
        modal_show.classList.remove('preloader-show')
        //document.querySelector('.modal_window').style.opacity="0"
        document.querySelector('#delete_label').style.display="none"
        document.querySelector('#edit_label').style.display="none"
        document.querySelector('#btn_label').style.display="flex"
        document.querySelector('#cancel_label').style.display="flex"
    }
  
    
    if(e.target.closest('#projects')){
        if( document.querySelector('#project_container').children.length<3){
        document.querySelector('.project_name').classList.remove('er_message')
        modal_show.classList.add('preloader-show')
       // document.querySelector('.over_modal').style.opacity="0.5"
        }
        if(document.querySelector('#project_container').children.length>=3){
            document.querySelector('.error').classList.remove('er_message')
            modal_show.classList.add('preloader-show')
            //document.querySelector('.over_modal').style.opacity="0.5"
        }
        /* document.querySelector('.drag_drop').style.display="flex"
        document.querySelector('#main_inbox').style.display="none"
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#task_cal').style.display="none" */
    }
    if(e.target.closest('#cancel_error')){
        document.querySelector('.error').classList.add('er_message')
        modal_show.classList.remove('preloader-show')
        //document.querySelector('.over_modal').style.opacity="0"
    }

    if(e.target.closest('#bell')){
        document.querySelector('.notifications').classList.remove('er_message')
        modal_show.classList.add('preloader-show')
        //document.querySelector('.over_modal').style.opacity="0.5"
    }
        
    if(e.target.closest('#cancel_error4')){
        document.querySelector('.notifications').classList.add('er_message')
        modal_show.classList.remove('preloader-show')
       // document.querySelector('.over_modal').style.opacity="0"
    }
    if(e.target.closest('#filtr_icon')){
        document.querySelector('#main_inbox').querySelector('.sortBy').classList.toggle('show_sort')
    }
    if(e.target.closest('#filtr_icon2')){
        document.querySelector('#main_today').querySelector('.sortBy').classList.toggle('show_sort')
    }
    
})

let getChecked = ()=>{
    let arr=[]
    let check_label = document.querySelectorAll('input[name="all"]')
    check_label.forEach(elem =>{
        if(elem.checked){
            //console.log(elem.value)
            arr.push(elem.value)
        }
        console.log(arr.toString())
        
    })
    return arr.toString()
}

const clearCheckbox =()=>{
    let check_label = document.querySelectorAll('input[name="all"]')
    check_label.forEach(elem =>{
        elem.checked = false   
    })
}

//checked priority
let getCheckedPriority = ()=>{
    //let arr= "Priority 4"
    let arr =[]
    let check_label = document.querySelectorAll('input[name="all_priority"]')
    /* check_label.forEach(elem=>{
        if(elem.checked){
            console.log(elem.value)
            return elem.value
        }else{
            console.log('priority4')
            return arr
        }
    }) */
   
    check_label.forEach(elem =>{
        if(elem.checked){
            //console.log(elem.value)
            arr.push(elem.value)
        }
        console.log(arr.toString())
        
        
    })
    if(arr.toString()==''){
        arr=["Priority 4"]
    }
  
    return arr.toString() 
}

const clearCheckboxPriority =()=>{
    let check_label = document.querySelectorAll('input[name="all_priority"]')
    check_label.forEach(elem =>{
        elem.checked = false   
    })
}
//поиск
search.addEventListener('focus', ()=>{
    search.classList.add('change_width')
    search.nextElementSibling.classList.remove('er_message')
})
search.addEventListener('blur', ()=>{
    search.classList.remove('change_width')
    search.nextElementSibling.classList.add('er_message')
    search.value = ''
    getData()
})


window.addEventListener('DOMContentLoaded', ()=>{
    getData()
    getDataToday()
})

//приветствие

let arrHello=['"Не составлять планов - значит запланировать своё поражение" (Бенджамин Франклин)', '"Натурально, не доедешь, ежели не знаешь, куда едешь!" (Михаил Булгаков)', '"Тот, кто никогда не теряет время,не будет иметь повода жаловаться на его нехватку" (Т. Джеферсон)', '"Я должна управлять часами, а не часы - мною" (Гольда Меир)']

let hello =()=>{ setTimeout(()=>{
    helloModal.classList.remove('er_message')
    modal_show.classList.add('preloader-show')
    let container = document.querySelector('#hello')
    let num = Math.floor(Math.random()*arrHello.length)
    container.lastElementChild.textContent=arrHello[num]
}, 6000)}
document.addEventListener('DOMContentLoaded', hello)

 const togglePreloader = ()=>{
    let container = document.querySelector('.wrap-preloader')
    container.classList.toggle('preloader-show')
}
//togglePreloader() 

//filtr
const filterUp = (e)=>{
    if(e.target.classList.contains('dateSort')){
        let condition = "date"
        const currentSort = e.target.dataset.sort
        console.log(currentSort)
        getSortTaskUp(condition, currentSort)
       
    }
    if(e.target.classList.contains('createSort')){
        let condition = "creation"
        const currentSort = e.target.dataset.sort
        console.log(currentSort)
        getSortTaskUp(condition, currentSort)
    }
    if(e.target.classList.contains('prioritySort')){
        let condition = "priority"
        const currentSort = e.target.dataset.sort
        console.log(currentSort)
        getSortTaskUp(condition, currentSort)
    }
    document.querySelector('#main_inbox').querySelector('.sortBy').classList.remove('show_sort')
}
document.querySelector('#main_inbox').querySelector('.sortBy').addEventListener('click', filterUp)

//filtr today
const filterUpToday = (e)=>{
    if(e.target.classList.contains('createSort')){
        let condition = "creation"
        const currentSort = e.target.dataset.sort
        console.log(currentSort)
        getSortTaskUpToday(condition, currentSort)
    }
    if(e.target.classList.contains('prioritySort')){
        let condition = "priority"
        const currentSort = e.target.dataset.sort
        console.log(currentSort)
        getSortTaskUpToday(condition, currentSort)
    }
    document.querySelector('#main_today').querySelector('.sortBy').classList.remove('show_sort')
}
document.querySelector('#main_today').querySelector('.sortBy').addEventListener('click', filterUpToday)