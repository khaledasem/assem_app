# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals, print_function

# no_cache = 1
# base_template_path = "templates/www/app.html"

# import os, re
import frappe
from frappe import _
import frappe.sessions
# from frappe.utils.jinja import is_rtl

def get_context(context):
	if frappe.session.user == "Guest":
		frappe.throw(_("Log in to access this page."), frappe.PermissionError)
	elif frappe.db.get_value("User", frappe.session.user, "user_type") == "Website User":
		frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)
