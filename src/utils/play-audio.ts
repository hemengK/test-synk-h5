const audioPlayer = document.createElement('audio'),
  mp3Source = document.createElement('source'),
  soundMp3Link =
    'https://abi-static-resource.oss-cn-shanghai.aliyuncs.com/ipeople/bonus/14131.mp3';
mp3Source.setAttribute('src', soundMp3Link);

audioPlayer.setAttribute('preload', 'true');
audioPlayer.setAttribute('id', 'bonus-audio');
mp3Source.setAttribute('type', 'audio/mpeg');
audioPlayer.appendChild(mp3Source);
document.body.appendChild(audioPlayer);
audioPlayer.load();

export const playBonusAudio = () => {
  audioPlayer.play();
};
