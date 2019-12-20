SELECT
emp.id as emp_id, emp.first_name,
emp.last_name, title, salary, dept.name as department,
concat(emp_manager.first_name, ' ', emp_manager.last_name) as manager
FROM management_db.employee as emp
inner join management_db.role as role
on emp.role_id = role.id 
inner join management_db.department as dept
on role.department_id = dept.id 
inner join management_db.employee as emp_manager
on emp_manager.id = emp.manager_id

-- INSERT INTO role (title, salary, department_id)
-- VALUES ("Business Analyst", "100000.77", "2"), ("Associate Engineer", "77777.77", "1"), ("CMO", "100000.22", "4"), ("Client Tech Lead", "88888.77", "3");

-- INSERT INTO department (name)
-- VALUES ("DEVOPS"), ("MARKETING"), ("ADMIN"), ("CLIENT");