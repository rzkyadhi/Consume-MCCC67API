$(document).ready(function () {
    $('#tableProduct').DataTable({
        columnDefs: [
            { orderable: false, targets: -1 },
            { className: 'text-center', targets: [0, 1, 2, 3] }
        ],
        "ajax": {
            "url": "https://localhost:44313/api/product",
            "dataType": "json",
            "dataSrc": "data",
        },
        "columns": [{
                "data": "id",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "name"
            },
            {
                "data": "supplier.name"
            },
            {
                // data: null,
                render: function (data, type, row) {

                    return `
                    <a href="https://localhost:44317/product/edit/${row['id']}" class="btn btn-warning">
                        Edit
                    </a>
                    <a type="button" href="https://localhost:44317/product/delete/${row['id']}" class="btn btn-danger">
                        Delete
                    </a>`
                }
            }
        ]
    });
});