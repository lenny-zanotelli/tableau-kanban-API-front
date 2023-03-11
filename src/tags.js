const utilModule = require("./utils");

const tagModule = {

    makeTagInDOM: function(tag){

        const tagDOM = document.createElement('span');

        tagDOM.textContent = tag.name;
        tagDOM.style.backgroundColor = tag.color;
        tagDOM.dataset.tagId = tag.id;
        tagDOM.classList.add('tag');

        const theGoodCard = document.querySelector(`.box[data-card-id="${tag.card_has_tag.card_id}"]`);

        tagDOM.addEventListener('dblclick', tagModule.deleteTagFromCard);

        theGoodCard.querySelector('.tags').appendChild(tagDOM);

    },

    deleteTagFromCard: async function(event) {

      const cardId = event.target.closest('.box').dataset.cardId;
      const tagId = event.target.dataset.tagId;

      try {
          const response = await fetch(`${utilModule.base_url}/cards/${cardId}/tags/${tagId}`, {
              method: 'DELETE'
          });
          const jsonData = await response.json();

          if(!response.ok) {throw jsonData};

          // enlever le tag de la carte dans le DOM
          event.target.remove();
      } catch(error) {
          alert('Impossible de dissocier le tag de sa carte !');
          console.error(error);
      }

    },

    showAssociateTagToCardModal: async function(event) {
        // afficher la modale pour associer un tag à une carte
        const modal = document.querySelector('#addTagToCardModal');
        modal.classList.add('is-active');
        const cardDOM = event.target.closest('.box');
        // mettre à jour l'input card_id du formulaire de la modal
        modal.querySelector('input[name="card_id"]').value = cardDOM.dataset.cardId;

        // on récupère le select de la modale dans le DOM
        const select = modal.querySelector('select[name="tag_id"]');
        
        select.textContent = "";
        try {
            const response = await fetch(`${utilModule.base_url}/tags`);
            const jsonData = await response.json();
  
            if(!response.ok) {throw jsonData};
            
            for(const tag of jsonData) {
                const option = document.createElement('option');

                option.value = tag.id;
                option.textContent = tag.name;
                select.appendChild(option);
            }
        } catch(error) {
            alert('Impossible de récupérer les tags !');
            console.error(error);
        }
        
    },

    handleAddTagToCardForm: async function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            const response = await fetch(`${utilModule.base_url}/cards/${formData.get('card_id')}/tags`, {
                method: 'POST',
                body: formData,
            });

            const jsonData = await response.json();

            console.log(jsonData);
            if(!response.ok) { throw jsonData }

            const tag = jsonData.tags.find(tag => tag.id == formData.get('tag_id'));
            tagModule.makeTagInDOM(tag);
            
        } catch (error) {
            console.log(error);
            
        }
        utilModule.hideModals();
    }
}

module.exports = tagModule;