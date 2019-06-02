import instance from "../instance"

/**
 * 分页查询
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getPayListInPage = (data) => {
    return instance.get("/payservice/pay/getPayListInPage",data)
};
