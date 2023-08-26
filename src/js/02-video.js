import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';

const player = new Player('vimeo-player', {});

const play = ({ seconds }) => {
  try {
    localStorage.setItem(TIME_KEY, seconds);
  } catch (err) {
    console.log(err.name);
  }
};

player.on('timeupdate', throttle(play, 1000));

player.setCurrentTime(localStorage.getItem(TIME_KEY)).then(seconds => {
  console.log(`The current time is ${seconds} seconds.`);
});
