async function displayEvents () {
    setView('Events');

    const main = document.getElementById('content');
    main.innerHTML = `
    <div class="searchContent">
        <label for="start">Start Date<input type="date" id="start"></label>
        <label for="end">End Date<input type="date" id="end"></label>
    </div>
    
    
    <section class="listContainer">
    <article class="list" id="list">
    
    </article>
    </section>
    `;
    
    const list = document.getElementById('list');
    const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');
    
    
    let nextPage = 'events.json';
    let isLoading = false;
    async function loadMore() {
        const startDate = startInput.value;
        const endDate = endInput.value;
        let url = nextPage;
        
        isLoading = true;


        
        if (startDate || endDate) {
            const params = [];
            if (startDate) params.push(`beginning_date=${startDate}`);
            if (endDate) params.push(`ending_date=${endDate}`);
            url += (url.includes('?') ? '&' : '?') + params.join('&');
        }

        const data = await fetchData(url);
        console.log(data);
        
        let events = data.events
        

        url = data.pages?.next;

        renderEvents(events);
        isLoading = false;
    } 

     function renderEvents(events) {
        

        const view = localStorage.getItem('view');
         events.forEach(event =>{
            let div = document.createElement('div');
            div.className = view === 'card' ? 'card' : 'listItem';
            let imageURL = `http://localhost:8000/ip-servidor/module_c_api.php/image.png?title=${event.title}`
            div.innerHTML = `
            <img src="${imageURL}" alt="${event.title}" width="100%">
                <h2>${event.title}</h2>
                <p><strong>Date: </strong> ${event.date}</p>
                <div class="acciones">
                    <button class="fixedBtn">Pin</button>
                    <button class="showBtn">More</button>
                </div>
            `;
            div.querySelector('.fixedBtn').onclick = () => saveFixed('events', event)
            div.querySelector('.showBtn').onclick = () => showItem(event);
            list.appendChild(div)
        } )
    }


    function showItem(item) {
        const modal = document.createElement('div')
            let imageURL = `http://localhost:8000/ip-servidor/module_c_api.php/image.png?title=${item.title}`

        document.body.classList.add('noScroll');
        modal.className = 'modal visible';
        modal.innerHTML = `
            <div class="closeModal">
                <button class="closeBtn">X</button>
            </div>
            <img src="${imageURL} alt="${item.title}" width="200px">
            <h2>${item.title}</h2>
                <p><strong>Date: </strong> ${item.date}</p>
    
        `;
        modal.querySelector('.closeBtn').onclick = () => {
            modal.classList.remove('visible');
            document.body.classList.remove('noScroll');
        } 
        main.appendChild(modal);
    }

    await loadMore();


    [ startInput, endInput ].forEach(input => {
        input.addEventListener('input', async () => {
            list.innerHTML = '';
            nextPage = 'events.json';
            await loadMore();
        })
    })


     //INFINITE SCROLL
    window.addEventListener('scroll', async () => {
        let bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

        if(bottom) await loadMore();
    })
}