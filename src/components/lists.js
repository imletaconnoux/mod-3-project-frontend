class Lists {
  constructor() {
    this.lists = []
    this.initBindingsAndEventListeners()
    this.adapter = new ListsAdapter()
    this.fetchAndLoadLists()
  }

  initBindingsAndEventListeners() {
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
    .then( listsJSON => listsJSON.forEach( list => this.lists.push( new List(list) )))
    // then render all of the lists
      // .then( this.render.bind(this) )
      .catch( (e) => console.log(e) )
  }
}