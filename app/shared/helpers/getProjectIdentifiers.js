export default function getProjectIdentifiers(text) {
  const projectIdentifierRegex = /tracks ([^ #]*#[^ #]+)/ig;
  const projects = [];

  let result;
  while ((result = projectIdentifierRegex.exec(text))) { // eslint-disable-line no-cond-assign
    projects.push(result[1]);
  }

  return projects;
}
