const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

let win;

function createWindow() {
     win = new BrowserWindow({
          width: 1024,
          height: 570,
          webPreferences: {
               nodeIntegration: false, // Désactive nodeIntegration pour la sécurité
               contextIsolation: true, // Active la séparation des contextes
               preload: path.join(__dirname, 'preload.js') // Charge le fichier preload
          }
     });

     win.loadURL('http://localhost:8081');  // Assure-toi que Vue est servi sur ce port
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') {
          app.quit();
     }
});

// Gestion de la sauvegarde de fichier
ipcMain.handle('save-file', async (event, content) => {
     const result = await dialog.showSaveDialog(win, {
          filters: [
               { name: 'Text Files', extensions: ['txt'] }
          ]
     });

     if (!result.canceled && result.filePath) {
          fs.writeFileSync(result.filePath, content);
          return `Phrase sauvegardée dans ${result.filePath}`;
     }
     return 'Sauvegarde annulée';
});

// Gestion du chargement de fichier
ipcMain.handle('load-file', async () => {
     const result = await dialog.showOpenDialog(win, {
          filters: [
               { name: 'Text Files', extensions: ['txt'] }
          ]
     });

     if (!result.canceled && result.filePaths.length > 0) {
          const content = fs.readFileSync(result.filePaths[0], 'utf-8');
          return content;
     }
     return 'Chargement annulé';
});
