export const percentDifference = (a,b) => Math.abs(((b - a) / a) * 100).toFixed(1) 

export const capitalize = (st)=>{
    return st[0].toUpperCase() + st.slice(1)
}