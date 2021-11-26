
const postDeleted = async(name, descr)=>{
    let dt = new Date()
    let date_completed = dt.toLocaleDateString('en-gb',{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    await fetch('http://localhost:3000/deleted',
    {
        method: 'POST',
        body: JSON.stringify(
            {
                "title": name,
                "description": descr,
                "date-comleted": date_completed   
            }
        ),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
    getDeletedData()
    
}





const getDeletedData =async()=>{
    let URL_DATA = 'http://localhost:3000/deleted'
    const res = await fetch(URL_DATA)
    const data = await res.json()
    console.log(data)
    
    let containerDeleted = document.querySelector('#list_deleted');
    containerDeleted.innerHTML = '';
    //count=data.length
    data.forEach((item, index)=>{ 
        containerDeleted.innerHTML += `
                <div>
                    <div data-id="${item.id}">
                        <span class="title_task"> ${index+1} ${item.title}</span>
                        <p class="descr_task"> ${item.description}</p>
                    </div>
                </div>
          
                  `
    })
    countDoneTask(data.length)
    
}


const getInfo = async(curId) =>{
    const res = await fetch(`http://localhost:3000/tasks/${curId}`)
    const data = await res.json()
    console.log(data)
    postDeleted(data.title, data.description)

}
document.querySelector('.showAll').querySelector('a').addEventListener('click',()=>{
    document.querySelector('#list_deleted').classList.toggle('er_message')
    //getDeletedData()
})
const countDoneTask =(count)=>{
    document.querySelector('.countTask').textContent = `${count} completed tasks`
} 
getDeletedData()