import './index.scss'
import { Button,Input } from 'antd';
import Table from '../../../component/Table';
import Modal from '../../../component/Modal';
import { getData,addData,updateData,delData } from '../../../firebaseConfig';
import { useEffect, useRef, useState } from 'react';
import { icon } from '../../../component/Icon';
import Loading from '../../../component/Loading';
import UploadIMG from '../../../component/UploadImage';
const Product=()=>{
    const [loading,setloading]=useState(false)
    const [open,setOpen]=useState(false)
    const [data,setData]=useState([])
    const columns=[{
        title:'Tên Sản Phẩm',
        dataIndex:'maSP'
    },
    {
        title:'Số Lượng',
        dataIndex:'tenSP'
    },
    {
        title:'Giá Tiền',
        dataIndex:'giaSP'
    },
    {
        title:'Xóa',
        dataIndex:'del',
        render:(e,a)=>{
            return<img style={{cursor:'pointer'}} onClick={()=>{ setloading(true);
            setTimeout(()=>{
                delData('sanpham',a.id,()=>{
                getData('sanpham',(e)=>{
        setData(e);setloading(false)
    })
            },setloading(false))
            },200)
           }}  height={30} src={icon.remove}></img>
        }
    },

  
]
const dataEdit=useRef()

useEffect(()=>{
    setloading(true)
    getData('sanpham',(e)=>{
        setData(e)
       
    })
},[])
useEffect(()=>{
    setloading(false)
},[data])
    return<div className='ProductContainer'>
 
    {open?
        <Popup setloading={()=>{setloading(true)}} dataEdit={dataEdit.current} update={()=>{    setloading(true)
         getData('sanpham',(e)=>{
        setData(e)
    })}} onClose={()=>setOpen(false)}></Popup>
    :undefined}
  
    <Button onClick={()=>{dataEdit.current=null;setOpen(true)}}>Thêm Sản Phẩm</Button>
    <Table loading={loading} onRow={{
        onDoubleClick:(e)=>{
            dataEdit.current=e
            setOpen(true)

        },
        onClick:(e)=>{
            dataEdit.current=e
        }
    }} data={data} columns={columns}></Table>
    </div>
}
  
const Popup=({onClose,update,dataEdit,setloading})=>{
    
    const [data,setData]=useState(dataEdit||{
        tenSP:'',
        maSP:'',
        giaSP:'',
    })
    const [loading,setA]=useState(false);
    useEffect(()=>{
      
    },[])

    return <Modal onOk={()=>{
        setA(true)
       setTimeout(()=>{
        if(dataEdit)
        {
            updateData('sanpham',dataEdit.id,data,()=>{update();onClose()}, setA(false))
        }
        else{
            addData('sanpham',{...data},()=>{update();onClose()},setA(false))
        }
       },200)
       

    }} onClose={onClose} title={'Thêm Sản Phẩm'}><div style={{position:'relative',padding:'5px'}}>
        {loading?<Loading></Loading>:undefined}
        <div>Mã sản phẩm</div>
        <Input defaultValue={data.tenSP}  onChange={e=>data.maSP=e.target.value}></Input>
        <div>Tên sản phẩm</div>
        <Input defaultValue={data.maSP} onChange={e=>data.tenSP=e.target.value}></Input>
        <div>Giá Thành</div>
        <Input defaultValue={data.giaSP} onChange={e=>data.giaSP=e.target.value}></Input>
        <UploadIMG></UploadIMG>
    </div></Modal>
}
export default Product