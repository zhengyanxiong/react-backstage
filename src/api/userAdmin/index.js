import instance from "../instance"

/**
 * 管理员登录
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _adminLogin = (data) => {
    return instance.post("/backstageservice/admin/adminLogin",data)
};

/**
 * 分页查询
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getAdminListInPage = (data) => {
    return instance.get("/backstageservice/admin/getAdminListInPage",data)
};

/**
 * 通过id删除
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _deleteAdminById = (data) => {
    return instance.get("/backstageservice/admin/deleteAdminById",data)
};

/**
 * 通过id批量删除
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _deleteAdminByIds = (data) => {
    return instance.post("/backstageservice/admin/deleteAdminByIds",data)
};

/**
 * 通过id获取详情
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _getAdminById = (data) => {
    return instance.get("/backstageservice/admin/getAdminById",data)
};

/**
 * 添加管理员
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _submitAdmin = (data) => {
    return instance.post("/backstageservice/admin/submitAdmin",data)
};

/**
 * 修改管理员
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _updateAdmin = (data) => {
    return instance.post("/backstageservice/admin/updateAdmin",data)
};
/**
 * 修改密码管理员
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _updateAdCheck = (data) => {
    return instance.post("/backstageservice/admin/updateAdCheck",data)
};