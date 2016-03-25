var Ui_Layers =
{
	layers_handler: document.getElementById("layers_handler"),
	amount: 0,

	init: function()
	{
		var default_layer = this.add_layer();
		default_layer.id = "selected_layer";
		default_layer.classList.add("lock");
		default_layer.firstChild.nextSibling.innerHTML = "Default Layer";
	},

	add_layer: function()
	{
		++this.amount;

		var new_layer = document.createElement("div");
		new_layer.className = "layer";

		var new_span = document.createElement("span");
		new_span.className = "visible";
		new_span.onclick = function()
		{
			if (this.classList.contains("visible"))
			{
				this.className = "invisible";
				this.parentNode.style.opacity = 0.75;
			}
			else
			{
				this.className = "visible";
				this.parentNode.style.opacity = 1;
			}
		}

		var new_p = document.createElement("p");
		new_p.innerHTML = "New Layer";
		new_p.onclick = this.select_layer;

		var new_input = document.createElement("input");
		new_input.type = "text";
		new_input.onkeydown = function(e)
		{
			if (e.keyCode == 13)
			{
				this.previousSibling.innerHTML = this.value;
				this.style.display = "none";
				this.previousSibling.style.display = "inline-block";
			}
		}

		new_layer.appendChild(new_span);
		new_layer.appendChild(new_p);
		new_layer.appendChild(new_input);

		this.layers_handler.insertBefore(new_layer, this.layers_handler.firstChild);

		return (new_layer);
	},

	select_layer: function(elem)
	{
		document.getElementById("selected_layer").id = "";
		this.parentNode.id = "selected_layer";
	},

	move_layer_top: function()
	{

	},

	move_layer_down: function()
	{

	},

	rename_layer: function()
	{
		var selected_layer = document.getElementById("selected_layer");

		selected_layer.firstChild.nextSibling.style.display = "none";
		selected_layer.firstChild.nextSibling.nextSibling.style.display = "inline-block";
		selected_layer.firstChild.nextSibling.nextSibling.focus();
	},

	delete_layer: function()
	{
		var selected_layer = document.getElementById("selected_layer");

		if (selected_layer.classList.contains("lock"))
			return ;
		selected_layer.nextSibling.id = "selected_layer";
		selected_layer.parentNode.removeChild(selected_layer);
	}
}