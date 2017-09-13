class Products {
  constructor() {
    this.products = [] // this refers to all of the product objects
    this.initBindingsAndEventListeners()
    this.adapter = new ProductsAdapter()
    this.fetchAndLoadProducts() // refer to line 17
  }

  initBindingsAndEventListeners() {
    this.searchInput = document.getElementById("find-product-input")
    this.searchInput.addEventListener("keyup", function(event){console.log(event.target.value)})
    // this.productsForm = document.getElementById('new-product-form')
    // this.productInput = document.getElementById('new-product-body')
    // this.productsNode = document.getElementById('products-container')
    // this.productsForm.addEventListener('submit',this.handleAddProduct.bind(this))
    // this.productsNode.addEventListener('click',this.handleDeleteProduct.bind(this))
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
    console.log(this.findProducts(searchTerm)) // define on class

  }

  // handleAddProduct() {
  //   event.preventDefault()
  //   const body = this.productInput.value
  //   this.adapter.createProduct(body)
  //   .then( (productJSON) => this.products.push(new Product(productJSON)) )
  //   .then(  this.render.bind(this) )
  //   .then( () => this.productInput.value = '' )
  // }

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

  productsHTML() {
    return this.products.map( product => product.render() ).join('')
  }

  render() {
    this.productsNode.innerHTML = `<ul>${this.productsHTML()}</ul>`
  }

  findProducts(searchTerm){
    this.products.filter((searchTerm) => {
      if (foundProducts = product.name.includes(searchTerm)) {
        return product
      }
    })
  }

}
