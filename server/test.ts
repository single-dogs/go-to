import axios from 'axios'
import { pick } from 'lodash'
import qs from 'qs'
(async () => {

    let res = await axios.post('http://127.0.0.1/user?', {
        "username": "gaolihai",
        "password": "gaolihai"
    }, {
        headers: {
            "content-type": "application/json"
        }

    })
    console.log('注册');
    console.log(res.request._header);
    console.log(res.data);
    console.log();

    res = await axios.get('/user', {
        params: {
            username: 'gaolihai',
        },
    })
    console.log('查询');
    console.log(res.request._header);
    console.log(res.data);
    console.log();

    res = await axios.get('/users', {
        params: {
            usernames: ['gaolihai', 'm'],
        },

        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })
    console.log('查询多个');
    console.log(res.request._header);
    console.log(res.data);
    console.log();

    res = await axios.post('http://127.0.0.1/login?', {
        "username": "gaolihai",
        "password": "gaolihai"
    }, {
        headers: {
            "content-type": "application/json"
        }
    })
    console.log('登录');
    console.log(res.request._header);
    console.log(res.data);
    console.log();

    res = await axios.put('http://127.0.0.1/user?', {
        "oldPassword": "gaolihai",
        "newPassword": "gaolihai"
    }, {
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${res.data.data.token}`
        }
    })
    console.log('修改密码');
    console.log(res.request._header);
    console.log(res.data);
})()
