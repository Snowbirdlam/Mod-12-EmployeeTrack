INSERT INTO department (id, name)
VALUES (001, "Department of Mysteries")
(002, "Department of Magical Law Enforcement")

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Auror", "$43,000", 001),
(002, "Healer", "$50,000", 001),
(003, "Scribe", "$35,000", 001),
(004, "Officer", "$70,000", 002),
(005, "Secretary", "$40,0000", 002),
(006, "Investigator", "$80,000", 002);
INSERT INTO employee (id, first_name, last_name, employee_role, manager_id)
VALUES (001, "Harry", "Potter", 1, 001),
(002, "Hermione", "Granger", 2, NULL),
(003, "Cho", "Chang", 3, NULL),
(004, "Colin", "Creevey", 4, 002),
(005, "Luna", "Lovegood", 5, NULL),
(006, "Draco", "Malfoy", 6, NULL);