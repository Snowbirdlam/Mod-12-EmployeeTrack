DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)     
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    employee_role INT NOT NULL,
    department_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY (employee_role) REFERENCES roles(id)
    FOREIGN KEY (department_id) REFERENCES department(id)
);

