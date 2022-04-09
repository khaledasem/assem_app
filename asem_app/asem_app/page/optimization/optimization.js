frappe.pages['optimization'].on_page_load = function(wrapper) {
new MyPage(wrapper);
}

// PAGE CONTENT

MyPage = Class.extend({
	init: function(wrapper){
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Planning',
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
		


	


		<div class="widget              links-widget-box" data-widget-name="4f3abedc49">
			<div class="widget-head">
				<div>
					<div class="widget-title ellipsis"><svg class="icon  icon-sm" style="">
					<use class="" href="#icon-file"></use>
					</svg> <span>New Transmitter Order</span>
					</div>
					<div class="widget-subtitle">
					</div>
				</div>
				<div class="widget-control">
				</div>
			</div>
			<div class="widget-body">
				<a href="/app/new_sector_order" class="link-item ellipsis  " type="Link">
				<span class="indicator-pill no-margin gray"></span>
				<span class="link-content ellipsis">Add &amp; Edit</span>
				</a><a href="/app/new_sector_order" class="link-item ellipsis  " type="Link">
				<span class="indicator-pill no-margin gray"></span>
				<span class="link-content ellipsis">View</span>
				</a>
			</div>
			<div class="widget-footer">
			</div>
		</div>


		<div class="widget              links-widget-box" data-widget-name="1a9c0141c9">
			<div class="widget-head">
				<div>
					<div class="widget-title ellipsis"><svg class="icon  icon-sm" style="">
						<use class="" href="#icon-file"></use>
						</svg> <span>Working Sites</span>
					</div>
					<div class="widget-subtitle">
					</div>
				</div>
				<div class="widget-control">
				</div>
			</div>
			<div class="widget-body">
				<a href="/app/working-sites" class="link-item ellipsis  " type="Link">
				<span class="indicator-pill no-margin gray"></span>
				<span class="link-content ellipsis">Add &amp; Edit Sites</span>
				</a><a href="/app/working_sectors" class="link-item ellipsis  " type="Link">
				<span class="indicator-pill no-margin gray"></span>
				<span class="link-content ellipsis">Add &amp; Edit Transmitters</span>
				</a><a href="/app/query-report/SiteInfo_Report" class="link-item ellipsis  " type="Link">
				<span class="indicator-pill no-margin gray"></span>
				<span class="link-content ellipsis">View</span>
				</a>
			</div>
			<div class="widget-footer">
			</div>
		</div>
	</div>
	
</div>
` ;


frappe.this_page = {
	body: body
}