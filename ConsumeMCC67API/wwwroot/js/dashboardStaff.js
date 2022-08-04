$.ajax({
    url: "https://localhost:44317/supplier/getjson"
}).done((result) => {
    let totalSupplier =
        `
    <h5 class="card-title text-uppercase text-muted mb-0">Total Supplier</h5>
    <span class="h2 font-weight-bold mb-0">${result.data.length}</span>
    `;
    $("#totalSupplier").html(totalSupplier);
});