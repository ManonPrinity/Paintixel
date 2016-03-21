var Storage =
{
	canvas_width: 10,
	canvas_height: 10,

	load: function()
	{
		var w = localStorage.getItem("width");
		var h = localStorage.getItem("height");

		if (w)
			this.canvas_width = w;
		if (h)
			this.canvas_height = h;
	},
	set: function(name, val)
	{
		localStorage.setItem(name, val);
	}
}

Storage.load();
