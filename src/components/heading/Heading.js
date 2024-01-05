  import logo1 from '../../assests/logo1.png'
  import list from '../../assests/list.png'
   import { useNavigate } from 'react-router-dom'

//  import logo from '../../assets/logo.png'
 
export default  function Heading({title,myroute})
{   var navigate=useNavigate()
    return(
        <div style={{fontFamily:'Kanit',
        fontWeight:'bold',
       fontSize:20,
       letterSpacing:1,
       display:'flex',
       
       alignItems:'center',
       flexDirection:'row'}}>
        <img src={logo1} width="60"/>
        <div>{title}</div>
        <img src={list} width="40" style={{marginLeft:'auto'}} onClick={()=>navigate(`${myroute}`)}/>
        </div>


    )
}