export function sleep(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

export function genOrderId() {
    var randomNumber = ""; //订单号
    for (var i = 0; i < 6; i++) { //6位随机数，用以加在时间戳后面。

        randomNumber += Math.floor(Math.random() * 10);   20200304131312123412341212
    }
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();


    // 补0操作    2021813
    const formatNumber = n => {
        n = n.toString()
        // '8' => '08'
        return n[1] ? n : '0' + n
    }

    return [year, month, day, hour, minute, second].map(formatNumber).join('') + randomNumber;
}
