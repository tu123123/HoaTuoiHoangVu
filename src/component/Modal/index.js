import ReactDOM from "react-dom";
import './index.scss'
import { icon } from "../Icon";
import { Button } from "antd";
const Modal=({title,children,onClose,onOk})=>{


    return ReactDOM.createPortal(<div className="ModalComponent">
    <div className="modalContainer">

        <div className="head-modalContainer">
            <div>{title}</div>
            <div><img src={icon.close} onClick={onClose}></img></div>
           
        </div>
        <div className="body-modalContainer">{children}</div>
        <div className="footer-modalContainer"><Button title="Lưu" onClick={onOk}>Lưu</Button></div>
    </div>
</div>,document.getElementById('root')) 
}

export default Modal