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
    this.productsNode.addEventListener('click', this.handleContainerClick.bind(this))
  }

  fetchAndLoadProducts() {
    this.adapter.getProducts()
    .then( productsJSON => productsJSON.forEach( product => this.products.push( new Product(product) )))
      .catch( (e) => console.log(e) )
  }

  handleSearch() {
    event.preventDefault()
    let searchTerm = event.target.value.toLowerCase()
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
    this.productsNode.innerHTML = `<div class="ui middle aligned divided list"><h2 class="ui blue header">Search Results: </h2>${this.productsHTML(foundProducts)}</div>`
  }

  addProductToList() {
    let productId = event.target.parentElement.dataset.productid
    let productToAdd = this.products.find((product) => {
      return product.id === parseInt(productId)
    })
    app.lists.lists[0].products.push(productToAdd)
    app.lists.adapter.addProduct(productToAdd, app.lists.lists[0].id)
    app.lists.render()
  }

  handleContainerClick() {
    if (event.target.dataset.name === "add-to-list") {
      this.addProductToList()
    } else if (event.target.className === "add circle icon") {
      let elementToChange = event.target.parentElement.childNodes[3]
      if (elementToChange.innerHTML.includes("Price")){
        elementToChange.innerHTML = `<div class="product-details" data-productdetailsid="${this.id}"></div>`
      } else {
        let productDetails = this.products.find((product) => {
          return product.id === parseInt(event.target.parentElement.dataset.id)
        })
        elementToChange.innerHTML = productDetails.renderFullInfo()
      }
    }
  }

}
