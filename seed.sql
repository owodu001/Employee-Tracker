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