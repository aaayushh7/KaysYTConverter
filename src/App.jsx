import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";


function App() {

  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value)
    console.log(youtubeID)

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': 'c68c043933mshd7ad6c05979f39fp1d264djsnc53ea1bc871f',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';
  }

  return (
    <>
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="app">

        <span className="logo">KaysYT-Converter</span>

        <section className="content">

          <h1 className="content_title">Youtube to MP3 in a click</h1>
          <p className="content_description">Hey Kay, now it's easy for your edits</p>

          <form onSubmit={handleSubmit} className="form">
            <input ref={inputUrlRef} placeholder="Paste youtube URL here..." className="form_input" type="text" />
            <button type="submit" className="button-74">Convert</button>
          </form>

          {urlResult ? <a target="_blank" rel="noreferrer" href={urlResult}><button className="button-30">Download mp3</button></a> : ''}

        </section>

      </div>
    </>
  )
}

export default App
