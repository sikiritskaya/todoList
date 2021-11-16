// отправить на сервер
const postDataProject = async(name,descr,numer) => {
    //const name_project = document.querySelector('#editor5').value;
    //const descr_project= document.querySelector('#editor6').value;
    document.querySelector('#editor5').value=''
    document.querySelector('#editor6').value=''
    await fetch('http://localhost:3000/projects',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "title": name,
                "description": descr,
                "num": numer
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    //getDataProject()
   
}
const getIdProject = (e) =>{
    if(e.target.closest('.edit')){
        return e.target.closest('.edit').previousElementSibling.dataset.id
    }
}
const patchProjectData= async(curId, num)=>{
    await fetch(`http://localhost:3000/projects/${curId}`,
    {
        method: 'PATCH',
        body: JSON.stringify(
            {
                "num": num
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
    //let container = document.querySelector('#todo-container')
    data.forEach(item => {
        allStatus.forEach((status)=>{
            if(status.dataset.num===item.num){
            /* switch(status.dataset.num){
                case status.dataset.num === 2: */
                status.innerHTML+=`
                <div class="todo" data-id="${item.id}" draggable="true">
                    <p class="name">${item.title}</p>
                    <p class="descr">${item.description}</p>
                    <span class="close"><i class="fas fa-times"></i></span>
                </div>
            
            `
            }
        })
    })
    
  
}
//getDataProject()
