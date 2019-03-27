import instance from "../instance"

/**
 * 发布活动
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _publishActive = (data) => {
    return instance.post("/backstageservice/active/publishActive",data)
};
/**
 * 分页查询活动
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getActiveListInPage = (data) => {
    return instance.get("/backstageservice/active/getActiveListInPage",data)
};

/**
 * 通过id删除活动
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _deleteActiveById = (data) => {
    return instance.get("/backstageservice/active/deleteActiveById",data)
};

/**
 * 通过id批量删除
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _deleteActiveByIds = (data) => {
    return instance.post("/backstageservice/active/deleteActiveByIds",data)
};

/**
 * 通过id获取详情
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getActiveById = (data) => {
    return instance.get("/backstageservice/active/getActiveById",data)
};

/**
 * 修改活动
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _updateActive = (data) => {
    return instance.post("/backstageservice/active/updateActive",data)
};
/**
 * 查询活动个数
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getActiveCount = (data) => {
    return instance.post("/backstageservice/active/getActiveCount",data)
};