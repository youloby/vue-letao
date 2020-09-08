var node_ssh, ssh, site_dir, static_dir,filename
node_ssh = require('node-ssh')
ssh = new node_ssh()
site_dir = '/www/wwwroot/my.letao7000.com/'
static_dir = './dist/'
filename = './removeStatic.sh'
ssh.connect({
        host: '47.112.149.215',
        username: 'root',
        privateKey: 'C:/Users/lenovo/.ssh/id_rsa'
}).then(function () {
    // 上传本地目录中的文件到远程服务器
    uploadDist();
    // ssh.putFile(filename, `${site_dir}/${filename}`).then(function () {
    //     console.log(`${filename} uploaded success`)
    //     // execRemoveStatic()
    // }, function (error) {
    //     console.error(`${filename} uploaded error`)
    // })
})

function execRemoveStatic() {
    console.log("removeStatic.sh exec...")
    // 执行远程服务器的脚本
    ssh.execCommand(`bash ${filename}`, {
        cwd: site_dir
    }).then(function (result) {
        console.log('STDOUT: ' + result.stdout)
        console.log('STDERR: ' + result.stderr)
        uploadDist()
    })
}
// 上传静态资源
function uploadDist() {
    console.log('静态资源上传中....')
    ssh.putDirectory(static_dir, site_dir).then(function () {
        console.log("上传成功")
        process.exit()
    }, function (error) {
        console.error("错误信息：" + error.message)
    })
}
