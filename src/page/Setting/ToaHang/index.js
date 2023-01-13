import './index.scss'
import { Button,Input, InputNumber } from 'antd';
import Table from '../../../component/Table';
import Modal from '../../../component/Modal';
import { getData,addData,updateData,delData,upload } from '../../../firebaseConfig';
import { useEffect, useRef, useState } from 'react';
import { icon } from '../../../component/Icon';
import Select from '../../../component/Select';
import Loading from '../../../component/Loading';
import UploadIMG from '../../../component/UploadImage';
const ToaHang=()=>{
    const [loading,setloading]=useState(false)
    const [open,setOpen]=useState(false)
    const [dataSP,setDataSP]=useState([])
    const [data,setData]=useState([])
    const [valueSL,setValueSL]=useState()
    const [data2,setData2]=useState([])
    const columns=[{
        title:'Tên Sản Phẩm',
        dataIndex:'maSP',
        render:(e,b)=>{
            return <Select  onChange={(e)=>{
                let arr=[...data]
                {
                    arr[b.index].maSP=e
                }
               
                setData([...arr])
            }} data={dataSP} value={e} isRender={(e)=>{return e.maSP +'-'+e.tenSP}} dataIndex={'maSP'}></Select>
        }
    },
    {
        title:'Số Lượng',
        dataIndex:'soLuong',
        render:(a,b)=>{
            return <InputNumber value={a} onChange={(e)=>{
                let arr=[...data]
                {
                    arr[b.index].soLuong=e
                }
               
                setData([...arr])
            }} style={
               { width:'100%'}
            }></InputNumber>
        }
    },
    {
        title:'Giá Gốc',
        dataIndex:'giaGoc',
        render:(a,b)=>{
            return <InputNumber value={a} onChange={(e)=>{
                let arr=[...data]
                {
                    arr[b.index].giaGoc=e
                }
     
                setData([...arr])
            }} style={
               { width:'100%'}
            }></InputNumber>
        }
    },
    {
        title:'Giá Bán',
        dataIndex:'giaBan',
        render:(a,b)=>{
            return <InputNumber value={a} onChange={(e)=>{
                let arr=[...data]
                {
                    arr[b.index].giaBan=e
                }
               
                setData([...arr])
            }} style={
               { width:'100%'}
            }></InputNumber>
        }
    },
    {
        title:'Thành Tiền',
        dataIndex:'thanhTien',
        render:(a,b)=>{
            return b.giaBan*b.soLuong
        }
    },
    {
        title:'Xóa',
        dataIndex:'del',
        render:(e,a)=>{
            return<img style={{cursor:'pointer'}} onClick={()=>{ setloading(true);
            setTimeout(()=>{
                delData('toaHangChiTiet',a.id,()=>{
                    getData('toaHangChiTiet',(e)=>{
        setData([...e.filter(i=>i.idToaHang==valueSL.id)])
        setloading(false)
    })
            },setloading(false))
            },200)
           }}  height={30} src={icon.remove}></img>
        }
    },

  
]
const columns2=[{
    title:'Ngày',
    dataIndex:'ngay',
   
},
{
    title:'Người Mua',
    dataIndex:'nguoiNhan'
},
{
    title:'Thành Tiền',
    dataIndex:'thanhTien'
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
const item={
    ...valueSL,
    idToaHang:valueSL?.id,
    maSP:'',
    new:true,
    tenSP:'',
    giaGoc:0,
    giaBan:0,
    soLuong:0,
    thanhTien:0,
}
const onaddDetail=()=>{
    setloading(true)
    data?.map(i=>{
        i.new==true?
        addData('toaHangChiTiet',{...i,new:false}):updateData('toaHangChiTiet',i.id,i)
    })
    getData('toaHangChiTiet',(e)=>{
        setData([...e.filter(i=>i.idToaHang==valueSL.id)])
        setloading(false)
    })
   
}
useEffect(()=>{
    setloading(true)
    getData('toaHang',(e)=>{
        setData2(e)
        setloading(false)
    })
    getData('sanpham',(e)=>{
        setDataSP(e)
        setloading(false)
    })
 
},[])

    return<div className='ProductContainer'>
 
    {open?
        <Popup setloading={()=>{setloading(true)}} dataEdit={dataEdit.current} update={()=>{    setloading(true)
         getData('toaHang',(e)=>{
        setData2(e);setloading(false)
    })}} onClose={()=>setOpen(false)}></Popup>
    :undefined}
  
    <Button onClick={()=>{dataEdit.current=null;setOpen(true)}}>Thêm Đơn Hàng</Button>
    <div className='ToaHang-Content'>
   <div style={{width:'100%'}}>
   <Table style={{
        width:'100%'
    }} loading={loading} onRow={{
        onDoubleClick:(e)=>{
           
        },
        onClick:(e)=>{
           
        }
    }} data={data?.map((i,index)=> {return {...i,index:index}})} columns={columns}></Table>
   
   </div>
     <Table 
     style={{
        width:'100%'
    }} loading={loading} onRow={{
        style:(e)=>{
            if(valueSL&&e.id==valueSL.id)
            return {
                background:'#f6a1a1',
                cursor:'pointer'
            }
            else return{
                cursor:'pointer'
            }
        },
        onDoubleClick:(e)=>{
            dataEdit.current=e
            setOpen(true)
        },
        onClick:(e)=>{
            dataEdit.current=e
            setValueSL(e)
            console.log(e)
            getData('toaHangChiTiet',(a)=>{
              
        setData([...a.filter(i=>i.idToaHang==e.id)])
        setloading(false)
    })
        }
    }} data={data2} columns={columns2}></Table>
    </div>
    <br></br>
    {valueSL? <div style={{display:'flex',gap:'10px',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:'10px'}}>
        <img onClick={()=>{
            setData([...data,item])
        }} style={{cursor:'pointer'}} height={30} src={icon.plus}></img>
        <img onClick={()=>{
            setData([...data.slice(0,data.length-1)])
        }} style={{cursor:'pointer'}} height={30} src={icon.sub}></img>
    </div>
    <Button onClick={()=>{onaddDetail()}}>Save</Button>
    </div> :undefined}
    </div>
}
  
const Popup=({onClose,update,dataEdit,setloading})=>{
    
    const [data,setData]=useState(dataEdit||{
        ngay:'',
        nguoiNhan:'',
    })
    const [img,setImg]=useState()
    const [loading,setA]=useState(false);
   

    return <Modal onOk={()=>{
        setA(true)
       setTimeout(()=>{
        dataEdit?updateData('toaHang',data.id,{...data},()=>{update() ;
            
            if(img)
        {
            upload('','',img.file,)
        }
        else{
            onClose()
        }

        },setA(false))
       :
            addData('toaHang',{...data},()=>{update() ;
            
                if(img)
            {
                upload('','',img.file,)
            }
            else{
                onClose()
            }

            },setA(false))
        
       },200)
       

    }} onClose={onClose} title={'Thêm Đơn Hàng'}><div style={{position:'relative',padding:'5px'}}>
        {loading?<Loading></Loading>:undefined}
        <div>Ngày</div>
        <Input defaultValue={data.ngay}  onChange={e=>data.ngay=e.target.value}></Input>
        <div>Người Nhận</div>
        <Input defaultValue={data.nguoiNhan} onChange={e=>data.nguoiNhan=e.target.value}></Input>
      
    </div></Modal>
}
export default ToaHang