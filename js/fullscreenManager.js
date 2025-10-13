class FullscreenManager {
    constructor() {
        this.fullscreenDiv = document.getElementById('fullScreen');
        this.isFullscreen = false;
        this.setupEventListeners();
    };


    enterFullscreen() {
        if (this.fullscreenDiv.requestFullscreen) {
            this.fullscreenDiv.requestFullscreen();
        } else if (this.fullscreenDiv.webkitRequestFullscreen) { // Safari
            this.fullscreenDiv.webkitRequestFullscreen();
        } else if (this.fullscreenDiv.msRequestFullscreen) { // IE/Edge
            this.fullscreenDiv.msRequestFullscreen();
        } else if (this.fullscreenDiv.mozRequestFullScreen) { // Firefox
            this.fullscreenDiv.mozRequestFullScreen();
        }
    };


    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        }
    };


    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    };


    setupEventListeners() {
        document.addEventListener('fullscreenchange', () => {
            this.isFullscreen = !!document.fullscreenElement;
            this.handleFullscreenChange();
        });

        document.addEventListener('webkitfullscreenchange', () => {
            this.isFullscreen = !!document.webkitFullscreenElement;
            this.handleFullscreenChange();
        });

        document.addEventListener('msfullscreenchange', () => {
            this.isFullscreen = !!document.msFullscreenElement;
            this.handleFullscreenChange();
        });

        document.addEventListener('mozfullscreenchange', () => {
            this.isFullscreen = !!document.mozFullScreenElement;
            this.handleFullscreenChange();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isFullscreen) {
                this.exitFullscreen();
            }
        });
    }

    // Wird ausgeführt wenn sich der Vollbildstatus ändert
    handleFullscreenChange() {
        const canvas = document.getElementById('canvas');
        
        if (this.isFullscreen) {
            // Vollbild-Styling anwenden
            this.fullscreenDiv.style.width = '100vw';
            this.fullscreenDiv.style.height = '100vh';
            this.fullscreenDiv.style.display = 'flex';
            this.fullscreenDiv.style.justifyContent = 'center';
            this.fullscreenDiv.style.alignItems = 'center';
            this.fullscreenDiv.style.backgroundColor = 'black';
            
            // Canvas skalieren
            this.scaleCanvasToFit(canvas);
        } else {
            // Normales Styling wiederherstellen
            this.fullscreenDiv.style.width = '';
            this.fullscreenDiv.style.height = '';
            this.fullscreenDiv.style.display = '';
            this.fullscreenDiv.style.justifyContent = '';
            this.fullscreenDiv.style.alignItems = '';
            this.fullscreenDiv.style.backgroundColor = '';
            
            // Canvas auf normale Größe zurücksetzen
            canvas.style.width = '';
            canvas.style.height = '';
        }
    }

    // Canvas proportional skalieren
    scaleCanvasToFit(canvas) {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const canvasAspect = 1280 / 720;
        const screenAspect = screenWidth / screenHeight;

        if (screenAspect > canvasAspect) {
            // Bildschirm ist breiter - an Höhe anpassen
            canvas.style.height = '100vh';
            canvas.style.width = 'auto';
        } else {
            // Bildschirm ist höher - an Breite anpassen
            canvas.style.width = '100vw';
            canvas.style.height = 'auto';
        }
    }

    // Getter für Vollbildstatus
    getIsFullscreen() {
        return this.isFullscreen;
    }
}

// Globale Instanz erstellen
const fullscreenManager = new FullscreenManager();