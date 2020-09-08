


var api = new API('appid', 'secret', async function () {
    // 传入一个获取全局token的方法
    var txt = await fs.readFile('access_token.txt', 'utf8');
    return JSON.parse(txt);
}, async function (token) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    await fs.writeFile('access_token.txt', JSON.stringify(token));
});