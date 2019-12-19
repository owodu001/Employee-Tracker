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
        // let employee = 
        if (response.initialOptions === 'View All Employees') {
            queryAllEmployees();
        } else if (response.initialOptions === 'Add Employee') {
            addEmployee();
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
            // console.log(res[i].emp_id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department + " | " + res[i].manager);
        }
        console.table(res)
    });
}

// example for adding data
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

// UPDATE table
// SET 
//     column1 = new_value1,
//     column2 = new_value2,
//     ...
// WHERE
//     condition;

function addEmployee() {

    inquirer.prompt([{
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName"
        }, {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName"
        }, {
            type: "list",
            message: "What is the employee's role?",
            choices: [1, 2, 3, 4],
            name: "role"
        }, {
            type: "list",
            message: "Who is your manager?",
            choices: [1, 2],
            name: "manager"
        }, ])
        .then(function(res) {
            let firstName = res.firstName;
            let lastName = res.lastName;
            let role = res.role;
            let manager = res.manager;

            connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${firstName}", "${lastName}", "${role}", "${manager}");`, function(err, res) {
                if (err) {
                    throw (err)
                }
                console.table(res);
                firstPrompt();
            });
        })
}

// function viewEmployee() {

// }

// function addEmployee() {

// }

// function updateRole() {

// }