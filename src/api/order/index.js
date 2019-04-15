import instance from "../instance"

/**
 * 分页查询
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getOrderListInPage = (data) => {
    return instance.get("/orderservice/order/getOrderListInPage",data)
};
/**
 * 订单成交量
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getOrderCount = (data) => {
    return instance.get("/orderservice/order/getOrderCount",data)
};
/**
 * 订单成交量
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getOrderAllInfoById = (data) => {
    return instance.get("/orderservice/order/getOrderAllInfoById",data)
};
