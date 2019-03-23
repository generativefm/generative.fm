const stopPerformances = (performances, loadedOnly = false) => {
  const performancesToStop = loadedOnly
    ? performances.filter(({ isLoaded }) => isLoaded)
    : performances;
  performancesToStop.forEach(({ stop }) => stop());
  if (loadedOnly) {
    performancesToStop.forEach(stoppedPerformance => {
      const i = performances.findIndex(
        performance => performance.buildId === stoppedPerformance.buildId
      );
      performances.splice(i, 1);
    });
  } else {
    performancesToStop.splice(0, performancesToStop.length);
  }
};

export default stopPerformances;
