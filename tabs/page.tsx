import { useEffect, useState } from "react"
import './index.less'
// import {formatNumber} from './utils'
// import AudioPlayer from './components/audioPlayer.tsx'

const  formatNumber = (num) => {
  if (num < 10) {
    return "00" + num;
  } else if (num < 100) {
    return "0" + num;
  } else {
    return num.toString();
  }
}

const formatTime = (timestamp) => {
const date = new Date(timestamp); // 将时间戳转换为毫秒
const hours = date.getUTCHours().toString().padStart(2, '0'); // 小时
const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // 分钟
const seconds = date.getUTCSeconds().toString().padStart(2, '0'); // 秒钟
return `${hours}:${minutes}:${seconds}`;
}


function DeltaFlyerPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [wordList, setWordList] = useState([])
  
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 在组件卸载时清除定时器
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../resources/lesson.json")
        const word = await fetch("../resources/word.json")
        const wordJson = await word.json()
        setWordList(wordJson)

        const jsonData = await response.json()
        const index = Math.floor(Math.random() * 657);
        
        setData([jsonData[index],jsonData[index+1], jsonData[index+2]])
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 处理回车键触发的逻辑
      // const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(inputValue)}`;
      const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(inputValue)}`;
      window.location.href = searchUrl;
      // 可以在这里调用处理逻辑的函数或提交表单等操作
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGoDetail = () => {
    const lessonRecourse = formatNumber(data[0].lesson)
    window.open(`http://www.newconceptenglish.com/index.php?id=course-2-${lessonRecourse}`, '_blank');
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  function renderWithSpan(text) {
    const wordsToWrap = wordList.map(item=>item.key)

    const regex = /(\w+)([^\w]*)/g;
    const renderedText = [];
  
    let match;
    while ((match = regex.exec(text)) !== null) {
      const word = match[1];
      const punctuation = match[2];
  
      if (wordsToWrap.includes(word)) {
        renderedText.push(<span className="code" key={renderedText.length}>{word}</span>);
      } else {
        renderedText.push(word);
      }
  
      renderedText.push(punctuation);
    }
  
    return <>{renderedText}</>;
  }


  return (
    <div className="page">
        <div className="title">
        <p>{`${hours}:${minutes}:${seconds}`}</p></div>
        <div className="search">
          <input className="" 
          onChange={handleChange}
          onKeyDown={handleKeyDown} ></input>
        </div>
        <div className="line">
          <div className="span">
          NCE : 
          Book II Lesson {data[0].lesson} - {data[0].order}
          <span className="link" onClick={handleGoDetail}> ☞ </span>
          </div>
        </div>
        {/* <AudioPlayer /> */}
        <div className="sentence">
        {data.map((item, index) => (
          <div className="item" key={index}>{renderWithSpan(item.text)}</div>
        ))}
        </div>
        <div className="copyright">By: grey1896</div>
    </div>
  )
}

export default DeltaFlyerPage
