const container = document.getElementById('display-result');
const detailsContainer = document.getElementById('details-display');
const errorMessage = document.getElementById('error-message');


const fetchData = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    inputField.value = '';
    container.innerHTML = ``;
    detailsContainer.innerHTML = ``;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => data.status ? displayResult(data.data) : noData());

}

const noData = () => {
    errorMessage.style.display = 'block';
}

const displayResult = fetchedData => {
    errorMessage.style.display = 'none';
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

    const sensorList = () => {
        const sensors = clickedPhone.mainFeatures.sensors;
        const list = document.createElement('ul');
        for (const sensor of sensors) {
            const item = document.createElement('li');
            item.innerText = `${sensor}`;
            list.appendChild(item);
        }
        return list.innerHTML;
    }
   


    div.innerHTML = `
            <div class="w-50"> <img class="w-75" src="${clickedPhone.image}" alt="">
            </div>
            <div class="w-50 d-flex align-items-center">
                <div>
                    <h2 class="fw-bold">${clickedPhone.name}</h2>
                    <small class="text-muted">${clickedPhone.releaseDate ? clickedPhone.releaseDate: "No Release Date found"}</small>
                    <h4 class="fw-bold text-info"><span class="text-dark">Brand:</span> ${clickedPhone.brand}</h4>
                    <div>
                    <p>
                    <span class="fw-bold fs-5">Main Features</span><br>
                        <span class="fw-bold">Chipset:</span> ${clickedPhone.mainFeatures.chipSet}<br>
                        <span class="fw-bold">Display Size:</span> ${clickedPhone.mainFeatures.displaySize}<br>
                        <span class="fw-bold">Memory:</span> ${clickedPhone.mainFeatures.memory}<br>
                        <span class="fw-bold">Storage:</span> ${clickedPhone.mainFeatures.storage}
                    </p>
                    <p>
                    <span class="fw-bold fs-5">Others</span><br>
                        <span class="fw-bold">Bluetooth:</span> ${clickedPhone.others?.Bluetooth ? clickedPhone.others.Bluetooth : "No info found"}<br>
                        <span class="fw-bold">GPS:</span> ${clickedPhone.others?.GPS ? clickedPhone.others.GPS : "No info found"}<br>
                        <span class="fw-bold">NFC:</span> ${clickedPhone.others?.NFC ? clickedPhone.others.NFC : "No info found"}<br>
                        <span class="fw-bold">WLAN:</span> ${clickedPhone.others?.WLAN ? clickedPhone.others.WLAN : "No info found"}<br>
                        <span class="fw-bold">USB:</span> ${clickedPhone.others?.USB ? clickedPhone.others.USB : "No info found"}<br>
                        <span class="fw-bold">Radio:</span> ${clickedPhone.others?.Radio ? clickedPhone.others.Radio : "No info found"}
                    </p>
                    </div>
                    <div><span class="fw-bold">Sensors:</span>
                        ${sensorList()}
                    </div>
                </div>
             </div>
    `;
    detailsContainer.appendChild(div);

    
}
