<template>
     <div>
          <div class="Background_settings">
               <div class="messageBox">
                    <div class="fileUploadWrapper">
                         <label for="file">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                                   <circle stroke-width="20" stroke="#6c6c6c" fill="none" r="158.5" cy="168.5"
                                        cx="168.5"></circle>
                                   <path stroke-linecap="round" stroke-width="25" stroke="#6c6c6c" d="M167.759 79V259">
                                   </path>
                                   <path stroke-linecap="round" stroke-width="25" stroke="#6c6c6c" d="M79 167.138H259">
                                   </path>
                              </svg>
                              <span class="tooltip">Add an image</span>
                         </label>
                         <input type="file" id="file" name="file" @change="onFileChange" />
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
export default {
     data() {
          return {
               imageUrl: null,
          };
     },
     methods: {
          onFileChange(event) {
               const file = event.target.files[0];
               if (file) {
                    this.convertToBase64(file);
               }
          },
          convertToBase64(file) {
               const reader = new FileReader();
               reader.onloadend = () => {
                    const base64Image = reader.result;
                    this.$emit('change-background', base64Image);
               };
               reader.readAsDataURL(file);
          },
     },
};
</script>

<style scoped>
.Background_settings {
     margin: 20px;
}

.fileUploadWrapper {
     display: flex;
     justify-content: center;
}

input[type="file"] {
     margin-top: 10px;
}
</style>