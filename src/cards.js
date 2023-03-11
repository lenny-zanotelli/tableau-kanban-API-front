const tagModule =require("./tags");
const utilModule =require("./utils");

const cardModule = {
    showAddCardModal: function(event) {
        const listElement = event.target.closest('.panel');
        const listId = listElement.dataset.listId;
    
        const modal = document.getElementById("addCardModal");
        const input = modal.querySelector('input[name="list_id"]');
    
        input.value = listId;
    
        modal.classList.add('is-active');
    },
    
    handleAddCardForm: async function(event) {

        event.preventDefault();
        const formData = new FormData(event.target);

        console.log(formData instanceof FormData);
        try {
          const response = await fetch(`${utilModule.base_url}/cards`, {
            method: "POST",
            body: formData
          });
          const jsonData = await response.json();
          if(!response.ok){ throw new Error("Une erreur fatale est survenue : Impossible de créer la carte")};
          cardModule.makeCardInDOM(jsonData);
    
    
        } catch (error) {
          console.log(error);
        }
    
        utilModule.hideModals();
        event.target.reset();
    },

    makeCardInDOM: function(card) {

        const template = document.getElementById('card-template');
        const newCard = document.importNode(template.content, true);
        newCard.querySelector('.card-name').textContent = card.title;
        newCard.querySelector('.box').dataset.cardId = card.id;
        newCard.querySelector('form input[name="card-id"]').value = card.id; // On donne au input hidden une valeur : l'id de la carte obtenue via l'API
        newCard.querySelector('.box').style.backgroundColor = card.color;

        newCard.querySelector('.edit-card-icon').addEventListener('click', cardModule.showEditCardForm);
        newCard.querySelector('.edit-card-form').addEventListener('submit', cardModule.handleEditCardForm);
        newCard.querySelector('.delete-card-icon').addEventListener('click', cardModule.deleteCard);

        newCard.querySelector('.associate-tag-icon').addEventListener('click', tagModule.showAssociateTagToCardModal);
    
        const theGoodList = document.querySelector(`[data-list-id="${card.list_id}"]`);
        theGoodList.querySelector('.panel-block').appendChild(newCard);
    },

    showEditCardForm: function(event) {

      const cardDOM = event.target.closest('.box');
      cardDOM.querySelector('.card-name').classList.add('is-hidden');
      cardDOM.querySelector('.edit-card-form').classList.remove('is-hidden');
    },

    handleEditCardForm: async function(event) {
      event.preventDefault();

      const formData = new FormData(event.target); // On instancie les données du formulaire avec FormData
      const cardTitle = event.target.previousElementSibling; // On séléctionne le titre de la carte

      try {
        const response = await fetch(`${utilModule.base_url}/cards/${formData.get('card-id')}`, {
          method: "PUT",
          body: formData
        });

        const jsonData = await response.json();
        if(!response.ok){ throw jsonData}

        cardTitle.textContent = jsonData.title;
        event.target.closest('.box').style.backgroundColor = jsonData.color;
      } catch (error) {
        console.log(error);
      }

      event.target.classList.add('is-hidden'); // On cache le formulaire
      cardTitle.classList.remove('is-hidden');
    },

    deleteCard: async function(event){
      //On veut selectionner la carte dans le DOM
      const cardDOM = event.target.closest('.box');
      const cardId = cardDOM.dataset.cardId;
      try {
        const response = await fetch(`${utilModule.base_url}/cards/${cardId}`, {
          method: "DELETE"
        });

        const jsonData = await response.json();

        if(!response.ok){ throw jsonData}
        cardDOM.remove();
      } catch (error) {
        console.log(error);
      }
    },

    handleDragCard: function(event) {

      const oldList = event.from;
      const newList = event.to;

      let cards = oldList.querySelectorAll('.box');

      cardModule.updateAllCardsWithDrag(cards);

      if(oldList === newList) { return };

      cards = newList.querySelectorAll('.box');

      const listId = newList.closest('.panel').dataset.listId;

      cardModule.updateAllCardsWithDrag(cards, listId);

    },

    updateAllCardsWithDrag: function(cards, listId = null){

      cards.forEach(async(card, index) => {
       
        const formData = new FormData();

        formData.set('position', index);
        if(listId) {
           formData.set('list_id', listId);
        }


        try {
          const response = await fetch(`${utilModule.base_url}/cards/${card.dataset.cardId}`, {
            method: 'PUT',
            body: formData
          });

          const jsonData = await response.json();
          console.log(jsonData);

          if(!response.ok) {throw jsonData};

        } catch(error) {
          alert('Impossible de déplacer la carte !');
          console.error(error);
        }
        
      });
    }
}