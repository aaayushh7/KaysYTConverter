import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";

function App() {

  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState();
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [isError, setIsError] = useState(false); // New state for error
  const [isEmpty, setIsEmpty] = useState(false); // New state for empty input

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true); // Set loading to true when the form is submitted
    setIsError(false); // Reset error state
    setIsEmpty(false); // Reset empty state
    const inputValue = inputUrlRef.current.value;
    if (!inputValue) {
      setIsEmpty(true); // Set empty state if input is empty
      setIsLoading(false); // Set loading to false
      return;
    }
    const youtubeID = youtube_parser(inputValue)
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
      .then(res => {
        if (res.data.link) {
          setUrlResult(res.data.link);
        } else {
          setIsError(true); // Set error state if result is empty
        }
        setIsLoading(false); // Set loading to false when the result is received
      })
      .catch(err => {
        console.log(err);
        setIsError(true); // Set error state if there is an error
        setIsLoading(false); // Set loading to false even if there is an error
      })

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
      </div>

      <div className="app">

        <span className="logo">KaysYT-Converter</span>

        <section className="content">

          <h1 className="content_title">Youtube to MP3 in a click</h1>
          <p className="content_description">Hey Kay, now it's easy for your edits</p>

          <form onSubmit={handleSubmit} className="form">
            <input ref={inputUrlRef} placeholder="Paste youtube URL here..." className="form_input" type="text" />
            <button type="submit" className="button-74">{isLoading ? 'Loading...' : 'Convert'}</button>
          </form>

          {urlResult ? <a target="_blank" rel="noreferrer" href={urlResult}><button className="button-30">Download mp3</button></a> : ''}
          {isError && <p>Oops! sorry an error ate me. Give me another shot!🥺</p>} 
          {isEmpty && <p>Please enter a YouTube URL.</p>} 

        </section>

      </div>
    </>
  )
}

export default App
