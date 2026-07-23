import { apiClient } from '@/shared/api/apiClient';

export const getMyGroups = (signal) => (
  apiClient.get('/groups/me', { signal })
);

export const getGroups = ({ excludeClosed, sort, signal }) => (
  apiClient.get('/groups', {
    params: { excludeClosed, sort },
    signal,
  })
);

export const getGroupDetail = (groupId, signal) => (
  apiClient.get(`/groups/${groupId}`, { signal })
);

export const createGroup = (payload) => (
  apiClient.post('/groups', payload)
);

export const updateGroupName = (groupId, name) => (
  apiClient.put(`/groups/${groupId}/name`, { name })
);

export const updateGroupDetail = (groupId, payload) => (
  apiClient.put(`/groups/${groupId}/detail`, payload)
);

export const updateGroupRecruitment = (groupId, payload) => (
  apiClient.put(`/groups/${groupId}/recruitment`, payload)
);

export const deleteGroup = (groupId) => (
  apiClient.delete(`/groups/${groupId}`)
);

export const getGroupMembers = (groupId, signal) => (
  apiClient.get(`/groups/${groupId}/members`, { signal })
);

export const removeGroupMember = (groupId, memberId) => (
  apiClient.delete(`/groups/${groupId}/members/${memberId}`)
);

export const delegateGroupLeadership = (groupId, memberId) => (
  apiClient.put(`/groups/${groupId}/leader`, { memberId })
);

export const submitGroupApplication = (groupId, content) => (
  apiClient.post(`/groups/${groupId}/applications`, { content })
);

export const getGroupApplications = (groupId, signal) => (
  apiClient.get(`/groups/${groupId}/applications`, { signal })
);

export const getGroupApplication = ({
  groupId,
  applicationId,
  signal,
}) => (
  apiClient.get(
    `/groups/${groupId}/applications/${applicationId}`,
    { signal },
  )
);

export const acceptGroupApplication = (groupId, applicationId) => (
  apiClient.put(`/groups/${groupId}/applications/${applicationId}/accept`)
);

export const rejectGroupApplication = (groupId, applicationId) => (
  apiClient.put(`/groups/${groupId}/applications/${applicationId}/reject`)
);
