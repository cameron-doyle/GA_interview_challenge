console.log("Script loaded")

window.addEventListener('DOMContentLoaded', () => {
	const userID = 1;
	const Cart = new CartManager()

	//Add to cart
	document.getElementById("content-container").addEventListener("click", (e) => {
		e.stopPropagation()
		e.preventDefault()
		
		let element = e.target

		//Search for specific class on clicked element
		let foundClass = false;
		element.classList.forEach(_class => {
			if (_class === "addToCart")
				foundClass = true
		});

		//If the class isn't found, don't continue (addToCart button wasn't clicked)
		if (!foundClass)
			return

		//Navigates up the DOM to find the "li" element which contains the productID
		while (element.nodeName !== "LI") {
			element = element.parentElement

			//This prevents an infinate loop if the nodeName isn't found (Top of DOM)
			if (element.nodeName == null || element.parentElement == null)
				return
		}

		//Extracts task ID
		const productID = Number(element.getAttribute("product-id"))

		//Iterrate over the forms children until txt-qty is found
		const formChildren = e.target.parentElement.children;
		for (let i = 0; i < formChildren.length; i++) {
			if (formChildren[i].id === "txt-qty") {
				//Add item with qty value and break
				Cart.addItem(productID, formChildren[i].value, userID)
				break
			}
		}
	})

	//On qty change (cart)
	document.getElementById("cart-table").addEventListener("change", (e) => {
		e.stopPropagation() //Prevent event for bubbling further up

		//Find the table row so we can get the id attribute
		let element = e.target
		while (element.nodeName !== "TR") {
			element = element.parentElement

			//This prevents an infinate loop if the nodeName isn't found (Top of DOM)
			if (element.nodeName == null || element.parentElement == null)
				return
		}

		//Get product id and convert to number
		const productID = Number(element.getAttribute("product-id"))

		//Update cart item
		Cart.updateItem(productID, e.target.value, userID)
	})

	//Remove item
	document.getElementById("cart-table").addEventListener("click", (e) => {
		e.stopPropagation() //Prevent event for bubbling further up

		//Find the table row so we can get the id attribute
		let element = e.target
		while (element.nodeName !== "TR") {
			element = element.parentElement

			//This prevents an infinate loop if the nodeName isn't found (Top of DOM)
			if (element.nodeName == null || element.parentElement == null)
				return
		}

		//Get product id and convert to number
		const productID = Number(element.getAttribute("product-id"))

		//Update cart item
		Cart.removeItem(productID)
	})
})



function formatPrice(price) {
	return `$${Number.parseFloat(price).toFixed(2)}`
}