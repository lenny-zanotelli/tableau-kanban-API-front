const listModule = require('./lists');
const utilModule = require('./utils');
const cardModule = require('./cards');
const tagModule = require('./tags');



const app = {

  // fonction d'initialisation, lancée au chargement de la page
  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
    app.getListsFromAPI();
  },

  addListenerToActions: function() {

    // Event sur le bouton "Ajouter une liste"
    const addListButton = document.getElementById('addListButton');
    addListButton.addEventListener('click', listModule.showAddListModal);

    // Event sur les boutons "Fermer les modales"
    const closeModalButtons = document.querySelectorAll('.close');
    for(const button of closeModalButtons){
      button.addEventListener('click', utilModule.hideModals);
    }

    // Event sur le formulaire "Ajouter une liste"
    const addListForm = document.querySelector('#addListModal form');
    addListForm.addEventListener('submit', listModule.handleAddListForm);

    // Event sur le formulaire "Ajouter une carte"
    const addCardForm = document.querySelector('#addCardModal form');
    addCardForm.addEventListener('submit', cardModule.handleAddCardForm);

    // Event sur le formulaire d'association d'un tag sur une card
    const addTagToCardForm = document.querySelector('#addTagToCardModal form');
    addTagToCardForm.addEventListener('submit', tagModule.handleAddTagToCardForm);

  },

  getListsFromAPI: async function() {

    try {
      const response = await fetch(`${utilModule.base_url}/lists`);
      const jsonData = await response.json();
      if(!response.ok){ throw jsonData}
    
      for (const list of jsonData) {
        listModule.makeListInDOM(list);
        for (const card of list.cards) {
          cardModule.makeCardInDOM(card);
          for(const tag of card.tags) {
            tagModule.makeTagInDOM(tag);
          }
        }
      }

      const listContainer = document.querySelector('.card-lists');

      new Sortable(listContainer, {
        draggable: ".panel",
        animation: 150,
        onEnd: listModule.handleDragList
      });

    } catch (error) {
      console.log(error);
    }
  }

};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );