function displayFixed() {
    setView('Pins')
    const main = document.getElementById('content');

    main.innerHTML = `
    <button id="clean">Limpiar Fijados</button>
    <section class="fixed">
        <article class="fixedContent" id="list">
                <div class="listParks" id="listParks">
                <h2>Estacionamientos Fijados</h2>
                    <span id="message"></span>
                </div>
                <div class="listEvents" id="listEvents">
                    <h2>Eventos Fijados</h2>
                    <span id="messageEvents"></span>
                </div>
            </article>
        </section>
    `;


    const parkingsList = document.getElementById('listParks');
    const eventsList = document.getElementById('listEvents');
    const cleanBtn = document.getElementById('clean');

    cleanBtn.addEventListener('click', () =>{
         localStorage.removeItem('fixed')
         displayFixed();
    } );
    const fixed = getFixed('fixed')

    const parkings = fixed.parkings;
    const events = fixed.events;
    if(parkings.length === 0) {
        document.getElementById('message').textContent = "There's no pinned parkings yet!" 
    }
    if(events.length === 0) {
        document.getElementById('messageEvents').textContent = "There's no pinned events yet!" 
    }

    const view = localStorage.getItem('fixed')

    console.log(parkings)
    parkings.forEach(parking => {
        let div = document.createElement('div');
            div.className = view === 'card' ? 'card' : 'listItem';
            div.innerHTML = `
                <h2>${parking.name}</h2>
                <p><strong>Availability: </strong> ${parking.spaces}</p>
                <p><strong>Location: </strong> ${parking.location}</p>
            `;
            parkingsList.appendChild(div);
        })


        events.forEach(event =>{
            let div = document.createElement('div');
            div.className = view === 'card' ? 'card' : 'listItem';
            let imageURL = `http://localhost:8000/ip-servidor/module_c_api.php/image.png?title=${event.title}`
            div.innerHTML = `
            <img src="${imageURL} alt="${event.title}" width="100px">
                <h2>${event.title}</h2>
                <p><strong>Date: </strong> ${event.date}</p>
            `;
            eventsList.appendChild(div)
        })
        
}