<template>
  <div>
    <div class="blur"></div>
    <div ref="backgroundImage" class="background_image"></div>
    <levelingBar ref="levelBar" class="levelingBar" />
    <div class="all_round">
      <div class="round pointer" @click="togglePage('todo')"></div>
      <div class="round pointer" @click="togglePage('habits')"></div>
      <div class="round pointer" @click="togglePage('timer')"></div>
      <div class="round pointer" @click="togglePage('Param')"></div>
      coucou
    </div>

    <ParamPage @change-background="updateBackgroundImage" class="Param_List" :class="{ active: pages.ParamActive }" />
    <timerPage :class="{ active: pages.timerActive }" />
    <todoPage class="ToDo_List" :class="{ active: pages.todoActive }" @add-xp="handleAddXp" />
    <habitsPage class="habits_List" :class="{ active: pages.habitsActive }" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: {
        todoActive: false,
        ParamActive: false,
        timerActive: false,
        habitsActive: false,
      },
      backgroundImage: '',
    };
  },
  created() {
    this.fetchBackgroundImage();
  },
  methods: {
    togglePage(page) {
      if (this.pages[`${page}Active`]) {
        this.pages[`${page}Active`] = false;
      } else {
        Object.keys(this.pages).forEach(key => {
          this.pages[key] = key === `${page}Active`;
        });
      }
    },

    updateBackgroundImage(base64Image) {
      this.backgroundImage = base64Image;
      localStorage.setItem('backgroundImage', base64Image);  // Sauvegarde de l'image en base64
      this.applyBackgroundImage();
    },

    applyBackgroundImage() {
      this.$nextTick(() => {
        var background = this.$refs.backgroundImage;

        if (background && this.backgroundImage) {
          background.style.backgroundImage = `url(${this.backgroundImage})`;
          background.style.backgroundSize = 'cover';
          background.style.backgroundPosition = 'center';
        }
      });
    },

    handleAddXp() {
      this.$refs.levelBar.incrementXp();
    },

    fetchBackgroundImage() {
      const savedImage = localStorage.getItem('backgroundImage');
      if (savedImage) {
        this.backgroundImage = savedImage;
        this.applyBackgroundImage();
      }
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  padding: 20px;
  min-height: 100vh;
}

.background_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.blur {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
