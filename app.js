class TaskCard {
    constructor(ownerName, taskName, description, status, dueDate, cardId) {  // renamed name to ownerName, added cardID
        this._ownerName = ownerName;
        this._taskName = taskName;
        this._description = description;
        this._status = status;
        this._dueDate = dueDate;
        this._cardId = cardId;
        this._columnValue = null;



    }
    // Getter/setter methods
    get ownerName() { return this._ownerName; }
    set ownerName(value) { this._ownerName = value;}
    get taskName() { return this._taskName; }
    set taskName(value) { this._taskName = value}
    get description() { return this._description; }
    set description(value) { this._description = value}
    get status() { return this._status; }
    set status(value) { this._status = value}
    get dueDate() { return this._dueDate; }
    set dueDate(value) { this._dueDate = value}
    get cardId() { return this._cardId; }
    set cardId(value) { this._cardId = value}
    get columnValue() { return this._columnValue; }
    set columnValue(value) { this._columnValue = value}



    //added method to show objects as string
    toString() {
        return `{Task: taskId: ${this.cardId}, ownerName: ${this.ownerName}, taskName: ${this.taskName}, ${this.description}, ${this.status}, ${this.dueDate}}`;
    }


    
    determineDate () {
        // get weekday from dueDate
        
        let dueDay = this.dueDate;
        dueDay = dueDay.replace(/\//g, ',');
        const dateValues = dueDay.split(',');
        const day = dateValues[1];
    
        // get today's date
        const today = new Date();
        const date = today.getDate();
    
        // compare today's date to due date and assign column value
        if (date == day) {
            this.columnValue = 'columnToday';
            return this.columnValue;
        }   
        else if (day <= (date + 7)) {
            this.columnValue = 'columnThisWeek';
            return this.columnValue;
        }   
        else if (day > (date +7)) {
            this.columnValue = 'columnLater';
            return this.columnValue;
        }
        else {
            window.alert('Invalid date')
        }
    }

}

//function to assign delete functions to buttons by id
const clickDelete = () => {
    cardArray.forEach((Id) => {
        $(`#btnId${Id}`).on('click', ()=>{$(`#cardId${Id}`).remove()})
    })
}
//unique number generator
let currentGeneratorId = 0;
let cardArray = [];                       
let generateId = () => {
    cardArray.push(currentGeneratorId);
    currentGeneratorId++;
    return currentGeneratorId;
}
//array with all tasks
let taskRegistry = new Map();


//function to create a new card object and add to array
let createNewCard = (event) => {
    event.preventDefault();    
    let ownerName = document.getElementById("Name").value;
    let taskName = document.getElementById("taskName").value;
    let description = document.getElementById("Description").value;
    let status = document.getElementById("Status").value;
    let dueDate = document.getElementById("DueDateInput").value;
    console.log(`Adding new task ${ownerName}, ${taskName}, ${description}, ${status}, ${dueDate}`);
    let cardId = generateId();
    let newCard = new TaskCard(ownerName, taskName, description, status, dueDate, cardId);
    newCard.determineDate();
    taskRegistry.set (cardId, newCard);
    drawNewCard(newCard);
    $('.rmvBtn').on('mouseenter', clickDelete());
    console.log(taskRegistry);
    document.getElementById('form').reset();
    
}




//function to draw a card
let drawNewCard = (taskCard) => {
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute("id", `cardId${cardArray[cardArray.length - 1]}`);   ////added div id and removeButton ID
    cardDiv.innerHTML = `
        <div class="color_${taskCard.status}"> 
            <div class="card d-inline-block" style="width: 20rem;">
                <div class="card-header">${taskCard.dueDate}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${taskCard.taskName}</h5>
                    <p class="card-text">${taskCard.description}</p>
                    <button class="rmvBtn" id="btnId${cardArray[cardArray.length - 1]}">Remove Task</button>
                    <div class="form-group">   
                        <select class="form-control" id="Status">
                            <option class="toDo">To Do</option>
                            <option class="inProgress">In Progress</option>
                            <option class="stuck">Stuck</option>
                            <option class="done">Done</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer bg-white">${taskCard.ownerName}
                </div>
            </div>
        </div>`;

    document.getElementById(taskCard.columnValue).appendChild(cardDiv);
    }

 //   const colPlace = document.getElementById(taskCard.columnValue);
 //   colPlace.appendChild(cardDiv);



const taskButton = document.getElementById("addTaskButton");
taskButton.addEventListener("click", createNewCard);

const showFormButton = document.getElementById('showFormButton');  // change caption on form opening button
isFormVisible = false;
showFormButton.onclick = () => {

    isFormVisible = !isFormVisible;    
    if (isFormVisible) {
        showFormButton.innerHTML = 'Close';
    }
    else {
        showFormButton.innerHTML = 'Add new task';
    }

}



//







// const taskForm = {

//     name:'',
//     taskName:'',
//     description:'',
//     status:'',
//     dueDate:'',
//     columnValue:'',

//     getCardInfo () {
//         //Get information from forms

//         this.name = document.getElementById("Name").value;
//         this.taskName = document.getElementById("taskName");
//         this.description = document.getElementById("Description");
//         this.status = document.getElementById("Status")
//         this.dueDate = document.getElementById("datetimepicker1")
//     },










        
//     }

// }

