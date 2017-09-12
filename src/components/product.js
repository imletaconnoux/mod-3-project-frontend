class Product {
  constructor(productJSON) {
    this.body = productJSON.body
    this.id = productJSON.id
  }

  render() {
    return `<li data-productid='${this.id}' data-props='${JSON.stringify(this)}' class='product-element'>${this.body} <i data-action='delete-product' class="em em-scream_cat"></i></li>`
  }
}
