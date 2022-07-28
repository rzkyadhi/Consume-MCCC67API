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
                                <a type="button" onclick="editProduct(${row['id']})" data-toggle="modal" data-target="#editProduct" class="btn btn-warning text-light">
                                    Edit
                                </a>
                                <a type="button" onclick="deleteProduct(${row['id']})" class="btn btn-danger text-light">
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

// Delete Section
function deleteProduct(id) {
    $.ajax({
        url: `https://localhost:44313/api/product/${id}`,
        type: 'get'
    }).done((result) => {
        let objDelete = {};
        objDelete.id = result.data.id;
        objDelete.name = result.data.name
        objDelete.supplierId = result.data.supplierId
        console.log(objDelete);
        swal({
            title: "Are you sure?",
            text: `You want to delete product id : ${objDelete.id} product name : ${objDelete.name} with supplier ${objDelete.supplierId}`,
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
                    type: "delete",
                    dataType: "json",
                    data: JSON.stringify(objDelete),
                    success: function (data) {
                        $("#tableProduct").DataTable().ajax.reload();
                        swal(
                            "Success!",
                            `${objDelete.name} has been deleted !`,
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
        console.log('Form submitted');
    })

    // Delete Section
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var formsDelete = document.getElementsByClassName('delete-validation');
    // Loop over them and prevent submission
    var validationDelete = Array.prototype.filter.call(formsDelete, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            event.preventDefault();


        }, false);
    });
}

// Edit Section
function editProduct(id) {
    $.ajax({
        url: `https://localhost:44313/api/product/${id}`,
        type: 'get'
    }).done((result) => {
        let editModalBody =
            `
        <div class="form-row">
            <div class="col-md-4 mb-3">
                    <label for="productId">Product Id</label>
                    <input name="productId" type="number" class="form-control"
                        id="productId" value=${result.data.id} readonly required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                </div>
            <div class="col-md-4 mb-3">
                <label for="productDeleteName">Product Name</label>
                <input id="productDeleteName" type="text" class="form-control"
                         value="${result.data['name']}" required>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <label for="supplierId">Supplier Name</label>
                <input name="supplierId" type="text" class="form-control"
                    id="supplierId" value=${result.data.supplierId} required>
                <div class="invalid-feedback">
                    Please select a valid supplier.
                </div>
            </div>
        </div>
        `;
        $("#modalEdit").html(editModalBody);
    })

    // Edit Section
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var formsEdit = document.getElementsByClassName('edit-validation');
    // Loop over them and prevent submission
    var validationEdit = Array.prototype.filter.call(formsEdit, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            event.preventDefault();
            let objDelete = {};
            objDelete.id = parseInt($("#productId").val());
            objDelete.name = $("#productDeleteName").val();
            objDelete.supplierId = parseInt($("#supplierId").val());
            console.log(objDelete);
            swal({
                title: "Are you sure?",
                text: `You want to delete product id : ${objDelete.id} product name : ${objDelete.name} with supplier ${objDelete.supplierId}`,
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
                        type: "put",
                        dataType: "json",
                        data: JSON.stringify(objDelete),
                        success: function (data) {
                            $("#tableProduct").DataTable().ajax.reload();
                            $("#deleteProduct").modal('hide'),
                                swal(
                                    "Success!",
                                    "Product has been edited!",
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
            console.log('Form submitted');
        }, false);
    });
}