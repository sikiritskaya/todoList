document.addEventListener('click',(e)=>{
    if(e.target === document.querySelector('#cancel_project') || e.target.closest('#cancel_pr')|| e.target === document.querySelector('#delete_project')){
        document.querySelector('#inputProject').value=''
        document.querySelector('.project_name').classList.add('er_message')
        modal_show.classList.remove('preloader-show')
        //document.querySelector('.over_modal').style.opacity="0"
        document.querySelector('#delete_project').style.display="none"
        document.querySelector('#edit_project').style.display="none"
        document.querySelector('#btn_project').style.display="flex"
        document.querySelector('#cancel_project').style.display="flex"
    }
})
const postInfo = async () => {
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
    getDataInfo()
   
}

document.querySelector('#btn_project').addEventListener('click',()=>{
    if(document.querySelector('#inputProject').value.trim()!==''){
        postInfo()
        document.querySelector('.project_name').classList.add('er_message')
        //document.querySelector('.over_modal').style.opacity="0"
        modal_show.classList.remove('preloader-show')
        document.querySelector('.drag_drop').style.display="flex"
        document.querySelector('#main_inbox').style.display="none"
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#task_cal').style.display="none" 
    }
})

//загрузить с сервера
const getDataInfo = async() =>{
    let URL_LABEL = 'http://localhost:3000/project_name'
    const res = await fetch(URL_LABEL)
    const data = await res.json()
    const container= document.querySelector('#project_container')
    container.innerHTML=''
    data.forEach((item)=>{
        container.innerHTML +=`
            <p data-id="projects1"><a href="#projects1" class="project_collection">${item.title}</a><span data-id="${item.id}" class="more_info">...</span></p>
        `
        
    })
    /*  container.innerHTML +=`
        <p data-id="projects1"><a href="#projects1" class="project_collection">${data[0].title}</a><span data-id="${data[0].id}" class="more_info">...</span></p>
        <p data-id="projects2"><a href="#projects2" class="project_collection">${data[1].title}</a><span data-id="${data[1].id}" class="more_info">...</span></p>
        <p data-id="projects3"><a href="#projects" class="project_collection">${data[2].title}</a><span data-id="${data[2].id}" class="more_info">...</span></p>
    ` */
} 
let projectNum = 0
document.querySelector('#project_container').addEventListener('click', (e) => {
    if(e.target.classList.contains('project_collection')){
        projectNum = e.target.parentElement.dataset.id;
        document.querySelector('.drag_drop').style.display="block"
        document.querySelector('#main_inbox').style.display='none'
        document.querySelector('#main_today').style.display='none'
        document.querySelector('#task_cal').style.display="none"
        getDataProject(`http://localhost:3000/${e.target.parentElement.dataset.id}`) 

    }
})
getDataInfo()
let idForDelete =0
const getInfoForDelete = (e)=>{
    if(e.target.closest('.more_info')){
        return e.target.parentElement.dataset.id
    }
}
const getIdProjectName = (e) =>{
    if(e.target.closest('.more_info')){
        return e.target.closest('.more_info').dataset.id
    }
}
document.querySelector('#project_container').addEventListener('click',(e)=>{
        if(e.target.closest('.more_info')){
        document.querySelector('#inputProject').value = e.target.previousElementSibling.textContent
        document.querySelector('.project_name').classList.remove('er_message')
        modal_show.classList.add('preloader-show')
        document.querySelector('#delete_project').style.display="flex"
        document.querySelector('#edit_project').style.display="flex"
        document.querySelector('#btn_project').style.display="none"
        document.querySelector('#cancel_project').style.display="none"
        currentId = getIdProjectName(e);
        idForDelete = e.target.parentElement.dataset.id
        console.log(idForDelete)
    }
})

const putDataProjectLabels = async(curId) => {
    const name_input = document.querySelector('#inputProject').value;
    document.querySelector('#inputProject').value=''
    await fetch(`http://localhost:3000/project_name/${curId}`,
    {
        method: 'PUT',
        body: JSON.stringify(
            {
                "title": name_input
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
        document.querySelector('.project_name').classList.add('er_message')
        modal_show.classList.remove('preloader-show')
        document.querySelector('#delete_project').style.display="none"
        document.querySelector('#edit_project').style.display="none"
        document.querySelector('#btn_project').style.display="flex"
        document.querySelector('#cancel_project').style.display="flex"
        getDataInfo()
}
    document.querySelector('#edit_project').addEventListener('click', ()=>{
    if(document.querySelector('#inputProject').value.trim()!==''){
        putDataProjectLabels(currentId)
    }
    
    }) 

//удалить

/* const deleteIdLabel = (e) =>{
    //console.log(e.target.closest('.edit').previousElementSibling.dataset.id);
    if(e.target.closest('.more_info')){
        console.log(e.target.closest('.more_info').parentElement)
        return e.target.closest('.more_info').parentElement.dataset.id
    }
} */
 document.querySelector('#delete_project').addEventListener('click', (e)=>{
    document.querySelector('#delete_project').style.display="none"
    document.querySelector('#edit_project').style.display="none"
    document.querySelector('#btn_project').style.display="flex"
    document.querySelector('#cancel_project').style.display="flex"
    //deleteAllProject(`http://localhost:3000/${idForDelete}`)
    deleteDataProjectLabel(currentId)
    

    
}) 
const deleteDataProjectLabel = async(curId) => {
  await fetch(`http://localhost:3000/project_name/${curId}`,
    {
        method: 'DELETE'
    })
    getDataInfo()
    
}