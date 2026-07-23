import {
  EMPTY_GROUP_PERMISSIONS,
  GROUP_TYPE_LABELS,
  GROUP_TYPE_VALUES,
  RECRUITMENT_STATUS_LABELS,
} from '@/features/groups/constants/groupContract';

const SEOUL_TIME_ZONE = 'Asia/Seoul';

const formatSeoulDate = (instant) => {
  if (!instant) return '';

  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: SEOUL_TIME_ZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(instant));
};

export const toSeoulDateInputValue = (instant) => {
  if (!instant) return '';

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: SEOUL_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(instant));
  const getPart = (type) => (
    parts.find((part) => part.type === type)?.value ?? ''
  );

  return `${getPart('year')}-${getPart('month')}-${getPart('day')}`;
};

export const formatRecruitmentPeriod = ({
  recruitmentMode,
  recruitmentStartAt,
  recruitmentEndAt,
}) => {
  if (recruitmentMode === 'ALWAYS') return '상시 모집';

  const start = formatSeoulDate(recruitmentStartAt);
  const end = formatSeoulDate(recruitmentEndAt);

  return start && end ? `${start} ~ ${end}` : '';
};

export const mapGroupSummary = (group) => ({
  id: String(group.groupId),
  groupId: group.groupId,
  type: group.type,
  category: GROUP_TYPE_LABELS[group.type] ?? group.type,
  name: group.name,
  memberCount: group.currentMemberCount,
  memberLimit: group.capacity,
  leaderName: group.leaderName,
  recruitmentStatusCode: group.recruitmentStatus,
  recruitmentStatus:
    RECRUITMENT_STATUS_LABELS[group.recruitmentStatus] ??
    group.recruitmentStatus,
  isRecruiting: (
    group.recruitmentStatus === 'RECRUITING' ||
    group.recruitmentStatus === 'ALWAYS_RECRUITING'
  ),
  isMember: Boolean(group.isMember),
  isLeader: Boolean(group.isLeader),
});

export const mapGroupDetail = (group) => ({
  ...mapGroupSummary(group),
  description: group.introduction,
  recruitmentMode: group.recruitmentMode,
  recruitmentStartAt: group.recruitmentStartAt,
  recruitmentEndAt: group.recruitmentEndAt,
  recruitmentPeriod: formatRecruitmentPeriod(group),
  members: (group.members ?? []).map((member) => member.name),
  myApplicationStatus: group.myApplicationStatus ?? 'NONE',
  permissions: {
    ...EMPTY_GROUP_PERMISSIONS,
    ...group.permissions,
  },
});

export const mapGroupApplication = (application) => ({
  id: String(application.applicationId),
  applicationId: application.applicationId,
  applicantMemberId: application.applicantMemberId,
  applicantName: application.applicantName,
  message: application.content,
  appliedAt: application.appliedAt,
});

export const toSeoulRecruitmentDateTime = (date, boundary) => {
  if (!date) return null;

  return boundary === 'end'
    ? `${date}T23:59:59.999999+09:00`
    : `${date}T00:00:00+09:00`;
};

export const toCreateGroupPayload = (form) => ({
  type: GROUP_TYPE_VALUES[form.category],
  name: form.name.trim(),
  introduction: form.description.trim(),
  capacity: form.memberLimit,
  recruitmentMode: 'PERIOD',
  recruitmentStartAt: toSeoulRecruitmentDateTime(
    form.recruitmentStartDate,
    'start',
  ),
  recruitmentEndAt: toSeoulRecruitmentDateTime(
    form.recruitmentEndDate,
    'end',
  ),
});
