import instance from "../instance"

/**
 * 分页查询
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getMemberListInPage = (data) => {
    return instance.post("/memberservice/member/getMemberListInPage",data)
};

/**
 * 根据状态查询用户数量
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getUserByUserState = (data) => {
    return instance.get("/memberservice/member/getUserByUserState",data)
};


/**
 * 通过id批量停用
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _deletememberByIds = (data) => {
    return instance.post("/memberservice/member/deleteAdminByIds",data)
};

/**
 * 通过id获取详情
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getUserAllByUserId = (data) => {
    return instance.get("/memberservice/member/getUserAllByUserId",data)
};


/**
 * 修改用户信息
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _updatePersonal = (data) => {
    return instance.post("/memberservice/member/updatePersonal",data)
};

/**
 * 用户销售额排名
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getUserAmountRank = (data) => {
    return instance.post("/memberservice/member/getUserAmountRank",data)
};
/**
 * 用户销售量统计
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getDistributeOfUserAndSales = (data) => {
    return instance.post("/memberservice/member/getDistributeOfUserAndSales",data)
};