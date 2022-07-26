$(document).ready(function () {
    var table = $('#tableProduct').DataTable({
        lengthChange: false,
        "initComplete": function () {
            table.buttons().container().appendTo('#tableProduct_wrapper .col-md-6:eq(0)');
            $("#tableProduct").show();
        },
        /*dom: 'Bfrtip',*/
        lengthMenu: [
            [10, 25, 50, -1],
            ['10 rows', '25 rows', '50 rows', 'Show all']
        ],
        buttons: [
            {
                extend: 'pageLength',
                className: 'btn btn-primary dropdown-toggle rounded'
            },
            'spacer',
            {
                extend: 'collection',   
                text: 'Export As',
                className: 'btn btn-primary rounded',
                buttons: [
                    {
                        extend: 'copy',
                    },
                    {
                        extend: 'pdf',
                        title: 'DataExportPDF - ProductMCC67',
                        exportOptions: {
                            columns: ':visible'
                        },
                        download: 'open'
                    },
                    {
                        extend: 'excel',
                        title: 'DataExportExcel - ProductMCC67',
                        exportOptions: {
                            columns: ':visible'
                        },
                        autoFilter: true,
                        sheetName: 'ProductMCC67'
                    },
                    {
                        extend: 'csv',
                        title: 'DataExportCSV - ProductMCC67',
                        exportOptions: {
                            columns: ':visible'
                        }
                    }
                ]
            },
            'spacer',
            {
                extend: 'colvis',
                className: 'btn btn-primary rounded',
            }
        ],
        columnDefs: [{
                orderable: false,
                targets: -1
            },
            {
                className: 'text-center',
                targets: [0, 1, 2, 3]
            }
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