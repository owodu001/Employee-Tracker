const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "management_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log('\n')
    firstPrompt()
});

function firstPrompt() {

    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Role'],
        name: "initialOptions"
    })


    .then(function(response) {
        if (response.initialOptions === 'View All Employees') {
            queryAllEmployees();
        } else {
            console.log("bye");
        }
    })
}

function queryAllEmployees() {
    connection.query(`SELECT
    emp.id as emp_id, emp.first_name,
    emp.last_name, title, salary, dept.name as department,
    concat(emp_manager.first_name, ' ', emp_manager.last_name) as manager
    FROM management_db.employee as emp
    inner join management_db.role as role
    on emp.role_id = role.id 
    inner join management_db.department as dept
    on role.department_id = dept.id 
    inner join management_db.employee as emp_manager
    on emp_manager.id = emp.manager_id`, function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].emp_id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department + " | " + res[i].manager);
        }
        console.log("-----------------------------------");
    });
}

// example for adding data
// function addRow() {
//     connection.query(`INSERT INTO items(name, price, category) VALUES("${name}", ${price}, "${category}");`, function (err, res) {
//         if (err) {
//             console.log(err)
//         }
//         console.log('Item added!! Bringing you back to home page.');
//         console.log("-----------------------------------");

//         firstPrompt();
//     });
// }

// function viewEmployee() {

// }

// function addEmployee() {

// }

// function updateRole() {

// }