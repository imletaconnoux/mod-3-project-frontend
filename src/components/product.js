class Product {
  constructor(productJSON) {
    this.name = productJSON.name
    this.availableOnline = productJSON.available_online
    this.salePrice = productJSON.sale_price
    this.shortDescription = productJSON.short_description
    this.thumbnailImage = productJSON.thumbnail_image
    this.stock = productJSON.stock
    this.addToCartUrl = productJSON.add_to_cart
    this.itemId = productJSON.item_id
    this.listId = productJSON.list_id
    this.id = productJSON.id
  }

  render() {
    return `<li data-productid='${this.id}' data-props='${JSON.stringify(this)}' class='product-element'>${this.name} <button class="add-to-list">Add to List</button></li>`
  }
}
