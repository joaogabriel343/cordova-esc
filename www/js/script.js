//CODIGO JS PARA TODOS HTMLS


document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navbar');
    setTimeout(() => {
        navbar.classList.add('navbar-loaded');
    }, 200);
});


document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab-link'); 

    const removeActiveClass = () => {
        tabs.forEach(tab => tab.classList.remove('active'));
    };

    const setActiveTab = () => {
        const currentUrl = window.location.pathname; 

        tabs.forEach(tab => {
            const tabHref = tab.getAttribute('href');
            if (currentUrl === tabHref) {
                removeActiveClass(); 
                tab.classList.add('active'); 
            }
        });
    };

    setActiveTab();

    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault(); 

            removeActiveClass(); 
            this.classList.add('active'); 

            window.location.href = this.getAttribute('href');
        });
    });
});

