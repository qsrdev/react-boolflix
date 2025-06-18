import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const StarRating = ({ voto }) => {
  const stellePiene = Math.ceil(voto / 2);

  return (
    <div className="flex gap-1 text-yellow-500 text-xl">
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon key={i} icon={i < stellePiene ? faStarSolid : faStarRegular} />
      ))}
    </div>
  );
};

export default StarRating;
