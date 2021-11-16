const containerLabels= document.querySelector('#label_container')

//post
const postDataLabels = async () => {
    let URL_LABEL = 'http://localhost:3000/labels'
    const name_input = document.querySelector('#inputLabel').value;
    document.querySelector('#inputLabel').value=''
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
    getDataLabel()
   
}
document.querySelector('#btn_label').addEventListener('click',()=>{
    if(document.querySelector('#inputLabel').value.trim()!==''){
        postDataLabels()
        document.querySelector('#label').classList.add('er_message')
        document.querySelector('.modal_window').style.opacity="0"
    }
})

//загрузить с сервера
const getDataLabel = async() =>{
    let URL_LABEL = 'http://localhost:3000/labels'
    const res = await fetch(URL_LABEL)
    const data = await res.json()
    const container= document.querySelector('#label_container')
    container.innerHTML=''
    data.forEach((item)=>{
        container.innerHTML +=`
        <p data-id="${item.id}"><a href=#>${item.title}</a><span class="more_info">...</span></p>
    
        `
    })

}
getDataLabel()

const getIdLabel = (e) =>{
    if(e.target.closest('.more_info')){
        return e.target.closest('.more_info').parentElement.dataset.id
    }
}
//изменить данные

containerLabels.addEventListener('click',(e)=>{
    if(e.target.closest('.more_info')){
        document.querySelector('#inputLabel').value = e.target.previousElementSibling.textContent
        document.querySelector('#label').classList.remove('er_message')
        document.querySelector('.modal_window').style.opacity="0.5"
        document.querySelector('#delete_label').style.display="flex"
        document.querySelector('#edit_label').style.display="flex"
        document.querySelector('#btn_label').style.display="none"
        document.querySelector('#cancel_label').style.display="none"
        currentId = getIdLabel(e);
        //console.log(currentId)
    }
})

const putDataLabels = async(curId) => {
    const name_input = document.querySelector('#inputLabel').value;
    document.querySelector('#inputLabel').value=''
    await fetch(`http://localhost:3000/labels/${curId}`,
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
        document.querySelector('#label').classList.add('er_message')
        document.querySelector('.modal_window').style.opacity="0"
        document.querySelector('#delete_label').style.display="none"
        document.querySelector('#edit_label').style.display="none"
        document.querySelector('#btn_label').style.display="flex"
        document.querySelector('#cancel_label').style.display="flex"
    getDataLabel()
}
    document.querySelector('#edit_label').addEventListener('click', ()=>{
    if(document.querySelector('#inputLabel').value.trim()!==''){
        putDataLabels(currentId)
    }
    
    }) 

//удалить

const deleteIdLabel = (e) =>{
    //console.log(e.target.closest('.edit').previousElementSibling.dataset.id);
    if(e.target.closest('.more_info')){
        console.log(e.target.closest('.more_info').parentElement)
        return e.target.closest('.more_info').parentElement.dataset.id
    }
}
 document.querySelector('#delete_label').addEventListener('click', (e)=>{
    deleteDataLabel(currentId)
    
    
}) 
const deleteDataLabel = async(curId) => {
  await fetch(`http://localhost:3000/labels/${curId}`,
    {
        method: 'DELETE'
    })
    getDataLabel()

}