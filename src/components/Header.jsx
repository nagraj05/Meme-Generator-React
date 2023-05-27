import troll from '../images/troll-face.png' 



export default function Header(){
    return(
        <header className='header'>
            <img src={troll} alt="Troll Face" className='header-image' />
            <h3 className='header-title'>Meme Generator</h3>
        </header>
    )
}