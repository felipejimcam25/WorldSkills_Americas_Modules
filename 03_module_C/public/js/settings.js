function displaySettings() {
    setView('Settings')
    const main  = document.getElementById('content');
    main.className = 'settingsPath'
    main.innerHTML = `
    <div class="settingsContent">
        <form action="#" class="formControl">
            <h2>Ver Como:</h2>
            <div class="formControl">
                <label for="list"><input type="radio" name="view" id="list" value="list">Lista</label>
                <label for="card"><input type="radio" name="view" id="card" value="card">Card</label>
            </div>
            </form>
            <form action="#" class="formControl">
            <h2>Tema:</h2>
            <div class="formControl">
                <label for="light"><input type="radio" name="theme" id="light" value="list">Claro</label>
                <label for="dark"><input type="radio" name="theme" id="dark" value="dark">Oscuro</label>
            </div>
            </form>
            <form action="#" class="formControl">
            <h2>Ordenar Por:</h2>
            <div class="formControl">
                <label for="al"><input type="radio" name="order" id="al" value="alpha">Alfabeto</label>
                <label for="dis"><input type="radio" name="order" id="dis" value="distant">Distancia</label>
            </div>
        </form>
    </div>
    `


    main.addEventListener('change', e => {
        if(e.target.name === 'view'){
            const view = e.target.value;
            localStorage.setItem('view', view);
        }
        if(e.target.name === 'theme'){
            const theme = e.target.value;
            document.body.style.setProperty('--bg', theme === 'dark' ? '#222' : '#fff')
            document.body.style.setProperty('--text', theme === 'dark' ? '#fff' : '#000')
            document.documentElement.style.setProperty('--border', theme === 'dark' ? '#fff' : '#000')
        }
        if(e.target.name === 'order'){
            const order = e.target.value;
            localStorage.setItem('order', order);
        }
    })
}