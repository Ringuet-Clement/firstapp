<template>
     <div>
          <div class="tabs">
               <button v-for="(todos, listName) in lists" :key="listName" @click="setActiveList(listName)"
                    :class="{ 'active-tab': listName === activeList }">
                    {{ listName }}
               </button>
               <button v-if="Object.keys(lists).length < 3" @click="addList">➕</button>
          </div>
          <div v-if="activeList" class="list-content">
               <div id="checklist" v-for="(todo, index) in lists[activeList]" :key="index">
                    <input type="checkbox" :checked="todo.checked"
                         @change="toggleChecked(activeList, index, !todo.checked)" :id="'checkbox-' + index" />
                    <label :for="'checkbox-' + index">{{ todo.text }}</label>
                    <div class="pointer" @click="deleteToDo(activeList, index)"> X </div>
               </div>
          </div>

          <div v-if="activeList" class="bottom_note">
               <div class="To_Do_Title">
                    <div class="form-control">
                         <input type="text" required v-model="newToDo[activeList]" />
                    </div>
               </div>
               <button v-if="language == 'en'" @click="addToDo(activeList)">Add to active List</button>
               <button v-else @click="addToDo(activeList)"> Ajouter a la liste active</button>
               <div v-if="activeList != 'Default'">
                    <button v-if="language == 'en'" @click="deleteList(activeList)" style="width: 100%;">🗑 Delete
                         list</button>
                    <button v-else @click="deleteList(activeList)" style="width: 100%;">🗑 Supprimer la liste</button>
               </div>
          </div>
     </div>
</template>

<script>
export default {
     props: ['language'],
     data() {
          return {
               ToDoText: "",
               lists: {},
               newToDo: {},
               activeList: "Default",
          };
     },

     mounted() {
          this.fetchNotes();
     },

     methods: {
          // Fonction pour ajouter de l'XP - la logique d'XP reste la même
          addXp() {
               this.$emit('add-xp');
          },

          // Fonction pour récupérer les listes sauvegardées dans le localStorage
          fetchNotes() {
               const savedLists = localStorage.getItem('lists');
               if (savedLists) {
                    this.lists = JSON.parse(savedLists);
               }

               // Si la liste par défaut existe, on la sélectionne comme active.
               if (this.lists["Default"]) {
                    this.activeList = "Default";
               }
          },

          // Fonction pour sauvegarder les listes dans le localStorage
          saveLists() {
               localStorage.setItem('lists', JSON.stringify(this.lists));
          },

          // Ajout d'une nouvelle liste
          async addList() {
               const newListName = prompt("Nom de la nouvelle liste :");
               if (newListName && !this.lists[newListName]) {
                    // Ajouter la nouvelle liste et la sauvegarder dans le localStorage
                    this.lists[newListName] = [];
                    this.saveLists();
                    this.fetchNotes();
               } else {
                    alert("Liste invalide ou déjà existante !");
               }
          },

          // Ajout d'une nouvelle tâche dans la liste active
          async addToDo(listName) {
               const taskText = this.newToDo[listName]?.trim();
               if (taskText) {
                    if (!this.lists[listName]) {
                         this.lists[listName] = [];
                    }

                    // Ajouter la nouvelle tâche à la liste active
                    this.lists[listName].push({ text: taskText, checked: false });
                    this.newToDo[listName] = "";

                    // Sauvegarder les modifications dans le localStorage
                    this.saveLists();
               } else {
                    alert("Veuillez entrer du texte pour la note.");
               }
          },

          // Changer l'état de la case à cocher
          async toggleChecked(listName, index, checked) {
               this.lists[listName][index].checked = checked;
               this.saveLists();
          },

          // Supprimer une tâche de la liste active
          async deleteToDo(listName, index) {
               if (this.lists[listName][index].checked) {
                    this.addXp();
               }

               // Supprimer la tâche et sauvegarder les modifications
               this.lists[listName].splice(index, 1);
               this.saveLists();
          },

          // Définir la liste active
          setActiveList(listName) {
               this.activeList = listName;
          },

          // Supprimer une liste complète
          async deleteList(listName) {
               if (confirm(`Supprimer la liste "${listName}" ?`)) {
                    // Supprimer la liste et sauvegarder les modifications
                    delete this.lists[listName];
                    this.saveLists();

                    if (this.activeList === listName) {
                         this.activeList = null;
                    }
               }
          },
     },
};
</script>