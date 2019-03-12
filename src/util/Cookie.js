const LOGIN_COOKIE_NAME = 'user_token'
const LOGIN_COOKIE_TYPE = 'user_type'

/**
 * 判断用户是否登录
 * @returns {string}
 */
export function isAuthenticated () {
    return _getCookie(LOGIN_COOKIE_NAME)
}
/**
 * 判断管理员类型
 * @returns {string}
 */
export function isSupAdmin () {
    return _getCookie(LOGIN_COOKIE_TYPE)
}

/**
 * 用户登录成功，设置cookie的token值
 * @param token
 */
export function authenticateSuccess (token) {
    _setCookie(LOGIN_COOKIE_NAME, token)
}
/**
 * 用户登录成功，设置cookie的type值，管理员类型
 * @param token
 */
export function authenticateSuccessType (type) {
    _setCookie(LOGIN_COOKIE_TYPE, type)
}

/**
 * 用户登出操作，设置cookie为空
 */
export function logout () {
    _setCookie(LOGIN_COOKIE_NAME, '', 0)
}

/**
 * 获得cookie
 * @param name
 * @returns {string}
 * @private
 */
function _getCookie (name) {
    let start, end
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + '=')
        if (start !== -1) {
            start = start + name.length + 1
            end = document.cookie.indexOf(';', start)
            if (end === -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(start, end))
        }
    }
    return ''
}

/**
 * 设置cookie
 * @param name
 * @param value
 * @param expire
 * @private
 */
function _setCookie (name, value, expire) {
    let date = new Date()
    date.setDate(date.getDate() + expire)
    document.cookie = name + '=' + escape(value) + '; path=/' +
        (expire ? ';expires=' + date.toGMTString() : '')
}