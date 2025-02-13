// Your code here
// creating employee record data object
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // process array of arrays into employee records
  function createEmployeeRecords(dataArray) {
    return dataArray.map(createEmployeeRecord);
  }
  
  // create a time-in event for employee
  function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      date,
      hour: parseInt(hour)
    });
    return employee;
  }
  
  // create time-out event for employee
  function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      date,
      hour: parseInt(hour)
    });
    return employee;
  }
  
  // alculate hours worked on single date
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(e => e.date === date);
    const timeOutEvent = employee.timeOutEvents.find(e => e.date === date);
    
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100;
    } else {
      return 0; // if no time-in or time-out events for  date = return 0 hours
    }
  }
  
  // calculating wages earned on a single date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // calculating all wages per employee across multiple dates
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date);
    return dates.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
  }
  
  // calculating total payroll for array of employee records
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
  }