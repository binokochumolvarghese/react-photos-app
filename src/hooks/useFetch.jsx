

const useFetch = () => {

    // Function to call API
    const sendRequest = async (requestConfig) => {
        try {
            const apiResponse = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: requestConfig.headers ? requestConfig.headers : {},
                bpdy: requestConfig.body ? requestConfig.body : null
            } );

            if (!apiResponse.ok){
                return{
                    data: null,
                    error: `API fetching has either hit the limit or encountered an error. The status code is ${apiResponse.status}`
                }
            } else {
                const photoData = await apiResponse.json();
                return{
                    data: photoData,
                    error: null
                }
            }
        } catch (error) {
            return{
                data: photoData,
                error: error
            }
        }

    } 

    return {
        sendRequest
    }
}

export default useFetch;

 