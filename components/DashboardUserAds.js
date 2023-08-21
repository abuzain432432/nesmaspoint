"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AdsCard from "./AdsCard";
import { URL as baseURL } from "@/config";
import axios from "axios";
import { toast } from "react-toastify";

import Loading from "@/components/Loading";
function DashboardUserAds() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.authReducer);
  const handleDelete = (id) => {
    setData((preAds) => preAds?.filter((ad) => ad?._id !== id));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requestHeaders = {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        };
        console.log(user.token);

        console.log("_____________________*******__________________");
        console.log("_____________________*******__________________");
        console.log("_____________________*******__________________");
        const { data: responseData } = await axios.get(
          `${baseURL}/api/v1/ads/user`,
          {
            headers: requestHeaders,
          }
        );

        console.log(responseData.data);
        setData(responseData.data);
      } catch (err) {
        return toast.error(
          err?.response?.data?.message ||
            "Something went wrong please try again later",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="flex-1">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-1">
      {!data?.length ? (
        <h3 className="text-2xl  text-center mt-20 font-semibold w-full">
          No Ads Found click on the post add button to post ads
        </h3>
      ) : (
        <>
          <h1 className="text-3xl mb-6 text-center mt-10 font-semibold w-full">
            Your's ads
          </h1>
          <div className="grid w-[90%] mx-auto items-start grid-cols-2 lg:grid-cols-4 gap-6 ">
            {data?.map((ad) => (
              <AdsCard ad={ad} userAdd={true} onAdDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default DashboardUserAds;

// "use client";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import AdsCard from "./AdsCard";
// import { URL as baseURL } from "@/config";
// import axios from "axios";
// import { toast } from "react-toastify";

// import Loading from "@/components/Loading";
// function DashboardUserAds() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const user = useSelector((state) => state.authReducer);
//   const handleDelete = (id) => {
//     setData((preAds) => preAds?.filter((ad) => ad?._id !== id));
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const requestHeaders = {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//         };
//         const { data } = await axios.get(`${baseURL}/api/v1/ads/`, {
//           headers: requestHeaders,
//         });
//         setData(data.data);
//       } catch (err) {
//         return toast.error(
//           err?.response?.data?.message ||
//             "Something went wrong please try again later",
//           {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           }
//         );
//       } finally {
//         setLoading(false);
//       }
//       try {
//         const response = await fetch(`${baseURL}/api/v1/ads`, {
//           method: "GET",
//           cache: "no-cache",
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setData(data.data);
//         console.log(data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
//   if (loading) {
//     return (
//       <div className="flex-1">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1">
//       {!data?.length ? (
//         <h3 className="text-2xl  text-center mt-20 font-semibold w-full">
//           No Ads Found click on the post add button to post ads
//         </h3>
//       ) : (
//         <>
//           <h1 className="text-3xl mb-6 text-center mt-10 font-semibold w-full">
//             Your's ads
//           </h1>
//           <div className="grid w-[90%] mx-auto items-start grid-cols-2 lg:grid-cols-4 gap-6 ">
//             {data?.map((ad) => (
//               <AdsCard ad={ad} userAdd={true} onAdDelete={handleDelete} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default DashboardUserAds;
