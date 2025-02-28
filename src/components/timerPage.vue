<template>
     <div class="timer">
          <div v-if="!isRunning" class="setup_timer">
               <div>
                    <input type="number" v-model.number="workTime" min="1" max="60"> minute session
               </div>
               <div>
                    <input type="number" v-model.number="pauseTime" min="1" max="60"> minute pause
               </div>
               <div class="loop_timer">
                    <button @click="decrease">-</button>
                    <div v-for="n in loopNumber" :key="n" class="circle_session"></div>
                    <button @click="increase">+</button>
               </div>
               <div>
                    <button @click="startSession" :disabled="isRunning">Start</button>
               </div>
          </div>
          <div v-else class="setup_timer">
               <h3>{{ isWork ? 'Work' : 'Pause' }} Time: {{ formattedTime }}</h3>
               <h4>Loop: {{ currentLoop }} / {{ loopNumber }}</h4>
          </div>
     </div>
</template>

<script>
export default {
     props: ['language'],
     data() {
          return {
               workTime: 1,
               pauseTime: 1,
               loopNumber: 1,
               currentLoop: 0,
               currentTime: 0,
               isRunning: false,
               isWork: true,
               intervalId: null,
          };
     },
     computed: {
          formattedTime() {
               const minutes = Math.floor(this.currentTime / 60).toString().padStart(2, '0');
               const seconds = (this.currentTime % 60).toString().padStart(2, '0');
               return `${minutes}:${seconds}`;
          }
     },
     methods: {
          decrease() {
               if (this.loopNumber > 1) {
                    this.loopNumber -= 1;
               }
          },
          increase() {
               if (this.loopNumber < 5) {
                    this.loopNumber += 1;
               }
          },
          startSession() {
               if (this.isRunning) return;
               this.isRunning = true;
               this.currentLoop = 1;
               this.isWork = true;
               this.currentTime = this.workTime * 60;
               this.runTimer();
          },
          runTimer() {
               this.intervalId = setInterval(() => {
                    if (this.currentTime > 0) {
                         this.currentTime--;
                    } else {
                         if (this.isWork) {
                              this.isWork = false;
                              this.currentTime = this.pauseTime * 60;
                         } else {
                              this.isWork = true;
                              this.currentLoop++;
                              if (this.currentLoop > this.loopNumber) {
                                   this.stopSession();
                                   return;
                              }
                              this.currentTime = this.workTime * 60;
                         }
                    }
               }, 1000);
          },
          stopSession() {
               clearInterval(this.intervalId);
               this.isRunning = false;
               this.currentTime = 0;
               this.currentLoop = 0;
          }
     }
};
</script>