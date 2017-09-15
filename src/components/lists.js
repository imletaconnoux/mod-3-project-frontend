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
    this.container = document.getElementById("filtered-products-container")
  }

  fetchAndLoadLists() {
    this.adapter.getLists()
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
      .catch( (e) => console.log(e) )
  }

  render(){
    this.listsNode.innerHTML = `<div class="ui middle aligned divided list">${this.listsHTML()}</div>`
  }

  listsHTML(){
    return this.lists[0].products.map( product => product.renderOnList() ).join('')
  }

  deleteProduct(event){
    if (event.target.dataset.name === "remove-product"){
      let productToRemove = event.target.parentElement
      let elementToRemove = event.target.parentElement.parentElement
      let jsObject = app.lists.lists[0].products.indexOf(productToRemove)
      let productId = parseInt(productToRemove.dataset.productid)
      app.lists.adapter.deleteFromDb(productId, app.lists.lists[0].id) // deletes from backend
      elementToRemove.remove() // deletes from html
      app.lists.lists[0].products.splice(jsObject, 1) // delete from FE i hope
    }
  }
}
