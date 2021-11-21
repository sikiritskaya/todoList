// отправить на сервер
let URL_PROJECT1 = 'http://localhost:3000/projects1'
let URL_PROJECT2 = 'http://localhost:3000/projects2'
let URL_PROJECT3 = 'http://localhost:3000/projects3'
const postDataProject = async(url) => {
    const name_project = document.querySelector('#editor5').value;
    const descr_project= document.querySelector('#editor6').value;
    document.querySelector('#editor5').value=''
    document.querySelector('#editor6').value=''
    await fetch(url,
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
    getDataProject(url)
   
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
        deleteDataProject(`http://localhost:3000/${projectNum}`,currentId)
    }
    
})
const deleteDataProject = async(url, curId) => {
  await fetch(`${url}/${curId}`,
    {
        method: 'DELETE'
    })
    getDataProject(url)

}
const deleteAllProject = async(url) => {
    await fetch(url,
    {
        method: 'DELETE'
    })
}
const patchProjectData= async(url,curId, number)=>{
    await fetch(`${url}/${curId}`,
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


const getDataProject = async(url) =>{
    const res = await fetch(url)
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
getDataProject(URL_PROJECT1)

