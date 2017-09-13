class Products {
  constructor() {
    this.products = [] // this refers to all of the product objects
    this.initBindingsAndEventListeners()
    this.adapter = new ProductsAdapter()
    this.fetchAndLoadProducts() // refer to line 17
  }

  initBindingsAndEventListeners() {
    this.searchInput = document.getElementById("find-product-input")
    this.searchInput.addEventListener("input", this.handleSearch.bind(this))
    // this.productsForm = document.getElementById('new-product-form')
    // this.productInput = document.getElementById('new-product-body')
    this.productsNode = document.getElementById('filtered-products-container')
    this.productsNode.addEventListener('click', this.addProductToList.bind(this))
    // this.productsForm.addEventListener('submit',this.handleAddProduct.bind(this))
  }

// this will hit your database and load all of your products
  fetchAndLoadProducts() {
    this.adapter.getProducts()
    // iterate over products and create a new product for each one
    .then( productsJSON => productsJSON.forEach( product => this.products.push( new Product(product) )))
    // then render all of the products
      // .then( this.render.bind(this) )
      .catch( (e) => console.log(e) )
  }

  handleSearch() {
    event.preventDefault()
    let searchTerm = event.target.value
    this.findProducts(searchTerm)
    // console.log(this.findProducts(searchTerm)) // define on class

  }


  findProducts(searchTerm){
    let foundProducts = this.products.filter((product) => {
      if (product.name.toLowerCase().includes(searchTerm)) {
        return product
      }
    })
    this.render(foundProducts)
  }

  handleDeleteProduct() {
    if (event.target.dataset.action === 'delete-product' && event.target.parentElement.classList.contains("product-element")) {
      const productId = event.target.parentElement.dataset.productId
      this.adapter.deleteProduct(productId)
      .then( resp => this.removeDeletedProduct(resp) )
    }
  }

  removeDeletedProduct(deleteResponse) {
    this.products = this.products.filter( product => product.id !== deleteResponse.productId )
    this.render()
  }

  productsHTML(foundProducts) {    
    return foundProducts.map( product => product.render() ).join('')
  }

  render(foundProducts) {
    this.productsNode.innerHTML = `<ul>${this.productsHTML(foundProducts)}</ul>`
  }

  addProductToList() {
    if (event.target.className === "add-to-list") {
      let productId = event.target.parentElement.dataset.productid
      let productToAdd = this.products.find((product) => {
        return product.id === parseInt(productId)
      })
      
      app.lists.lists[0].products.push(productToAdd)
      console.log(app.lists.lists[0].products)
    }
  }

}
