
export const removeItem = (array, itemToRemove) => {
    try{
        const newArray = array.filter(item => item._id.toString() !== itemToRemove);
        return newArray
    }catch(err){
        console.log(err)
    }
}