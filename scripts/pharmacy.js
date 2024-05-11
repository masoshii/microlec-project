$(document).ready(function(){
    processPharmacies();
})




function processPharmacies(filterComuna = 'allcom') {
    return new Promise((resolve, reject) => {
        getPharmacies()
            .then(pharmacies => {
                let filteredPharmacies = pharmacies;
                let pharmaciesWithImage = ['AHUMADA','CRUZ VERDE','DR. SIMI','KNOP','LA BOTIKA','SALCOBRAND'];
                let pharmaciesImageExt = ['svg','svg','svg','png','jpg','svg'];
                if (filterComuna !== 'allcom') {
                    filteredPharmacies = pharmacies.filter(pharmacy => pharmacy.comuna === filterComuna);
                }
                filteredPharmacies.forEach(pharmacy => {

                    var opening = formatTimeHM(pharmacy.opening_hours.opening_time);
                    var closing = formatTimeHM(pharmacy.opening_hours.closing_time);
                    var location = pharmacy.address + ', ' + pharmacy.comuna;
                    var name = deleteExtraSpace(pharmacy.name);
                    var image = "";

                    if (pharmaciesWithImage.includes(name)) {
                        let index = pharmaciesWithImage.indexOf(name);
                        image = name + '.' + pharmaciesImageExt[index];
                    } else {
                        image = 'NOPHOTO.png'
                    }

                    var itemContainer = document.createElement('div');
                    itemContainer.setAttribute('class', 'row pharmacy-item mx-auto');
                    itemContainer.setAttribute('id', `pha-${pharmacy.id}`);

                    var childOne = document.createElement('div');
                    childOne.setAttribute('class', 'col-2');
                    childOne.innerHTML = `
                    <img src="resources/pharmacy/${image}" alt="${name}" class="pharmacy-image">
                    `;
                    itemContainer.appendChild(childOne);

                    var childTwo = document.createElement('div');
                    childTwo.setAttribute('class', 'col-5');
                    childTwo.innerHTML = `
                    <div class="row">
                        <h3 class="pharmacy-name">${name}</h3>
                    </div>
                    <div class="row">
                        <a class="pharmacy-loc" href="#">${location}</a>
                    </div>
                    `;
                    itemContainer.appendChild(childTwo);

                    var childThree = document.createElement('div');
                    childThree.setAttribute('class', 'col-4 align-items-end text-end');
                    childThree.innerHTML = `
                        <div class="row">
                            <div class="row">
                                <p class="pharmacy-number-title">Número telefónico:</p>
                            </div>
                            <div class="row">
                                <p class="pharmacy-number">${pharmacy.telefono}</p>                            
                            </div>
                        </div>
                        <div class="row">
                            <div class="row">
                                <p class="pharmacy-hour-title">Hora de atención:</p>
                            </div>
                            <div class="row">
                                <p class="pharmacy-hour">${opening} - ${closing}</p>
                            </div>
                        </div>
                    `;
                    itemContainer.appendChild(childThree);

                    document.getElementById('pharmacy-list').appendChild(itemContainer);
                });

                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getPharmacies() {
    return new Promise((resolve, reject) => {
        fetch('https://api.npoint.io/c6e6c50e3de349bc5620')
            .then(response => response.json())
            .then(data => {
                const pharmacies = data.map(pharmacy => ({
                    id: pharmacy.local_id,
                    name: pharmacy.local_nombre,
                    address: pharmacy.local_direccion,
                    comuna: pharmacy.comuna_nombre,
                    telefono: pharmacy.local_telefono,
                    opening_hours: {
                        day: pharmacy.funcionamiento_dia,
                        opening_time: pharmacy.funcionamiento_hora_apertura,
                        closing_time: pharmacy.funcionamiento_hora_cierre
                    },
                    location: {
                        latitude: pharmacy.local_lat,
                        longitude: pharmacy.local_lng
                    }
                }));
                resolve(pharmacies);
            })
            .catch(error => {
                reject(new Error('Error while fetching pharmacies: ' + error));
            });
    });
}
