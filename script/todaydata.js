const counterToday=()=>{
    let count = document.getElementsByClassName('task_list_today').length
    document.querySelector('#task-today').textContent = count
    if(count===0){
        document.querySelector('#task-today').style.opacity='0'
        document.querySelector('#footer_today').classList.remove('busy_pic')
        document.querySelector('#footer_today').classList.add('free_pic') 
        document.querySelector('#footer_today').innerHTML=`
        <p>All clear! Get some rest!</p>
        `
    }
    if(count!==0){
        document.querySelector('#task-today').style.opacity='1'
        document.querySelector('#footer_today').classList.remove('free_pic')
        document.querySelector('#footer_today').classList.add('busy_pic') 
        document.querySelector('#footer_today').innerHTML=`
        <p>Let's do it!</p>
        `
    }
}
// отправить на сервер
const postDataToday = async () => {
    const name_input = document.querySelector('#editor7').value;
    const descr_input= document.querySelector('#editor8').value;
    document.querySelector('#editor7').value=''
    document.querySelector('#editor8').value=''
   /*  let taskObj = {
        "title": name_input,
        "description": descr_input
    } */
    await fetch('http://localhost:3000/today',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "title": name_input,
                "description": descr_input
                
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    getDataToday()
   
}
document.querySelector('#add_newtask_today').addEventListener('click',()=>{ 
    if(document.querySelector('#editor7').value.trim()!==''){
        postDataToday()
    }
     
})

//загрузить с сервера
const getDataToday = async() =>{
    let URL_TODAY = 'http://localhost:3000/today'
/*     if(term){
        URL_DATA += `?_sort=id&_order=desc&q=${term}`
    } */
    const res = await fetch(URL_TODAY)
    const data = await res.json()
    let containerTasks = document.querySelector('#list_today');
    containerTasks.innerHTML = '';
    data.forEach((item)=>{
        containerTasks.innerHTML += `
                <div class="task_list task_list_today">
                    <div data-id="${item.id}">
                        <span class="check check_today"><input type="checkbox" class="done"></span>
                        <span class="title_task">${item.title}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit edit_today">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>
                `
    })
    counterToday()
}

//изменить данные

const putDataToday = async(curId) => {
    const name_input = document.querySelector('#editor7').value;
    const descr_input= document.querySelector('#editor8').value;
    document.querySelector('#editor7').value=''
    document.querySelector('#editor8').value=''
    await fetch(`http://localhost:3000/today/${curId}`,
    {
        method: 'PUT',
        body: JSON.stringify(
            {
                "title": name_input,
                "description": descr_input 
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    addTaskToday.classList.add('er_message')
    let btnAdd= document.querySelector('#add_newtask_today')
    let btnChange = document.querySelector('#change2')
    btnAdd.style.display = "inline"
    btnChange.style.display="none"
    getDataToday()
}
document.querySelector('#change2').addEventListener('click', ()=>{
    if(document.querySelector('#editor7').value.trim()!==''){
        putDataToday(currentId)
    }
    
})

//удалить

const deleteIdToday = (e) =>{
    //console.log(e.target.closest('.edit').previousElementSibling.dataset.id);
    if(e.target.closest('.check_today')){
        return e.target.closest('.check_today').parentElement.dataset.id
    }
}
document.querySelector('#main_today').addEventListener('click', (e)=>{
    if(e.target.closest('.check_today')){
        currentId = deleteIdToday(e);
        deleteDataToday(currentId)
    }
    
})
const deleteDataToday = async(curId) => {
  await fetch(`http://localhost:3000/today/${curId}`,
    {
        method: 'DELETE'
    })
    getDataToday()

}
//поиск
 
/* search.addEventListener('input',()=>{
    getData(search.value.trim())
}) */

/* document.querySelector('#main_today').addEventListener('click', ()=>{
    getDataToday()
}) */