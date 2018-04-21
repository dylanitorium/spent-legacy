export const conditionalClasses = (classes) => {
  const validClasses = Object.keys(classes).filter(name => !!classes[name]);

  if (!validClasses.length) {
    return undefined;
  }

  return validClasses.join(' ');
}
