
// Get Documents
let todo_input_work   = document.querySelector(".todo_form .task_name");
let todo_input_client = document.querySelector(".todo_form .client_name");
let todo_input_date   = document.querySelector(".todo_form .date");
let todo_input_time   = document.querySelector('#todo_time');

let todo_btn         = document.querySelector(".todo_form button");
let todo_progress    = document.querySelector(".todo_form .progress");
let todo_job_title   = document.querySelector(".todo_form .job_title");
let todo_error_msg   = document.querySelector(".card-body .error");
let todo_list   = document.querySelector("#todo_list");
let total_item   = document.querySelector(".card-footer p span");




todo_btn.onclick = (event) => {
    event.preventDefault();

    // Get input values
    let todo_work = todo_input_work.value;
    let todo_client = todo_input_client.value;
    let todo_date = todo_input_date.value;
    let todo_time = todo_input_time.value;



    // Storage
    let storageVal = localStorage.getItem('todoApp');
    let todoArr;

    // Date calculation
    let one = new Date(todo_date + ' ' + todo_time);
    let two = new Date();



    // object data
    let todo_input = {
        work: todo_work,
        owner: todo_client,
        date: todo_date,
        time: todo_time,
        remainTime : one.getTime() - two.getTime(),
        status : 'work' 
    };


    // Local Storage 
    if(storageVal == null){
        todoArr = [];
    }else{
        todoArr = JSON.parse(storageVal);
    }


    // Validation msg & data sending 
    if(todo_work == '' || todo_client == '' || todo_date == '' || todo_time == ''){
        todo_error_msg.innerText = "Feilds are required";
        todo_error_msg.style.color = "red";
    }else{

        todoArr.push(todo_input);

        localStorage.setItem('todoApp', JSON.stringify(todoArr));


        // input tags will be empty after adding data
        todo_input_work.value= '';
        todo_input_client.value = '';
        todo_input_date.value = '';
        todo_input_time.value = '';

    }
    
    todoShow();

    
  
}


// Counting process
let clrInt = setInterval(() => {
    todoShow();
},1000);



// Data show form localStorage
todoShow();
function todoShow(){

    // Data get form Storage 
    let storageVal = localStorage.getItem('todoApp');
    let todoArr;
    let data = '';


    // Local Storage 
    if(storageVal == null){
        todoArr = [];
    }else{
        todoArr = JSON.parse(storageVal);
    }

 
    // todo data showing to web
    todoArr.map((val, index) => {

        // Data showing
        if(val.status == 'work'){
            data += `<p class="job_title">Job : <b>${val.work}</b> | Client : <b>${val.owner}</b> | Remains Time : ${remainTime(val.date, val.time)} 
            <span class="float-right">
            <button style="background: none; border: none"><i onclick="todoComplete(${index})" style="color: green;"  class="fa fa-check-circle-o" aria-hidden="true"></i></button>
            <button style="background: none; border: none"><i style="color: red;" onclick="todoDelete(${index})" class="fa fa-trash" aria-hidden="true"></i></button>
            </span>
        </p>
        <div class="progress" style=" width:${progressBar(val.remainTime, val.date, val.time, index)} "></div>`;
        }else{

            data += `<p class="job_title">Job : <b>${val.work}</b> | Client : <b>${val.owner}</b> | Remains Time : <span style="color:green;"><b>Completed</b></span>
            <span class="float-right">
            <button style="background: none; border: none"><i onclick="todoComplete(${index})"  style="color: green;"  class="fa fa-check-circle-o" aria-hidden="true"></i></button>
            <button style="background: none; border: none"><i style="color: red;" onclick="todoDelete(${index})" class="fa fa-trash" aria-hidden="true"></i></button>
            </span>
        </p>
        <div class="progress" style=" width: 100%; background-color: green;"></div>`;

        }

       

    });

    
    todo_list.innerHTML = data;

    // items list 
    if(todoArr.length < 10){
        total_item.innerHTML = `${0}` + todoArr.length;
    }else{
        total_item.innerHTML = todoArr.length;
    }

}



// Remain time calculation
function remainTime(date, time, index){

    let countDownTime = new Date(date + ' ' + time).getTime();
    let currentTime = new Date().getTime();
    let distance  = countDownTime - currentTime;

    // Time calculation
    let d = Math.floor(distance / (1000 * 60 * 60 * 24));
    let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60));
    let s = Math.floor((distance % (1000 * 60 )) / (1000));

    // return data to todoShow function
    if(distance < 0){
        return '<span style="color:red;"><b>Time over</b></span>';

    }else{

       
        return `<b>${d}</b><small>d</small> <b>${h}</b><small>h</small> <b>${m}</b><small>m</small> <b>${s}</b><small>s</small> <span style="color:blue;"><b>Running</b></span>`;
        
    }

}



// progress bar range
function progressBar(reaminTime, date, time){

    let countDownTime = new Date(date + ' ' + time).getTime();
    let currentTime = new Date().getTime();
    let distance  = countDownTime - currentTime;
    let reaminPer = (distance*100)/reaminTime;
    let width = Math.floor(reaminPer);


    // Conditoin for range bar color
    if(width <= 0){
        width =`${100}%; background-color:red;`;
        
    }else if(width <= 30){
        width =`${width}%; background-color:yellow;`;
    }else if(width <= 60){
        width =`${width}%; background-color:blue;`;
    }else if( width <= 100){
        width =`${width}%; background-color:green;`;
    }

    return width;


}


// todo Delete
function todoDelete(index){

    // getting data form localstorage
    let storageVal = localStorage.getItem('todoApp');
    let todoArr;

    // Condition
    if(storageVal == null){
        todoArr = []
    }else{
        todoArr = JSON.parse(storageVal);
    }

    // todo list delete
    todoArr.splice(index, 1);

    // restore todo list after deleting
    localStorage.setItem('todoApp', JSON.stringify(todoArr));
    todoShow();

}



// todo complete btn
 todoComplete()
function todoComplete(index){


    // Data get form Storage 
    let storageVal = JSON.parse(localStorage.getItem('todoApp'));


   // console.log(storageVal[index].date);

    if(storageVal[index].status == 'work'){
        storageVal[index].status = 'completed';
        
    }else{
        storageVal[index].status == 'work'
    }

    localStorage.setItem('todoApp', JSON.stringify(storageVal));
    
    todoShow();

    return true;

}

