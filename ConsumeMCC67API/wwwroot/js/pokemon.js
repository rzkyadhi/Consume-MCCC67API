function detailPoke(pokeUrl) {
    let modalBody = "";
    let types = "";
    let stats = "";
    $.ajax({
        url: pokeUrl
    }).done((result) => {
        // console.log(result.abilities[0].ability.url);
        types += `<div class="text-center">`
        // Looping for Pokemon Types
        for (let i = 0; i < result.types.length; i++) {
            if (result.types[i].type.name == "grass") {
                types +=
                    `
					<span class="badge badge-pill badge-success">Grass</span>
					`
            }
            if (result.types[i].type.name == "poison") {
                types +=
                    `
					<span class="badge badge-pill badge-dark">Poison</span>
					`
            }
            if (result.types[i].type.name == "fire") {
                types +=
                    `
					<span class="badge badge-pill badge-danger">Fire</span>
					`
            }
            if (result.types[i].type.name == "flying") {
                types +=
                    `
					<span class="badge badge-pill badge-secondary">Flying</span>
					`
            }
            if (result.types[i].type.name == "water") {
                types +=
                    `
					<span class="badge badge-pill badge-primary">Water</span>
					`
            }
            if (result.types[i].type.name == "electric") {
                types +=
                    `
					<span class="badge badge-pill badge-warning">Electric</span>
					`
            }
            if (result.types[i].type.name == "ice") {
                types +=
                    `
					<span class="badge badge-pill badge-warning">Ice</span>
					`
            }
            if (result.types[i].type.name == "normal") {
                types +=
                    `
					<span class="badge badge-pill badge-light">Normal</span>
					`
            }
            if (result.types[i].type.name == "bug") {
                types +=
                    `
					<span class="badge badge-pill badge-success">Bug</span>
					`
            }
        }
        types += `</div>`

        // Looping for Pokemon Stats
        stats +=
            `
		<div class="row">
			<div class="col">
				<div class="card shadow p-3 mb-5 bg-white rounded">
					<div class="card-body">
						
		`
        for (let i = 0; i < result.stats.length; i++) {
            if (result.stats[i].stat.name == "hp") {
                stats +=
                    `
					<p class="font-weight-bold text-uppercase">Health</p>
					<div class="progress">
						<div class="progress-bar bg-success" role="progressbar" style="width:${result.stats[i].base_stat}%" aria-valuenow="${result.stats[i].base_stat}" aria-valuemin="0" aria-valuemax="100">${result.stats[i].base_stat}</div>
					</div>
				`
            }
            if (result.stats[i].stat.name == "attack") {
                stats +=
                    `
				<p class="font-weight-bold text-uppercase">Attack</p>
				<div class="progress">
  					<div class="progress-bar bg-danger" role="progressbar" style="width:${result.stats[i].base_stat}%" aria-valuenow="${result.stats[i].base_stat}" aria-valuemin="0" aria-valuemax="100">${result.stats[i].base_stat}</div>
				</div>
				`
            }
            if (result.stats[i].stat.name == "defense") {
                stats +=
                    `
				<p class="font-weight-bold text-uppercase">defense</p>
				<div class="progress">
  					<div class="progress-bar bg-warning" role="progressbar" style="width:${result.stats[i].base_stat}%" aria-valuenow="${result.stats[i].base_stat}" aria-valuemin="0" aria-valuemax="100">${result.stats[i].base_stat}</div>
				</div>
				`
            }
            if (result.stats[i].stat.name == "special-attack") {
                stats +=
                    `
				<p class="font-weight-bold text-uppercase">special-attack</p>
				<div class="progress">
  					<div class="progress-bar bg-dark" role="progressbar" style="width:${result.stats[i].base_stat}%" aria-valuenow="${result.stats[i].base_stat}" aria-valuemin="0" aria-valuemax="100">${result.stats[i].base_stat}</div>
				</div>
				`
            }
            if (result.stats[i].stat.name == "speed") {
                stats +=
                    `
				<p class="font-weight-bold text-uppercase">speed</p>
				<div class="progress">
  					<div class="progress-bar bg-success" role="progressbar" style="width:${result.stats[i].base_stat}%" aria-valuenow="${result.stats[i].base_stat}" aria-valuemin="0" aria-valuemax="100">${result.stats[i].base_stat}</div>
				</div>
				`
            }
            if (result.stats[i].stat.name == "special-defense") {
                stats +=
                    `
				<p class="font-weight-bold text-uppercase">special-defense</p>
				<div class="progress">
  					<div class="progress-bar bg-info" role="progressbar" style="width:${result.stats[i].base_stat}%" aria-valuenow="${result.stats[i].base_stat}" aria-valuemin="0" aria-valuemax="100">${result.stats[i].base_stat}</div>
				</div>
				`
            }
        }
        stats +=
            `
					</div>
				</div>
			</div>
		`


        // Looping for Pokemon Abilities
        stats +=
            `
			<div class="col">
				<div class="card shadow p-3 mb-5 bg-white rounded">
					<div class="card-body">
						<p class="font-weight-bold text-uppercase text-center">Abilities</p>
						<ul class="list-group">
				
		`
        for (let i = 0; i < result.abilities.length; i++) {
            if (result.abilities[i].is_hidden == false) {
                stats +=
                    `
				<li class="list-group-item">${result.abilities[i].ability.name}</li>
				<ul class="nav nav-abilities nav-pills mb-3 align-self-center" id="pills-tab" role="tablist">
					<li class="nav-item">
						<a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onclick="specialEffect('${result.abilities[i].ability.url}')">Show Effect</a>
					</li>
				</ul>
			`
            }
        }

        stats +=
            `
						</ul>
					</div>
				</div>
		`
        for (let i = 0; i < result.abilities.length; i++) {
            if (result.abilities[i].is_hidden == true) {
                stats +=
                    `
					<div class="card shadow p-3 mb-5 bg-white rounded">
						<div class="card-body">
							<p class="font-weight-bold text-uppercase text-center">Hidden Abilities</p>
							<ul class="list-group">
								<li class="list-group-item">${result.abilities[i].ability.name}</li> 
								<ul class="nav nav-hiddenabilities nav-pills mb-3 align-self-center" id="pills-tab" role="tablist">
									<li class="nav-item">
										<a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true" onclick="specialEffectHidden('${result.abilities[i].ability.url}')">Show Effect</a>
									</li>
								</ul>
							</ul>
						</div>
					</div>	
				`
            }
        }

        stats +=
            `	
			</div>		
		</div>
		`

        // Modal Body !
        modalBody +=
            `
			<img src="${result.sprites.other['official-artwork'].front_default}" alt="" class="img-fluid rounded-circle border border-light mx-auto d-block shadow-lg p-3 mb-5 bg-white rounded"/>
			${types}
			<h5 class="font-weight-bold text-uppercase text-center">${result.name}</h5>
			${stats}	
			`
        $(".modal-title").html(result.name);
        $(".modal-body").html(modalBody);
        /*if (result.types[0].type.name == "grass") $(".modal-body").css("background-color", "#28a745")*/

    })
}


function specialEffect(specialEffectUrl) {
    $.ajax({
        url: specialEffectUrl
    }).done((result) => {
        let specialTab = "";
        $.each(result.effect_entries, function (key, val) {
            // console.log(result.effect_entries[0].effect);
            if (val.language.name == "en") {
                specialTab +=
                    `
				<div class="tab-content text-center" id="pills-tabContent">
  					<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">${val.effect}</div>
  					<div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
  					<div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
				</div>`;
            }

        });
        // console.log(result.results);
        $(".nav-abilities").html(specialTab);
    })
}

function specialEffectHidden(specialEffectUrl) {
    $.ajax({
        url: specialEffectUrl
    }).done((result) => {
        let specialTab = "";
        $.each(result.effect_entries, function (key, val) {
            if (val.language.name == "en") {
                specialTab +=
                    `
				<div class="tab-content text-center" id="pills-tabContent">
  					<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">${val.effect}</div>
  					<div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
  					<div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
				</div>`;
            }

        });
        // console.log(result.results);
        $(".nav-hiddenabilities").html(specialTab);
    })
}

$(document).ready(function () {
    $('#tablePoke').DataTable({
        "ajax": {
            "url": "https://pokeapi.co/api/v2/pokemon/",
            "dataType": "json",
            "dataSrc": "results"
        },
        "columns": [
            {
                "data": "id",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "name"
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `<button type="button" onclick="detailPoke('${row['url']}')" class="btn btn-primary" data-toggle="modal" data-target="#detailsModal">
                        Details
                </button></td>`
                }
            }
        ]
    });
});