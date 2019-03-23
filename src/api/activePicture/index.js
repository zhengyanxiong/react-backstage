import instance from "../instance"

/**
 * 发布活动图片
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _publishActivePicture = (data) => {
    return instance.post("/backstageservice/activePicture/publishActivePicture",data)
};

/**
 * 通过id删除活动
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 */
export const _deleteActivePicById = (data) => {
    return instance.get("/backstageservice/activePicture/deleteActivePicById",data)
};
