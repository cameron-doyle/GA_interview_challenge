class ProductManager {
	//Array of productItems
	#products
	constructor() {
		this.#products = []
		this.addProduct("Poop Fishing", 199.99, "fishingforfloaters.avif")
		this.addProduct("Gen Z Man", 9.99, "lazyman.avif")
		this.addProduct("Loud Mouth", 17.6874578, "loudmouth.avif")
		this.addProduct("Speeding Poo", 5, "speed-poo.avif")
		this.render()
	}

	//Factory function for the productItem
	cartItemObj(productID, name, price, imgName) {
		return {
			id: productID,
			name,
			price,
			img: imgName
		}
	}

	addProduct(name, price, imgName) {
		//Get last task in the products array
		const lastTask = this.#products[this.#products.length - 1];

		//If this is the first product, default to id of 1, otherwise increment last product ID
		let id = (lastTask === undefined) ? 1 : lastTask.id + 1

		//Add new product
		this.#products.push(this.cartItemObj(id, name, price, imgName))
		this.render()
	}

	getProductById(productID) {
		const p = this.#products.filter(product => product.id === productID)
		return (p != null && p.length > 0) ? p[0] : null
	}

	render() {
		const container = document.getElementById("content-container")
		container.innerHTML = '' //Wipe table for rerender

		this.#products.forEach(product => {
			container.innerHTML += `
			<li class="list-group-item" product-id="${product.id}">
				<div class="card">
					<div class="card-header">
						<img src="./imgs/${product.img}" alt="#">
					</div>
					<div class="card-body">
						<h1>${product.name}</h1>
						<h2>${formatPrice(product.price)}</h2>
						
					</div>
					<div class="card-footer">
						<div class="input-group w-100">
							<div class="input-group-prepend">
								<label for="txt-qty" class="input-group-text">Quantity</label>
							</div>
							<input type="number" name="txt-qty" id="txt-qty" class="form-control" value="1" />
							<div class="input-group-prepend">
								<button class="btn btn-primary addToCart"><span class="material-symbols-outlined">
								add_shopping_cart
								</span></button>
							</div>
						</div>
					</div>
				</div>
			</li>`
		});
	}
}