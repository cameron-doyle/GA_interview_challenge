class CartManager {
	//Array of cartItems
	#itemList
	constructor(){
		this.PM = new ProductManager()
		//TODO load from local storage
		this.#itemList = []
		this.addItem(1, 2, 1)
		this.addItem(3, 2, 1)
		this.render()
	}


	//Factory function for the cartItem obj
	cartItemObj(productID, qty, ownerID /* userID */){
		return {
			productID,
			qty,
			ownerID
		}
	}

	//Adds item to the cart
	addItem(productID, qty, owner){
		//If product is already in the cart, ignore
		if(this.getItemByProductId(productID) != null) return
		
		//Update item list with new item
		this.#itemList.push(this.cartItemObj(productID, Number(qty), owner))
		this.render()
	}

	updateItem(productID, qty, owner){
		for (let i = 0; i < this.#itemList.length; i++) {
			if (this.#itemList[i].productID === productID) {
				this.#itemList[i] = this.cartItemObj(productID, Number(qty), owner)
				break
			}
		}
		this.render()
	}

	getItemByProductId(productID){
		const p = this.#itemList.filter(item => item.productID === productID)
		return (p != null && p.length > 0) ? p[0] : null
	}

	removeItem(productID){
		this.#itemList = this.#itemList.filter(item => item.productID !== productID) //Filter taskList

		//Update DOM
		this.render()
	}

	empty(){
		this.#itemList = []
		this.render()
	}

	numberOfItems(){
		return this.#itemList.length
	}

	//Renders the cart to the DOM
	render(){
		const table = document.getElementById("cart-table").getElementsByTagName("tbody")[0]
		table.innerHTML = '' //Wipe table for rerender
		let cartTotal = 0;
		this.#itemList.forEach(item => {
			//Get product info from productManager
			const productDetials = this.PM.getProductById(item.productID)

			//Calc item total and add to carts total
			const total = item.qty * productDetials.price;
			cartTotal += total;

			//Render html
			table.innerHTML += `
			<tr product-id="${productDetials.id}">
				<td>${productDetials.name}</td>
				<td><input type="number" class="form-control w-100" value="${item.qty}"></td>
				<td>${formatPrice(productDetials.price)}</td>
				<td>${formatPrice(total)}</td>
				<td><button class="btn btn-danger btn-remove-item"><span class="material-symbols-outlined">
				delete_forever
				</span></button></td>
			</tr>`
		});

		document.getElementById("cart-total").innerText = `${formatPrice(cartTotal)}`;
	}
}