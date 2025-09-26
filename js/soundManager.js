class SoundManager {
    constructor() {
        this.sounds = {};
        this.isMuted = false;
    };

    loadSound(name, path, loop = false) {
        this.sounds[name] = new Audio(path);
        this.sounds[name].preload = 'auto';
        
        // Setze Loop für Hintergrundmusik
        if (loop || name.includes('Background') || name.includes('background')) {
            this.sounds[name].loop = true;
        }
    };

    playSound(name, volume = 1) {
        if (this.isMuted) return;
        
        if (this.sounds[name]) {
            this.sounds[name].volume = volume;
            // Für Loop-Sounds nicht currentTime zurücksetzen
            if (!this.sounds[name].loop) {
                this.sounds[name].currentTime = 0;
            }
            this.sounds[name].play().catch(error => {
                console.log('Sound konnte nicht abgespielt werden:', error);
            });
        }
    };

    stopSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    };
    
    setMuted(muted) {
        this.isMuted = muted;
    };
};

const soundManager = new SoundManager();