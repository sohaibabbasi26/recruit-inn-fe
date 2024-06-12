import styles from "./Socials.module.css";
import Image from "next/image";
const Socials = () => {
  const handWave = 25;
  const socialIconSize = 40;
  const arrowSize = 25;
  return (
    <>
      <div className={styles.superContainer}>
        <div className={styles.headingContainer}>
          <h3>
            Connect With Us
            <Image src="/hand.svg" width={handWave} height={handWave} />
          </h3>
        </div>

        <div className={styles.socialContainer}>
          <div className={styles.social}>
            <a
              href="https://twitter.com/recruitinn"
              target="blank"
              className={styles.twitter}
            >
              <div className={styles.info}>
                <span className={styles.iconWrapper}>
                  <Image
                    src="/xtwitter.svg"
                    height={24}
                    width={24}
                    alt="Twitter icon"
                  />
                </span>
              </div>

              <div className={styles.textContainer}>
                <p>X</p>
                <span>@recruitinn.ai</span>
              </div>
              <Image
                src="/rightArrow.svg"
                height={arrowSize}
                width={arrowSize}
                className={styles.arrow}
              />
            </a>
          </div>

          <div className={styles.social}>
            <a
              href="https://www.linkedin.com/company/recruitinn-ai/about/"
              target="blank"
              className={styles.twitter}
            >
              <div className={styles.info}>
                <span className={styles.iconWrapper}>
                  <Image
                    src="/linkedin.svg"
                    height={24}
                    width={24}
                    alt="Linkedin icon"
                  />
                </span>
              </div>

              <div className={styles.textContainer}>
                <p>LinkedIn</p>
                <span>/recruitinn.ai</span>
              </div>
              <Image
                src="/rightArrow.svg"
                height={arrowSize}
                width={arrowSize}
                className={styles.arrow}
              />
            </a>
          </div>

          {/* <div className={styles.social}>
            <a
              href="https://www.linkedin.com/company/recruitinn-ai/about/"
              target="blank"
              className={styles.linkedin}
            >
              <div className={styles.info}>
                <span className={styles.iconWrapper}>
                  <Image
                    src="/xtwitter.svg"
                    height={24}
                    width={24}
                    alt="Twitter icon"
                  />
                </span>

                <div className={styles.textContainer}>
                  <h3>LinkedIn</h3>
                  <span>/recruitinn.ai</span>
                </div>
              </div>
              <Image
                src="/rightArrow.svg"
                height={arrowSize}
                width={arrowSize}
              />
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Socials;
