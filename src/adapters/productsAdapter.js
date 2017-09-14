class ProductsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/products'
    this.walmartUrl = 'http://api.walmartlabs.com/v1/paginated/items?format=json&apiKey=v8az3c5y9xwj9tw6yzcjftpc'
  }

  getProducts() {
    return fetch(this.baseUrl).then(response => response.json())
  }

  getWalmartApi(){
    return fetch(this.walmartUrl).then(response => response.json()).then(data => console.log(data["items"]))
  }


  // this will only be used if we have a product create form
  // createProduct(body) {
  //   const productCreateParams = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify({body})
  //   }
  //   return fetch(this.baseUrl, productCreateParams).then(resp => resp.json())
  // }

}
