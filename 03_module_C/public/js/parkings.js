async function displayParkings() {
    setView('Parkings');

    const main = document.getElementById('content');

    main.innerHTML = `<p>Getting Location...</p>`

    let userLat, userLon;

    const params = new URLSearchParams(window.location.search);

    if(params.has('latitude') && params.has('longitude')){
        userLat = parseFloat(params.get('latitude'))
        userLon = parseFloat(params.get('longitude'))
    } else if(navigator.geolocation){
        try{
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 50 });
            })
            userLat = position.coords.latitude;
            userLon = position.coords.longitude;
        } catch (err) {
            console.warn('geoLocation Bloked, using a simulated position');
            userLat = -44.5145
            userLon = 78.3344
        }
    }

    main.innerHTML = `<p>Gettings Parkings...</p>`

    main.innerHTML = `
    <div class="parkSearch">
        <label for="nombre">Search by name:<input type="text" id="nombre" placeholder="Buscar estacionamiento"></label>
    </div>

    <section class="listContainer">
        <article class="list" id="list">

        </article>
    </section>

    `



    
    const inputNombre = document.getElementById('nombre')
    const list = document.getElementById('list');

    const data = await fetchData('carparks.json');

    const parkings = Object.entries(data).map(([name, info]) => ({
        name,
        spaces : info.availableSpaces,
        location : info.location,
        lat: info.latitude,
        lon: info.longitude
    }))
    

    parkings.forEach(parking => {
        parking.distance = parseFloat(getDistanceFromLatLonInKm(userLat, userLon, parking.lat, parking.lon)).toFixed(2);
    })

    const order = localStorage.getItem('order');


    
    
    
    function renderParkings() {
        list.innerHTML = '';

        const filterName = inputNombre.value.trim().toLowerCase();


        let filtered = parkings.filter(parking => parking.name.toLowerCase().includes
        (filterName));

        


    if(order === 'alpha') {
        filtered.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));   
    }else if(order === 'distant'){
        filtered.sort((a, b) => a.distance - b.distance);
    }
        const view = localStorage.getItem('view');
        filtered.forEach(parking => {
            let div = document.createElement('div');
            div.className = view === 'card' ? 'card' : 'listItem';
            div.innerHTML = `
                <h2>${parking.name}</h2>
                <p><strong>Availability: </strong> ${parking.spaces}</p>
                <p><strong>Location: </strong> ${parking.location}</p>
                <p><strong>Distance: </strong> ${parking.distance}Km</p>
                <div class="acciones">
                    <button class="fixedBtn">Pin</button>
                    <button class="showBtn">More</button>
                </div>
            `;
            div.querySelector('.fixedBtn').onclick = () => saveFixed('parkings', parking)
            div.querySelector('.showBtn').onclick = () => showItem(parking);
            list.appendChild(div)
        })
    }


    inputNombre.addEventListener('input', renderParkings);

    renderParkings();

    function showItem(item) {
        const modal = document.createElement('div')
        document.body.classList.add('noScroll');
        modal.className = 'modal visible';
        modal.innerHTML = `
            <div class="closeModal">
                <button class="closeBtn">X</button>
            </div>
            <h2>${item.name}</h2>
                <p><strong>Availability: </strong> ${item.spaces}</p>
                <p><strong>Location: </strong> ${item.location}</p>
                <p><strong>Distance: </strong> ${item.distance}</p>
        `;
        modal.querySelector('.closeBtn').onclick = () => {
            modal.classList.remove('visible'); 
            document.body.classList.remove('noScroll');
        }
        main.appendChild(modal);
    }





}