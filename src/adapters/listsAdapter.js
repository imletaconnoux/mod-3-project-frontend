class ListsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/lists'
  }

	getLists() {
    return fetch(this.baseUrl).then(response => response.json())
  }

  addProduct(product, list) {
    const productToListParams = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({product})
    }
    let listUrl = (this.baseUrl + '/1')
    return fetch(listUrl, productToListParams).then(resp => resp.json()).then(console.log)
  }

  deleteFromDb(productId, list){
    const productToListParams = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({productId})
    }
    let listUrl = (this.baseUrl + '/1')
    console.log(productToListParams)
    return fetch(listUrl, productToListParams).then(resp => resp.json()).then(console.log)
  }
}
