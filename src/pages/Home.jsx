import { Front } from '../components/Home/Front.jsx'
import {Navbar} from '../components/Home/Navbar.jsx'
import {Intro} from '../components/Home/Intro.jsx'
import {Working} from '../components/Home/Working.jsx'
import { Question } from '../components/Home/Question.jsx'
import{Footer} from "../components/Home/Footer.jsx"
export function Home(){
    return(
         <>
         <div style={{backgroundColor:"#FFFFFF" , fontFamily:"'Poppins',sans-serif"} }>
<Navbar/>
<Front/>
<Intro/>
<Working/>
<Question/>
<Footer/>
</div>
</>
    )
}