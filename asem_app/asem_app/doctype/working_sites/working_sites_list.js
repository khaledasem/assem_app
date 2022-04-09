frappe.listview_settings['Working Sites'] = {
    colwidths: {"subject": 10},
    add_fields: ["status", "name", "bts_status"
        ],

     // filters: [
     //    ['is_replaced', '!=', 'Yes'],
     //    ['evaluate', '-=', 'OK']
    // ],

 
    // primary_action() {
    //     // triggers when the primary action is clicked
    //     // frm.doc.is_replaced='';
    // },

    // hide_name_column: true, // hide the last column which shows the `name`
    get_indicator(doc) {
        // customize indicator color --------------
        if (doc.bts_status == 'On Air') {
            return [__("On Air"), "blue", "bts_status,=,On Air"];
          

            // return [__("لم يتم الافادة"), "blue", "contract_status,=,--------------"];
        
        }else if (doc.bts_status == 'Down') {
            return [__("Down"), "red", "bts_status,=,Down"];
        
        
        }else if (doc.contract_status == '--------------') {
            return [__("لم يتم الافادة"), "blue", "contract_status,=,--------------"];
        
        } else if (doc.contract_status == 'تم توقيع العقد') {
            return [__("تم توقيع العقد"), "green", "contract_status,=,تم توقيع العقد"];
        
        
        } else if (doc.contract_status == 'جاري التفاوض') {
            return [__("جاري التفاوض"), "blue", "contract_status,=,جاري التفاوض"];
        
        } 
        else if (doc.contract_status == 'فشل التفاوض') {
            return [__("فشل التعاقد"), "red", "contract_status,=,فشل التفاوض "];
        
         }
        
       
    },



};