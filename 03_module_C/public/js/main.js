
document.querySelectorAll('#navBottom .navList button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const view = e.target.dataset.view;

        if(view === 'parkings') displayParkings();
        if(view === 'events') displayEvents();
        if(view === 'weather') displayWeather();
        if(view === 'fixed') displayFixed();
        if(view === 'settings') displaySettings();

        navList.classList.remove('visible');
    })
})

displayParkings();