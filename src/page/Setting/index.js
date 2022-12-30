import { Tabs } from 'antd';
import './index.scss'
import Product from './Product';
const Setting=()=>{
    const items=[
        {
            label:'Sản Phẩm',
            key:'1',
            children:<Product></Product>
        },
    ]

    return <div className='settingcomponent'>
        <Tabs items={items}></Tabs>
    </div>
}

export default Setting