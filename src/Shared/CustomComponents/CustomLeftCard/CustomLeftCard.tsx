import styles from "./CustomLeftCard.module.css";
// import imagCard from "../../../assets/images/1.webp";
import { CustomLeftCardProps } from "../../../Interfaces/Interfaces";

const CustomLeftCard: React.FC<CustomLeftCardProps> = ({
  title,
  date,
  time,
  enrolledStudents,
  image,
  customWidth,

}) => {
  const scheduleDate = new Date(date);

  // Format the date to a more readable format (adjust based on your preference)
  const formattedDate = scheduleDate.toLocaleDateString();
  const formattedTime = scheduleDate.toLocaleTimeString();
  const cardClasses = [styles.card, customWidth && styles["custom-width-card"]].join(" ");

  return (
    <div className={`${styles.card} ${cardClasses}`}>
      <div className={styles["card-content"]}>
        <div className={styles["img-card"]}>
          <img src={image} alt="" />
        </div>

        <div className={styles["card-details"]}>
          <h3 className="font-medium pb-2">{title}</h3>
          <span className="pr-2 border-r-2 ">{formattedDate}</span>
          <span className="pl-2">{formattedTime}</span>
          <div className={styles["card-open"]}>
            <span className="font-medium text-sm">
              No. of student’s enrolled:<span>{enrolledStudents} </span>
            </span>

            <span className="font-medium text-sm flex items-center">
              Open
              <i className={` ${styles["opan-icon"]}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLeftCard;
