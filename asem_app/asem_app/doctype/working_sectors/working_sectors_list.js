frappe.listview_settings['Working_Sectors'] = {
    colwidths: {"subject": 10},
    add_fields: ["status", "name", "walsh_trafficfch_sch"
    ],

    get_indicator(doc) {
        // customize indicator color --------------
        var traffic = Number(doc.walsh_trafficfch_sch);
        console.log(traffic)
        // Number(old_num)
        if (traffic <= 1) {
            return [__("No traffic"), "white", "walsh_trafficfch_sch,=,No traffic"];
        }
        else if (1<= traffic && traffic < 10) {
            return [__("Very low traffic"), "cyan", "walsh_trafficfch_sch,=,Very low Traffic"];
        
        }else if (10<= traffic && traffic  < 25) {
            return [__("Low traffic"), "green", "walsh_trafficfch_sch,=,Low Traffic"];
        
        } else if (25<=traffic && traffic  < 40) {
            return [__("Average traffic"), "orange", "walsh_trafficfch_sch,=,Average Traffic"];
        
        } else if (40<=traffic && traffic < 60) {
            return [__("High traffic"), "red", "walsh_trafficfch_sch,=,High Traffic"];
        
        } 
        else if (60<=traffic  && traffic  < 180) {
            return [__("Very high traffic"), "pink", "walsh_trafficfch_sch,=,Very high Traffic"];
        
         }
        
       
    },



};