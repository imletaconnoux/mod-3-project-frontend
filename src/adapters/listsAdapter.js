class ListsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/lists'
  }
  
	getLists() {
    return fetch(this.baseUrl).then(response => response.json())
  }
}