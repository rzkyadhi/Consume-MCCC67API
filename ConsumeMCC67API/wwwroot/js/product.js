$(document).ready(function () {
    var table = $('#tableProduct').DataTable({
        "language": {
            "paginate": {
                "previous": "<i class='ni ni-bold-left'></i>",
                "next": "<i class='ni ni-bold-right'></i>"
            }
        },
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
            // {
            //     extend: 'colvis',
            //     className: 'btn btn-primary rounded',
            // }
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
            "url": "https://localhost:44317/Product/getjson",
            "dataType": "json",
        },
        "columns": [{
                "data": "id",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
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
                                <button type="button" onclick="editProduct(${row['id']})" data-toggle="modal" data-target="#editProduct" class="btn btn-warning">
                                    Edit
                                </button>
                                <button type="button" onclick="deleteProduct(${row['id']})" class="btn btn-danger">
                                    Delete
                                </button>`

                }
            }
        ],
    });
});

// Add Section
function addProduct() {
    let option = "";
    const supplier = {};
    let createModalBody =
        `
        <div class="form-row" id="form-post">
            <div class="col-md-6 mb-3">
                <label for="productName">Product Name</label>
                <input asp-for="Name" name="productName" type="text" class="form-control"
                    id="productName" required>
                <div class="valid-feedback">
                    Looks good!
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="supplierName">Supplier Name</label>
                <select class="custom-select" id="supplierName" required>
                </select>
                <div class="invalid-feedback">
                    Please select a valid supplier.
                </div>
            </div>
        </div>               
        `;
    $("#modalCreate").html(createModalBody);
    $.ajax({
        url: `https://localhost:44317/supplier/getjson`,
        type: 'get'
    }).done((result) => {
        option +=
            `
        <option selected disabled value="">Choose Supplier..</option>
        `;
        $.each(result.data, (key, val) => {
            option +=
                `
            <option value=${val.id}>${val.name}</option>
            `;
            supplier[val.name] = val.id;
        })
        $("#supplierName").html(option);
        let forms = document.getElementsByClassName("needs-validation");

        let validation = Array.prototype.filter.call(forms, (form) => {
            form.addEventListener('submit', (event) => {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    let obj = {};
                    let supplierName = "";
                    obj.name = $("#productName").val();
                    obj.supplierId = parseInt($("#supplierName").val());

                    for (let i = 0; i < Object.keys(supplier).length; i++) {
                        if (obj.supplierId == Object.values(supplier)[i]) supplierName = Object.keys(supplier)[i];
                    }
                    swal({
                        title: "Are you sure?",
                        text: `You will add Product : ${obj.name} and Supplier : ${supplierName}`,
                        buttons: {
                            cancel: true,
                            confirm: true
                        },
                        closeOnConfirm: false
                    }).then((isConfirm) => {
                        if (isConfirm === true) {
                            $.ajax({
                                url: "https://localhost:44317/product/PostJSON",
                                type: "post",
                                dataType: "json",
                                data: obj,
                                beforeSend: data => {
                                    data.setRequestHeader("RequestVerificationToken", $("[name='__RequestVerificationToken']").val());
                                },
                                success: () => {
                                    $("#tableProduct").DataTable().ajax.reload();
                                    $("#addProduct").modal('hide'),
                                        swal(
                                            "Success",
                                            `${obj.name} has been saved`,
                                            "success"
                                        )
                                },
                                failure: (response) => {
                                    swal(
                                        "Internal Server Error",
                                        `Oops, ${obj.name} was not saved`,
                                        "error"
                                    )
                                }
                            })
                        }
                    })
                }
                form.classList.add('was-validated');
            }, false);
        })
    })
}


// Delete Section
function deleteProduct(id) {
    $.ajax({
        url: `https://localhost:44317/product/getjsonbyid/${id}`,
        type: 'get'
    }).done((result) => {
        let objDelete = {};
        objDelete.id = result.data.id;
        objDelete.name = result.data.name
        objDelete.supplierId = result.data.supplierId;
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
                    url: "https://localhost:44317/product/deletejson",
                    type: "delete",
                    dataType: "json",
                    data: objDelete,
                    beforeSend: data => {
                        data.setRequestHeader("RequestVerificationToken", $("[name='__RequestVerificationToken']").val());
                    },
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
    let option = "";
    const supplier = {};
    let supplierName = "";
    let idSupplier = 0;
    $.ajax({
        url: `https://localhost:44317/product/getjsonbyid/${id}`,
        type: 'get'
    }).done((result) => {
        idSupplier = result.data.supplierId;
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
                <select class="form-control" id="supplierId">
                
                </select>
                <div class="invalid-feedback">
                    Please select a valid supplier.
                </div>
            </div>
        </div>
        `;
        $("#modalEdit").html(editModalBody);
        $.ajax({
            url: `https://localhost:44317/supplier/getjson`,
            type: 'get'
        }).done((result) => {
            option +=
                `
            <option value="" disabled>Choose Supplier</option>
            `
            $.each(result.data, (key, val) => {
                option +=
                    `
                <option value=${val.id}>${val.name}</option>
                `
                supplier[val.name] = val.id;
            })
            $("#supplierId").html(option);
            let options = document.getElementById("supplierId").options;
            
            console.log(options);
            console.log(supplier);
            for (let i = 0; i < options.length; i++) {
                if (options[i].value == Object.values(supplier)[idSupplier - 1]) {
                    options[i].selected = true;
                }
            }

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var formsEdit = document.getElementsByClassName('edit-validation');
            // Loop over them and prevent submission
            var validationEdit = Array.prototype.filter.call(formsEdit, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        event.preventDefault();
                        let objEdit = {};
                        objEdit.id = parseInt($("#productId").val());
                        objEdit.name = $("#productDeleteName").val();
                        objEdit.supplierId = parseInt($("#supplierId").val());

                        for (let i = 0; i < Object.keys(supplier).length; i++) {
                            if (objEdit.supplierId == Object.values(supplier)[i]) supplierName = Object.keys(supplier)[i];
                        }
                        swal({
                            title: "Are you sure?",
                            text: `You will edit product id : ${objEdit.id} product name : ${objEdit.name} with supplier ${supplierName}`,
                            buttons: {
                                cancel: true,
                                confirm: true,
                            },
                            closeOnConfirm: false
                        }).then(function (isConfirm) {
                            if (isConfirm === true) {
                                $.ajax({
                                    url: "https://localhost:44317/product/editjson",
                                    type: "put",
                                    dataType: "json",
                                    data: objEdit,
                                    beforeSend: data => {
                                        data.setRequestHeader("RequestVerificationToken", $("[name='__RequestVerificationToken']").val());
                                    },
                                    success: function (data) {
                                        $("#tableProduct").DataTable().ajax.reload();
                                        $("#editProduct").modal('hide'),
                                            swal(
                                                "Success!",
                                                `${objEdit.name} has been edited`,
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
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        })

    })

}