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

});

function firstPrompt() {

    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Role'],
        name: "initialOptions"
    })
}

//     .then(function(response) {
//         if (response.initialOptions === 'View All Employees') {
//             postItem();
//         } else {
//             bidItem()
//         }
//     })
// }

// function queryAllDepartments() {
//     connection.query("SELECT * FROM departments", function(err, res) {
//         if (err) throw err;
//         for (let i = 0; i < res.length; i++) {
//             console.log(res[i].id + " | " + res[i].name);
//         }
//         console.log("-----------------------------------");
//     });
// }

// function viewEmployee() {

// }

// function Employee() {

// }