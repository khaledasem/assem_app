$(document).on("startup", function () {
    // custom logic
    // frappe.set_route("#custom_page");


    var variab = ''
                frm.call({
                method: "planning_app.planning_app.doctype.newsites.myapi.getUserInfo_api",
                // args: {'name': frm.doc.government2, 'last_code': used_code_num},
                callback: function(r) {
                     

                    variab  =  r.message[0][2]
                
                     if( variab == 'Planning User'){
                        console.log('asssssssssssssm')
                           frappe.set_route("test3");
                    }


                    //----------- set permistion for evaluate ------------------
                    // if(frappe.user.name =='Administrator' || variab == 'Planning Manager User'){
                    //         console.log('evalua')
                    //     frm.set_df_property('evaluate', 'read_only', 0)
                    //     frm.set_df_property('evaluation_note', 'read_only', 0)
                        
                    // } else{
                    //     frm.set_df_property('evaluate', 'read_only', 1)
                    //     frm.set_df_property('evaluation_note', 'read_only', 1)
                    // }
                    //-----------------------------------------------------------------------           

            }
        })
});