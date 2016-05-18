export default function jsonAggregator(responses) {
  const aggregated = [].concat(...responses);

  return aggregated;
}
