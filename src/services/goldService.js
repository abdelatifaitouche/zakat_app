import axios from "axios";




const getGoldPrice = async () => {
    try{
        const response = await axios.get('https://www.goldapi.io/api/XAU/USD' , {
            headers : {
                'x-access-token' : "goldapi-4550u19m9r5rdty-io"
            }
        })

        return response

    }catch(error){
        console.log(error)
    }
}


export default getGoldPrice ; 