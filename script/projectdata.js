// отправить на сервер
const postDataProject = async() => {
    const name_project = document.querySelector('#editor5').value;
    const descr_project= document.querySelector('#editor6').value;
    document.querySelector('#editor5').value=''
    document.querySelector('#editor6').value=''
    await fetch('http://localhost:3000/projects',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "title": name_project,
                "description": descr_project,
                "num": "1"
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    getDataProject()
   
}
const getIdProject = (e) =>{
    if(e.target.closest('.close')){
        console.log(e.target.closest('.close').parentElement.dataset.id)
        return e.target.closest('.close').parentElement.dataset.id
    }
}
document.querySelector('.todo-container').addEventListener('click', (e)=>{
    if(e.target.closest('.close')){
        currentId = getIdProject(e);
        deleteDataProject(currentId)
    }
    
})
const deleteDataProject = async(curId) => {
  await fetch(`http://localhost:3000/projects/${curId}`,
    {
        method: 'DELETE'
    })
    getDataProject()

}
const patchProjectData= async(curId, number)=>{
    await fetch(`http://localhost:3000/projects/${curId}`,
    {
        method: 'PATCH',
        body: JSON.stringify(
            {
                "num": number
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
}


const getDataProject = async() =>{
    let URL_PROJECT = 'http://localhost:3000/projects'
    const res = await fetch(URL_PROJECT)
    const data = await res.json()
    allStatus.forEach((status, index)=>{{
        const headTitle = status.children[0];
        status.innerHTML = '';
        status.append(headTitle);
        if(index === 0){
            status.innerHTML += '<button id="add_btn">+ Add Todo</button>';
        }
        
    }})
    data.forEach(item => {
        allStatus.forEach((status)=>{
            if(status.dataset.num===item.num){
            /* switch(status.dataset.num===2){
                case: */
                status.innerHTML+=`
                <div class="todo" data-id="${item.id}" draggable="true">
                    <p class="name">${item.title}</p>
                    <p class="descr">${item.description}</p>
                    <span class="close"><i class="fas fa-times"></i></span>
                </div>
            `
            
                document.querySelectorAll('.todo').forEach(item=>{
                    item.addEventListener('dragstart', dragStart)
                })
                document.querySelectorAll('.todo').forEach(item=>{
                    item.addEventListener('dragend', dragEnd)
                })
                
            }
        })
    })
    
  
}
getDataProject()



const postDataProjectLabels = async () => {
    let URL_LABEL = 'http://localhost:3000/project_name'
    const name_input = document.querySelector('#inputProject').value;
    document.querySelector('#inputProject').value=''
    await fetch(URL_LABEL,
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "title": name_input,
               
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    getDataProjectLabel()
   
}

document.querySelector('#btn_project').addEventListener('click',()=>{
    if(document.querySelector('#inputProject').value.trim()!==''){
        postDataProjectLabels()
        document.querySelector('.project_name').classList.add('er_message')
        document.querySelector('.over_modal').style.opacity="0"
        document.querySelector('.drag_drop').style.display="flex"
        document.querySelector('#main_inbox').style.display="none"
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#task_cal').style.display="none" 
    }
})

//загрузить с сервера
const getDataProjectLabel = async() =>{
    let URL_LABEL = 'http://localhost:3000/project_name'
    const res = await fetch(URL_LABEL)
    const data = await res.json()
    const container= document.querySelector('#project_container')
    container.innerHTML=''
    data.forEach((item)=>{
        container.innerHTML +=`
        <p data-id="${item.id}"><a href=#  class="project_collection">${item.title}</a><span class="more_info">...</span></p>
        `
    })

}
getDataProjectLabel()

document.querySelector('#project_container').addEventListener('click',(e)=>{
        if(e.target.closest('.more_info')){
        document.querySelector('#inputProject').value = e.target.previousElementSibling.textContent
        document.querySelector('.project_name').classList.remove('er_message')
        document.querySelector('.over_modal').style.opacity="0.5"
        document.querySelector('#delete_project').style.display="flex"
        document.querySelector('#edit_project').style.display="flex"
        document.querySelector('#btn_project').style.display="none"
        document.querySelector('#cancel_project').style.display="none"
        currentId = getIdLabel(e);
        console.log(currentId)
    }
})