import './index.scss'
import Loading from '../Loading'
import { useEffect,useState } from 'react'
const Table =({columns,data,onRow,loading,style})=>{
    const [dataSoucre,setDataSource]=useState([])
    useEffect(()=>{
       if(data)
       {
        setDataSource([...data])
       }
    },[data])

    return <div style={{...style}} className='TableComponent'>
         {loading==true?<Loading></Loading>:undefined}
        <table>
    <thead>
       <tr>
       {columns?.map((i,index)=>{
            return <th key={index}>{i.title}</th>
        })}
       </tr>
    </thead>
    <tbody>
    {dataSoucre?.map((i,index)=>{
       return <tr style={onRow.style?onRow.style(i):undefined}  onDoubleClick={()=>{
        onRow.onDoubleClick(i)
       }} onClick={()=>{onRow.onClick(i)}} key={index}>
            {columns.map((j,jndex)=>{
                return <td style={columns.style?columns.style(i):undefined} key={jndex}>{j.render?j.render(i[j.dataIndex],i):i[j.dataIndex]}</td>
            })}
        </tr>
    })}
        
       
    </tbody>
    <tbody className='TableComponentnoitem'>
        <tr>
            <td  ></td>
        </tr>
    </tbody>
    </table>
    </div>
}
export default Table 