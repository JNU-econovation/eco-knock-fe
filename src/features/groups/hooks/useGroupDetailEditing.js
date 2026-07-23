import { useRef, useState } from 'react';
import {
  updateGroupDetail,
  updateGroupRecruitment,
} from '@/features/groups/api/groupsApi';
import { GROUP_TYPE_VALUES } from '@/features/groups/constants/groupContract';
import {
  formatRecruitmentPeriod,
  toSeoulDateInputValue,
  toSeoulRecruitmentDateTime,
} from '@/features/groups/utils/groupContract';

const getInitialRecruitment = (group) => {
  const hasPeriod = Boolean(
    group.recruitmentStartAt && group.recruitmentEndAt
  );
  const mode = group.recruitmentMode ?? (hasPeriod ? 'PERIOD' : 'ALWAYS');

  return {
    mode,
    startDate: toSeoulDateInputValue(group.recruitmentStartAt),
    endDate: toSeoulDateInputValue(group.recruitmentEndAt),
  };
};

export const useGroupDetailEditing = ({ group, enableApi }) => {
  const [detail, setDetail] = useState({
    description: group.description,
    memberLimit: group.memberLimit,
  });
  const [detailDraft, setDetailDraft] = useState(detail);
  const [recruitment, setRecruitment] = useState(
    () => getInitialRecruitment(group)
  );
  const [recruitmentDraft, setRecruitmentDraft] = useState(recruitment);
  const [editingSection, setEditingSection] = useState(null);
  const [pendingSection, setPendingSection] = useState(null);
  const pendingRef = useRef(false);

  const beginDetailEdit = () => {
    setDetailDraft(detail);
    setEditingSection('detail');
  };
  const beginRecruitmentEdit = () => {
    setRecruitmentDraft(recruitment);
    setEditingSection('recruitment');
  };
  const cancelEdit = () => setEditingSection(null);

  const saveDetail = async (event) => {
    event.preventDefault();
    const description = detailDraft.description.trim();
    const memberLimit = Number(detailDraft.memberLimit);

    if (
      pendingRef.current ||
      !description ||
      memberLimit < group.memberCount ||
      memberLimit > 50
    ) return;

    pendingRef.current = true;
    setPendingSection('detail');

    try {
      if (enableApi) {
        await updateGroupDetail(group.groupId, {
          type: group.type ?? GROUP_TYPE_VALUES[group.category],
          introduction: description,
          capacity: memberLimit,
        });
      }

      setDetail({ description, memberLimit });
      setEditingSection(null);
    } catch {
      // The shared API client handles the error.
    } finally {
      pendingRef.current = false;
      setPendingSection(null);
    }
  };

  const saveRecruitment = async (event) => {
    event.preventDefault();
    const isPeriod = recruitmentDraft.mode === 'PERIOD';

    if (
      pendingRef.current ||
      (isPeriod && (
        !recruitmentDraft.startDate ||
        !recruitmentDraft.endDate ||
        recruitmentDraft.startDate > recruitmentDraft.endDate
      ))
    ) return;

    pendingRef.current = true;
    setPendingSection('recruitment');

    try {
      if (enableApi) {
        await updateGroupRecruitment(group.groupId, {
          recruitmentMode: recruitmentDraft.mode,
          recruitmentStartAt: isPeriod
            ? toSeoulRecruitmentDateTime(
              recruitmentDraft.startDate,
              'start',
            )
            : null,
          recruitmentEndAt: isPeriod
            ? toSeoulRecruitmentDateTime(
              recruitmentDraft.endDate,
              'end',
            )
            : null,
        });
      }

      setRecruitment(recruitmentDraft);
      setEditingSection(null);
    } catch {
      // The shared API client handles the error.
    } finally {
      pendingRef.current = false;
      setPendingSection(null);
    }
  };

  const recruitmentPeriod = recruitment.mode === 'PERIOD'
    ? formatRecruitmentPeriod({
      recruitmentMode: recruitment.mode,
      recruitmentStartAt: toSeoulRecruitmentDateTime(
        recruitment.startDate,
        'start',
      ),
      recruitmentEndAt: toSeoulRecruitmentDateTime(
        recruitment.endDate,
        'end',
      ),
    })
    : formatRecruitmentPeriod({ recruitmentMode: 'ALWAYS' });

  return {
    detail,
    detailDraft,
    recruitmentDraft,
    recruitmentPeriod: recruitmentPeriod || group.recruitmentPeriod,
    editingSection,
    pendingSection,
    setDetailDraft,
    setRecruitmentDraft,
    beginDetailEdit,
    beginRecruitmentEdit,
    cancelEdit,
    saveDetail,
    saveRecruitment,
  };
};
