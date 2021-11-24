
document.addEventListener('click',(e)=>{
    if(e.target.closest('#today')){
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('#main_inbox').style.display='none'
        document.querySelector('#main_today').style.display='block'
        document.querySelector('#task_cal').style.display='none'
        document.querySelector('#main_statistics').classList.add('er_message')
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
        let check_label = addTaskToday.querySelectorAll('input[name="all"]')
        check_label.forEach(item =>{
            if(item.value === e.target.parentElement.parentElement.previousElementSibling.children[2].textContent){
                //console.log(item.value)
               // console.log(e.target.parentElement.parentElement.previousElementSibling.children[1].textContent)
                return item.checked =true
            }
            console.log(e.target.parentElement.parentElement.previousElementSibling)
        })
        let check_priority =addTaskToday.querySelectorAll('input[name="all_priority"]')
        check_priority.forEach(item =>{
            if(item.value === e.target.parentElement.parentElement.previousElementSibling.children[0].children[0].id){
                //console.log(item.value)
                return item.checked =true
            }
            //console.log(item.value)
            //console.log(e.target.parentElement.parentElement.previousElementSibling.children[0])
        })
        document.querySelector('#editor7').value = e.target.parentElement.parentElement.previousElementSibling.children[1].textContent
        document.querySelector('#editor8').value = e.target.parentElement.parentElement.previousElementSibling.children[3].textContent
        //console.log(e.target.parentElement.parentElement.previousElementSibling.children[2])
        let btnAdd= document.querySelector('#add_newtask_today')
        let btnChange = document.querySelector('#change2')
        addTaskToday.classList.remove('er_message')
        btnAdd.style.display = "none"
        btnChange.style.display="inline"
       
        
    }
})

const todayDate=()=>{
    let container = document.querySelector('#name_today')
    let container2 = document.querySelector('#todayDate')
    const dt = new Date()
    let dtToday = dt.toLocaleDateString('en-gb',{
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    let dtButton=dt.toLocaleDateString('en-gb',{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    container.textContent = dtToday
    container2.textContent = dtButton
}
todayDate()
