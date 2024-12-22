let form = document.querySelector("#form");
let title = document.querySelector("#title");
let body = document.querySelector("#body");
let htmlEle = document.querySelector(".tbody");
let alert = document.querySelector(".alert")
let btn_form=document.querySelector('.btn-form')
var todoList = [];
var index=''
if (localStorage.getItem("AllTodos")) {
    todoList = JSON.parse(localStorage.getItem("AllTodos"));
    displayTodo()
}
// i Will Creat Tasks
function AddTodo() {
    if (title.value != '' || body.value != '') {
        var todoObj = {
            
            title: title.value,
            body: body.value,
            mark:false,
        };
        todoList.push(todoObj);
        localStorage.setItem("AllTodos", JSON.stringify(todoList))
        alert.style.display = "none";
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Task has added successfuly!",
            showConfirmButton: false,
            timer: 1500
        });
    }
    else {
        alert.style.display = "block"
    }

}
// This functin will clear Input Values
function clear() {
    title.value = "";
    body.value = ""
}
// this function will mark task if completed
function mark(id) {
    
    todoList[id].mark=true
    localStorage.setItem("AllTodos", JSON.stringify(todoList))
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Item has Marked successfuly!",
        showConfirmButton: false,
        timer: 1500
    });
    displayTodo()
}
// this function will render data in the page
function displayTodo() {
    var todo = '';
    todoList.forEach((e, idx) => {
        todo += `<tr >
      <th scope="row">${idx+1}</th>
      <td style="${todoList[idx].mark==true?'text-decoration:line-through':''}">${e.title}</td>
      <td style="${todoList[idx].mark==true?'text-decoration:line-through':''}">${e.body}</td>
      <td>
      <div class="d-flex">
      <button  onclick="EditTodo(${idx})" class="btn btn-outline-warning ">Edit</button>
      <button onclick="DeleteTodo(${idx})"class="btn btn-outline-danger mx-3">Delete</button>
     
       <input type="checkbox" class="checkbox" id="check-${idx}"onChange="mark(${idx})"${todoList[idx].mark==true?'checked':''}>
        <label for="check-${idx}" class="mx-2">Mark</label>
       <!--<button onClick="mark(${idx})" class="btn btn-outline-success " >Mark</button>-->
      
      </div>
      </td>
    </tr>`
    })
    htmlEle.innerHTML = todo;
}
// we will confirm first and then delete the taske if he confirmed
function DeleteTodo(index) {


   Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
          
            todoList.splice(index,1)
    console.log(todoList);
    displayTodo()

            localStorage.setItem("AllTodos", JSON.stringify(todoList))
            displayTodo()

        }
    });


}
// this function will edit a record of data and backe mark into false
function EditTodo(id) {
    console.log(todoList[id].title);
    todoList[id].mark=false
    title.value=todoList[id].title
    body.value=todoList[id].body
     
    todoList[id].title=title.value;
    index=id
    btn_form.innerHTML='Update'
    
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (btn_form.innerHTML=="Update") {
        todoList[index].title=title.value;
        todoList[index].body=body.value;
        localStorage.setItem("AllTodos", JSON.stringify(todoList))
        btn_form.innerHTML="Submit"
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your   Item has updated successfuly!",
            showConfirmButton: false,
            timer: 1500
        });
        
        
    }
    else{
        AddTodo();
       
    }
  
    displayTodo();
    clear()
})