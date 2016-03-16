Template.finish.helpers({
	company_name: function () {
		return company_array[0].company_name;
	},

	company_org_structure: function () {
		return company_array[0].company_org_structure;
	},
	
	company_sphere: function () {
		return company_array[0].company_sphere;
	},
	
	company_segment: function () {
		return company_array[0].company_segment;
	},
	
	company_country: function () {
		return company_array[0].company_country;
	},
	
	employees: function () {
		return team_array;
	},
	
	product_name: function () {
		return product_name;
	},
	
	features: function () {
		return product_array;
	},
	
	
});