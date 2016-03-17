var Ui_Project_View =
{
	zoom_value: 1,
	grid: false,
	rules: false,

	init: function()
	{
		this.grid = document.getElementById("grid_checkbox").checked;
		this.rules = document.getElementById("rules_checkbox").checked;
	},

	set_zoom_value: function(val)
	{
		if (val == -1 && this.zoom_value > 1)
			document.getElementById("span_zoom_value").innerHTML = --this.zoom_value;
		else if (val == 1 && this.zoom_value < 50)
			document.getElementById("span_zoom_value").innerHTML = ++this.zoom_value;

		//Canvas.update_drawing_size();
		//Canvas.update_drawing_position();
	},

	update_grid_checkbox: function(check)
	{
		this.grid = check;
	},

	update_rules_checkbox: function(check)
	{
		this.rules = check;
	},

	set_background_project: function(color)
	{
		document.body.style.background = color;
		//document.getElementById("preview_canvas").style.background = color;
	}
}
