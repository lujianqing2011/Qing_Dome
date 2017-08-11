
const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')
const searchTerms = r => require.ensure([], () => r(require('../page/index/children/searchTerms')), 'searchTerms')
const classify = r => require.ensure([], () => r(require('../page/classify/classify')), 'classify')
const cart = r => require.ensure([], () => r(require('../page/cart/cart')), 'cart')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const searchGood = r => require.ensure([], () => r(require('../page/searchGood/searchGood')), 'searchGood')
const mine = r => require.ensure([], () => r(require('../page/mine/mine')), 'mine')
const info = r => require.ensure([], () => r(require('../page/mine/children/info')), 'info')
const collectGoods = r => require.ensure([], () => r(require('../page/mine/children/collectGoods')), 'collectGoods')
const coupon = r => require.ensure([], () => r(require('../page/mine/children/coupon')), 'coupon')
const property = r => require.ensure([], () => r(require('../page/mine/children/property')), 'property')
const gold = r => require.ensure([], () => r(require('../page/mine/children/gold')), 'gold')
const address = r => require.ensure([], () => r(require('../page/mine/children/children/address')), 'address')
const explain = r => require.ensure([], () => r(require('../page/mine/children/children/explain')), 'explain')
const addNew = r => require.ensure([], () => r(require('../page/mine/children/children/children/addNew')), 'addNew')
const addDetail = r => require.ensure([], () => r(require('../page/mine/children/children/children/children/addDetail')), 'addDetail')
const userName = r => require.ensure([], () => r(require('../page/mine/children/userName')), 'userName')
const fordet = r => require.ensure([], () => r(require('../page/fordet/fordet')), 'fordet')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/login/children/register')), 'register')
const details = r => require.ensure([], () => r(require('../page/details/details')), 'details')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const all = r => require.ensure([], () => r(require('../page/order/children/all')), 'all')
const waitPayment = r => require.ensure([], () => r(require('../page/order/children/waitPayment')), 'waitPayment')
const waitShipments = r => require.ensure([], () => r(require('../page/order/children/waitShipments')), 'waitShipments')
const waitReceiving = r => require.ensure([], () => r(require('../page/order/children/waitReceiving')), 'waitReceiving')
const waitEvaluate = r => require.ensure([], () => r(require('../page/order/children/waitEvaluate')), 'waitEvaluate')


export default [
  { path: '/', redirect: '/index' },
  { path: '/index', component: index,
    children:[
      { path: '/index/searchTerms', component: searchTerms }
    ]
  },
  { path: '/mine', component: mine,
    children:[
      { path: '/mine/info', component: info,
        children:[
          { path: '/mine/info/address', component: address,
            children:[
              { path: '/mine/info/address/addNew', component: addNew,
                children:[
                  { path: '/mine/info/address/addNew/addDetail', component: addDetail }
                ]
              }
            ]
          }
        ]
      },
      { path:'userName', component: userName },
      { path:'property', component: property },
      { path:'gold', component: gold,
        children:[
          { path: 'explain', component: explain }
        ]
      },
      { path:'/mine/collectGoods', component: collectGoods },
      { path: '/mine/coupon', component: coupon }
    ]
  },
  { path: '/login', component: login,
    children:[
      { path: '/login/register', component: register }
    ]
  },
  { path: '/order', component: order,
    redirect: '/order/all',
    children: [
      { path: 'all', component: all },
      { path: 'waitPayment', component: waitPayment },
      { path: 'waitShipments', component: waitShipments },
      { path: 'waitReceiving', component: waitReceiving },
      { path: 'waitEvaluate', component: waitEvaluate }
    ]
  },
  { path: '/details', component: details },
  { path: '/confirmOrder', component: confirmOrder,
    children: [
      { path: '/confirmOrder/chooseAddress', component: chooseAddress,
        children: [
          { path: '/confirmOrder/chooseAddress/addAddress', component: addAddress }
        ]
      },
      { path: '/confirmOrder/payment', component: payment }
    ]
  },
  { path: '/classify', component: classify },
  { path: '/cart', component: cart },
  { path: '/fordet', component: fordet },
  { path: '/search', component: search },
  { path: '/searchGood', component: searchGood }

]