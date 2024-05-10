import styles from "./JobDetails.module.css";
import Image from "next/image";
import parse from 'html-react-parser';

const JobDetails = ({ details, clientName }) => {
  return (
    <>
      <div className={styles.superContainer}>
        {/* info field containers */}
        <div className={styles.infoFieldContainers}>
          <div className={styles.infoField}>
            <Image src="/frame.svg" width={24} height={24} />
            <span>{clientName}</span>
          </div>

          <div className={styles.infoField}>
            <Image src="/Award.svg" width={30} height={30} />
            <span>{details?.position}</span>
          </div>
        </div>

        {/* about company container */}

        <div className={styles.jobDescription}>
          <h4>Job Description:</h4>
          <span>{parse(details?.description)}</span>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
