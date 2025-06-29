import API_ROUTES from "../common/index";

const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(API_ROUTES.categoryWiseProduct.url,{
        method : API_ROUTES.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct