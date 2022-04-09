// Copyright (c) 2022, khaled asem and contributors
// For license information, please see license.txt

frappe.ui.form.on('New_Sector_order', {

	setup: function(frm){

		//---------------------------------------------------------------------
		frm.site_name_Onchange = function(frm){
			if(frm.doc.site_name){
				// ----------------------------- get doc by name
			frappe.db.get_doc('Working Sites', frm.doc.site_name )
	   		 .then(doc => {
	   		 	
	        	frm.doc.site_name_arabic =doc.site_name_arabic
	        	frm.doc.city =doc.city
	        	frm.doc.zone =doc.zone;
	        	 frm.refresh_field('site_name_arabic');
	        	  frm.refresh_field('city');
	        	  frm.refresh_field('zone');
	    	});


	   		frappe.db.get_list('Working_Sectors', {
	    		fields: ['site_name', 'sector_id','azimuth','total_tilt','no_of_1x_carriersec','no_of_do_carriersec'],
			    filters: {
			        site_name: frm.doc.site_name
			    }
			}).then(records => {
			    // 
			    frm.doc.number_of_current_sectors =records.length
			    frm.doc.new_sector_no=records.length
			    frm.doc.sector_name = frm.doc.site_name + "_" + frm.doc.new_sector_no
			     frm.refresh_field('number_of_current_sectors');
			     frm.refresh_field('new_sector_no');
			     frm.refresh_field('sector_name');
			    
			     if(records.length == 3){
			     	 console.log(records[0].azimuth);
			     	frm.doc.azimuth_sec0 = records[2].azimuth;
			     	frm.doc.azimuth_sec1 = records[1].azimuth;
			     	frm.doc.azimuth_sec2 = records[0].azimuth;

			     	 frm.refresh_field('azimuth_sec0');
			     	 frm.refresh_field('azimuth_sec1');
			     	 frm.refresh_field('azimuth_sec2');
			     }

			})


	   		
			}
		}
		//-------------------------------- end ------------------------------------------
	},
	//******************************* end setup *********************************************




	refresh: function(frm) {
		frm.site_name_Onchange(frm);
	},






	//-------------- -------------------------------------------------------------------------
	site_name: function(frm){
		frm.site_name_Onchange(frm);	

		const currentYear = new Date().getFullYear();
		console.log(Number(currentYear));



		 //-------------------- get list -----------------------------
	   		frappe.db.get_list('New_Sector_order', {
	    		fields: ['name','order_number']
			    
			}).then(records => {
				var order_number = records;
				console.log(Number(order_number));
				// if(Number(currentYear) == Number(year)){
				// 	var order_num = Number(num) + 1;
				// 	frm.doc.order_number = currentYear + '-' + order_num;
				// 	frm.refresh_field('order_number');

				// 	//--------------setvalue---------------------------------------
				// 	frappe.db.set_value('order_number_new_sector', name, 'number', order_num)
			 //    	.then(r => {
			 //        	// let doc = r.message;
			 //        	console.log('set successfull');
			 //    	})
			 //    	//---------------------------------------------------------------

				// } else if(Number(currentYear) == Number(year)+1){
				// 	var order_num = Number(num) + 1;
				// 	var order_year = Number(year) + 1;
				// 	frm.doc.order_number = order_year + '-' + order_num;
				// 	frm.refresh_field('order_number');

				// 	//--------------setvalue---------------------------------------
				// 	frappe.db.set_value('order_number_new_sector', name, 'number', order_num)
			 //    	.then(r => {
			 //        	// let doc = r.message;
			 //        	console.log('set successfull');
			 //    	})
			 //    	//---------------------------------------------------------------
			    	
				// }
				
			}) 
		
	},
	//---------------------------------------End----------------------------------------------

	before_save: function(frm){
		 //-------------------- get list -----------------------------
	   		frappe.db.get_list('order_number_new_sector', {
	    		fields: ['order_number', 'year']
			    
			}).then(records => {
			    console.log(records[0]);
			})
	
	}

   
});
