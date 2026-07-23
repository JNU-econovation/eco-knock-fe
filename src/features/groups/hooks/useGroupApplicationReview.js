import { useState } from 'react';

export const useGroupApplicationReview = (initialApplications = []) => {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [pendingDecision, setPendingDecision] = useState(null);
  const [result, setResult] = useState(null);

  const requestDecision = (decision) => {
    setPendingDecision(decision);
  };

  const cancelDecision = () => {
    setPendingDecision(null);
  };

  const confirmDecision = () => {
    if (!selectedApplication || !pendingDecision) return;

    const processedApplication = selectedApplication;
    const processedDecision = pendingDecision;

    setApplications((current) =>
      current.filter((item) => item.id !== processedApplication.id)
    );
    setSelectedApplication(null);
    setPendingDecision(null);
    setResult({
      applicantName: processedApplication.applicantName,
      decision: processedDecision,
    });
  };

  return {
    applications,
    selectedApplication,
    pendingDecision,
    result,
    openApplication: setSelectedApplication,
    closeApplication: () => setSelectedApplication(null),
    requestDecision,
    cancelDecision,
    confirmDecision,
    closeResult: () => setResult(null),
  };
};
