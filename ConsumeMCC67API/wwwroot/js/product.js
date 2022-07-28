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
        buttons: [{
                extend: 'pageLength',
                className: 'btn btn-primary dropdown-toggle rounded'
            },
            'spacer',
            {
                extend: 'collection',
                text: 'Export As',
                className: 'btn btn-primary rounded',
                buttons: [{
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

// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.getElementsByClassName('needs-validation');
// Loop over them and prevent submission
var validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
        event.preventDefault();
        let obj = {};
        obj.name = $("#productName").val();
        obj.supplierId = parseInt($("#supplierName").val());
        swal({
            title: "Are you sure?",
            text: `You want to add product : ${obj.name} with supplier ${obj.supplierId}`,
            buttons: {
                cancel: true,
                confirm: true,
            },
            closeOnConfirm: false
        }).then(function (isConfirm) {
            if (isConfirm === true) {
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url: "https://localhost:44313/api/product",
                    type: "post",
                    dataType: "json",
                    data: JSON.stringify(obj),
                    success: function (data) {
                        $("#tableProduct").DataTable().ajax.reload();
                        $("#addProduct").modal('hide'),
                            swal(
                                "Success!",
                                "Product has been saved!",
                                "success"
                            )
                    },
                    failure: function (data) {
                        swal(
                        "Internal Error",
                        "Oops, Product was not saved.",
                        "error"
                        )
                    }
                });
            }
        })
        console.log(obj);
        console.log('Form submitted');
    }, false);
});