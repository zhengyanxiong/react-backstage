import instance from "../instance"

/**
 * 分页查询
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getGoodsListInPage = (data) => {
    return instance.get("/goodservice/goods/getGoodsListInPage",data)
};
/**
 * 修改商品信息
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _updateGoods = (data) => {
    return instance.post("/goodservice/goods/updateGoods",data)
};
/**
 * 批量新增子类
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _insertClassChildsByClassId = (data) => {
    return instance.post("/goodservice/goods/insertClassChildsByClassId",data)
};
/**
 * 新增商品分类
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _insertGoodsClass = (data) => {
    return instance.post("/goodservice/goods/insertGoodsClass",data)
};
/**
 * 批量修改子类
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _updateClassChildsByClassId= (data) => {
    return instance.post("/goodservice/goods/updateClassChildsByClassId",data)
};
/**
 * 修改父类
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _updateClassByClassId = (data) => {
    return instance.post("/goodservice/goods/updateClassByClassId",data)
};
/**
 * 详情
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getAllInfoById = (data) => {
    return instance.get("/goodservice/goods/getAllInfoById",data)
};
/**
 * 分类详情
 * @param
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getAllGoodsClassInfo = (data) => {
    return instance.get("/goodservice/goods/getAllGoodsClassInfo",data)
};
/**
 * 分类详情
 * @param
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getGoodsClassByClassId = (data) => {
    return instance.get("/goodservice/goods/getGoodsClassByClassId",data)
};
