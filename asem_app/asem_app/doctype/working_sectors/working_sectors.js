// Copyright (c) 2021, khaled asem and contributors
// For license information, please see license.txt

frappe.ui.form.on('Working_Sectors', {
	setup: function(frm){
		frm.show_hide_sections = function(frm){
			if(frm.doc.site_name){
		
				frm.set_df_property('site_name_arabic', 'hidden', 0);
				frm.set_df_property('bts_id', 'hidden', 0);
				frm.set_df_property('sector_id', 'hidden', 0);
				frm.set_df_property('sector_ids_section', 'hidden', 0);
				frm.set_df_property('support_section', 'hidden', 0);
				frm.set_df_property('antenna_info_section', 'hidden', 0);
				frm.set_df_property('pn_section', 'hidden', 0);
				frm.set_df_property('sector_kpi_section', 'hidden', 0);
				frm.set_df_property('atoll_section', 'hidden', 0);
				
				
			} else{

				frm.set_df_property('site_name_arabic', 'hidden', 1);
				frm.set_df_property('bts_id', 'hidden', 1);
				frm.set_df_property('sector_id', 'hidden', 1);
				frm.set_df_property('sector_ids_section', 'hidden', 1);
				frm.set_df_property('support_section', 'hidden', 1);
				frm.set_df_property('antenna_info_section', 'hidden', 1);
				frm.set_df_property('pn_section', 'hidden', 1);
				frm.set_df_property('sector_kpi_section', 'hidden', 1);
				frm.set_df_property('atoll_section', 'hidden', 1);
				

			}


			frm.refresh_field('site_name_arabic');
			frm.refresh_field('bts_id');
			frm.refresh_field('sector_id');
			frm.refresh_field('sector_ids_section');
			frm.refresh_field('support_section');
			frm.refresh_field('antenna_info_section');
			frm.refresh_field('pn_section');
			frm.refresh_field('sector_kpi_section');
			frm.refresh_field('atoll_section');
		},
		// ------------------------- end --------------------------------


		//-------------------------------------------------------------
		frm.fill_field = function(frm){
			var sector_list = '';
			//-------------------- get list -----------------------------
	   		frappe.db.get_list('Working_Sectors', {
	    		fields: ['site_name', 'sector_id'],
			    filters: {
			        site_name: frm.doc.site_name
			    }
			}).then(records => {
			   
			    sector_list = records;
			     console.log(sector_list.length);
			     var list = []
			     for (let i = 0; i < sector_list.length; i++) {
			     	list[i]=sector_list[i].sector_id;
			     
				}

				var new_sec = '';

				if(!(list.includes("0"))){
					new_sec = '0';

				} else{
					if(!(list.includes("1"))){
					new_sec = '1';

					} else{
						if(!(list.includes("2"))){
							new_sec = '2';

						} else{
							if(!(list.includes("3"))){
								new_sec = '3';

							} else{
								if(!(list.includes("4"))){
								new_sec = '4';

								} else{

								} 
							}
						}
					}
				}
			
			frm.doc.sector_id=new_sec;
			frm.doc.sector_name=frm.doc.site_name + '_' + new_sec;

			frm.refresh_field('sector_id');
			frm.refresh_field('sector_name');
			})

			// ----------------------------- get doc by name------------------
						frappe.db.get_doc('Working Sites', frm.doc.site_name)
				   		 .then(doc => {
				        	// console.log(doc.name)
				        	frm.doc.site_name_arabic = doc.site_name_arabic;
				        	frm.doc.bts_id = doc.bts_id;
				        	frm.doc.cell_id = doc.cell_id;

				        	frm.doc.bts_id_sector_id = frm.doc.bts_id + '_' + frm.doc.sector_id;
				        	frm.doc.cell_id_sector_id = frm.doc.cell_id + '_' + frm.doc.sector_id;
				        	// frm.doc.cell_id_sector_iddec = doc.cell_id;
				        	// frm.doc.cell_id_sector_idhex = doc.cell_id;
				        	frm.doc.base_id = (Number(frm.doc.cell_id)) * 16 + Number(frm.doc.sector_id) ;
				        	frm.doc.site_name_sector_id = frm.doc.site_name + '_' + frm.doc.sector_id;
		// 		        	let number = 67;
		// let hexStr = number.toString(16);
		// console.log(hexStr);

				        	frm.refresh_field('site_name_arabic');
							frm.refresh_field('bts_id');
							frm.refresh_field('cell_id');

							frm.refresh_field('bts_id_sector_id');
							frm.refresh_field('cell_id_sector_id');
							frm.refresh_field('base_id');
							frm.refresh_field('site_name_sector_id');
				        	
				    	})
				   		 //---------------------------------------------------------------

		},
		//---------------------- end ----------------------------------


		//-------------------------------------------------------------
		frm.sector_id_Onchange = function(frm){
			if( frm.doc.site_name ){
				frm.doc.sector_name = frm.doc.site_name  + '_' + frm.doc.sector_id 
				frm.refresh_field('sector_name');
			}
		}
		//---------------------- end ----------------------------------


		
	},
	//*********** END SETUP ****************************************



	// ******************* REFRESH ************************************************
	refresh: function(frm) {
		let number = 67;
		let hexStr = number.toString(16);
		console.log(hexStr);

		frm.show_hide_sections(frm);
		frm.frm.fill_field(frm);
		frm.sector_id_Onchange(frm);
	},



	//-------------- -------------------------------------------------------------------------
	site_name: function(frm){
		frm.show_hide_sections(frm);

		// fill field
		frm.fill_field(frm);
	},
	//---------------------------------------End----------------------------------------------

	//-------------- -------------------------------------------------------------------------
	sector_id: function(frm){
		frm.sector_id_Onchange(frm);
		
	},
   //---------------------------------------End----------------------------------------------





   	//-------------- -------------------------------------------------------------------------
	antenna_vendor: function(frm){
		frm.set_df_property('antenna_model', 'hidden', 0)

		frm.set_query("antenna_model", function(){
					return {
						"filters": {
						"antenna_vendor": frm.doc.antenna_vendor
						}
					};
				}),
		frm.doc.antenna_model=''
		frm.refresh_field('antenna_model');

	},
   //---------------------------------------End----------------------------------------------



   	//-------------- -------------------------------------------------------------------------
	antenna_model: function(frm){
		// frm.set_df_property('antenna_model', 'hidden', 0)
		// frm.doc.antenna_hor_beamwidh = 
		// frm.doc.antenna_ver_beamwidh = 
		// frm.doc.antenna_gaindbi = 
		// frm.doc.electric_tilt = 

	}
   //---------------------------------------End----------------------------------------------

});


// select `tabWorking Sites`.city, tabWorking_Sectors.sector_name  from `tabWorking Sites`, tabWorking_Sectors where `tabWorking Sites`.site_name = tabWorking_Sectors.site_name;


