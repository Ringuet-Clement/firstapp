import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

/////////////////////////////////////Style//////////////////////////////////////////

import "./assets/styles/main.css";

///////////////////////////////////// Components Import //////////////////////////////////////////

import ParamPage from './components/paramPage.vue';
import levelingBar from './components/levelingBar.vue';
import timerPage from './components/timerPage.vue';
import todoPage from './components/todoPage.vue';
import habitsPage from './components/habitsPage.vue';

///////////////////////////////////// Components Compose //////////////////////////////////////////

app.component("ParamPage", ParamPage)
app.component("levelingBar", levelingBar)
app.component("timerPage", timerPage)
app.component("todoPage", todoPage)
app.component("habitsPage", habitsPage)

///////////////////////////////////// Mount App //////////////////////////////////////////

app.mount("#app");
