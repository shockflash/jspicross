
/**
 * Sound didn't work as it should. I keeped the sound class, possible that I
 * find a solution.
 */
var Sound = function(sound, play) {
    this.init = function() {
    }

    /* seems not to work :/ when used no sound is played any longer */
    this.preload = function(songs) {
    }


    this.init();
}


/*
var Sound = function(sound, play) {
    this.sound = sound;

    this.init = function() {
        if (!this.sound)
          return;

        if (!Sound.audio[this.sound])
          this.load(this.sound);

        if (play == false)
          return;

        song = Sound.audio[this.sound];
        if (!song.paused)
          song.currentTime = 0;
        else
          song.play();
    }

    // seems not to work :/ when used no sound is played any longer
    this.preload = function(songs) {
        for (var i = 0; i <= songs.length-1; i++)
        {
            new Sound(songs[i], false);
        }
    }

    this.load = function(sound) {
        song = new Audio();
        song.src = 'sounds/wav/' + this.sound + '.wav';
        song.autobuffer = true;
        song.autoplay = false;
        song.load();

        Sound.audio[sound] = song;
    }

    this.init();
}

Sound.audio = {};
*/