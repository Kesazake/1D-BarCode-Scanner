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
            target: document.querySelector('.window'), // 选择器
            constraints: {
                facingMode: "environment"
            },
        },
        decoder: {
            readers: ["upc_reader", "ean_reader"]
        }
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
        
        // 清空 window 容器
        const windowDiv = document.querySelector('.window');
        
        // 显示扫描结果
        windowDiv.innerHTML = `
            <div class="scan-result">
                <div class="code">扫描结果: ${code}</div>
                <div class="format">格式: ${format}</div>
            </div>
        `;

        Quagga.stop();
    });
}