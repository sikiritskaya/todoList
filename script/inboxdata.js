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
const postData = async (title,descr) => {
    const name_input = document.querySelector(title).value;
    const descr_input= document.querySelector(descr).value;
    document.querySelector(title).value=''
    document.querySelector(descr).value=''
    let dt = new Date()
    let date = dt.toLocaleDateString('en-gb',{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
   /*  let taskObj = {
        "title": name_input,
        "description": descr_input
    } */
    await fetch('http://localhost:3000/tasks',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "title": name_input,
                "description": descr_input,
                "date": date
                
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    getData()
   
}
document.querySelector('#add_newtask2').addEventListener('click',()=>{ 
    if(document.querySelector('#editor3').value.trim()!==''){
        postData('#editor3', '#editor4')
    }
     
})
document.querySelector('#add_newtask').addEventListener('click',()=>{ 
    if(document.querySelector('#editor1').value.trim()!==''){
        postData('#editor1', '#editor2')
    }
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
        containerTasks.innerHTML += `
                <div class="task_list task_list_inbox">
                    <div data-id="${item.id}">
                        <span class="check check_inbox"><input type="checkbox" class="done"></span>
                        <span class="title_task">${item.title}</span>
                        <p class="descr_task">${item.description}</p>
                    </div>
                    <div class="edit edit_inbox">
                        <a href=#>
                            <i class="far fa-edit"></i>
                        </a>
                    </div>
                </div>
                `
    })
    counter(data.length)
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
        console.log(e.target.parentElement.parentElement.previousElementSibling.children[2])
        document.querySelector('#editor3').value = e.target.parentElement.parentElement.previousElementSibling.children[1].textContent
        document.querySelector('#editor4').value = e.target.parentElement.parentElement.previousElementSibling.children[2].textContent
        addTask2.classList.remove('er_message')
        btnAdd.style.display = "none"
        btnChange.style.display="inline"
        
    }
    
})

//изменить данные
const putData = async(curId) => {
    const name_input = document.querySelector('#editor3').value;
    const descr_input= document.querySelector('#editor4').value;
    document.querySelector('#editor3').value=''
    document.querySelector('#editor4').value=''
    await fetch(`http://localhost:3000/tasks/${curId}`,
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
    addTask2.classList.add('er_message')
    let btnAdd= document.querySelector('#add_newtask2')
    let btnChange = document.querySelector('#change')
    btnAdd.style.display = "inline"
    btnChange.style.display="none"
    getData()
}
document.querySelector('#change').addEventListener('click', ()=>{
    if(document.querySelector('#editor3').value.trim()!==''){
        putData(currentId)
    }
    
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

}
//поиск
 
search.addEventListener('input',()=>{
    getData(search.value.trim())
})