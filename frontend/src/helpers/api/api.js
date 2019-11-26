function mockasync (data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({data: data}), 600)
    })
  }
  

const api = {
    hello() {
        return mockasync({description: 'funfa api mock'})
    }
}

export default api