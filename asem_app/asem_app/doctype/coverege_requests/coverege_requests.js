// Copyright (c) 2022, khaled asem and contributors
// For license information, please see license.txt

frappe.ui.form.on('coverege_requests', {
	setup: function(frm){
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
	},
	// refresh: function(frm) {

	// }


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

	order_by: function(frm){
		console.log(frm.doc.order_by)

		if(frm.doc.order_by =='فرع المؤسسة'){
			//------------- dialog --------------------
			let d = new frappe.ui.Dialog({
				    title: 'فرع المؤسسة في محافظة:',
				    fields: [
					    {
					        label: 'فرع المؤسسة في محافظة',
					        fieldname: 'branch_name',
					        fieldtype: 'Link',
					        options: 'govern1',
					        reqd: true
					    },
					 ],
					primary_action_label: 'Submit',
				    primary_action(values) {

				    d.hide();
				    
					}
				});
			d.show();
			//------------- end dialog --------------------
			
		}

		else if(frm.doc.order_by =='اخرى'){
			//------------- dialog --------------------
			let d = new frappe.ui.Dialog({
				    title: 'جهة طلب اخرى:',
				    fields: [
					    {
					        label: 'الطلب من:',
					        fieldname: 'order_by_another',
					        fieldtype: 'Data',
					        options: '',
					        reqd: true
					    },
					 ],
					primary_action_label: 'Submit',
				    primary_action(values) {

				    d.hide();
				    
					}
				});
			d.show();
			//------------- end dialog --------------------
			// console.log(frm.doc.order_by)
		}
		

	},


	evaluatoin: function(frm){
		frm.doc.evaluation_details = '';
		frm.refresh_field('evaluation_details');
		if(frm.doc.evaluatoin =='يوجد موقع ممسوح'){
			//------------- dialog --------------------
			let d = new frappe.ui.Dialog({
				    title: 'المواقع الممسوحة',
				    fields: [
					    {
					        label: 'اختار اسم الموقع الممسوح:',
					        fieldname: 'survey_site_name',
					        fieldtype: 'Link',
					        options: 'SurveySites2',
					        reqd: true
					    },
					 ],
					primary_action_label: 'Submit',
				    primary_action(values) {
				    	//-----------------
						frappe.db.get_doc('SurveySites2', values.survey_site_name)
								   		 .then(doc => {
								   		 	var str = doc.site_name_arabic;
								        	frm.doc.evaluation_details = 'يوجد موقع ممسوح '+
								    		' مسلم للمشاريع بإسم: ' + str.bold();
								    		

								    		frm.refresh_field('evaluation_details');
						})
				    	
				    	d.hide();
				    
					}
				});
			d.show();
			//------------- end dialog --------------------
			
		}else if(frm.doc.evaluatoin =='يوجد موقع في خطة المسح لهذا العام'){
			//------------- dialog --------------------
			let d = new frappe.ui.Dialog({
				    title: 'مواقع الخطة السنوية لهذا العام',
				    fields: [
					    {
					        label: 'اختار اسم الموق في الخطة:',
					        fieldname: 'planning_site_name',
					        fieldtype: 'Data',
					        options: '',
					        reqd: true
					    },
					 ],
					primary_action_label: 'Submit',
				    primary_action(values) {
				    	//-----------------
						// frappe.db.get_doc('SurveySites2', values.survey_site_name)
						// 		   		 .then(doc => {
						var str = values.planning_site_name;
						frm.doc.evaluation_details = 'يوجد موقع في الخطة السنوية لهذا العام '+
						'بإسم ' + str.bold();
								    		

						frm.refresh_field('evaluation_details');
						// })
				   		d.hide();
				    
					}
				});
			d.show();
			//------------- end dialog --------------------
			
		}else if(frm.doc.evaluatoin =='تحتاج اضافة هوائي'){
			//------------- dialog --------------------
			let d = new frappe.ui.Dialog({
				    title: 'المواقع العاملة',
				    fields: [
					    {
					        label: 'اختار اسم الموق الذي يحتاج اضافة هوائي:',
					        fieldname: 'site_name',
					        fieldtype: 'Link',
					        options: 'Working Sites',
					        reqd: true
					    },
					 ],
					primary_action_label: 'Submit',
				    primary_action(values) {
				    	//-----------------
						// frappe.db.get_doc('SurveySites2', values.survey_site_name)
						// 		   		 .then(doc => {
						var str = values.site_name;
						frm.doc.evaluation_details = 'مقترح اضافة هوائي بإتجاة المنطقة في موقع'+
						+ str.bold();
								    		

						frm.refresh_field('evaluation_details');
						// })
				   		d.hide();
				    
					}
				});
			d.show();
			//------------- end dialog --------------------
			
		}else if(frm.doc.evaluatoin =='تحتاج إضافة لخطط المسح القادمة'){
			//------------- dialog --------------------
			let d = new frappe.ui.Dialog({
				    title: 'المواقع المخططة',
				    fields: [
					    {
					        label: 'ادخل اسم الموق المقترح:',
					        fieldname: 'site_name',
					        fieldtype: 'Data',
					        options: '',
					        reqd: true
					    },
					     {
					        label: 'اولوية الموقع:',
					        fieldname: 'site_priority',
					        fieldtype: 'Select',
					        options: [ '', 'عالية جدا', 'عالية', 'متوسطة', 'ضعيفة' ],
					        reqd: true
					    },
					 ],
					primary_action_label: 'Submit',
				    primary_action(values) {
				    	//-----------------
						// frappe.db.get_doc('SurveySites2', values.survey_site_name)
						// 		   		 .then(doc => {
						var str = values.site_name;
						var str2 = values.site_priority;
						frm.doc.evaluation_details = 'سيتم ادراج المنطقة في خطط المسح القادمة. '+
						'اسم الموقع المقترح: ' + str.bold() + '. اولوية الموقع: '+ str2.bold() + '.'
								    		

						frm.refresh_field('evaluation_details');
						// })
				   		d.hide();
				    
					}
				});
			d.show();
			//------------- end dialog --------------------
			
		}else if(frm.doc.evaluatoin =='المنطقة غير معروفة'){
			
			frm.doc.evaluation_details = 'المنطقة المذكورة غير معروفة';
			frm.refresh_field('evaluation_details');
					
		}else if(frm.doc.evaluatoin =='تحتاج فحص من الاخوة في التحسين'){
			
			frm.doc.evaluation_details = 'المنطقة لا تحتاج لمواقع جديدة. على الاخوة في التحسين فحص المنطقة';
			frm.refresh_field('evaluation_details');
					
		}
	},


	evaluatoin_opt: function(frm){

		if(frm.doc.evaluatoin_opt =='المشكلة بسبب خروج موقع عن الخدمة'){
			frm.set_df_property('site_name', 'hidden', 0)
			frm.set_df_property('off_date', 'hidden', 0)
			frm.set_df_property('another_problems', 'hidden', 1)
		}else if(frm.doc.evaluatoin_opt =='المشكلة بسبب قطع في التراسل'){
			frm.set_df_property('site_name', 'hidden', 0)
			frm.set_df_property('off_date', 'hidden', 0)
			frm.set_df_property('another_problems', 'hidden', 1)
			frm.set_df_property('site_name', 'label', 'اسم الموقع المتأثر بقطع التراسل')
			frm.set_df_property('off_date', 'label', 'تاريخ قطع التراسل')
			
		}else if(frm.doc.evaluatoin_opt =='اخرى'){
			frm.set_df_property('site_name', 'hidden', 1)
			frm.set_df_property('off_date', 'hidden', 1)
			frm.set_df_property('another_problems', 'hidden', 0)
			
		}else{
			frm.set_df_property('site_name', 'hidden', 1)
			frm.set_df_property('off_date', 'hidden', 1)
			frm.set_df_property('another_problems', 'hidden', 1)
		}
	}
});
