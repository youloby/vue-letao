import instance from './config.js';

export async function carouselData(){
    return await instance.get('/getlunbo');
}

export async function recommendData(limit = 6){
    return await instance.get(`/recommend?limit=${limit}`);
}

export async function getgoodsListData(pageindex){
    return await instance.get(`/getgoods?pageindex=${pageindex}`);
}

export async function getnewslistData(page, pagesize){
    return await instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}

export async function getnewsData(newsId){
    return await instance.get(`/getnew/${newsId}`);
}

export async function getcomments(newsId, pageindex){
    return await instance.get(`/getcomments/${newsId}?pageindex=${pageindex}`);
}

export async function postcomment(newsId, content){
    return await instance.post(`/postcomment/${newsId}`, {content});
}

export async function getthumbimages(goodsId){
    return await instance.get(`/getthumbimages/${goodsId}`);
}

export async function getgoodsinfo(goodsId){
    return await instance.get(`/getgoodsinfo/${goodsId}`);
}

export async function getshopcarlist(ids){
    return await instance.get(`/getshopcarlist/${ids}`);
}
