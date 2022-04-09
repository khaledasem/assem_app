frappe.pages['services'].on_page_load = function(wrapper) {
	new MyPage(wrapper);
}

// PAGE CONTENT

MyPage = Class.extend({
	init: function(wrapper){
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'إدارة الخدمات',
			single_column: true

		});
		//MAKE PAGE
		this.make();

	},

	// MAKE PAGE
	make: function(){

		//GRAB THE CLASS
		let me = $(this);

		//BODY CONTENT
		// let body = '<h1> Hi Body</h1>';

		//PUSH DOM ELEMENT TO PAGE
		$(frappe.render_template(frappe.this_page.body,this)).appendTo(this.page.main)
		// frappe.planning_page.body
	}

//END CLASS

})


// HTML CONTENT
let body =` 
<div class="widget-group ">
	<div class="widget-group-head">
		<!-- 
		<div class="widget-group-title">Reports &amp; Masters
		</div>
		 -->
		
		
		<div class="widget-group-control">
		</div>
	</div>


	<div class="widget-group-body grid-col-3">


		<!-- New sites -->
		<div style="width:400px"  class="widget              links-widget-box" data-widget-name="8ab7a260e4">
			<div class="widget-head">
				<div>
					<div class="widget-title ellipsis">
					<img src="/assets/asem_app/images/tower-icon-0-.jpg"/>
						<svg class="icon  icon-sm" style="">

							<use class="" href="/assets/asem_app/images/YemenMobile_Logo-4.jpg"></use>
						</svg> 
						<span>New Sites</span>
					</div>
					<div class="widget-subtitle">
					</div>
				</div>
				<div class="widget-control">
				</div>
			</div>
			<div class="widget-body">
				<a href="/app/newsites" class="link-item ellipsis  " type="Link">
				<span class="indicator-pill no-margin gray"></span>
				<span class="link-content ellipsis">
				<b>
				تحديث المواقع المرفوعة للتفاوض
				</b>
				</span>
				</a><a target="_blank" href="/app/query-report/NewSitesReport" class="link-item ellipsis  " type="Link" >
				<span class="indicator-pill no-margin gray"></span>
				<span class="link-content ellipsis">
				<b>
				استعراض و تحميل المواقع
				</b>
				</span>
				</a>
			</div>
			<div class="widget-footer">
			</div>
		</div>
		<!-- ---------------- -->


		

	</div>
</div>
` ;


frappe.this_page = {
	body: body
}