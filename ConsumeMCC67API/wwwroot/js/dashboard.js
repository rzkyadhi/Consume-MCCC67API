$.ajax({
    url: "https://localhost:44313/api/product"
}).done((result) => {
    let supplier = [];
    let hashMap = {};

    // Get Supplier List
    for (let i = 0; i < result.data.length; i++) {
        supplier.push(result.data[i].supplier.name);
    }

    // Pushing into HashMap
    for (let i = 0; i < supplier.length; i++) {
        if (Object.keys(hashMap).length == 0) {
            hashMap[supplier[i]] = 1;
            i++;
        }
        if (supplier[i] in hashMap) {
            hashMap[supplier[i]] = hashMap[supplier[i]] + 1;
        }
        if (supplier[i] in hashMap == false) {
            hashMap[supplier[i]] = 1;
        }
    }

    let data = {
        labels: Object.keys(hashMap),
        datasets: [{
            label: 'Total Product',
            data: Object.values(hashMap),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                '#cc65fe',
                '#ffce56'
            ],
            hoverOffset: 4,
        }]
    }

    let dataBar = {
        labels: Object.keys(hashMap),
        datasets: [{
            label: 'Total Product',
            barPercentage: 0.1,
            barThickness: 100,
            maxBarThickness: 100,
            minBarLength: 2,
            data: Object.values(hashMap),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                '#cc65fe',
                '#ffce56'
            ],
            hoverOffset: 4,
        }]
    }

    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const {
                ctx
            } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    const config = {
        type: 'doughnut',
        data: data,
        plugins: [plugin],
        options: {
            responsive: true,
            maintainAspectRatio : false
        }
    };

    const configBar = {
        type: 'bar',
        data: dataBar,
        plugins: [plugin],
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    }

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    const barChart = new Chart(
        document.getElementById('barChart'),
        configBar
    );

    document.getElementById("downloadPieChart").addEventListener('click', function () {
        /*Get image of canvas element*/
        var url_base64jp = document.getElementById("myChart").toDataURL("image/jpg");
        /*get download button (tag: <a></a>) */
        var a = document.getElementById("downloadPieChart");
        /*insert chart image url to download button (tag: <a></a>) */
        a.href = url_base64jp;
    });

    document.getElementById("downloadBarChart").addEventListener('click', function () {
        /*Get image of canvas element*/
        var url_base64jp = document.getElementById("barChart").toDataURL("image/jpg");
        /*get download button (tag: <a></a>) */
        var a = document.getElementById("downloadBarChart");
        /*insert chart image url to download button (tag: <a></a>) */
        a.href = url_base64jp;
    });
});