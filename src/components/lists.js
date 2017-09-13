class Lists {
  constructor() {
    this.lists = []
    this.initBindingsAndEventListeners()
    this.adapter = new ListsAdapter()
    this.fetchAndLoadLists()
  }

  initBindingsAndEventListeners() {
    this.listsNode = document.getElementById("user-list")
    this.listsNode.addEventListener('click', this.deleteProduct.bind(this))
    // this.searchInput = document.getElementById("find-product-input")
    // this.searchInput.addEventListener("input", this.handleSearch.bind(this))
    // this.productsForm = document.getElementById('new-product-form')
    // this.productInput = document.getElementById('new-product-body')
    // this.productsNode = document.getElementById('filtered-products-container')
    // this.productsNode.addEventListener('click', this.addProductToList.bind(this))
    // this.productsForm.addEventListener('submit',this.handleAddProduct.bind(this))
  }

  fetchAndLoadLists() {
    this.adapter.getLists()
    // iterate over lists and create a new list for each one
    .then( listsJSON => listsJSON.forEach( list => {
      let newProducts = []
      if (list.products.length !== 0) {
        newProducts = list.products.map((product) => new Product(product))
      }
      let newList = new List(list)
      newList.products = newProducts
      this.lists.push( newList)
      if (newList.products.length !== 0){
        this.render()
      }
    }))
    // then render all of the lists
      // .then( this.render.bind(this) )
      .catch( (e) => console.log(e) )

  }

  render(){
    this.listsNode.innerHTML = `<ul>${this.listsHTML()}</ul>`
  }

  listsHTML(){

    return this.lists[0].products.map( product => product.renderOnList() ).join('')
  }

  deleteProduct(event){
    if (event.target.className === "remove-product"){
      let elementToRemove = event.target.parentElement
      let productId = parseInt(elementToRemove.dataset.productid)
      app.lists.adapter.deleteFromDb(productId, app.lists.lists[0].id)
      elementToRemove.remove()

    }

  }

}
