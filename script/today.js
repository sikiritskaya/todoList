
document.addEventListener('click',(e)=>{
    if(e.target.closest('#today')){
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('#main_inbox').style.display='none'
        document.querySelector('#main_today').style.display='block'
        document.querySelector('#task_cal').style.display='none'
    }
    if(e.target.closest('#cancel_today')){
        if(document.querySelector('#change2').style.display='inline'){
            document.querySelector('#change2').style.display='none'
            document.querySelector('#add_newtask_today').style.display='inline'
        }
        addTaskToday.classList.add('er_message')
        addTaskToday.classList.remove('add_task')
        document.querySelector('.modal_window').style.opacity="0"
    }
})
document.querySelector('#main_today').addEventListener('click',(e)=>{
    if(e.target.closest('.edit_today')){
        currentId = getIdUser(e);
        let btnAdd= document.querySelector('#add_newtask_today')
        let btnChange = document.querySelector('#change2')
        addTaskToday.classList.remove('er_message')
        btnAdd.style.display = "none"
        btnChange.style.display="inline"
       
        
    }
})

const todayDate=()=>{
    let container = document.querySelector('#name_today')
    const dt = new Date()
    let dtToday = dt.toLocaleDateString('en-gb',{
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    container.textContent = dtToday
}
todayDate()
