class SoundManager {
    constructor() {
        this.sounds = {};
        this.isMuted = this.loadMuteState();
    };


    loadMuteState() {
        return localStorage.getItem('gameIsMuted') === 'true';
    };


    saveMuteState() {
        localStorage.setItem('gameIsMuted', this.isMuted.toString());
    };


    loadSound(name, path, loop = false) {
        this.sounds[name] = new Audio(path);
        this.sounds[name].preload = 'auto';
        if (this.shouldLoop(name, loop)) {
            this.sounds[name].loop = true;
        }
    };


    shouldLoop(name, loop) {
        return loop || 
               name.includes('Background') || 
               name.includes('background') || 
               name.includes('footSteps');
    };


    playSound(name, volume = 1) {
        if (this.isMuted || !this.sounds[name]) return;
        
        const audio = this.sounds[name];
        audio.volume = volume;
        
        if (audio.loop) {
            this.playLoopSound(audio, name);
        } else {
            this.playOneShotSound(audio);
        }
    };


    playLoopSound(audio, name) {
        if (!this.isPlaying(name)) {
            audio.play().catch(error => 
                console.log('Sound konnte nicht abgespielt werden:', error)
            );
        }
    };


    playOneShotSound(audio) {
        audio.currentTime = 0;
        audio.play().catch(error => 
            console.log('Sound konnte nicht abgespielt werden:', error)
        );
    };


    isPlaying(name) {
        const audio = this.sounds[name];
        return !!audio && !audio.paused;
    };


    stopSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    };

    
    setMuted(muted) {
        this.isMuted = muted;
        this.saveMuteState();
    };


    toggleMute() {
        this.isMuted = !this.isMuted;
        this.saveMuteState();
        this.updateAllSounds();
    };


    updateAllSounds() {
        Object.keys(this.sounds).forEach(name => {
            if (this.isMuted) {
                this.pauseIfPlaying(name);
            } else {
                this.resumeIfLoop(name);
            }
        });
    };


    pauseIfPlaying(name) {
        if (this.isPlaying(name)) {
            this.sounds[name].pause();
        }
    };
    

    resumeIfLoop(name) {
        const sound = this.sounds[name];
        if (sound.loop && sound.currentTime > 0) {
            sound.play().catch(error => 
                console.log('Sound konnte nicht fortgesetzt werden:', error)
            );
        }
    };
}

const soundManager = new SoundManager();