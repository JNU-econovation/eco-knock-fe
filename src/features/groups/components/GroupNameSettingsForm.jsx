import { useRef, useState } from 'react';
import { updateGroupName } from '@/features/groups/api/groupsApi';
import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import './GroupNameSettingsForm.css';

const GroupNameSettingsForm = ({ group, enableApi, onSaved }) => {
  const [groupName, setGroupName] = useState(group.name);
  const [isPending, setIsPending] = useState(false);
  const isPendingRef = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPendingRef.current) return;
    if (!groupName.trim()) return;

    isPendingRef.current = true;
    setIsPending(true);

    try {
      if (enableApi) {
        await updateGroupName(group.groupId, groupName.trim());
      }
      onSaved?.();
    } catch {
      // The shared API client handles the error.
    } finally {
      isPendingRef.current = false;
      setIsPending(false);
    }
  };

  return (
    <form
      className="group-name-settings-form"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        aria-label={isPending ? '그룹 이름 수정 중' : undefined}
      >
        {isPending ? <ButtonSpinner /> : '수정'}
      </button>
      <label>
        <span>그룹 이름</span>
        <input
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
          maxLength={15}
          required
          disabled={isPending}
        />
      </label>
    </form>
  );
};

export default GroupNameSettingsForm;
