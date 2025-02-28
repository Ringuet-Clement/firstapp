<template>
     <div>
          <svg id="xp-bar" width="284" height="60" viewBox="0 0 278 60" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g id="Group 1">
                    <rect id="Back_exp" x="8" y="12" width="270" height="35" rx="10" fill="url(#paint0_linear_2_3)" />
                    <rect id="Actual_exp" x="40" y="12" :width="xpProgress" height="35" rx="10"
                         fill="url(#paint1_linear_2_3)" class="xp-progress" />
                    <circle id="Leveling_number" cx="30" cy="30" r="30" fill="url(#paint2_radial_2_3)" />
                    <text x="30" y="34" font-size="16" text-anchor="middle" fill="#fff" font-weight="bold">
                         {{ level }}
                    </text>
               </g>
               <defs>
                    <linearGradient id="paint0_linear_2_3" x1="8" y1="29.5" x2="278" y2="29.5"
                         gradientUnits="userSpaceOnUse">
                         <stop stop-color="#2c2c2c" />
                         <stop offset="1" stop-color="#000000" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_2_3" :x1="8" y1="29.5" y2="29.5" gradientUnits="userSpaceOnUse">
                         <stop stop-color="#4B0082" :offset="gradientOffset1" />
                         <stop offset="0.524" stop-color="#8A2BE2" />
                         <stop offset="1" stop-color="#2E0854" />
                    </linearGradient>
                    <radialGradient id="paint2_radial_2_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                         gradientTransform="translate(30 30) rotate(90) scale(30)">
                         <stop stop-color="#4B0082" />
                         <stop offset="0.504" stop-color="#8A2BE2" />
                         <stop offset="1" stop-color="#2E0854" />
                    </radialGradient>
               </defs>
          </svg>
     </div>
</template>

<script>
export default {
     data() {
          return {
               xpProgress: 0,
               level: 1,
          };
     },
     computed: {
          gradientOffset1() {
               return (this.xpProgress / 270) * 0.524;
          }
     },
     methods: {
          // Fonction pour charger les données de progression depuis localStorage
          loadLevelData() {
               const savedData = localStorage.getItem('levelData');
               if (savedData) {
                    const levelData = JSON.parse(savedData);
                    this.level = levelData.level;
                    this.xpProgress = levelData.progression;
               }
          },

          // Fonction pour sauvegarder les données dans localStorage
          saveLevelData() {
               const levelData = {
                    level: this.level,
                    progression: this.xpProgress,
               };
               localStorage.setItem('levelData', JSON.stringify(levelData));
          },

          // Fonction pour simuler l'ajout d'XP
          incrementXp() {
               this.xpProgress += 24;
               if (this.xpProgress >= 250) {
                    this.levelUp();
               }
               this.saveLevelData();
          },

          // Fonction pour gérer la montée de niveau
          levelUp() {
               this.level += 1;
               this.xpProgress = 0; // Repartir à zéro quand on monte de niveau
               this.saveLevelData();
          }
     },
     mounted() {
          // Charger les données depuis localStorage lors du montage du composant
          this.loadLevelData();
     }
};
</script>

<style scoped>
.xp-progress {
     transition: width 0.3s ease-in-out, fill 0.3s ease-in-out;
}
</style>