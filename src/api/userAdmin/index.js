import instance from "../instance"

/**
 * 管理员登录
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _adminLogin = (data) => {
    return instance.post("/backstageservice/userAdmin/login",data)
}