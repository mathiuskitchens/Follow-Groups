import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { newPrayer, getGroupsForUser } from '../../services/supabase';

const NewPrayer = ({ onClose, userId }) => {
  const [prayerTitle, setPrayerTitle] = useState('');
  const [prayerText, setPrayerText] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      if (userId) {
        const { data, error } = await getGroupsForUser(userId);
        if (!error) {
          setGroups(data);
        }
      }
    };
    fetchGroups();
  }, [userId]);

  const handleSave = async () => {
    if (userId && prayerTitle && prayerText) {
      await newPrayer(userId, prayerTitle, prayerText, selectedGroup);
      onClose();
    }
  };

  return (
    <dialog id="new-prayer" className="modal" open>
      <div className="border border-gray-600 border-solid modal-box h-1/2">
        <select
          className="w-full max-w-xs select select-primary"
          onChange={(e) => setSelectedGroup(e.target.value)}
          value={selectedGroup || ''}
        >
          <option value="" disabled selected>
            Group
          </option>
          <option value={null}>None</option>
          {groups.map((group) => (
            <option key={group.group_id} value={group.group_id}>
              {group.group_name}
            </option>
          ))}
        </select>
        <input
          className="w-full max-w-xs input input-ghost"
          placeholder="New Prayer Request"
          onChange={(e) => setPrayerTitle(e.target.value)}
          value={prayerTitle}
        />
        <textarea
          className="w-full max-w-xs mt-6 textarea textarea-bordered textarea-md"
          placeholder="Enter request here"
          onChange={(e) => setPrayerText(e.target.value)}
          value={prayerText}
        />
        <div className="modal-action">
          <button className="mx-2 btn" onClick={onClose}>
            Close
          </button>
          <button className="mx-2 btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
};

NewPrayer.propTypes = {
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default NewPrayer;
