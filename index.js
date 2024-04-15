const { prompt } = require("inquirer");
const db = require("./db");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  Prompts();

  function Prompts() {
    prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
          },
        ],
      },
    ]).then((res) => {
      let choice = res.choice;
      // Call the appropriate function depending on what the user chose
      switch (choice) {
        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
          viewEmployeesByDepartment();
          break;
        case "VIEW_EMPLOYEES_BY_MANAGER":
          viewEmployeesByManager();
          break;
        //Complete Remaining switch case like 41-43

        default:
          quit();
      }
    });
  }

  //Create function to view all employees

  //Create function to view all employees that belong to a department

  //Create function to view all employees that report to a specific manager

  //Create function to delete an employee

  //Create function to update employee's role

  //Create function to update an employee's manager

  //Create function to view all roles

  //Create function to add a role

  function addRole() {
    db.findAllDepartments().then(({ rows }) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      prompt([
        {
          name: "title",
          message: "What is the name of the role?",
        },
        {
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does the role belong to?",
          choices: departmentChoices,
        },
      ]).then((role) => {
        db.createRole(role)
          .then(() => console.log(`Added ${role.title} to the database`))
          .then(() => loadMainPrompts());
      });
    });
  }

  //Create function to add department
  function addDepartment() {
    db.findAllDepartments().then(({ rows }) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      prompt([
        {
          name: "name",
          message: "What is the name of the department?",
        },
      ]).then((department) => {
        db.createDepartment(department)
          .then(() => console.log(`Added ${department.name} to the database`))
          .then(() => loadMainPrompts());
      });
    });
  }

  //Create function to delete department
  function deleteDepartment() {
    db.findAllDepartments().then(({ rows }) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      prompt([
        {
          name: "name",
          message: "What is the name of the department?",
        },
      ]).then((department) => {
        db.deleteDepartment(department)
          .then(() => console.log(`Added ${department.name} to the database`))
          .then(() => loadMainPrompts());
      });
    });
  }
  //Create function to add an employee
  function addEmployee() {
    db.findAllEmployee().then(({ rows }) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      prompt([
        {
          name: "first name",
          message: "What is the employee first name?",
        },
        {
          name: "last name",
          message: "What is the employee last name?",
        },
        {
          name: "employee role",
          message: "What is the employee role?",
        },
        {
          name: "manager",
          message: "Is this employee a manager?",
        },
      ]).then((employee) => {
        db.createDepartment(employee)
          .then(() => console.log(`Added ${employee.name} to the database`))
          .then(() => loadMainPrompts());
      });
    });
  }
}
