var Ui_Project_View =
{
	zoom_value: 1,
	grid: false,
	rules: false,
	informations: true,
	informations_position: 0,

	informations_div: document.getElementById("informations_div"),
	informations_div_x: document.getElementById("informations_div_x"),
	informations_div_y: document.getElementById("informations_div_y"),
	informations_div_w: document.getElementById("informations_div_w"),
	informations_div_h: document.getElementById("informations_div_h"),

	init: function()
	{
		this.init_informations_div();

		document.getElementById("grid_checkbox").checked = false;
		document.getElementById("rules_checkbox").checked = false;
		document.getElementById("informations_checkbox").checked = true;
	},

	init_informations_div: function()
	{
		var w = localStorage.getItem("width");
		var h = localStorage.getItem("height");

		if (w)
			this.informations_div_w.innerHTML = w;
		else
			this.informations_div_w.innerHTML = "100";

		if (h)
			this.informations_div_h.innerHTML = h;
		else
			this.informations_div_h.innerHTML = "100";
	},

	move_informations_div: function()
	{
		if (this.informations_position)
		{
			this.informations_div.style.top = "auto";
			this.informations_div.style.bottom = "0";
			this.informations_position = 0;
		}
		else
		{
			this.informations_div.style.top = "0";
			this.informations_div.style.bottom = "auto";
			this.informations_position = 1;
		}
	},

	update_zoom_value: function(val)
	{
		if (val == -1 && this.zoom_value > 1)
			document.getElementById("span_zoom_value").innerHTML = --this.zoom_value;
		else if (val == 1 && this.zoom_value < 50)
			document.getElementById("span_zoom_value").innerHTML = ++this.zoom_value;

		Ui_Canvas.update_size();
		Ui_Canvas.init_canvas_position();
	},

	update_grid_checkbox: function(check)
	{
		this.grid = check;
	},

	update_rules_checkbox: function(check)
	{
		this.rules = check;
	},

	update_informations_checkbox: function(check)
	{
		this.informations = check;
		if (check)
			this.informations_div.style.display = "block";
		else
			this.informations_div.style.display = "none";

	},

	update_background_project: function(color)
	{
		document.body.style.background = color;
		//document.getElementById("preview_canvas").style.background = color;
	}
}
