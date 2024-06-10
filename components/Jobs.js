// import styles from "./Jobs.module.css";
// import Image from "next/image";
// import { useActiveItem } from "../src/contexts/ActiveItemContext";
// import JobCard from "./JobCard";
// import CandidateCard from "./CandidateCard";

// const Jobs = ({
//   heading = "Posted Jobs",
//   data,
//   setSelectedOverlay,
//   setSelectedJob,
//   isFor,
// }) => {
//   console.log(`"datta in ${isFor} component:", ${data}`);
//   const { setActiveItem } = useActiveItem();
//   const iconSize = 25;
//   const goToAllIconSize = 15;
//   const statusSize = 10;
//   const newArray = data?.slice(0, 2);

//   const cardClickHandler = (job) => {
//     setSelectedJob(job);
//     setSelectedOverlay((prevValue) => !prevValue);
//   };

//   const hasData = newArray && newArray.length > 0;

//   const handleArrowClick = () => {
//     if (isFor === "jobs") setActiveItem("AllJobs");
//     if (isFor === "candidates") setActiveItem("All");
//   };

//   const getBackgroundColor = (status) => {
//     if (status === "Active") {
//       return "#E7FFE0";
//     } else {
//       return "#FFE6E6";
//     }
//   };

//   const getStatusSymbol = (status) => {
//     if (status === "Active") {
//       return "/activeStatus.svg";
//     } else {
//       return "/noteligible.svg";
//     }
//   };

//   return (
//     <>
//       <div className={styles.superContainer}>
//         <div className={styles.headingContainer}>
//           <div className={styles.heading}>
//             <h3>{heading}</h3>
//             <span>
//               {!data?.length
//                 ? 0
//                 : data?.length <= 9
//                 ? `0${data?.length}`
//                 : data?.length}
//             </span>
//           </div>
//           <Image
//             src="/goAll.svg"
//             onClick={handleArrowClick}
//             width={goToAllIconSize}
//             height={goToAllIconSize}
//           />
//         </div>

//         {hasData ? (
//           <div className={styles.jobsContainer}>
//             {newArray.map((item) =>
//               isFor === "jobs" ? (
//                 <JobCard
//                   key={item?.position_id}
//                   data={item}
//                   onClick={() => cardClickHandler(item)}
//                   isFor={isFor}
//                 />
//               ) : (
//                 <CandidateCard
//                   key={item?.position_id}
//                   data={item}
//                   onClick={() => cardClickHandler(item)}
//                   isFor={isFor}
//                 />
//               )
//             )}
//           </div>
//         ) : (
//           <div className={styles.tempContainer}>
//             <Image src="/SearchEmpty.gif" width={200} height={200} />
//             <h3>You haven’t posted any jobs yet...</h3>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Jobs;

import styles from "./Jobs.module.css";
import Image from "next/image";
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import JobCard from "./JobCard";
import CandidateCard from "./CandidateCard";

const Jobs = ({
  heading = "Posted Jobs",
  data,
  setSelectedOverlay,
  setSelectedJob,
  isFor,
}) => {
  console.log(`"datta in ${isFor} component:", ${data}`);
  const { setActiveItem } = useActiveItem();
  const iconSize = 25;
  const goToAllIconSize = 15;
  const statusSize = 10;
  const newArray = data?.slice(0, 2);

  const cardClickHandler = (job) => {
    setSelectedJob(job);
    setSelectedOverlay((prevValue) => !prevValue);
  };

  const hasData = newArray && newArray.length > 0;

  const handleArrowClick = () => {
    if (isFor === "jobs") setActiveItem("AllJobs");
    if (isFor === "candidates") setActiveItem("All");
  };

  const getBackgroundColor = (status) => {
    if (status === "Active") {
      return "#E7FFE0";
    } else {
      return "#FFE6E6";
    }
  };

  const getStatusSymbol = (status) => {
    if (status === "Active") {
      return "/activeStatus.svg";
    } else {
      return "/noteligible.svg";
    }
  };

  return (
    <>
      <div className={styles.superContainer}>
        <div className={styles.headingContainer}>
          <div className={styles.heading}>
            <h3>{heading}</h3>
            <span>
              {!data?.length
                ? 0
                : data?.length <= 9
                ? `0${data?.length}`
                : data?.length}
            </span>
          </div>
          <Image
            src="/goAll.svg"
            onClick={handleArrowClick}
            width={goToAllIconSize}
            height={goToAllIconSize}
          />
        </div>

        {hasData ? (
          <div className={styles.jobsContainer}>
            {newArray.map((item) =>
              isFor === "jobs" ? (
                <JobCard
                  key={item?.position_id}
                  data={item}
                  onClick={() => cardClickHandler(item)}
                  isFor={isFor}
                />
              ) : (
                <CandidateCard
                  key={item?.position_id}
                  data={item}
                  onClick={() => cardClickHandler(item)}
                  isFor={isFor}
                />
              )
            )}
          </div>
        ) : (
          <div className={styles.tempContainer}>
            <Image src="/SearchEmpty.gif" width={200} height={200} />
            <h3>You haven’t posted any jobs yet...</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Jobs;
