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
    this.available = function() {
      if (this.availableOnline === true) {
        return "Available Online"
      } else {
        return "Not Available"
      }
    }
  }

  render() {
    return `
    <div class="item">
      <div class="right floated content" data-productid='${this.id}' data-props='${JSON.stringify(this)}' data-name='product-element'> 
        <button class="ui button tiny" data-name="add-to-list">Add to List  <i class="shop icon"></i></button>
      </div>
      <img class="ui avatar image" src="${this.thumbnailImage}">
      <div class="content" data-id="${this.id}">${this.name} <i class="add circle icon"></i>
        <div class="product-details" data-productdetailsid="${this.id}"></div>
        </div>
      </div>`
  }

  renderFullInfo() {
    return `
    <div class="item">
      <div class="right floated content" data-productid='${this.id}' data-props='${JSON.stringify(this)}' data-name='product-element'>
      </div>
      <div data-productid="${this.id}" class="content">
        ${this.available()}<br>
        Price: $${this.salePrice} <br><a target="_blank" href="${this.addToCartUrl}">Buy On Walmart.com</a><br>
      </div>
    </div>`
  }

  renderOnList() {
    return `
    <div class="item">
      <div class="right floated content" data-productid='${this.id}' data-props='${JSON.stringify(this)}' data-name='product-element'> 
        <button class="ui button tiny" data-name="remove-product">Remove From List</button>
      </div>
      <img class="ui avatar image" src="${this.thumbnailImage}">
      <div class="content">${this.name} <i class="add circle icon"></i>
        <div class="product-details" data-productdetailsid="${this.id}"></div>
      </div>
    </div>`
  }
}
