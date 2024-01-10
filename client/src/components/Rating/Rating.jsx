import { AiOutlineStar, AiFillStar } from "react-icons/ai";
const Rating = ({ rating, onClick, style }) => {
  return (
    <div className="flex gap-2">
      {[...Array(5)].map((_, index) => (
        <span key={index} onClick={() => onClick(index)} style={style}>
          {rating > index ? <AiFillStar /> : <AiOutlineStar />}
        </span>
      ))}
    </div>
  );
};

export default Rating;
