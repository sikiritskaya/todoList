document.addEventListener('click',(e)=>{
    if(e.target.closest('#upcoming')){
        document.querySelector('#task_cal').style.display="flex"
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('#main_inbox').style.display='none'
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#main_statistics').classList.add('er_message')
    }
    if(e.target.closest('.edit_sch')){
        modal_cal.classList.remove('er_message')
        modal_show.classList.add('preloader-show')
        //document.querySelector('.modal_window_cal').style.opacity="0.5"
        document.querySelector('#schedule').style.opacity="0"
        document.querySelector('#add_newtask_cal').style.display="none"
        document.querySelector('#edit_cal').style.display="flex"
        currentId = getIdChange(e)
        let check_label = modal_cal.querySelectorAll('input[name="all"]')
        check_label.forEach(item =>{
            if(item.value === e.target.parentElement.parentElement.previousElementSibling.children[2].textContent){
                console.log(item.value)
                return item.checked =true
            }

        })
        let check_priority =modal_cal.querySelectorAll('input[name="all_priority"]')
        check_priority.forEach(item =>{
            if(item.value === e.target.parentElement.parentElement.previousElementSibling.children[0].children[0].id){
                //console.log(item.value)
                return item.checked =true
            }
            //console.log(item.value)
            //console.log(e.target.parentElement.parentElement.previousElementSibling.children[0].children[0].id)
        })
        taskCal.value = e.target.parentElement.parentElement.previousElementSibling.children[1].textContent
        taskCalDescr = e.target.parentElement.parentElement.previousElementSibling.children[3].textContent
        allSchedule.classList.add('er_message')
    }
   
})
function closeModalCal(){
    modal_cal.classList.add('er_message')
    modal_show.classList.remove('preloader-show')
   // document.querySelector('.modal_window_cal').style.opacity="0"
    taskCal.value=''
    taskCalDescr.value =''
    clicked=null
    getTaskCal()
    //load()
}
let nav = 0
let clicked = null
let events=[]
//let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [] //нашла такую запись условия
const weekdays =['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const calendar = document.querySelector('#calendar')
let modal_cal=document.querySelector('#add_task_calendar')
let taskCal=document.querySelector('#editor9')
let taskCalDescr=document.querySelector('#editor10')
let allSchedule = document.querySelector('#add_task_schedule')

const getTaskCal = async(dayString,daySquare) =>{
    let URL_TODAY = 'http://localhost:3000/tasks'
    const res = await fetch(URL_TODAY)
    const data = await res.json()
    let containerDay = document.querySelectorAll('.day')
    data.forEach(item => {
    
        if(item.date === dayString){
              const eventDiv = document.createElement('div');
                eventDiv.innerText = item.title;
                eventDiv.setAttribute("data-id", item.id)
                daySquare.appendChild(eventDiv); 
        }
})
}
const getDayTasks=async()=>{
    let URL_TODAY = 'http://localhost:3000/tasks'
    const res = await fetch(URL_TODAY)
    const data = await res.json()
    let container = document.querySelector('#seeAll')
    container.innerHTML=""
    data.forEach(item => {
       
        if(item.date === clicked){
            if(item.priority === "Priority 1"){
                container.innerHTML+=`
                <div class="task_list task_list_sch">
                    <div data-show="${item.id}">
                        <span class="check check_sch"><input type="checkbox" class="done_task color_red" id="${item.priority}"></span>
                        <span class="title_task">${item.title}</span>
                        <span class="info_label">${item.label}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit edit_sch">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>    
                `
            }
            if(item.priority === "Priority 2"){
                container.innerHTML+=`
                <div class="task_list task_list_sch">
                    <div data-show="${item.id}">
                        <span class="check check_sch"><input type="checkbox" class="done_task color_orange" id="${item.priority}"></span>
                        <span class="title_task">${item.title}</span>
                        <span class="info_label">${item.label}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit edit_sch">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>    
                `
            }
            if(item.priority ==="Priority 3"){
                container.innerHTML+=`
                <div class="task_list task_list_sch">
                    <div data-show="${item.id}">
                        <span class="check check_sch"><input type="checkbox" class="done_task color_blue" id="${item.priority}"></span>
                        <span class="title_task">${item.title}</span>
                        <span class="info_label">${item.label}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit edit_sch">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>    
                `
            }
            if(item.priority === "Priority 4"){
                container.innerHTML+=`
                <div class="task_list task_list_sch">
                    <div data-show="${item.id}">
                        <span class="check check_sch"><input type="checkbox" class="done_task" id="${item.priority}"></span>
                        <span class="title_task">${item.title}</span>
                        <span class="info_label">${item.label}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit edit_sch">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>    
                `
            }
        }

    })
    /* if(container.innerHTML===''){
        container.innerHTML+=`
        <div class="noPlans">All clear! You don't have plans for this day yet</div>
        `
    } */

    if(container.hasChildNodes()=== false){
        closeSchedule()
    }
}
const getIdSch=(e)=>{
    if(e.target.closest('.check_sch')){
        //console.log(e.target.closest('.check_sch').parentElement)
        return e.target.closest('.check_sch').parentElement.dataset.show
    }
}
const getIdChange=(e)=>{
    if(e.target.closest('.edit_sch')){
        console.log(e.target.closest('.edit_sch').previousElementSibling)
        return e.target.closest('.edit_sch').previousElementSibling.dataset.show
    }
}
document.querySelector('#seeAll').addEventListener('click', (e)=>{
     if(e.target.closest('.check_sch')){
        currentId = getIdSch(e);
        //console.log(currentId)
        deleteDataSch(currentId)
    }
    
})
document.querySelector('#edit_cal').addEventListener('click', (e)=>{
    //currentId=getIdChange(e)
    console.log(currentId)
   
    changeSchedule(currentId)
    

})
const changeSchedule=async(curId)=>{
    let taskCal=document.querySelector('#editor9').value
    let taskCalDescr=document.querySelector('#editor10').value
    document.querySelector('#editor9').value=''
    document.querySelector('#editor10').value=''
    let label = getChecked()
    let priority = getCheckedPriority() 
    await fetch(`http://localhost:3000/tasks/${curId}`,
    {
        method: 'PATCH',
        body: JSON.stringify(
            {
                
                "title": taskCal,
                "description": taskCalDescr,
                "label": label,
                "priority": priority
                
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
   
    closeModalCal()
    load()
    getData()
    getDataToday()
    document.querySelector('#schedule').style.opacity="1"
   

}
const deleteDataSch = async(curId) => {
  await fetch(`http://localhost:3000/tasks/${curId}`,
    {
        method: 'DELETE'
    })
    load()
    getDayTasks()
    getDataToday()
    getData()
  

}
function load(){    
    const dt = new Date()
    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav)
    }
    const day = dt.getDate()
    const month =dt.getMonth()
    const year = dt.getFullYear()
    //console.log(day, month,year)
    const daysInMonth = new Date(year, month + 1, 0).getDate()//первый день - 1 след. месяца
    //console.log(daysInMonth)
    const firstDayOfMonth = new Date(year, month, 1)
    const dateString = firstDayOfMonth.toLocaleDateString('en-gb',{
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    //console.log(dateString)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0])
    document.querySelector('#monthDisplay').textContent=`${dt.toLocaleDateString('en-eg',{
        month: 'long'
    })} ${year}`
    //console.log(paddingDays)
    calendar.innerHTML ='' 
    for(let i=1; i<=paddingDays+daysInMonth; i++){
        const daySquare = document.createElement('div')
        daySquare.classList.add('day')
        const dayString = `${i-paddingDays}/${month+1}/${year}`
        if(i > paddingDays){
            getTaskCal(dayString,daySquare)
            //console.log(data)
            daySquare.textContent = i-paddingDays            
            daySquare.addEventListener('click',()=> {
                if(!daySquare.hasChildNodes()){
                    document.querySelector('#schedule').style.opacity="0.5"
                }
                showModal(dayString)
            })
        }else{
            daySquare.classList.add('padding')
        }
        calendar.appendChild(daySquare)
        
    }
}


const showModal=(date)=>{
        clicked=date
        modal_cal.classList.remove('er_message')
        modal_show.classList.add('preloader-show')
       // document.querySelector('.modal_window_cal').style.opacity="0.5"
        getDayTasks()
/*         let allTask= document.querySelectorAll('.task_list_sch')
        if(allTask.length===0){
            document.querySelector('#schedule').style.opacity="0.5"
        }
        if(allTask.length!==0){
            document.querySelector('#schedule').style.opacity="1"
        } */  //не знаю куда всунуть эту проверку, чтоб, если дел нет, то кнопка была полупрозрачная и неактивная
        
        

    
}
const showSchedule =()=>{
        modal_cal.classList.add('er_message')
        allSchedule.classList.remove('er_message')
        modal_show.classList.add('preloader-show')
        //document.querySelector('.modal_window_cal').style.opacity="0.5"
}
const closeSchedule=()=>{
    //modal_cal.classList.remove('er_message')
    allSchedule.classList.add('er_message')
    modal_show.classList.remove('preloader-show')
   // document.querySelector('.modal_window_cal').style.opacity="0" 
    document.querySelector('#add_newtask_cal').style.display="flex"
    document.querySelector('#edit_cal').style.display="none"
    document.querySelector('#schedule').style.opacity="1"

    
}

document.querySelector('#schedule').addEventListener('click', (e)=>{
    closeModalCal()
    showSchedule()
    
})
allSchedule.addEventListener('click', (e)=>{
    if(e.target.closest('#cancel_scedule')){
        closeSchedule()
        
    }
})
 const postDataCal = async () => {
    let label = getChecked()
    let priority = getCheckedPriority()
    let dt = new Date()
    let date_created = dt.toLocaleDateString('en-gb',{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    await fetch('http://localhost:3000/tasks',
    {
        method: 'POST',
        body: JSON.stringify(
            { 
                "title": taskCal.value,
                "description": taskCalDescr.value,
                "date": clicked,
                "label": label,
                "priority": priority,
                "created" : date_created
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
   
    closeModalCal()
    load()
    getDataToday()
    getData()
   
}
document.querySelector('#add_newtask_cal').addEventListener('click', ()=>{
    if(document.querySelector('#editor9').value.trim()!==''){
        postDataCal()
        clearCheckbox()
        clearCheckboxPriority()
    }

} ) 

//кнопки
const initButtons=()=>{
    document.querySelector('#nextButton').addEventListener('click', ()=>{
        nav++
        load()
    })
    document.querySelector('#backButton').addEventListener('click', ()=>{
        nav--
        load()
    })
    //document.querySelector('#add_newtask_cal').addEventListener('click', saveEvent)
   document.querySelector('#cancel_cal').addEventListener('click', () =>{
    closeModalCal()
    closeSchedule()

   })
   
}

/* const cutString = (string)=>{
    return string.substring(0, 2)
}
const cutData =()=>{
    if(document.querySelector('#weekdays').classList.contains('cut')){
        document.querySelector('#weekdays').querySelectorAll('div').forEach(item=>{
            cutString(item.textContent)
        })
    }
}
cutData() */

//getTaskCal()
initButtons()
load()
