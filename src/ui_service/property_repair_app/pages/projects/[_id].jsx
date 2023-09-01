import { store } from "@features/app/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

// I should be able to get the ID from the URL and use that to make my request and from there I can do the rest. 

export default function Billionaire() {
    const { billionaire } = useSelector((state) => state.billionaireData)

    useEffect(() => {
        
    }, [])

    console.log(billionaire)
    return (
        <>
        <div>
            Hello MuthaFucka
        </div>
        </>
    )
}



// export function getStaticPaths() {
//     const state = store.getState()

//     const paths = state.billionaireData.billionaires.map(b => {
//         return (
//             {params: { _id: b._id}}
//         )
//       })
//     console.log(paths)
//     return {paths, fallback: false}  
//     }

// export const getStaticProps({params}) {
//     useDispatch(getAllBillionaires)        
    
//             return {
//                 props: { billionaire }
//             }
//         }
//     )
