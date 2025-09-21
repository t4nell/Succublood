class SoundManager {
    constructor() {
        this.sounds = {};
        this.isMuted = false;
    };


    loadSound(name, path) {
        this.sounds[name] = new Audio(path);
        this.sounds[name].preload = 'auto';
    };


    playSound(name, volume = 1) {
        if (this.isMuted) return;
        
        if (this.sounds[name]) {
            this.sounds[name].volume = volume;
            this.sounds[name].currentTime = 0;
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

// Globale SoundManager-Instanz
const soundManager = new SoundManager();