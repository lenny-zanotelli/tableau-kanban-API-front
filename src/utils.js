const utilModule = {
    hideModals: function() {

        const modals = document.querySelectorAll(".modal");
        for(const modal of modals){
          modal.classList.remove("is-active");
        }
    },
    
    base_url: "https://torigon.fr",
}

module.export = utilModule;