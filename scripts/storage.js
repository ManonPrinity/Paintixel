var Storage =
{
	canvas_width: 32,
	canvas_height: 32,
	import_image: false,
	image_url: undefined,

	load: function()
	{
		var w = localStorage.getItem("width");
		var h = localStorage.getItem("height");
		this.import_image = parseInt(localStorage.getItem("import_image"));
		this.image_url = localStorage.getItem("image_url");

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
