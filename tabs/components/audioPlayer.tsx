import React, { useState, useEffect, useRef } from 'react';
import {formatTime}  from '../utils'
import "../../style.css"

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [lyrics, setLyrics] = useState([]);
  const [time, setTime] = useState(null);
  const [currentLyric, setCurrentLyric] = useState('');

  const parseLRC = (lrcText) => {
    const lines = lrcText.split('\n');
    const lrcData = [];

    for (let line of lines) {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);

      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const milliseconds = parseInt(match[3]);
        const timestamp = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
        const text = match[4].trim();

        lrcData.push({ timestamp, text });
      }
    }

    return lrcData;
  };

  const loadLRC = (url) => {
    fetch(url)
      .then((response) => response.text())
      .then((lrcText) => {
        const parsedLyrics = parseLRC(lrcText);
        setLyrics(parsedLyrics);
      });
  };

  const displayLyrics = (currentTime) => {
    for (let i = 0; i < lyrics.length; i++) {
      if (i === lyrics.length - 1 || currentTime < lyrics[i + 1].timestamp) {
        if(lyrics[i].text.indexOf('新概念英语学习软件') < 0){
          setCurrentLyric(lyrics[i].text);
        }
        break;
      }
    }
  };

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', () => {
      const currentTime = audioRef.current.currentTime * 1000;
      // console.log('currentTime', currentTime)
      displayLyrics(currentTime);
      setTime(currentTime)
    });

    return () => {
      audioRef.current.removeEventListener('timeupdate', () => {});
    };
  }, [audioRef.current]);

  useEffect(() => {
    loadLRC('../../resources/nce/01.lrc');
  }, []);

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  return (
    <div>
      <div className='text-left mx-[20%] bg-[#ebebeb] leading-8 mb-4 p-4 rounded-[3px]'>
      {/* <span onClick={playAudio}>播放: {formatTime(time)} </span> */}
      <audio className='text-left h-5 w-[100%]' ref={audioRef} controls src="../../resources/nce/01.MP3" />
      {currentLyric}</div>
    </div>
  );
};

export default AudioPlayer;