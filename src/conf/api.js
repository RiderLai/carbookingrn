/*
 * @Author: Rider
 * @Date: 2020-01-31 20:47:25
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-02 16:42:36
 * @Description: file content
 */
const domain = 'http://121.36.72.219:8000';

export const loginAPI = domain + '/system/login';

export const userInfoAPI = domain + '/system/logininfo';

export const busAPI = domain + '/buses';

export const busBookingAPI = domain + '/logs/user';

export const busByIdAPI = domain + '/buses/';

export const busBookAPI = domain + '/buses/subscribe/';

export const busCancelAPI = domain + '/buses/cancel/';

export const driveAPI = domain + '/logs/driver';

export const busDepartAPI = domain + '/buses/depart/';

export const busArriveAPI = domain + '/buses/arrive/';
