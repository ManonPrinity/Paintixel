var Ui_Tools =
{
	active_tool: "pen",
	pen_size: 1,
	pen_opacity: 100,
	pipette_size: 1,
	eraser_size: 1,
	eraser_opacity: 100,
	bucket_tolerance: 0,
	swaper_tolerance: 0,
	lighten_size: 1,
	lighten_power: 10,
	darken_size: 1,
	darken_power: 10,
	stroke_width: 1,
	stroke_opacity: 100,
	square_width: 1,
	square_opacity: 100,
	square_filling: 0,
	circle_width: 1,
	circle_opacity: 100,
	circle_filling: 0,

	vertical_symetry: false,
	horizontal_symetry: false,

	init: function()
	{
		this.show_tool_option();
		document.getElementById("vertical_symetry_input").checked = false;
		document.getElementById("horizontal_symetry_input").checked = false;
	},

	select_tool: function(elem, tool)
	{
		document.getElementById("selected_tool").id = "";
		elem.id = "selected_tool";
		this.active_tool = tool;
		this.show_tool_option();
	},

	show_tool_option: function()
	{
		var tools_option = document.getElementsByClassName("tool");
		var i = 0;
		while (i < tools_option.length)
		{
			tools_option[i].style.display = "none";
			++i;
		}
		document.getElementById("tool_option_" + this.active_tool).style.display = "block";
	},

	update_pen_size: function(size)
	{
		document.getElementById("pen_size_span").innerHTML = size + " pixel";
		if (size > 1)
			document.getElementById("pen_size_span").innerHTML += "s";
		this.pen_size = parseInt(size);
	},

	update_pen_opacity: function(opacity)
	{
		document.getElementById("pen_opacity_span").innerHTML = opacity + "%";
		this.pen_opacity = parseInt(opacity);
	},

	update_pipette_size: function(size)
	{
		document.getElementById("pipette_size_span").innerHTML = size + " pixel";
		if (size > 1)
			document.getElementById("pipette_size_span").innerHTML += "s";
		this.pipette_size = parseInt(size);
	},

	update_eraser_size: function(size)
	{
		document.getElementById("eraser_size_span").innerHTML = size + " pixel";
		if (size > 1)
			document.getElementById("eraser_size_span").innerHTML += "s";
		this.eraser_size = parseInt(size);
	},

	update_eraser_opacity: function(opacity)
	{
		document.getElementById("eraser_opacity_span").innerHTML = opacity + "%";
		this.eraser_opacity = parseInt(opacity);
	},

	update_bucket_tolerance: function(tolerance)
	{
		document.getElementById("bucket_tolerance_span").innerHTML = tolerance + "%";
		this.bucket_tolerance = parseInt(tolerance);
	},

	update_swaper_tolerance: function(tolerance)
	{
		document.getElementById("swaper_tolerance_span").innerHTML = tolerance + "%";
		this.swaper_tolerance = parseInt(tolerance);
	},

	update_lighten_size: function(size)
	{
		document.getElementById("lighten_size_span").innerHTML = size + " pixel";
		if (size > 1)
			document.getElementById("lighten_size_span").innerHTML += "s";
		this.lighten_size = parseInt(size);
	},

	update_lighten_power: function(power)
	{
		document.getElementById("lighten_power_span").innerHTML = power + "%";
		this.lighten_power = parseInt(power);
	},

	update_darken_size: function(size)
	{
		document.getElementById("darken_size_span").innerHTML = size + " pixel";
		if (size > 1)
			document.getElementById("darken_size_span").innerHTML += "s";
		this.darken_size = parseInt(size);
	},

	update_darken_power: function(power)
	{
		document.getElementById("darken_power_span").innerHTML = power + "%";
		this.darken_power = parseInt(power);
	},

	update_stroke_width: function(width)
	{
		document.getElementById("stroke_width_span").innerHTML = width + " pixel";
		if (width > 1)
			document.getElementById("stroke_width_span").innerHTML += "s";
		this.stroke_width = parseInt(width);
	},

	update_stroke_opacity: function(opacity)
	{
		document.getElementById("stroke_opacity_span").innerHTML = opacity + "%";
		this.stroke_opacity = parseInt(opacity);
	},

	update_square_width: function(width)
	{
		document.getElementById("square_width_span").innerHTML = width + " pixel";
		if (width > 1)
			document.getElementById("square_width_span").innerHTML += "s";
		this.square_width = parseInt(width);
	},

	update_square_opacity: function(opacity)
	{
		document.getElementById("square_opacity_span").innerHTML = opacity + "%";
		this.square_opacity = parseInt(opacity);
	},

	update_square_filling: function(filling)
	{
		var primary_p = document.getElementById("fill_square_primary");
		var secondary_p = document.getElementById("fill_square_secondary");

		if (filling == 1)
		{
			if (primary_p.className == "selected")
			{
				primary_p.className = "";
				this.square_filling = 0;
			}
			else
			{
				primary_p.className = "selected";
				secondary_p.className = "";
				this.square_filling = 1;

			}
		}
		else if (filling == 2)
		{
			if (secondary_p.className == "selected")
			{
				secondary_p.className = "";
				this.square_filling = 0;
			}
			else
			{
				primary_p.className = "";
				secondary_p.className = "selected";
				this.square_filling = 2;

			}
		}
	},

	update_circle_width: function(width)
	{
		document.getElementById("circle_width_span").innerHTML = width + " pixel";
		if (width > 1)
			document.getElementById("circle_width_span").innerHTML += "s";
		this.circle_width = parseInt(width);
	},

	update_circle_opacity: function(opacity)
	{
		document.getElementById("circle_opacity_span").innerHTML = opacity + "%";
		this.circle_opacity = parseInt(opacity);
	},

	update_circle_filling: function(filling)
	{
		var primary_p = document.getElementById("fill_circle_primary");
		var secondary_p = document.getElementById("fill_circle_secondary");

		if (filling == 1)
		{
			if (primary_p.className == "selected")
			{
				primary_p.className = "";
				this.square_filling = 0;
			}
			else
			{
				primary_p.className = "selected";
				secondary_p.className = "";
				this.square_filling = 1;

			}
		}
		else if (filling == 2)
		{
			if (secondary_p.className == "selected")
			{
				secondary_p.className = "";
				this.square_filling = 0;
			}
			else
			{
				primary_p.className = "";
				secondary_p.className = "selected";
				this.square_filling = 1;

			}
		}
	},

	update_vertical_symetry: function(check)
	{
		document.getElementById("vertical_symetry_input").checked = check;
		this.vertical_symetry = check;
	},

	update_horizontal_symetry: function(check)
	{
		document.getElementById("horizontal_symetry_input").checked = check;
		this.horizontal_symetry = check;
	}
}
