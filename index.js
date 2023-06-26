function createEmployeeRecord(array){
    let object = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],

    }
   return object
   
}

function createEmployeeRecords(arrays) {
   let outPut = arrays.map(array => {
         return createEmployeeRecord(array) 
    })
    return outPut
}

function createTimeInEvent(object, date) {
        let dateArray = date.split(' ')
        object.timeInEvents.push({
            type: 'TimeIn', 
            hour: parseInt(dateArray[1],10),
            date: dateArray[0]})
        return object
}

function createTimeOutEvent(object, date) {
    let dateArray = date.split(' ')
        object.timeOutEvents.push({
            type: 'TimeOut', 
            hour: parseInt(dateArray[1],10),
            date: dateArray[0]})
        return object
}

function hoursWorkedOnDate(object, date) {
   let timeIn = object.timeInEvents.find(event => date === event.date)
   let timeOut = object.timeOutEvents.find(event => date === event.date)

    let werked = (timeOut.hour - timeIn.hour)/100
    return werked
}

function wagesEarnedOnDate(object, date) { 
let pay = object.payPerHour * hoursWorkedOnDate(object, date)
return pay
}

function allWagesFor(object) {
    let payArray = object.timeInEvents.map(d => d.date)
    
   let goal =  payArray.reduce(function (memo, event){
        return memo + wagesEarnedOnDate(object, event)
    },0 )
   return goal 
}

function calculatePayroll(array) {
    console.log(array)
   return array.reduce(function (memo, event){
        return memo + allWagesFor(event)
    },0 )
}