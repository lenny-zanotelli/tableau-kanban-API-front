const utilModule = {
    hideModals: function() {

        const modals = document.querySelectorAll(".modal");
        for(const modal of modals){
          modal.classList.remove("is-active");
        }
    },
    
    base_url: "http://localhost:3000",
}

module.export = utilModule;