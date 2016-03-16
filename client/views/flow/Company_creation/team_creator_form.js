

var employees_array = [];
var employees_arrayDep = new Tracker.Dependency();



Template.team_creator_form.onCreated(function(){

    // var company = Companies.findOne({owner: Meteor.userId()});
    // var n = company.company_level + 1;
    employees_array = [];
    var n = 2;
    var price_for_employee = 0;
    var employee_number = 0;
    var max_employee_number = 10;
    for (i=0; i<n; i++){
        employees_array.push({
            id: i,
            value: i+1,
            //company_name: company.company_name,
            department_name: null,
            employee_level: 1,
            max_level: 3,
            price_for_employee: price_for_employee,
            employee_number: employee_number,
            max_employee_number: max_employee_number,
            sum_of_department: price_for_employee * employee_number * 1,
        });
    }

});






var department_description_name = new ReactiveVar("Choose");

var department_description = new ReactiveVar("");




Template.team_creator_form.helpers({

    available_departments: function(){
        employees_arrayDep.depend();
        return employees_array;
    },

    departments: function(){
        return Departments.find();
    },

    employee_number_increase_enabled:function(){
        return this.employee_number<this.max_employee_number?"":"disabled";
    },

    employee_number_decrease_enabled:function(){
        return this.employee_number>0?"":"disabled";
    },


    department_description_name: function(){
        return department_description_name.get();
    },

    department_description: function(){
        return department_description.get();
    },

    sum_of_month: function(){
        var sum = 0;
        employees_arrayDep.depend();
        employees_array.forEach(function (employee) {
            sum += employee.sum_of_department;
        });
        return sum;
    },

});





Template.team_creator_form.events({
    'change .department_name': function(event, template){
        event.preventDefault();
        var department_name = event.target.value;
        var department = Departments.findOne({department_name: department_name});
        if (department){
            console.log(this);
            this.price_for_employee = parseInt(department.employee_price);
            this.sum_of_department = this.price_for_employee * this.employee_number;
            this.department_name = department.department_name;
            employees_arrayDep.changed();
            department_description_name.set(department.department_name);
            department_description.set(department.department_description);
        }else{
            this.price_for_employee = 0;
            this.sum_of_department = this.price_for_employee * this.employee_number;
            this.department_name = null;
            employees_arrayDep.changed();
            department_description_name.set("Test");
            department_description.set("Test");
        }

        team_array = employees_array;
    },

    "click #new_employee_number_plus": function(){
        this.employee_number += 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        employees_arrayDep.changed();

        team_array = employees_array;
    },

    "click #new_employee_number_minus": function(){
        this.employee_number -= 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        employees_arrayDep.changed();

        team_array = employees_array;
    },


    "submit #team_form": function(event, template){
        event.preventDefault();

        //console.log(employees_array);
        var company = Companies.findOne({owner: Meteor.userId()});

        if(template.$("#team_form").valid()){
            Meteor.call('addEmployees', company.company_name, employees_array, function (error, result) {});            
        }

    }
});
