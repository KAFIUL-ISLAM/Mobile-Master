const fetchData = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    inputField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.data))
}

const displayResult = (phones) => {
    const container = document.getElementById('display-result');
    container.innerHTML = ``;
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
                <button class="btn btn-outline-info">Details</button>
            </div>
        `
        container.appendChild(card);
    }
}

