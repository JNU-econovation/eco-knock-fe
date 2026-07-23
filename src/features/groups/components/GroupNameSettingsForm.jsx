import { useState } from 'react';
import './GroupNameSettingsForm.css';

const GroupNameSettingsForm = ({ group }) => {
  const [groupName, setGroupName] = useState(group.name);

  return (
    <form
      className="group-name-settings-form"
      onSubmit={(event) => event.preventDefault()}
    >
      <button type="submit">수정</button>
      <label>
        <span>그룹 이름</span>
        <input
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
          maxLength={30}
          required
        />
      </label>
    </form>
  );
};

export default GroupNameSettingsForm;
