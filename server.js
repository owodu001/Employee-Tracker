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
        } else if (response.initialOptions === 'View All Departments') {
            queryAllDepartments();
        } else if (response.initialOptions === 'View All Roles') {
            queryAllRoles();
        } else if (response.initialOptions === 'Add Employee') {
            addEmployee();
        } else if (response.initialOptions === 'Add Department') {
            addDepartment();
        } else if (response.initialOptions === 'Update Role') {
            updateRole();
        } else if (response.initialOptions === 'Add Role') {
            addRole();
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
        // for (let i = 0; i < res.length; i++) {
        //     // console.log(res[i].emp_id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department + " | " + res[i].manager);
        // }
        console.table(res)
    });
}

function queryAllDepartments() {
    connection.query(`SELECT * FROM DEPARTMENT`, function(err, res) {
        if (err) throw err;
        console.table(res)
    });
}

function queryAllRoles() {
    connection.query(`SELECT * FROM role`, function(err, res) {
        if (err) throw err;
        console.table(res)
    });
}

// example for adding data
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

function addDepartment() {
    inquirer.prompt([{
            type: "input",
            message: "What is the new department's name?",
            name: "newDeptName"
        }])
        .then(function(res) {
            let newDeptName = res.newDeptName;

            connection.query(`INSERT INTO department(name) VALUES("${newDeptName}");`, function(err, res) {
                if (err) {
                    throw (err)
                }
                console.table(res);
                firstPrompt();
            });
        })
}

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

function updateRole() {
    inquirer.prompt([{
                type: "input",
                message: "Which employee's role do you want to update?",
                name: "empRole"
            },
            {
                type: "input",
                message: "Please make your update to employee role?",
                name: "roleUpdate"
            },
        ])
        .then(function(res) {
            let empRole = res.empRole;
            let roleUpdate = res.roleUpdate;

            connection.query(`UPDATE employee SET role_id = "${roleUpdate}" WHERE first_name = "${empRole}";`, function(err, res) {
                if (err) {
                    throw (err)
                }
                console.table(res);
                firstPrompt();
            });
        })
}

function addRole() {
    // let emptyDept = [];
    inquirer.prompt([{
                type: "input",
                message: "What is the new role name?",
                name: "newRoleName"
            },
            {
                type: "input",
                message: "What is the new role's salary?",
                name: "newRoleSalary"
            },
            {
                type: "input",
                message: "What is the new role's department id?",
                name: "newRoleDepartment"
            },
        ])
        .then(function(res) {
            let newRoleName = res.newRoleName;
            let newRoleSalary = res.newRoleSalary;
            let newRoleDepartment = res.newRoleDepartment;

            // for (i = 0; i < res.length; i++) {
            //     emptyDept.push(res[i].name);
            // }

            connection.query(`INSERT INTO role(title, salary, department_id) VALUES("${newRoleName}", "${newRoleSalary}", "${newRoleDepartment}");`, function(err, res) {
                if (err) {
                    throw (err)
                }
                console.table(res);
                firstPrompt();
            });
        })
}




// console.log(emptyDept);


// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;

// USE AdventureWorks2014;  
// GO  
// UPDATE Person.Person  
// SET ModifiedDate = GETDATE()

// function viewEmployee() {

// }

// function addEmployee() {

// }