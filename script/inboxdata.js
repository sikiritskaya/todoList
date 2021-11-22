//let count = 0
const counter=(count)=>{
    //let count = document.getElementsByClassName('task_list_inbox').length
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
const postData = async (title,descr,date) => {
    const name_input = document.querySelector(title).value;
    const descr_input= document.querySelector(descr).value;
    let date_input = document.querySelector(date).value
    document.querySelector(title).value=''
    document.querySelector(descr).value=''
    document.querySelector('#calendar1').value=''
    document.querySelector('#calendar2').value=''
    let label = getChecked()
    let priority = getCheckedPriority()
        await fetch('http://localhost:3000/tasks',
        {
            method: 'POST',
            body: JSON.stringify(
                {
                    "title": name_input,
                    "description": descr_input,
                    "date": date_input,
                    "label": label,
                    "priority": priority
                    
                }
            ),
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        })
 

    getData()
    load()
    getDataToday()
   
}

document.querySelector('#add_newtask2').addEventListener('click',()=>{ 
        if(document.querySelector('#editor3').value.trim()!==''){  
            postData('#editor3', '#editor4','#calendar1')
        }
        
        clearCheckbox()
        clearCheckboxPriority()
 
     
})
document.querySelector('#add_newtask').addEventListener('click',()=>{ 
    if(document.querySelector('#editor1').value.trim()!==''){
        postData('#editor1', '#editor2','#calendar2')
        document.querySelector('.modal_window').style.opacity="0"
        addTask.classList.add('er_message')
    }
    clearCheckbox()
    clearCheckboxPriority()
})

//загрузить с сервера

const getData = async(term) =>{
    let URL_DATA = 'http://localhost:3000/tasks'
    if(term){
        URL_DATA += `?_sort=id&_order=desc&q=${term}`
    }
    const res = await fetch(URL_DATA)
    const data = await res.json()
    let containerTasks = document.querySelector('#list_inbox');
    containerTasks.innerHTML = '';
    //count=data.length
    data.forEach((item)=>{
        if(item.priority === "Priority 1"){
        containerTasks.innerHTML += `
                <div class="task_list task_list_inbox">
                    <div data-id="${item.id}">
                        <span class="check check_inbox"><input type="checkbox" class="done color_red" id="${item.priority}"></span>
                        <span class="title_task">${item.title}</span>
                        <span class="info_label">${item.label}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit edit_inbox">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>
          
                  `
        }
        if(item.priority === "Priority 2"){
            containerTasks.innerHTML += `
            <div class="task_list task_list_inbox">
                <div data-id="${item.id}">
                    <span class="check check_inbox"><input type="checkbox" class="done color_orange" id="${item.priority}"></span>
                    <span class="title_task">${item.title}</span>
                    <span class="info_label">${item.label}</span>   
                    <p class="descr_task">${item.description}</p>
                </div>
                <div class="edit edit_inbox">
                    <a href=#>
                        <i class="far fa-edit"></i>
                    </a>
                </div>
            </div>
      
              `

        }
        if(item.priority ==="Priority 3"){
            containerTasks.innerHTML += `
            <div class="task_list task_list_inbox">
                <div data-id="${item.id}">
                    <span class="check check_inbox"><input type="checkbox" class="done color_blue" id="${item.priority}"></span>
                    <span class="title_task">${item.title}</span>
                    <span class="info_label">${item.label}</span> 
                    <p class="descr_task">${item.description}</p>
                </div>
                <div class="edit edit_inbox">
                    <a href=#>
                        <i class="far fa-edit"></i>
                    </a>
                </div>
            </div>
      
              `
        }
        if( item.priority === ""){
            containerTasks.innerHTML += `
            <div class="task_list task_list_inbox">
                <div data-id="${item.id}">
                    <span class="check check_inbox"><input type="checkbox" class="done" id="${item.priority}"></span>
                    <span class="title_task">${item.title}</span>
                    <span class="info_label">${item.label}</span> 
                    <p class="descr_task">${item.description}</p>
                </div>
                <div class="edit edit_inbox">
                    <a href=#>
                        <i class="far fa-edit"></i>
                    </a>
                </div>
            </div>
      
              `
        }
    })
    counter(data.length)
} 

const getDataSearch =async(term) =>{
    let URL_DATA = 'http://localhost:3000/tasks'
    
    URL_DATA += `?_sort=id&_order=desc&q=${term}`
    
    const res = await fetch(URL_DATA)
    const data = await res.json()
    let containerTasks = document.querySelector('#list_inbox');
    containerTasks.innerHTML = '';
    //count=data.length
    data.forEach((item)=>{
        if(item.priority === "Priority 1"){
        containerTasks.innerHTML += `
                <div class="task_list task_list_inbox">
                    <div data-id="${item.id}">
                        <span class="check check_inbox"><input type="checkbox" class="done color_red" id="${item.priority}"></span>
                        <span class="title_task">${item.title}</span>
                        <span class="info_label">${item.label}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit edit_inbox">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>
          
                  `
        }
        if(item.priority === "Priority 2"){
            containerTasks.innerHTML += `
            <div class="task_list task_list_inbox">
                <div data-id="${item.id}">
                    <span class="check check_inbox"><input type="checkbox" class="done color_orange" id="${item.priority}"></span>
                    <span class="title_task">${item.title}</span>
                    <span class="info_label">${item.label}</span>   
                    <p class="descr_task">${item.description}</p>
                </div>
                <div class="edit edit_inbox">
                    <a href=#>
                        <i class="far fa-edit"></i>
                    </a>
                </div>
            </div>
      
              `

        }
        if(item.priority ==="Priority 3"){
            containerTasks.innerHTML += `
            <div class="task_list task_list_inbox">
                <div data-id="${item.id}">
                    <span class="check check_inbox"><input type="checkbox" class="done color_blue" id="${item.priority}"></span>
                    <span class="title_task">${item.title}</span>
                    <span class="info_label">${item.label}</span> 
                    <p class="descr_task">${item.description}</p>
                </div>
                <div class="edit edit_inbox">
                    <a href=#>
                        <i class="far fa-edit"></i>
                    </a>
                </div>
            </div>
      
              `
        }
        if( item.priority === ""){
            containerTasks.innerHTML += `
            <div class="task_list task_list_inbox">
                <div data-id="${item.id}">
                    <span class="check check_inbox"><input type="checkbox" class="done" id="${item.priority}"></span>
                    <span class="title_task">${item.title}</span>
                    <span class="info_label">${item.label}</span> 
                    <p class="descr_task">${item.description}</p>
                </div>
                <div class="edit edit_inbox">
                    <a href=#>
                        <i class="far fa-edit"></i>
                    </a>
                </div>
            </div>
      
              `
        }
    })
}

let currentId = 0;
const getIdUser = (e) =>{
    if(e.target.closest('.edit')){
        return e.target.closest('.edit').previousElementSibling.dataset.id
    }
}
document.querySelector('#main_inbox').addEventListener('click', (e)=>{
    if(e.target.closest('.edit_inbox')){
        currentId = getIdUser(e);
        let btnAdd= document.querySelector('#add_newtask2')
        let btnChange = document.querySelector('#change')
        let check_label = addTask2.querySelectorAll('input[name="all"]')
        check_label.forEach(item =>{
            if(item.value === e.target.parentElement.parentElement.previousElementSibling.children[2].textContent){
                //console.log(item.value)
                return item.checked =true
            }

        })
        let check_priority =addTask2.querySelectorAll('input[name="all_priority"]')
        check_priority.forEach(item =>{
            if(item.value === e.target.parentElement.parentElement.previousElementSibling.children[0].children[0].id){
                //console.log(item.value)
                return item.checked =true
            }
            //console.log(item.value)
            //console.log(e.target.parentElement.parentElement.previousElementSibling.children[0].children[0].id)
        })
        console.log(e.target.parentElement.parentElement.previousElementSibling.children[2])
        document.querySelector('#editor3').value = e.target.parentElement.parentElement.previousElementSibling.children[1].textContent
        document.querySelector('#editor4').value = e.target.parentElement.parentElement.previousElementSibling.children[3].textContent
        addTask2.classList.remove('er_message')
        btnAdd.style.display = "none"
        btnChange.style.display="inline"
        
    }
    
})

//изменить данные
const putData = async(curId) => {
    const name_input = document.querySelector('#editor3').value;
    const descr_input= document.querySelector('#editor4').value;
    let date = document.querySelector('.tcal').value
    document.querySelector('#editor3').value=''
    document.querySelector('#editor4').value=''
    document.querySelector('.tcal').value=""
    let label = getChecked()
    let priority = getCheckedPriority() 
    await fetch(`http://localhost:3000/tasks/${curId}`,
    {
        method: 'PATCH',
        body: JSON.stringify(
            {
                "title": name_input,
                "description": descr_input,
                "date": date,
                "label": label,
                "priority": priority

            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    addTask2.classList.add('er_message')
    let btnAdd= document.querySelector('#add_newtask2')
    let btnChange = document.querySelector('#change')
    btnAdd.style.display = "inline"
    btnChange.style.display="none"
    getData()
    getDataToday()
}
document.querySelector('#change').addEventListener('click', ()=>{
    if(document.querySelector('#editor3').value.trim()!==''){
        putData(currentId)
    }
    clearCheckbox()
    clearCheckboxPriority()
    
})

//удалить

const deleteId = (e) =>{
    //console.log(e.target.closest('.edit').previousElementSibling.dataset.id);
    if(e.target.closest('.check_inbox')){
        return e.target.closest('.check_inbox').parentElement.dataset.id
    }
}
document.querySelector('#main_inbox').addEventListener('click', (e)=>{
    if(e.target.closest('.check_inbox')){
        currentId = deleteId(e);
        deleteData(currentId)
    }
    
})
const deleteData = async(curId) => {
  await fetch(`http://localhost:3000/tasks/${curId}`,
    {
        method: 'DELETE'
    })
    getData()
    getDataToday()

}
//поиск
 
search.addEventListener('input',()=>{
    getDataSearch(search.value.trim())
})