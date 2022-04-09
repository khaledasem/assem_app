// Copyright (c) 2022, khaled asem and contributors
// For license information, please see license.txt

frappe.ui.form.on('annual_site_planning', {
	setup: function(frm){

		frm.awaliat_function = function(frm){

			frm.doc.old_site_name = '';
			frm.doc.site_name = '';
			frm.doc.site_name_arabic = '';
			frm.refresh_field('site_name');
			frm.refresh_field('site_name_arabic');

			if(frm.doc.site_awaliat == 'موقع جديد'){

				frm.set_df_property('old_site_name', 'hidden', 1);
				// frm.set_df_property('old_site_name', 'label', '');

				//-----------------------------------------
				frm.set_df_property('site_name', 'hidden', 0);
				frm.set_df_property('site_name_arabic', 'hidden', 0);
				frm.set_df_property('section_1', 'hidden', 0);
				frm.set_df_property('section_2', 'hidden', 0);
				frm.set_df_property('section_3', 'hidden', 0);
				

			} else if(frm.doc.site_awaliat == 'بديل موقع في الخدمات'){

				frm.set_df_property('old_site_name', 'hidden', 0);
				frm.set_df_property('old_site_name', 'label', 'اختار من المواقع المرفوعة للخدمات');
				frm.set_df_property('old_site_name', 'fieldtype', 'Link');
				frm.set_df_property('old_site_name', 'options', 'NewSites');

				//-----------------------------------------
				frm.set_df_property('site_name', 'hidden', 1);
				frm.set_df_property('site_name_arabic', 'hidden', 1);
				frm.set_df_property('section_1', 'hidden', 1);
				frm.set_df_property('section_2', 'hidden', 1);
				frm.set_df_property('section_3', 'hidden', 1);

			} else if(frm.doc.site_awaliat == 'بديل موقع في المشاريع'){

				frm.set_df_property('old_site_name', 'hidden', 0);
				frm.set_df_property('old_site_name', 'label', 'اختار من المواقع المرفوعة للمشاريع');
				frm.set_df_property('old_site_name', 'fieldtype', 'Link');
				frm.set_df_property('old_site_name', 'options', 'SurveySites2');

				//-----------------------------------------
				frm.set_df_property('site_name', 'hidden', 1);
				frm.set_df_property('site_name_arabic', 'hidden', 1);
				frm.set_df_property('section_1', 'hidden', 1);
				frm.set_df_property('section_2', 'hidden', 1);
				frm.set_df_property('section_3', 'hidden', 1);

			} else if(frm.doc.site_awaliat == 'بديل موقع عامل'){

				frm.set_df_property('old_site_name', 'hidden', 0);
				frm.set_df_property('old_site_name', 'label', 'اختار من المواقع العاملة');
				frm.set_df_property('old_site_name', 'fieldtype', 'Link');
				frm.set_df_property('old_site_name', 'options', 'Working Sites');

				//-----------------------------------------
				frm.set_df_property('site_name', 'hidden', 1);
				frm.set_df_property('site_name_arabic', 'hidden', 1);
				frm.set_df_property('section_1', 'hidden', 1);
				frm.set_df_property('section_2', 'hidden', 1);
				frm.set_df_property('section_3', 'hidden', 1);

			} else{
				frm.set_df_property('site_name', 'hidden', 1);
				frm.set_df_property('site_name_arabic', 'hidden', 1);
				frm.set_df_property('section_1', 'hidden', 1);	
				frm.set_df_property('section_2', 'hidden', 1);
				frm.set_df_property('section_3', 'hidden', 1);
			}
		},
		//------------------------end -----------------------------------------


		frm.old_site_name_onChange = function(frm){
			frm.set_df_property('site_name', 'hidden', 0);
			frm.set_df_property('site_name_arabic', 'hidden', 0);
			frm.set_df_property('section_1', 'hidden', 0);
			frm.set_df_property('section_2', 'hidden', 0);
			frm.set_df_property('section_3', 'hidden', 0);
			frm.doc.site_name = '';
			frm.doc.site_name_arabic = '';

			if(frm.doc.site_awaliat == 'بديل موقع في الخدمات'){

				//-----------get----------
				frappe.db.get_doc('NewSites', frm.doc.old_site_name)
				.then(doc => {
					frm.doc.site_name = doc.site_name;
					frm.doc.site_name_arabic = doc.site_name_arabic;
					frm.refresh_field('site_name');
					frm.refresh_field('site_name_arabic');
				})

			} else if(frm.doc.site_awaliat == 'بديل موقع في المشاريع'){

				//-----------get----------
				frappe.db.get_doc('SurveySites2', frm.doc.old_site_name)
				.then(doc => {
					frm.doc.site_name = doc.site_name;
					frm.doc.site_name_arabic = doc.site_name_arabic;
					frm.refresh_field('site_name');
					frm.refresh_field('site_name_arabic');
				})

				
			} else if(frm.doc.site_awaliat == 'بديل موقع عامل'){

				//-----------get----------
				frappe.db.get_doc('Working Sites', frm.doc.old_site_name)
				.then(doc => {
					frm.doc.site_name = doc.site_name;
					frm.doc.site_name_arabic = doc.site_name_arabic;
					frm.refresh_field('site_name');
					frm.refresh_field('site_name_arabic');
				})

			}
		}
		//------------------------- end ------------------------------------------



		frm.set_query_modairat = function(frm){
			frm.set_query("modairiah", function(){
				return {
					"filters": {
						"government": frm.doc.city
					}
				};
			}),

			frm.refresh_field('modairiah');
			frm.refresh_field('ozlah');
		}
		//------------------------- end ------------------------------------------
	},
	refresh: function(frm) {
		frm.awaliat_function(frm);

		frm.set_query_modairat(frm);
	},







	site_awaliat: function(frm){
		frm.awaliat_function(frm);
	},

	old_site_name: function(frm){
		frm.old_site_name_onChange(frm);
	},

	//------------------------------
	city: function(frm){
		frm.set_query_modairat(frm);
		frm.doc.modairiah='';
		frm.doc.ozlah='';
		frm.refresh_field('modairiah');
		frm.refresh_field('ozlah');

		//-----------------
		frappe.db.get_doc('govern1', frm.doc.city)
		.then(doc => {
			frm.doc.zone = doc.zone;
			frm.refresh_field('zone');
		})
	},
});
