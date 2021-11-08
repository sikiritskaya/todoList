document.addEventListener('click',(e)=>{
    if(e.target.closest('#upcoming')){
        document.querySelector('#task_cal').style.display="flex"
        document.querySelector('.drag_drop').style.display="none"
        document.querySelector('#main_inbox').style.display='none'
        document.querySelector('#main_today').style.display='none'
    }
})
function closeModalCal(){
    modal_cal.classList.add('er_message')
    document.querySelector('.modal_window_cal').style.opacity="0"
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



const getTaskCal = async() =>{
    let URL_TODAY = 'http://localhost:3000/calendar'
    const res = await fetch(URL_TODAY)
    const data = await res.json()
    
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

            data.forEach(item => {
                if(item.date === dayString){
                    const eventDiv = document.createElement('div');
                    eventDiv.innerText = item.title;
                    daySquare.appendChild(eventDiv);
                }
            });
            //console.log(data)
            daySquare.textContent = i-paddingDays            
            daySquare.addEventListener('click',()=> showModal(dayString))
        }else{
            daySquare.classList.add('padding')
        }
        calendar.appendChild(daySquare)
    }
}


const showModal=(date)=>{
    clicked=date
    const eventForDay = events.find(e =>e.date===clicked)
    if(eventForDay){
        console.log('!!!!')
    }else{
        modal_cal.classList.remove('er_message')
        document.querySelector('.modal_window_cal').style.opacity="0.5"
    }
}
/* function load(){
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
            const eventForDay = events.find((e)=>e.date===dayString)
            console.log(eventForDay)
            daySquare.textContent = i-paddingDays
            if(eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }
            
            daySquare.addEventListener('click',()=> showModal(dayString))
        }else{
            daySquare.classList.add('padding')
        }
        calendar.appendChild(daySquare)
    }
} */
/* function saveEvent(){
    if(taskCal.value.trim() !==''){
        events.push({
            date: clicked,
            title: taskCal.value,
            description: taskCalDescr.value
        })
        closeModalCal()
        localStorage.setItem('events', JSON.stringify(events))
    }
} */

 const postDataCal = async () => {
    //document.querySelector('#editor9').value=''
    //document.querySelector('#editor10').value=''
    await fetch('http://localhost:3000/calendar',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "date": clicked,
                "title": taskCal.value,
                "description": taskCalDescr.value
                
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    closeModalCal()
    getTaskCal()
   
}
document.querySelector('#add_newtask_cal').addEventListener('click', postDataCal) 

//кнопки
const initButtons=()=>{
    document.querySelector('#nextButton').addEventListener('click', ()=>{
        nav++
        getTaskCal()
        //load()
    })
    document.querySelector('#backButton').addEventListener('click', ()=>{
        nav--
        getTaskCal()
        //load()
    })
    //document.querySelector('#add_newtask_cal').addEventListener('click', saveEvent)
   document.querySelector('#cancel_cal').addEventListener('click', closeModalCal)
   
}
getTaskCal()
initButtons()
//load()
