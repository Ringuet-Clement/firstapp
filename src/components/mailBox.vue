<template>
     <div class="mailbox-popup" v-if="visible">
          <div class="mailbox-left">
               <div v-for="(mail, index) in mails" :key="index" :class="{ selected: selectedMailIndex === index }"
                    @click="selectMail(index)">
                    <strong>{{ mail.title }}</strong><br>
                    <span>{{ mail.preview }}</span>
               </div>
          </div>
          <div class="mailbox-right">
               <div v-if="selectedMail">
                    <h3>{{ selectedMail.title }}</h3>
                    <p>{{ selectedMail.content }}</p>
               </div>
               <div v-else>
                    <p>Aucun message sélectionné</p>
               </div>
          </div>
     </div>
</template>

<script>

import mailsData from "../assets/data/mail.json"
console.log(mailsData)
export default {
     name: 'MailBox',
     props: {
          visible: Boolean
     },
     data() {
          return {
               selectedMailIndex: null,
               mails: mailsData,
          };
     },
     computed: {
          selectedMail() {
               return this.selectedMailIndex !== null
                    ? this.mails[this.selectedMailIndex]
                    : null;
          },
     },
     methods: {
          selectMail(index) {
               this.selectedMailIndex = index;
          },
     },
};
</script>

<style scoped>
.mailbox-popup {
     position: absolute;
     top: 80px;
     left: 50%;
     transform: translateX(-50%);
     width: 70%;
     height: 60%;
     background: rgba(255, 255, 255, 0.95);
     display: flex;
     border: 2px solid #333;
     border-radius: 10px;
     overflow: hidden;
     z-index: 100;
}

.mailbox-left {
     width: 30%;
     background: #f0f0f0;
     padding: 10px;
     overflow-y: auto;
     border-right: 1px solid #ccc;
}

.mailbox-right {
     width: 70%;
     padding: 20px;
     overflow-y: auto;
}

.selected {
     background-color: #d0e0ff;
}
</style>
