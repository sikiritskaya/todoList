const containerLabels= document.querySelector('#label_container')
let labels = document.querySelectorAll('.icon-label')

labels.forEach(label=>{
    label.addEventListener('click', ()=>{
        console.log(label.textContent)
    })
})

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
        modal_show.classList.remove('preloader-show')
    }
})

//загрузить с сервера
const getDataLabel = async() =>{
    let URL_LABEL = 'http://localhost:3000/labels'
    const res = await fetch(URL_LABEL)
    const data = await res.json()
    const container= document.querySelector('#label_container')
    const containerList = document.querySelector('#labelList')
    const containerList2 = document.querySelector('#labelList2')
    const containerList3 = document.querySelector('#labelList3')
    const containerList4 = document.querySelector('#labelList4')
    containerList.innerHTML=''
    container.innerHTML=''
    data.forEach((item)=>{
        container.innerHTML +=`
        <p data-id="${item.id}"><a href=# class="label_panel">${item.title}</a><span class="more_info">...</span></p>
        `
        containerList.innerHTML+=`
        <li class="icon-label"><input type="checkbox" name="all" value="${item.title}" >${item.title}</li>
        `
        containerList2.innerHTML+=`
        <li class="icon-label"><input type="checkbox" name="all" value="${item.title}" >${item.title}</li>
        `
        containerList3.innerHTML+=`
        <li class="icon-label"><input type="checkbox" name="all" value="${item.title}" >${item.title}</li>
        `
        containerList4.innerHTML+=`
        <li class="icon-label"><input type="checkbox" name="all" value="${item.title}" >${item.title}</li>
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
        modal_show.classList.add('preloader-show')
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
        modal_show.classList.remove('preloader-show')
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
    //putData()

}