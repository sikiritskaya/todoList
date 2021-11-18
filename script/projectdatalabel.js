document.addEventListener('click',(e)=>{
    if(e.target === document.querySelector('#cancel_project') || e.target.closest('#cancel_pr')|| e.target === document.querySelector('#delete_project')){
        document.querySelector('#inputProject').value=''
        document.querySelector('.project_name').classList.add('er_message')
        document.querySelector('.over_modal').style.opacity="0"
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
        document.querySelector('.over_modal').style.opacity="0"
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
        <p data-id="${item.id}"><a href=#  class="project_collection">${item.title}</a><span class="more_info">...</span></p>
        `
    })

}
getDataInfo()

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
        document.querySelector('.over_modal').style.opacity="0"
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
    deleteDataProjectLabel(currentId)
    
    
}) 
const deleteDataProjectLabel = async(curId) => {
  await fetch(`http://localhost:3000/project_name/${curId}`,
    {
        method: 'DELETE'
    })
    getDataInfo()

}