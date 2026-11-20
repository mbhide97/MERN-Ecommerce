let createOrder=async(orderdata)=>{
    let response=await API.post('/orders',orderdata)
    return response.data
}

export default createOrder;