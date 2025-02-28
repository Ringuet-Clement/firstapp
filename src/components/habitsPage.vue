<template>
     <div>
          <h2>{{ language === 'en' ? 'My habits' : 'Mes habitudes' }}</h2>

          <div class="habit-grid">
               <div v-if="language == 'en'"> Habits </div>
               <div v-else> Routines </div>
               <div class="day" v-for="(day, index) in currentDays" :key="index">{{ day }}</div>

               <div class="day"></div>

               <template v-for="(habit, index) in habits" :key="index">
                    <input type="text" v-if="language == 'en'" v-model="habit.title" @input="updateHabit(index)"
                         placeholder="New habit" />
                    <input type="text" v-else v-model="habit.title" @input="updateHabit(index)"
                         placeholder="Nouvelle routine" />
                    <input type="checkbox" v-model="habit.days.monday" @change="updateHabit(index)" />
                    <input type="checkbox" v-model="habit.days.tuesday" @change="updateHabit(index)" />
                    <input type="checkbox" v-model="habit.days.wednesday" @change="updateHabit(index)" />
                    <input type="checkbox" v-model="habit.days.thursday" @change="updateHabit(index)" />
                    <input type="checkbox" v-model="habit.days.friday" @change="updateHabit(index)" />
                    <input type="checkbox" v-model="habit.days.saturday" @change="updateHabit(index)" />
                    <input type="checkbox" v-model="habit.days.sunday" @change="updateHabit(index)" />
                    <div class="pointer" @click="removeHabit(index)"> X </div>
               </template>
          </div>

          <div class="Add_new_habit" v-if="language == 'en'" @click="Addnewhabit">
               <div v-if="habits.length < 4"> + Add new habit </div>
               <div v-else>You cannot add more habits.</div>
          </div>
          <div class="Add_new_habit" v-else @click="Addnewhabit">
               <div v-if="habits.length < 4"> + nouvelle routine </div>
               <div v-else>Vous ne pouvez pas ajouter de nouvelle routine.</div>
          </div>
     </div>
</template>

<script>
export default {
     props: ['language'],
     data() {
          return {
               habits: [],
               daysEn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
               daysFr: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          };
     },
     computed: {
          currentDays() {
               return this.language === 'en' ? this.daysEn : this.daysFr;
          }
     },
     created() {
          this.loadHabits();
     },
     methods: {
          loadHabits() {
               const savedHabits = localStorage.getItem('habits');
               if (savedHabits) {
                    this.habits = JSON.parse(savedHabits);
               }
          },

          saveHabits() {
               localStorage.setItem('habits', JSON.stringify(this.habits));
          },

          // Ajouter une nouvelle habitude
          Addnewhabit() {
               if (this.habits.length >= 4) {
                    return;
               }

               const newHabit = {
                    title: "",
                    days: {
                         monday: false,
                         tuesday: false,
                         wednesday: false,
                         thursday: false,
                         friday: false,
                         saturday: false,
                         sunday: false
                    }
               };
               this.habits.push(newHabit);
               this.saveHabits();
          },

          updateHabit() {
               this.saveHabits();
          },

          // Supprimer une habitude
          removeHabit(index) {
               this.habits.splice(index, 1);
               this.saveHabits();
          }
     }
};
</script>