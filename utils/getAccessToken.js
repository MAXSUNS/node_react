WeChat.prototype.GetAccessToken = function() {
    var self = this
    let option = {
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        qs: {
            grant_type: 'client_credential',
            appid: this.config.App_Id,
            secret: this.config.App_Secret
        },
        method: 'GET',
        headers: {
            "content-type": "application/json"
        }
    }
    return new Promise((resolve, reject) => {
        request(option, function(error, response, body) {
            console.log(error, body)
            var data = JSON.parse(body)
            if (error) {
                reject(error)
            } else {
                switch(data.errcode) {
                    case 45009:
                        console.log('token调用上限')
                        reject(data)
                        break
                    case 0:
                        self.accessToken = {
                            access_token: data.access_token,
                            expires_in: data.expires_in
                        }
                        console.log('当前access_token', JSON.stringify(self.accessToken))
                        // 定时重新获取access_token
                        clearTimeout(this.getAccessTokenTimer)
                        this.getAccessTokenTimer = setTimeout(() => {
                            self.GetAccessToken()
                        }, (data.expires_in - 60) * 1000 || 60000)
                        resolve(data)
                        break
                }
            }
        })
    })
}