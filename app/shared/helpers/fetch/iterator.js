export default function iterator(middleware) {
  return responses => Promise.all(
    responses.map(response => middleware(response))
  );
}
