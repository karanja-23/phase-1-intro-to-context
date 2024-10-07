// Your code here
function createEmployeeRecord([myfirstName, myfamilyName, mytitle, mypayPerHour]){
    return {
        firstName : myfirstName,
        familyName: myfamilyName,
        title: mytitle,
        payPerHour: mypayPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(record, timeStamp){
    const [date, time] = timeStamp.split(' ');
    const hour = parseInt(time.slice(0, 2) +'00');
    const object = {
        type: "TimeIn",
        'hour': hour,
        'date': date
    }
    record.timeInEvents.push(object);
    return record;
}

function createTimeOutEvent(record, timeStamp){
    const [date, time] = timeStamp.split(' ');
    const hour = parseInt(time.slice(0, 2) +'00');
    const object = {
        type: "TimeOut",
        'hour': hour,
        'date': date
    }
    record.timeOutEvents.push(object);
    return record;
}
function hoursWorkedOnDate(record, date) {
    const timeInEvents = record.timeInEvents.filter(event => event.date === date);
    const timeOutEvents = record.timeOutEvents.filter(event => event.date === date);
    if (timeInEvents.length === 0 || timeOutEvents.length === 0) {
        return 0;
    }
    const timeIn = parseInt(timeInEvents[0].hour);
    const timeOut = parseInt(timeOutEvents[0].hour);
    const hoursElapsed = (timeOut - timeIn) / 100;
    return hoursElapsed;
}
function wagesEarnedOnDate(record, date) {
    const hoursWorked = hoursWorkedOnDate(record, date);
    return hoursWorked * record.payPerHour;
}

function allWagesFor(record) {
    const dates = [...new Set(record.timeInEvents.map(event => event.date))];
    return dates.reduce((total, date) => total + wagesEarnedOnDate(record, date), 0);
}
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}
