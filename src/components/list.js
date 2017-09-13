class List {
  constructor(listJSON) {
    this.products = listJSON.products
    this.id = listJSON.id
  }

  // render(){
  //   return `<li data-list-productid='${this.products.id}' data-props='${JSON.stringify(this)}' class='product-element'>${this.name} <button class="add-to-list">Add to List</button></li>`
  //
  // }
}
