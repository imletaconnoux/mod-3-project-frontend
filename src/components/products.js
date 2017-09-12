class Products {
  constructor() {
    this.products = []
    this.initBindingsAndEventListeners()
    this.adapter = new ProductsAdapter()
    this.fetchAndLoadProducts()
  }

  initBindingsAndEventListeners() {
    this.productsForm = document.getElementById('new-product-form')
    this.productInput = document.getElementById('new-product-body')
    this.productsNode = document.getElementById('products-container')
    this.productsForm.addEventListener('submit',this.handleAddProduct.bind(this))
    this.productsNode.addEventListener('click',this.handleDeleteProduct.bind(this))
  }

  fetchAndLoadProducts() {
    this.adapter.getProducts()
    .then( productsJSON => productsJSON.forEach( product => this.products.push( new Product(product) )))
      .then( this.render.bind(this) )
      .catch( () => alert('The server does not appear to be running') )
  }

  handleAddProduct() {
    event.preventDefault()
    const body = this.productInput.value
    this.adapter.createProduct(body)
    .then( (productJSON) => this.products.push(new Product(productJSON)) )
    .then(  this.render.bind(this) )
    .then( () => this.productInput.value = '' )
  }

  handleDeleteProduct() {
    if (event.target.dataset.action === 'delete-product' && event.target.parentElement.classList.contains("product-element")) {
      const productId = event.target.parentElement.dataset.productid
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
}
