class ProductsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/products'
  }

  getProducts() {
    return fetch(this.baseUrl).then(response => response.json())
  }

}
