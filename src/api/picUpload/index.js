/*
import instance from "../instance"

/!**
 * nginx实现图片上传
 * @param data
 * @returns {AxiosPromise<any>}
 * @private
 *!/
export const _fileUpload = (data) => {
    // var forms = new FormData()
    /!*var configs = {
        headers: {'Content-Type': 'multipart/form-data'}
    };
    //forms.append('file', data.target.files[0])
    this.axios.post(this.$config.uploadImg, data, configs).then(res => {
        console.log(res)
    });*!/
    var config = {
        onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            // this.uploadPercentage = percentCompleted + '%'
            console.log(percentCompleted)
        }
    };

    return instance.post("/nginxservice/file/fileUpload", data,config)
};
*/


