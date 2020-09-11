const cartlist = JSON.parse(localStorage.getItem('cartlist')) || []
const cartStore = {
  state: {
    cartlist
  },
  mutations: {
    addCart (state, goods) {
      const index = state.cartlist.findIndex(v => v.id === goods.id)
      if (index === -1) {
        state.cartlist.push(goods)
      } else {
        state.cartlist[index].count += goods.count
      }
      localStorage.setItem('cartlist', JSON.stringify(state.cartlist))
    },
    delCart (state, id) {
      const index = state.cartlist.findIndex(v => v.id === id)
      state.cartlist.splice(index, 1)
      localStorage.setItem('cartlist', JSON.stringify(state.cartlist))
    },
    update (state, cart) {
      state.cartlist.map(v => {
        if (v.id === cart.id) {
          v.checked = cart.checked
          v.count = cart.count
        }
      })
    }
  },
  getters: {
    getGoodsIds (state) {
      const ids = state.cartlist.map(cart => cart.id)
      return ids.join()
    },
    getBuyIds (state) {
        const ids = [];
        state.cartlist.map(cart => {
            if(cart.checked){
                ids.push(cart.id);
            }
        });
        return ids;
    },
    totalCount (state) {
      let totalCount = 0
      state.cartlist.map(v => { totalCount += v.count })
      return totalCount
    },
    totalPrice (state) {
      let totalPrice = 0
      state.cartlist.map(v => {
        if (v.checked) {
          totalPrice += v.count * v.price
        }
      })
      return totalPrice * 100
    },
    totalNumber (state) {
      let totalNumber = 0
      state.cartlist.map(v => {
        if (v.checked) {
          totalNumber += v.count
        }
      })
      return totalNumber
    },
    getCart (state) {
      const cart = {}
      state.cartlist.map(v => {
        cart[v.id] = { checked: v.checked, count: v.count }
      })
      return cart
    }
  }

}

export default cartStore;
