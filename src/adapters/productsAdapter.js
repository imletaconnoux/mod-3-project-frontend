class ProductsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/products'
  }

  getProducts() {
    return fetch(this.baseUrl).then(response => response.json())
  }

//rails api not set up for delet yet
  // deleteProduct(productId) {
  //   const deleteUrl = `${this.baseUrl}/${productId}`
  //   const productDeleteParams = {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type':'application/json'
  //     }
  //   }
  //   return fetch(deleteUrl, productDeleteParams).then(response => response.json())
  // }

  createProduct(body) {
    const productCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({body})
    }
    return fetch(this.baseUrl, productCreateParams).then(resp => resp.json())
  }

}
