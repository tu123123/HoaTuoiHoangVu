import { Tabs } from 'antd';
import './index.scss'
import Product from './Product';
import ToaHang from './ToaHang';
const Setting=()=>{
    const items=[
        {
            label:'Sản Phẩm',
            key:'1',
            children:<Product></Product>
        },
        {
            label:'Toa Hàng',
            key:'2',
            children:<ToaHang></ToaHang>
        },
    ]

    return <div className='settingcomponent'>
        <Tabs items={items}></Tabs>
    </div>
}

export default Setting