import axios from 'axios'
import { useState } from 'react'

function App() {
  const apiAddress = 'https://api.thecatapi.com/v1/images/search'
  const [imageUrl, setImageUrl] = useState(null)
  const [imageWidth, setImageWidth] = useState(null)
  const [imageHeight, setImageHeight] = useState(null)
  const [open, setOpen] = useState(false)
  
  function handleClick() {
    axios.get(apiAddress)
    .then((res) => {
      setImageUrl(res.data[0].url)
      setImageWidth(res.data[0].width)
      setImageHeight(res.data[0].height)
    })
    .catch((err) => console.log(err))
  }

  return (
    <div style={{position:'relative'}}>
      <h2 style={{textAlign:'center', marginTop:'3vh', marginBottom:'1vh'}}>랜덤 고양이 이미지 생성기</h2>
      <p style={{fontSize:'0.8rem', textAlign:'center', marginTop:0, marginBottom:'3px'}}>버튼을 누르면 랜덤한 고양이 이미지를 볼 수 있어요</p>
      <p style={{fontSize:'0.8rem', textAlign:'center', marginTop:0}}>디바이스에 따라 이미지가 깨져보일 수도 있어요</p>
      <p style={{textAlign:'center'}}><span onClick={handleClick} style={{cursor:'pointer'}}>🐈</span> ← 고양이를 눌러봐요</p>
      <div 
        style={{
          width:'90vw', height: '70vh', 
          margin:'auto', overflow:'hidden',
          border:'1px solid grey', padding:'5px'
        }}
      >
        {
          imageUrl != null ? (<img src={imageUrl} style={{ width:'100%', height:'100%', margin:'auto'}}/>) : (<p style={{textAlign:'center', color:'grey'}}>버튼을 눌러봐요</p>)
        }
      </div>
      <p onClick={() => setOpen(true)} style={{fontSize:'0.8rem', textAlign:'center', marginTop:10}}>원본사이즈로 보기</p>
      {
        (open === true && imageUrl != null) && 
        (<div 
          style={{
            position:'fixed', top:0, left:0, zIndex:10, 
            width:'100vw', height:'100vh', 
            backgroundColor:'rgba(0, 0, 0, 0.5)', 
            display:'flex', justifyContent:'center', alignItems:'center'
          }} 
          onClick={() => setOpen(false)}
        >
          <img src={imageUrl} style={{ maxWidth:'90%', maxHeight:'90%' }} />
        </div>)
      }
    </div>
  )
}

export default App
