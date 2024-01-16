import { useEffect, useState } from "react"
import './index.less'
import {formatNumber} from './utils'
import AudioPlayer from './components/audioPlayer.tsx'

function DeltaFlyerPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
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
        const jsonData = await response.json()

        const index = Math.floor(Math.random() * 657);

        console.log('index', index)
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


  return (
    <div
      className="page"
      >
        <div className="title">
        <p>{`${hours}:${minutes}:${seconds}`}</p></div>
        <div className="search">
          <input className="" 
          onChange={handleChange}
          onKeyDown={handleKeyDown} ></input>
        </div>
        <div className="line">
          <div className="span">
          new concept: 
          Book II Lesson {data[0].lesson} - {data[0].order}
          <span className="link" onClick={handleGoDetail}> ☞ </span>
          </div>
        </div>

        <AudioPlayer></AudioPlayer>
        <div className="sentence">
        {data.map((item, index) => (
          <div className="item" key={index}><code>{item.text}</code></div>
        ))}
        </div>
        <div className="copyright">By: grey1896</div>
    </div>
  )
}

export default DeltaFlyerPage
