class SoundManager {
    constructor() {
        this.sounds = {};
        this.isMuted = false;
    };

    loadSound(name, path, loop = false) {
        this.sounds[name] = new Audio(path);
        this.sounds[name].preload = 'auto';
        if (loop || name.includes('Background') || name.includes('background') || name.includes('footSteps')) {
            this.sounds[name].loop = true;
        }
    };

    playSound(name, volume = 1) {
        if (this.isMuted) return;
        
        if (this.sounds[name]) {
            const audio = this.sounds[name];
            audio.volume = volume;
            if (!audio.loop) {
                audio.currentTime = 0;
            } else {
                // Loop-Sound nur starten, wenn er noch nicht läuft
                if (!this.isPlaying(name)) {
                    audio.play().catch(error => console.log('Sound konnte nicht abgespielt werden:', error));
                }
                return;
            }
            audio.play().catch(error => {
                console.log('Sound konnte nicht abgespielt werden:', error);
            });
        }
    };


    isPlaying(name) {
        const a = this.sounds[name];
        return !!a && !a.paused;
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