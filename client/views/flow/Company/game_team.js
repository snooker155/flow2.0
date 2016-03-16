var employees_array = [];
var employees_arrayDep = new Tracker.Dependency();

var n_old = new ReactiveVar(0);

var department_description_name = new ReactiveVar("Choose");

var department_description = new ReactiveVar("Here will be department info.");



Template.game_team.onCreated(function(){
    
});




Template.game_team.onRendered(function(){

});


Template.game_team.helpers({

    employees: function(){
        return Employees.find({owner: Meteor.userId()}); 
    },

    department_description_name: function(){
        return department_description_name.get();
    },

    department_description: function(){
        return department_description.get();
    },

    departments: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        var departments = [];
        var employees = Employees.find({company_name: company.company_name});
        employees.forEach(function (employee) {
            departments.push(employee.department_name);
        });
        return Departments.find({department_name: {$nin: departments}});
    },

    new_employees: function(){

        var company = Companies.findOne({owner: Meteor.userId()});
        if (Departments.find().count() - Employees.find({owner: Meteor.userId()}).count() > 0 ){
            var n = Departments.find().count() - Employees.find({owner: Meteor.userId()}).count();
        }else{
            var n = 0;
        }
        if(n_old.get() != n){
            employees_array = [];
            var price_for_employee = 0;
            var employee_number = 0;
            var max_employee_number = 10;
            for (i=0; i<n; i++){
                employees_array.push({
                    id: i,
                    value: i+1,
                    company_name: company.company_name,
                    department_name: null,
                    employee_level: 1,
                    max_employee_level: 3,
                    price_for_employee: price_for_employee,
                    employee_number: employee_number,
                    max_employee_number: max_employee_number,
                    sum_of_department: price_for_employee * employee_number * 1,
                });
            }
            n_old.set(n);
        }
        //console.log(employees_array);
        employees_arrayDep.depend();
        return employees_array;
    },


    sum_of_month: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        var employees = Employees.find({company_name: company.company_name});
        var sum = 0;
        employees.forEach(function (employee) {
            sum += employee.sum_of_department;
        });
        employees_array.forEach(function (employee) {
            sum += employee.sum_of_department;
        });
        employees_arrayDep.depend();
        return sum;
    },




    level_plus_enabled:function(){
        return this.employee_level<this.max_employee_level?"":"disabled";
    },

    level_minus_enabled:function(){
        return this.employee_level>0?"":"disabled";
    },




    employee_number_plus_enabled:function(){
        return this.employee_number<this.max_employee_number?"":"disabled";
    },

    employee_number_minus_enabled:function(){
        return this.employee_number>0?"":"disabled";
    },


    new_employee_number_plus_enabled:function(){
        return this.employee_number<this.max_employee_number?"":"disabled";
    },

    new_employee_number_minus_enabled:function(){
        return this.employee_number>0?"":"disabled";
    },

    at_work: function(){
        return 0;
    },

    free_employees: function(){
        return this.employee_number - 0;
    },

    sum_of_at_work: function(){
        return 0;
    },

    sum_of_free: function(){
        var company = Companies.findOne({owner: Meteor.userId()});
        var employees = Employees.find({company_name: company.company_name});
        var sum = 0;
        employees.forEach(function (employee) {
            sum += employee.employee_number - 0;
        });
        employees_array.forEach(function (employee) {
            sum += employee.employee_number - 0;
        });
        employees_arrayDep.depend();
        return sum;
    },

});



Template.game_team.events({
    'click #department_info': function(event, template){
        var department = Departments.findOne({department_name: this.department_name});
        if (department){
            department_description_name.set(department.department_name);
            department_description.set(department.department_description);
        }else{
            department_description_name.set("Test");
            department_description.set("Test");
        }
    },


    'change .department_name': function(event,template){
        event.preventDefault();
        var department_name = event.target.value;
        var department = Departments.findOne({department_name: department_name});
        if (department){
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
    },



    "click #level_minus": function(event){
            this.employee_level -= 1;

            Meteor.call('updateEmployeeLevel', this._id, -1, function (error, result) {});

            // var obj = {
            //     "feature": "employee_level_down",
            //     "value": this.employee_level
            // };
            // //Communication.send('company_change', obj);
            // console.log(obj);
    },

    "click #level_plus": function(event){
            this.employee_level += 1;

            Meteor.call('updateEmployeeLevel', this._id, 1, function (error, result) {});

            // var obj = {
            //     "feature": "employee_level_up",
            //     "value": this.employee_level
            // };
            // //Communication.send('company_change', obj);
            // console.log(obj);
    },


    "click #employee_number_minus": function(){
        this.employee_number -= 1;

            Meteor.call('updateEmployeeNumber', this._id, -1, function (error, result) {});

            // var obj = {
            //     "feature": "employee_number_down",
            //     "value": this.employee_number
            // };
            // //Communication.send('company_change', obj);
            // console.log(obj);
    },


    "click #employee_number_plus": function(){
        this.employee_number += 1;

            Meteor.call('updateEmployeeNumber', this._id, 1, function (error, result) {});

            // var obj = {
            //     "feature": "employee_number_up",
            //     "value": this.employee_number
            // };
            // //Communication.send('company_change', obj);
            // console.log(obj);

    },


    "click #new_employee_number_minus": function(){
        this.employee_number -= 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        employees_arrayDep.changed();
    },


    "click #new_employee_number_plus": function(){
        this.employee_number += 1;
        this.sum_of_department = this.price_for_employee * this.employee_number;
        employees_arrayDep.changed();
    },


    'click #create_new_department': function(event, template){
        event.preventDefault();

        //console.log(employees_array[this.id]);

        if(template.$("#new_department"+this.value).valid()){

            Meteor.call('addEmployee', employees_array[this.id], function (error, result) {});
            employees_arrayDep.changed();

        }
    },


    'click #disband': function(){
        Meteor.call('deleteEmployees', this._id, function (error, result) {});
    },

});