class Products {
  constructor() {
    this.products = [] 
    this.initBindingsAndEventListeners()
    this.adapter = new ProductsAdapter()
    this.fetchAndLoadProducts()
  }

  initBindingsAndEventListeners() {
    this.searchInput = document.getElementById("find-product-input")
    this.searchInput.addEventListener("input", this.handleSearch.bind(this))
    this.productsNode = document.getElementById('filtered-products-container')
    this.productsNode.addEventListener('click', this.addProductToList.bind(this))
  }

  fetchAndLoadProducts() {
    this.adapter.getProducts()
    .then( productsJSON => productsJSON.forEach( product => this.products.push( new Product(product) )))
      .catch( (e) => console.log(e) )
  }

  handleSearch() {
    event.preventDefault()
    let searchTerm = event.target.value
    this.findProducts(searchTerm)
  }

  findProducts(searchTerm){
    if (!searchTerm){
      this.productsNode.innerHTML = ""
    } else {
      let foundProducts = this.products.filter((product) => {
        if (product.name.toLowerCase().includes(searchTerm)) {
          return product
        }
      })
      this.render(foundProducts)
    }
  }

  productsHTML(foundProducts) {
    return foundProducts.map( product => product.render() ).join('')
  }

  render(foundProducts) {
    this.productsNode.innerHTML = `<ul>${this.productsHTML(foundProducts)}</ul>`
  }

  addProductToList() {
    if (event.target.dataset.name === "add-to-list") {
      let productId = event.target.parentElement.dataset.productid
      let productToAdd = this.products.find((product) => {
        return product.id === parseInt(productId)
      })
      app.lists.lists[0].products.push(productToAdd)
      app.lists.adapter.addProduct(productToAdd, app.lists.lists[0].id)
      app.lists.render()
    }
  }

}