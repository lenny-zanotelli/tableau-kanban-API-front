const cardModule = require("./cards");
const utilModule = require("./utils");


const listModule = {
    showAddListModal: function() {
        const modal = document.getElementById("addListModal");
        modal.classList.add('is-active');
    },

    handleAddListForm: async function(event) {

        event.preventDefault();
        const formData = new FormData(event.target); //event.target ici désigne la cible de l'évenement, c'est le form
        try {
          const response = await fetch(`${utilModule.base_url}/lists`, {
            method: "POST",
            body: formData
          })
          const jsonData = await response.json();
          if(!response.ok) { throw new Error("Une erreur fatale est survenue : impossible de créer la liste")}
          listModule.makeListInDOM(jsonData);
        } catch (error) {
          console.log(error);
        }
        utilModule.hideModals();
        event.target.reset(); // ici le reset sert à remettre à zéro les inputs du formulaire
    },

    showEditListForm: function(event) {

      // Correction Prof
      event.target.classList.add('is-hidden');
      event.target.nextElementSibling.classList.remove('is-hidden');

    },

    handleEditTitleListForm: async function(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const h2 = event.target.previousElementSibling;

      const listId = formData.get('list-id');
      console.log(listId);
      try {
      const response = await fetch(`${utilModule.base_url}/lists/${listId}`, {
        method: 'PUT',
        body: formData,
        });
      
        const jsonData = await response.json();
        if(!response.ok) { throw jsonData }
        
        h2.textContent = jsonData.name;   

      }catch(error){
        console.log(error);
      }
      event.target.classList.add('is-hidden');
      h2.classList.remove('is-hidden');
      event.target.reset(); // ici le reset sert à remettre à zéro les inputs du formulaire

    },

    makeListInDOM: function(list) {

        const template = document.getElementById('list-template');
        const newList = document.importNode(template.content, true);
        newList.querySelector('h2').textContent = list.name;
        newList.querySelector('.panel').dataset.listId = list.id;
        // console.log(newList.querySelector('.panel').dataset);
        newList.querySelector("form input[name='list-id']").value = list.id;
        newList.querySelector(".button--add-card").addEventListener('click', cardModule.showAddCardModal);
        newList.querySelector('h2').addEventListener("dblclick", listModule.showEditListForm)
        newList.querySelector('.edit-list-form').addEventListener("submit", listModule.handleEditListForm);
        newList.querySelector('.button--delete-list').addEventListener('click', listModule.deleteList);

        const cardContainer = newList.querySelector(".panel-block");
        new Sortable(cardContainer, {
          group: "lists",
          draggable: ".box",
          animation: 150,
          onEnd: cardModule.handleDragCard,
        })

        const listsContainer = document.querySelector('#lists-container');
        const firstList = listsContainer.querySelector(".panel");
        if(firstList){
          firstList.before(newList);
        } else {
          listsContainer.appendChild(newList);
        }
      },

      showEditListForm: function(event) {
        event.target.classList.add("is-hidden"); // Je cache mon titre
        event.target.nextElementSibling.classList.remove("is-hidden"); // J'affiche mon formulaire
      },

      handleEditListForm: async function(event){
        event.preventDefault(); // On empêche le comportement par défaut (ici le refresh de la page après le submit du formulaire)
        const formData = new FormData(event.target); // On extrait les données du form grâce à la classe FormData
        const h2 = event.target.previousElementSibling; // On sélectionne le titre h2 de la liste
        const listId = formData.get('list-id');
        try {
          const response = await fetch(`${utilModule.base_url}/lists/${listId}`, {
            method: "PUT",
            body: formData
          });

          const jsonData = await response.json();

          if(!response.ok){ throw jsonData }

          h2.textContent = jsonData.name;
        } catch (error) {
          console.log(error);
        }

        event.target.classList.add('is-hidden'); //Cache le formulaire
        h2.classList.remove('is-hidden'); // Affiche le titre

      },

      deleteList: async function (event) {
        if(!confirm("Voulez-vous vraiment supprimer cette liste ?")){ return };
        
        const listDOM = event.target.closest('.panel');
        const listId = listDOM.dataset.listId;

        try {
          const response = await fetch(`${utilModule.base_url}/lists/${listId}`, {
            method: "DELETE"
          });

          const jsonData = await response.json(); // On extrait les infos dans le body de la response
          if(!response.ok){throw jsonData}

          listDOM.remove();

        } catch (error) {
          console.log(error);
        }
        
      },

      handleDragList: function() {
        // On veut récup les listes dans le DOM
        const lists = document.querySelectorAll('.panel');

        lists.forEach(async(list, index) => {
          const formData = new FormData();
          formData.set('position', index);
          try {
            const response = await fetch(`${utilModule.base_url}/lists/${list.dataset.listId}`, {
              method: 'PUT',
              body: formData
            });
            const jsonData = await response.json();
            if(!response.ok) { throw jsonData }
            console.log(jsonData);
          } catch (error) {
            console.log(error);
          }
        });

      }

}

module.exports = listModule;