import instance from './config.js'

export async function carouselData () {
  return await instance.get('/getlunbo')
}

export async function recommendData (limit = 6) {
  return await instance.get(`/recommend?limit=${limit}`)
}

export async function getgoodsListData (pageindex) {
  return await instance.get(`/getgoods?pageindex=${pageindex}`)
}

export async function getnewslistData (page, pagesize) {
  return await instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`)
}

export async function getnewsData (newsId) {
  return await instance.get(`/getnew/${newsId}`)
}

export async function getcomments (newsId, pageindex) {
  return await instance.get(`/getcomments/${newsId}?pageindex=${pageindex}`)
}

export async function postcomment (newsId, content) {
  return await instance.post(`/postcomment/${newsId}`, { content })
}

export async function getthumbimages (id) {
  return await instance.get(`/getthumbimages/${id}`)
}
//获取商品详情
export async function getgoodsinfo (goodsId) {
  return await instance.get(`/getgoodsinfo/${goodsId}`)
}

export async function getshopcarlist (ids) {
  return await instance.get(`/getshopcarlist/${ids}`)
}

// 获取图片分享数据
export async function getcategory () {
  return await instance.get('/getcategory')
}

export async function getcatelist (id) {
  return await instance.get(`/getcatelist/${id}`)
}

//注册
export async function register (username, password) {
    return await instance.post('/register', {username, password});
}

//登录
export async function login (username, password) {
    return await instance.post('/login', {username, password});
}

//验证token
export async function checktoken () {
    let  token = localStorage.getItem('token');
    await instance.post(`/checktoken?token=${token}`);
}

//获取用户地址列表
export async function getaddress (userId) {
    return await instance.get(`/getaddress/${userId}`);
}

//添加用户地址
export async function addaddress (userId, userInfo) {
    return await instance.post(`/addaddress/${userId}`, userInfo);
}

//编辑用户地址
export async function updateaddress (addrId, addrInfo) {
    return await instance.post(`/updateaddress/${addrId}`, addrInfo);
}

//删除用户地址
export async function deladdress (addrId) {
    return await instance.post(`/deladdress/${addrId}`);
}
//提交订单
export async function commitorder (orderInfo) {
    return await instance.post('/commitorder', orderInfo);
}

//获取用户订单
export async function userorder (userId) {
    return await instance.post(`/userorder/${userId}`);
}
