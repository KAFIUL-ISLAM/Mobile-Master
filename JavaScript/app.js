const container = document.getElementById('display-result');
const detailsContainer = document.getElementById('details-display');

const fetchData = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    inputField.value = '';
    container.innerHTML = ``;
    detailsContainer.innerHTML = ``;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.data))
}

const displayResult = fetchedData => {
    console.log(fetchedData);
    const phones = fetchedData.slice(0, 20);
    for (const phone of phones) {
        console.log(phone);
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
        <div class="h-100 w-75 mx-auto mb-5 text-center">
            <img src="${phone.image}" class="card-img-top " alt="...">
            <div class="card-body">
                <h5 class="card-title text-info">${phone.phone_name}</h5>
                <p class="card-text">Name of the Brand: <span class="text-info">${phone.brand}</span></p>
                <a onclick="showDetails('${phone.slug}')" href="#details-display" class="btn btn-outline-info">Details</a>
            </div>
        `;
        container.appendChild(card);
    }
    // const button = document.createElement('button');
    // button.innerText = "submit";
    // container.appendChild(button);
}

const showDetails = phoneID => {
    const url = `
        https://openapi.programming-hero.com/api/phone/${phoneID}
        `;
    fetch(url)
        .then(res => res.json())
        .then(data => phoneDetails(data.data))
}
const phoneDetails = clickedPhone => {
    console.log(clickedPhone);
    detailsContainer.innerHTML = ``;
    const div = document.createElement('div');
    div.classList.add('d-flex');
    div.innerHTML = `
            <div class="w-50"> <img class="w-75" src="${clickedPhone.image}" alt="">
            </div>
            <div class="w-50 d-flex align-items-center">
                <div>
                    <h2 class="fw-bold">${clickedPhone.name}</h2>
                    <small class="text-muted">${clickedPhone.releaseDate}</small>
                    <h4><span class="fw-bold">Brand:</span> ${clickedPhone.brand}</h4>
                    <p><span class="fw-bold fs-5">Main Features</span><br>
                        <span class="fw-bold">Chipset:</span> ${clickedPhone.mainFeatures.chipSet}<br>
                        <span class="fw-bold">Display Size:</span> ${clickedPhone.mainFeatures.displaySize}<br>
                        <span class="fw-bold">Memory:</span> ${clickedPhone.mainFeatures.memory}<br>
                        <span class="fw-bold">Storage:</span> ${clickedPhone.mainFeatures.storage}
                    </p>
                    <div id="sensor-container"><span class="fw-bold">Sensors:</span>
                        
                    </div>
                </div>
             </div>
    `;
    const sensors = clickedPhone.mainFeatures.sensors;
    // console.log(sensors)
    const sensorContainer = document.getElementById('sensor-container');
    const list = document.createElement('ul');
    for (const sensor of sensors) {
        const item = document.createElement('li');
        list.innerText = `${sensor}`;
        list.appendChild(item);
    }
    detailsContainer.appendChild(div);
    sensorContainer.appendChild(list);

    }
