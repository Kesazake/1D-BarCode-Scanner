// 扫描按钮点击事件
document.getElementById('scanButton').addEventListener('click', startScan);

function startScan() {
    // 清空窗口文字
    document.querySelector('.window').innerHTML = '';
    
    // 初始化 Quagga
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('.window'),
            constraints: {
                facingMode: "environment",
                width: 640,
                height: 480
            },
            area: {
                top: "20%",
                right: "20%",
                left: "20%",
                bottom: "20%"
            },
            singleChannel: false
        },
        decoder: {
            readers: ["upc_reader", "ean_reader"]
        },
        locate: false,
        numOfWorkers: 2,
        frequency: 5
    }, function(err) {
        if (err) {
            document.querySelector('.window').textContent = "启动摄像头失败: " + err;
            console.error(err);
            return;
        }
        Quagga.start();
    });

    // 扫描成功时的处理
    Quagga.onDetected(function(result) {
        console.log(result);
        const code = result.codeResult.code;
        const format = result.codeResult.format;
        
        const windowDiv = document.querySelector('.window');
        
        windowDiv.innerHTML = `
            <div class="scan-result">
                <div class="code">扫描结果: ${code}</div>
                <div class="format">格式: ${format}</div>
            </div>
        `;

        Quagga.stop();
    });
}