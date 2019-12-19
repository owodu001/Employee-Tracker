-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT DEFAULT NULL to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager




-- DROP DATABASE IF EXISTS management_db;
-- CREATE DATABASE management_db;

-- USE management_db;

-- CREATE TABLE department(
-- id INT NOT NULL AUTO_INCREMENT,
-- name VARCHAR(30) NOT NULL,
-- PRIMARY KEY(ID)
-- );

-- INSERT INTO department (name)
-- VALUES ("DEVOPS"), ("MARKETING"), ("ADMIN"), ("CLIENT");

-- CREATE TABLE role(
-- id INT NOT NULL auto_increment,
-- title VARCHAR(30) NOT NULL,
-- salary DECIMAL(10,4) NOT NULL,
-- department_id INT NOT NULL,
-- PRIMARY KEY(ID)
-- );

-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Business Analyst", "100000.77", "2"), ("Associate Engineer", "77777.77", "1"), ("CMO", "100000.22", "4"), ("Client Tech Lead", "88888.77", "3");

-- CREATE TABLE employee(
-- id INT NOT NULL auto_increment,
-- first_name VARCHAR(30) NOT NULL,
-- last_name VARCHAR(30) NOT NULL,
-- role_id INT NOT NULL,
-- manager_id INT DEFAULT NULL,
-- PRIMARY KEY(ID)
-- );

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Brittany", "Bryant", "12", "1");