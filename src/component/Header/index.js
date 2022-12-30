import { useEffect } from "react";
import './index.scss'
const Header=()=>{

    const menu=[
        {
            title:'Home',
            path:'/',
        },
        {
            title:'Setting',
            path:'/setting',
        },
    ]
    return<div className="ComponentHeader">
        <div className="Logo-ComponentHeader"></div>
        <div className="menu-ComponentHeader">
        {menu.map((i,index)=><div key={index} className="menuItem" onClick={()=>{window.location.href=i.path}}>{i.title}</div>)}
        </div>
        <div className="user-ComponentHeader"></div>
    </div>
}

export default Header