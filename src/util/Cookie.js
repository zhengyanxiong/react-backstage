const LOGIN_COOKIE_NAME = 'user_username'
const LOGIN_COOKIE_TYPE = 'user_type'
const LOGIN_COOKIE_TOKEN = 'user_token'
const LOGIN_COOKIE_ADMIN = 'user_info'

/**
 * 判断用户是否登录
 * @returns {string}
 */
export function isAuthenticated () {
    return _getCookie(LOGIN_COOKIE_NAME)
}
/**
 * 判断用户是否登录
 * @returns {string}
 */
export function isLogout () {
    return _getCookie(LOGIN_COOKIE_TOKEN)
}


/**
 * 判断管理员类型
 * @returns {string}
 */
export function isSupAdmin () {
    return _getCookie(LOGIN_COOKIE_TYPE)
}

/**
 * 判断管理员类型
 * @returns {string}
 */
export function getAdmin () {
    return _getCookie(LOGIN_COOKIE_ADMIN)
}

/**
 * 用户登录成功，设置cookie的username值
 * @param token
 */
export function authenticateSuccess (username) {
    _setCookie(LOGIN_COOKIE_NAME, username)
}

/**
 * 用户登录成功，设置cookie的username值
 * @param token
 */
export function authenticateSuccessToken (token) {
    _setCookie(LOGIN_COOKIE_TOKEN, token)
}
/**
 * 用户登录成功，设置cookie的username值
 * @param token
 */
export function authenticateSuccessAdmin (info) {
    _setCookie(LOGIN_COOKIE_ADMIN, info)
}
/**
 * 用户登录成功，设置cookie的type值，管理员类型
 * @param token
 */
export function authenticateSuccessType (type) {
    _setCookie(LOGIN_COOKIE_TYPE, type)
}

/**
 * 用户登出操作，设置username为空
 */
export function clearName () {
    _setCookie(LOGIN_COOKIE_NAME, '', 0)
}

/**
 * 用户登出操作，设置token为空
 */
export function clearToken () {
    _setCookie(LOGIN_COOKIE_TOKEN, '', 0)
}
/**
 * 用户登出操作，设置token为空
 */
export function clearAdmin () {
    _setCookie(LOGIN_COOKIE_ADMIN, '', 0)
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