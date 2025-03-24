import PropTypes from 'prop-types';

const PrayerCard = ({ prayer }) => {
  return (
    <div className="w-auto m-4 shadow-xl card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">{prayer.title || "Untitled"}</h2>
        <p>{prayer.prayer_text}</p>
        <p>Answered: {prayer.answered.toString()}</p>
        {prayer.profileName && 
        <p>Submitted by: {prayer.profileName}</p>
        }
      </div>
    </div>
  );
};

PrayerCard.propTypes = {
  prayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    prayer_text: PropTypes.string.isRequired,
    answered: PropTypes.bool,
    profileName: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default PrayerCard;