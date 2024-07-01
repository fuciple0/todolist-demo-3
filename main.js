//유저가 값을 입력한다
// + 버튼을 클릭하면 아이템이 더해짐. 할일이 추가된다.
// 유저가 delete버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 체크 버튼을 클릭하는 순간 false 를 true로 바꿔줌 
// true이면 끝난 걸로 간주하고 밑줄 프린트
// false이면 안끝난걸로 간주하고 그대로 

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나오게됨.
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴.

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs      = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line")
let taskList   = [] 
let filterList = []
let mode = "all"

for(let i =1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)
    })
}
//할일을 입력하고 나면 입력창이 자동으로 비워지게 해보자!! 
taskInput.addEventListener('focus',function(){taskInput.value=""})

addButton.addEventListener("click",addTask)
//taskInput 이벤트 - 엔터키 입력
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

function addTask(){
    //유효성 검사,공백,빈칸 입력시 알림창 
    if(taskInput.value.trim() == ''){
      alert('할 일을 입력해주세요')
      return
    } 

    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete:false
    }
    taskList.push(task)
    console.log(taskList)
    render()
}


function render(){
    let list = []
    if(mode === "all"){
        //taskList 보여줌
        list = taskList
    } else if(mode === "ongoing" || mode === "done"){
        //filterList 보여줌
        list = filterList
    } 
    let resultHTML = ''
    for(let i =0 ; i < list.length ; i++ ){
        if(list[i].isComplete == true){
           resultHTML += 
           ` <div class="task_check">
            <div class="task-done"> ${list[i].taskContent} </div>
            <div>
            <button class="btn btn-primary"  onclick="toggleCompler('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
            <button class="btn btn-primary"  onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div></div>`
 
        } else{
            resultHTML += ` <div class="task">
            <div class="task-ing"> ${list[i].taskContent} </div>
            <div>
            <button class="btn btn-primary" onclick="toggleCompler('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button class="btn btn-primary" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
            </div>`
        }  
    }
    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleCompler(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break
        }
    }
    render()
    console.log(taskList)
}

// function deleteTask(id){
//     taskList.forEach((item, index)=> {if(item.id == id) {
//         taskList.splice(index, 1);
//         }
//     });
//     render()
// }
function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1)
            break
        }
    } // 진행중, 끝남 탭에서 삭제할때 화면 적용
    for(let i=0; i<filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i, 1)
            break
        }
    }
    render()
}

function filter(event){
    underLine.style.left = event.currentTarget.offsetLeft + "px"
    underLine.style.width = event.currentTarget.offsetWidth + "px"
    underLine.style.top = event.currentTarget.offsetTop +event.currentTarget.offsetHeight+ "px"

    mode = event.target.id
    filterList = []
    if(mode === "all"){
        //전체리스트 보여줌
        render()
    } else if(mode === "ongoing"){
        //진행중
        for(let i =0 ; i < taskList.length ; i++ ){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render()
    } else if(mode === "done"){
        //완료
        for(let i =0 ; i < taskList.length ; i++ ){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()
    }

}


function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9)
}