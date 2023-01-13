import './index.scss'
import ReactDOM from "react-dom";
import { icon } from '../Icon'
import { useRef,useEffect,useState } from 'react';
const Select=({data,value,dataIndex,onChange,isRender})=>{
    const [isValue,setIsValue]=useState(value)
    const parent=useRef()
    const children=useRef()
    const imgref=useRef()
    useEffect(()=>{
        window.addEventListener('mousedown',(e)=>{
            if(!e.target.contains(children.current))
            {
                children.current.style.display="none"
                imgref.current.style.transform='rotate(0deg)'
            }
        })
        window.removeEventListener('mousedown',(e)=>{
            if(!e.target.contains(children.current))
            {
                children.current.style.display="none"
                imgref.current.style.transform='rotate(0deg)'
            }
        })
    },[])
    return <div   className='componentSelect'>
        <div ref={parent} onClick={()=>{
        if(  children.current){
            children.current.style.display="revert"
            children.current.style.top=parent.current.getBoundingClientRect().top+parent.current.offsetHeight+"px";
            children.current.style.left=parent.current.getBoundingClientRect().left+"px"
            children.current.style.minWidth=parent.current.clientWidth+"px"
            imgref.current.style.transform='rotate(180deg)'
        }
      
    }} className='inputSelect'><div>{isValue}</div><img ref={imgref} width={20} src={icon.down}></img></div>
        {ReactDOM.createPortal( <div ref={children} className='dropSelectComponent'>
            {
                data?.map((i,index)=>{
                    return <div onMouseDown={()=>{onChange(i[dataIndex]);setIsValue(i[dataIndex])}} key={index}>{isRender?isRender(i):i[dataIndex]}</div>
                })
            }
        </div>,document.getElementById('root'))}
       
    </div>

}
export default Select