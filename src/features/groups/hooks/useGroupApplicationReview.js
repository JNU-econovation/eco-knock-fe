import { useEffect, useRef, useState } from 'react';
import {
  acceptGroupApplication,
  getGroupApplication,
  getGroupApplications,
  rejectGroupApplication,
} from '@/features/groups/api/groupsApi';
import { mapGroupApplication } from '@/features/groups/utils/groupContract';

export const useGroupApplicationReview = ({
  groupId,
  enabled,
  initialApplications = [],
}) => {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [pendingDecision, setPendingDecision] = useState(null);
  const [result, setResult] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const isPendingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const controller = new AbortController();
    let isActive = true;

    const loadApplications = async () => {
      try {
        const response = await getGroupApplications(
          groupId,
          controller.signal,
        );

        if (isActive) {
          setApplications(
            (response.data.result ?? []).map(mapGroupApplication),
          );
        }
      } catch {
        // The shared API client handles the error.
      }
    };

    loadApplications();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [enabled, groupId]);

  const requestDecision = (decision) => {
    setPendingDecision(decision);
  };

  const cancelDecision = () => {
    setPendingDecision(null);
  };

  const openApplication = async (application) => {
    setSelectedApplication(application);

    if (!enabled) return;

    try {
      const response = await getGroupApplication({
        groupId,
        applicationId: application.applicationId,
      });
      const detail = response.data.result;

      if (detail) {
        setSelectedApplication((current) => (
          current?.id === application.id
            ? mapGroupApplication(detail)
            : current
        ));
      }
    } catch {
      // The shared API client handles the error; retain the list response.
    }
  };

  const confirmDecision = async () => {
    if (!selectedApplication || !pendingDecision || isPendingRef.current) {
      return;
    }

    const processedApplication = selectedApplication;
    const processedDecision = pendingDecision;

    isPendingRef.current = true;
    setIsPending(true);

    try {
      if (enabled) {
        const decisionRequest = processedDecision === 'accept'
          ? acceptGroupApplication
          : rejectGroupApplication;
        await decisionRequest(
          groupId,
          processedApplication.applicationId,
        );
      }

      setApplications((current) =>
        current.filter((item) => item.id !== processedApplication.id)
      );
      setSelectedApplication(null);
      setPendingDecision(null);
      setResult({
        applicantName: processedApplication.applicantName,
        decision: processedDecision,
      });
    } catch {
      // The shared API client handles the error; keep the confirmation open.
    } finally {
      isPendingRef.current = false;
      setIsPending(false);
    }
  };

  return {
    applications,
    selectedApplication,
    pendingDecision,
    result,
    isPending,
    openApplication,
    closeApplication: () => setSelectedApplication(null),
    requestDecision,
    cancelDecision,
    confirmDecision,
    closeResult: () => setResult(null),
  };
};
