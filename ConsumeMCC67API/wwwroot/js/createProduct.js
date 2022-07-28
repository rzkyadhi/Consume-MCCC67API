(function () {
	'use strict';
	window.addEventListener('load', function () {
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
				var $form = $(this),
					productName = $form.find("input[name='productName']").val(),
					supplierName = $form.find("select[name='supplierName']").val();
				supplierName = parseInt(supplierName);
				obj.name = productName;
				obj.supplierId = supplierName;
				$.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
                    },
					url: "https://localhost:44313/api/product",
					type: "post",
					dataType: "json",
					data: JSON.stringify(obj)
				});
				console.log(productName);
				console.log(supplierName);
				console.log(obj);
				console.log('Form submitted');
			}, false);
		});
	}, false);
})();
