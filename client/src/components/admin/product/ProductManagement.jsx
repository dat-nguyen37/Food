import { EuiBasicTable, EuiButton, EuiButtonIcon, EuiFlexGroup, EuiImage, EuiPanel, EuiSpacer, EuiSwitch, EuiText } from '@elastic/eui'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios'
import {ShopContext} from '../../../context/ShopContext'
import {toast,ToastContainer} from 'react-toastify'


export default function ProductManagement() {
    const [data,setData]=useState([])

    const handleUpdate=async(id,IsActivate)=>{
      try {
        await axios.patch('/product/update/'+id,{IsActivate:IsActivate})
        getProduct()
      } catch (err) {
        console.log(err)
        toast.error('Lỗi server')
      }
    }
    const onChecked=(id)=>(e)=>{
      const IsActivate=e.target.checked
      handleUpdate(id,IsActivate)
    }
    const columns=[
        {field:'id',name:'Mã',},
        {field:'image',name:'Ảnh',
            render:(item)=>(
                <EuiImage src={item} size='50px'/>
            )
        },
        {field:'name',name:'Tên'},
        {field:'status',name:'Trạng thái',
            render:(item)=>(
                <EuiSwitch checked={item.IsActivate} onChange={onChecked(item._id)}/>
            )
        },
    ]
    const getProduct=async()=>{
        try {
            const res=await axios.get('/product/getAll')
            setData(res.data?.map(item=>(
                {id:item._id,image:item.image,name:item.name,status:item}
            )))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getProduct()
    },[])
  return (
    <EuiPanel>
        <ToastContainer/>
        <EuiFlexGroup alignItems='center' justifyContent='spaceBetween'>
            <EuiText>Danh sách sản phẩm</EuiText>
        </EuiFlexGroup>
        <EuiSpacer/>
        <EuiBasicTable
        tableLayout='auto'
        columns={columns}
        items={data}/>
    </EuiPanel>
  )
}