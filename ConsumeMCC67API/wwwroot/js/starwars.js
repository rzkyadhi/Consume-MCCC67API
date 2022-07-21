$.ajax({
	url: "https://swapi.dev/api/people/"
}).done((result) => {
	let text = "";
	$.each(result.results, function (key, val) {
		text +=
			`<tr>
			<td>${key+1}</td>
			<td>${val.name}</td>
			<td>${val.height}</td>
			<td>${val.mass}</td>
			<td>${val.gender}</td>
			<td>${val.birth_year}</td>
			<td>
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailsModal">
  					Details
				</button></td>
		</tr>`;
	});
	$("#starWarsData").html(text);
})