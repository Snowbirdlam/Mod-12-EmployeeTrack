const { prompt } = require("inquirer");
const db = require("./db");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);
}
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
        {
          name: "View Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "Delete Employee",
          value: "DELETE_EMPLOYEE",
        },
        {
          name: "Update Role",
          value: "UPDATE_ROLE",
        },
        {
          name: "Update Manager",
          value: "UPDATE_MANAGER",
        },
        {
          name: "View Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Delete Department",
          value: "DELETE_DEPARTMENT",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
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
      case "DELETE_EMPLOYEE":
        deleteEmployee();
        break;
      case "UPDATE_ROLE":
        updateRole();
        break;
      case "UPDATE_MANAGER":
        updateManager();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "DELETE_DEPARTMENT":
        deleteDepartment();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      //Complete Remaining switch case like 41-43
      default:
        quit();
    }
  });
}

//Create function to view all employees
async function viewEmployees() {
  try {
    const employees = await db.findAllEmployees();
    console.log("Employees:");
    employees.forEach((employee) => {
      console.log(`${employee.firstName} ${employee.lastName}`);
    });
  } catch (error) {
    console.error("Error viewing employees:", error);
  }
}

//Create function to view all employees that belong to a department
async function viewEmployeesByDepartment(departmentId) {
  try {
    const manager = await employee.findByPk(manager_Id);
    console.log(`Employees by ${employee.manager_Id} manager:`);
    employees.forEach((employee) => {
      console.log(`${employee.manager_id}`);
    });
  } catch (error) {
    console.error("Error viewing employees by department:", error);
  }
}

//Create function to view all employees that report to a specific manager
async function viewEmployeesByManager(managerid) {
  try {
    const employees = await db.findAllEmployeesByManager(managerId);
    console.log(`Employees reporting to manager ${managerId}:`);
    employees.forEach((employee) => {
      console.log(`${employee.firstName} ${employee.lastName}`);
    });
  } catch (error) {
    console.error("Error viewing employees by manager:", error);
  }
}

//Create function to view all employees that belong to a department
//Create function to delete an employee
function deleteEmployee() {
  // Retrieve list of employees from the database
  db.findAllEmployees()
    .then(({ rows }) => {
      const employees = rows;

      // Create an array of choices for the prompt
      const employeeChoices = employees.map(
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );

      // Prompt the user to select the employee to delete
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee you want to delete:",
          choices: employeeChoices,
        },
        {
          type: "confirm",
          name: "confirmDelete",
          message: "Are you sure you want to delete this employee?",
          default: false,
        },
      ]).then(({ employeeId, confirmDelete }) => {
        if (confirmDelete) {
          // Delete the employee from the database
          db.deleteEmployee(employeeId)
            .then(() => {
              console.log("Employee successfully deleted.");
              // Reload the main prompts
              loadMainPrompts();
            })
            .catch((error) => {
              console.error("Error deleting employee:", error);
              // Handle the error accordingly
            });
        } else {
          console.log("Employee deletion cancelled.");
          // Reload the main prompts
          loadMainPrompts();
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching employees:", error);
      // Handle the error accordingly
    });
}

//Create function to update employee's role
async function updateRole(employeeId, newRoleId) {
  try {
    await db.updateEmployeeRole(employeeId, newRoleId);
    console.log(`Employee role updated successfully.`);
  } catch (error) {
    console.error("Error updating employee role:", error);
    // Handle the error accordingly
  }
}
//Create function to update an employee's manager
async function updateManager(employeeId, newManagerId) {
  try {
    await db.updateManager(employeeId, newManagerId);
  } catch (error) {
    console.error("Error updating employee's manager:", error);
  }
}
//Create function to view all roles
async function viewRoles() {
  try {
    const roles = await Role.findAll();
    console.log("Roles:");
    allEmployees.forEach((roles) => {
      console.log(`${roles.title}`);
    });
  } catch (error) {
    console.error("Error viewing roles:", error);
  }
}

//Create function to add a role

function addRole() {
  db.findAllDepartments()
    .then(({ rows }) => {
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
          .then(() => loadMainPrompts())
          .catch((error) => {
            console.error("Error adding role:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching departments:", error);
      // Handle the error accordingly
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
