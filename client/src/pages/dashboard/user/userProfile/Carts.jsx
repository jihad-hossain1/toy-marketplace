import React from 'react';

const Carts = () => {
    return (
        <div>
            
        </div>
    );
};

export default Carts;



// import React, { useContext } from 'react';
// import SingleCart from '../SingleCart';
// import { AuthContext } from '../../../../authentication/AuthProvider';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// // carts is fetching 
// // const fetchData = () => {
// //     return axios.get(`${import.meta.env.VITE_BASE_URL}/allcarts`);
// //   };
// const Carts = ({isLoading, data, isError, error,refetch }) => {
//     const {user} = useContext(AuthContext)
//     // const { isLoading, data, isError, error,refetch } = useQuery(["carts"], fetchData);
//     if(isLoading){
//         return (
//             <div>
//                 Loading.....
//             </div>
//         )
//     }
//     if(isError){
//         return (
//             <div>
//                 {error.message}
//             </div>
//         )
//     }

//     return (
//         <div>
//            {user ? data?.data?.filter((item)=>{
//             const getItem = item.email === user?.email;
//             if(getItem){
//                 refetch();
//                 return getItem;
//             }
//            }).map((cartitem)=><SingleCart key={cartitem?._id} cartitem={cartitem}  refetch={refetch} />) : <div>
//            Your cart is empty
//             </div>}
//         </div>
//     );
// };

// export default Carts;