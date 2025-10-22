class SoundManager {
    constructor() {
        this.sounds = {};
        // Mute-Status aus LocalStorage laden, Standard: false
        this.isMuted = localStorage.getItem('gameIsMuted') === 'true';
    }

    loadSound(name, path, loop = false) {
        this.sounds[name] = new Audio(path);
        this.sounds[name].preload = 'auto';
        if (loop || name.includes('Background') || name.includes('background') || name.includes('footSteps')) {
            this.sounds[name].loop = true;
        }
    }

    playSound(name, volume = 1) {
        if (this.isMuted) return;
        
        if (this.sounds[name]) {
            const audio = this.sounds[name];
            audio.volume = volume;
            if (!audio.loop) {
                audio.currentTime = 0;
            } else {
                if (!this.isPlaying(name)) {
                    audio.play().catch(error => console.log('Sound konnte nicht abgespielt werden:', error));
                }
                return;
            }
            audio.play().catch(error => {
                console.log('Sound konnte nicht abgespielt werden:', error);
            });
        }
    }

    isPlaying(name) {
        const a = this.sounds[name];
        return !!a && !a.paused;
    }

    stopSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    }
    
    setMuted(muted) {
        this.isMuted = muted;
        localStorage.setItem('gameIsMuted', muted.toString());
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('gameIsMuted', this.isMuted.toString());
        
        Object.keys(this.sounds).forEach(name => {
            if (this.isMuted) {
                if (this.isPlaying(name)) {
                    this.sounds[name].pause();
                }
            } else {
                if (this.sounds[name].loop && this.sounds[name].currentTime > 0) {
                    this.sounds[name].play().catch(error => 
                        console.log('Sound konnte nicht fortgesetzt werden:', error)
                    );
                }
            }
        });
    }
}

const soundManager = new SoundManager();