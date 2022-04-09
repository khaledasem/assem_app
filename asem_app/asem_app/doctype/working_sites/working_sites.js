// Copyright (c) 2021, khaled asem and contributors
// For license information, please see license.txt

frappe.ui.form.on('Working Sites', {

	//====================================================  refresh ==================================================================

	refresh: function(frm) {

	//--------------------------------------------------------
		frm.from_survey_func(frm);
		frm.city_onChange(frm);
		frm.btsVendor_onChange(frm);
		frm.show_hide_bsc_msc_info(frm);
		frm.fill_x_sevice_host_bsc(frm);
  		frm.fill_evdo_sevice_host_bsc(frm);
  		frm.survey_site_name_Onchange(frm);

	},
	//==================================================== end refresh ==================================================================




	//==================================================== setup ==================================================================
	setup: function(frm){
		frm.show_hide_bsc_msc_info = function(frm){

			if (frm.doc.bsc_name) {
				frm.set_df_property('bsc_ip_address', 'hidden', '0')
				frm.set_df_property('mgw', 'hidden', '0')
				frm.set_df_property('msc_name', 'hidden', '0')
				frm.set_df_property('msc_id', 'hidden', '0')


				// ----------------------------- get doc by name--------------------
				frappe.db.get_doc('BSCs', frm.doc.bsc_name)
		   		 .then(doc => {
		   		 console.log(doc.name)
		   		  console.log(doc.bsc_ip_adress)
		        	frm.doc.bsc_ip_address = doc.bsc_ip_adress;
					frm.doc.mgw = doc.mgw;
					frm.doc.msc_name = doc.msc_name;
					frm.doc.msc_id =  doc.msc_id;
					
					frm.refresh_field('bsc_ip_address');
					frm.refresh_field('mgw');
					frm.refresh_field('msc_name');
					frm.refresh_field('msc_id');
		    	});
		   		 //-------------------------------------------------------------------

			

			} else {
				frm.set_df_property('bsc_ip_address', 'hidden', '1')
				frm.set_df_property('mgw', 'hidden', '1')
				frm.set_df_property('msc_name', 'hidden', '1')
				frm.set_df_property('msc_id', 'hidden', '1')

				frm.doc.bsc_ip_address = ''
				frm.doc.mgw = ''
				frm.doc.msc_name = ''
				frm.doc.msc_id = ''
					
			}
			frm.refresh_field('bsc_ip_address');
			frm.refresh_field('mgw');
			frm.refresh_field('msc_name');
			frm.refresh_field('msc_id');
		},



		//-------------------------------------------------------------------------------
		frm.city_onChange = function(frm){
			if(frm.doc.city){
				frm.set_df_property('area', 'hidden', 0)

				frm.set_query("district", function(){
							return {
								"filters": {
								"government": frm.doc.city
								}
							};
						}),
				// frm.doc.district=''
				// frm.doc.area=''
				frm.refresh_field('district');
				frm.refresh_field('area');
			}
		},
		//------------------------------------ end --------------------------------------


		//-------------------------------------------------------------------------------
		frm.btsVendor_onChange = function(frm){
			if(frm.doc.bts_vendor){
				frm.set_df_property('bts_type', 'hidden', 0)

				frm.set_query("bts_type", function(){
							return {
								"filters": {
								"bts_vendor": frm.doc.bts_vendor
								}
							};
						}),
				
				frm.refresh_field('bts_type');

			}
		},
		//------------------------------------ end --------------------------------------


		//-------------------------------------------------------------------------------
		frm.fill_x_sevice_host_bsc = function(frm){
			if(frm.doc.x_sevice_host_bsc){
				frm.set_df_property('x_sevice_spc', 'hidden', 0);
				frm.set_df_property('x_sevice_host_msc_name', 'hidden', 0);
				frm.set_df_property('x_sevice_host_msc_id', 'hidden', 0);

				// ----------------------------- get doc by name--------------------
				frappe.db.get_doc('BSCs', frm.doc.x_sevice_host_bsc)
		   		 .then(doc => {
		   		 	frm.doc.x_sevice_spc = doc.spc;
					frm.doc.x_sevice_host_msc_name = doc.msc_name;
					frm.doc.x_sevice_host_msc_id =  doc.msc_id;
				});
		   		 //-------------------------------------------------------------------


			} else{
				frm.set_df_property('x_sevice_spc', 'hidden', 1);
				frm.set_df_property('x_sevice_host_msc_name', 'hidden', 1);
				frm.set_df_property('x_sevice_host_msc_id', 'hidden', 1);
			}
			
			frm.refresh_field('x_sevice_spc');
			frm.refresh_field('x_sevice_host_msc_name');
			frm.refresh_field('x_sevice_host_msc_id');
		},
		//------------------------------------ end --------------------------------------


		//-------------------------------------------------------------------------------
		frm.fill_evdo_sevice_host_bsc = function(frm){
			if(frm.doc.evdo_sevice_host_bsc){
				frm.set_df_property('evdo_sevice_spc', 'hidden', 0);
				frm.set_df_property('evdo_sevice_host_msc_name', 'hidden', 0);
				frm.set_df_property('evdo_sevice_host_msc_id', 'hidden', 0);

				// ----------------------------- get doc by name--------------------
				frappe.db.get_doc('BSCs', frm.doc.evdo_sevice_host_bsc)
		   		 .then(doc => {
		   		 	frm.doc.evdo_sevice_spc = doc.spc;
					frm.doc.evdo_sevice_host_msc_name = doc.msc_name;
					frm.doc.evdo_sevice_host_msc_id =  doc.msc_id;
				});
		   		 //-------------------------------------------------------------------


			} else{
				frm.set_df_property('evdo_sevice_spc', 'hidden', 1);
				frm.set_df_property('evdo_sevice_host_msc_name', 'hidden', 1);
				frm.set_df_property('evdo_sevice_host_msc_id', 'hidden', 1);
			}

			frm.refresh_field('evdo_sevice_spc');
			frm.refresh_field('evdo_sevice_host_msc_name');
			frm.refresh_field('evdo_sevice_host_msc_id');

		},
		//------------------------------------ end --------------------------------------

		//-------------------------------------------------------------------------------
		frm.from_survey_func = function(frm){
			if(frm.doc.site_name){
				frm.set_df_property('from_survey_sites', 'hidden', 1);	
			} else{
				frm.set_df_property('from_survey_sites', 'hidden', 0);	
			}

			frm.refresh_field('from_survey_sites');

		}
		//------------------------------------ end --------------------------------------



		//-------------------------------------------------------------------------------
		frm.survey_site_name_Onchange = function(frm){
			if(frm.doc.survey_site_name){
				// ----------------------------- get doc by name--------------------
				frappe.db.get_doc('SurveySites2', frm.doc.survey_site_name)
		   		 .then(doc => {
		   		 	frm.doc.site_name = doc.site_name;
					frm.doc.site_name_arabic = doc.site_name_arabic;
					frm.doc.site_code = doc.survey_code;
					frm.doc.bts_vendor =  doc.bts_vendor;
					
					// frm.doc.bts_type = doc.bsc_ip_adress;
					frm.doc.longitude = doc.longitude;
					frm.doc.latitude = doc.latitude;
					// frm.doc.altitude =  doc.msc_id;

					frm.doc.cell_type = doc.area_type;
					frm.doc.city = doc.government2;
					frm.doc.district = doc.modairiah;
					frm.doc.area_name =  doc.area_name;

						frm.refresh_field('site_name');
					frm.refresh_field('site_name_arabic');
					frm.refresh_field('site_code');
					frm.refresh_field('bts_vendor');

					frm.refresh_field('longitude');
					frm.refresh_field('latitude');
					frm.refresh_field('cell_type');

					frm.refresh_field('city');
					frm.refresh_field('district');
					frm.refresh_field('area_name');

		    	});
		   		 //-------------------------------------------------------------------

				
			} else{
				if(!frm.doc.name)
				{ 
				 	frm.doc.site_name = '';
					frm.doc.site_name_arabic = '';
					frm.doc.site_code = '';
					frm.doc.bts_vendor =  '';
					
					// frm.doc.bts_type = '';
					frm.doc.longitude = '';
					frm.doc.latitude = '';
					// frm.doc.altitude =  '';

					frm.doc.cell_type = '';
					frm.doc.city = '';
					frm.doc.district = '';
					frm.doc.area_name = '';
				}
			}


					frm.refresh_field('site_name');
					frm.refresh_field('site_name_arabic');
					frm.refresh_field('site_code');
					frm.refresh_field('bts_vendor');

					frm.refresh_field('longitude');
					frm.refresh_field('latitude');
					frm.refresh_field('cell_type');

					frm.refresh_field('city');
					frm.refresh_field('district');
					frm.refresh_field('area_name');

			

		}
		//------------------------------------ end --------------------------------------

		

	},
	//==================================================== end setup ==================================================================


	
 


//==================================================== on click functions==================================================================

 	//-------------- -------------------------------------------------------------------------
	cell_id: function(frm){
		let cellid = frm.doc.cell_id
		// console.log(cellid)
		frm.doc.cell_idhex = cellid.toString(16)
		frm.refresh_field('cell_idhex');
	},
   //---------------------------------------End----------------------------------------------





		//-------------- -------------------------------------------------------------------------
	city: function(frm){
		frm.city_onChange(frm);

	},
   //---------------------------------------End----------------------------------------------

	//-------------- -------------------------------------------------------------------------
	bts_vendor: function(frm){
		frm.btsVendor_onChange(frm);
		
	},
   //---------------------------------------End----------------------------------------------


   bsc_name: function(frm){
  		frm.show_hide_bsc_msc_info(frm);
   },


   x_sevice_host_bsc: function(frm){
  		frm.fill_x_sevice_host_bsc(frm);
   },


   evdo_sevice_host_bsc: function(frm){
  		frm.fill_evdo_sevice_host_bsc(frm);
   },

   survey_site_name: function(frm){
   	frm.survey_site_name_Onchange(frm);
   }

   


	//==================================================== end on click functions==================================================================

});
