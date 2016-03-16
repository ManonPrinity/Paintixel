var Palette =
{
	selected_colors: ["#000000", "#ffffff"],
	selected_colors_rgb: [0, 0, 0, 255, 255, 255],
	left_color_preview: document.getElementById("left_color_preview"),
	right_color_preview: document.getElementById("right_color_preview"),
	left_color_span: document.getElementById("left_color_span"),
	right_color_span: document.getElementById("right_color_span"),

	init: function()
	{
		this.left_color_preview.style.background = this.selected_colors[0];
		this.left_color_span.innerHTML = this.selected_colors[0];

		this.right_color_preview.style.background = this.selected_colors[1];
		this.right_color_span.innerHTML = this.selected_colors[1];

		this.add_color("#000000");
		this.add_color("#222222");
		this.add_color("#444444");
		this.add_color("#666666");
		this.add_color("#888888");
		this.add_color("#aaaaaa");
		this.add_color("#cccccc");
		this.add_color("#ffffff");

		this.add_color("#cc5555");
		this.add_color("#5555cc");
		this.add_color("#55cc55");
		this.add_color("#55cccc");
		this.add_color("#cccc55");
		this.add_color("#cc55cc");
		this.add_color("#5c5c5c");
		this.add_color("#c5c5c5");
	},

	set_left_color: function(color)
	{
		this.selected_colors[0] = color;
		alert('a');
		this.left_color_preview.style.background = this.selected_colors[0];
		this.left_color_span.innerHTML = this.selected_colors[0];

		this.add_color(color);
	},

	set_right_color: function(color)
	{
		this.selected_colors[1] = color;
		this.right_color_preview.style.background = this.selected_colors[1];
		this.right_color_span.innerHTML = this.selected_colors[1];

		this.add_color(color);
	},

	add_color: function(color)
	{
		var new_color = document.createElement("span");
		new_color.className = "color";
		new_color.style.background = color;
		new_color.onclick = function()
		{
			Palette.selected_colors[0] = color;
			Palette.selected_colors_rgb[0] = parseInt(color.substr(1, 2), 16);
			Palette.selected_colors_rgb[1] = parseInt(color.substr(3, 2), 16);
			Palette.selected_colors_rgb[2] = parseInt(color.substr(5, 2), 16);
			Palette.left_color_preview.style.background = Palette.selected_colors[0];
			Palette.left_color_span.innerHTML = Palette.selected_colors[0];
		}
		new_color.oncontextmenu = function(e)
		{
			e.preventDefault();
			Palette.selected_colors[1] = color;
			Palette.selected_colors_rgb[3] = parseInt(color.substr(1, 2), 16);
			Palette.selected_colors_rgb[4] = parseInt(color.substr(3, 2), 16);
			Palette.selected_colors_rgb[5] = parseInt(color.substr(5, 2), 16);
			Palette.right_color_preview.style.background = Palette.selected_colors[1];
			Palette.right_color_span.innerHTML = Palette.selected_colors[1];
			return (false);
		}
		new_color.ondblclick = function()
		{
			this.parentNode.removeChild(this);
		}
		document.getElementById("palette").appendChild(new_color);
	}
}
