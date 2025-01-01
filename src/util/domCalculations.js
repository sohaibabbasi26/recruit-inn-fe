export function getElementCenter(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const adjustedX = centerX - window.innerWidth * 0.05;

  return {
    x: adjustedX,
    y: centerY,
  };
}

export function getElementCenters(elements) {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }
  return elements.map((element) => getElementCenter(element));
}

export function calculateCenterDistance(elementA, elementB) {
  const rectA = elementA.getBoundingClientRect();
  const rectB = elementB.getBoundingClientRect();

  const centerA = rectA.left + rectA.width / 2;
  const centerB = rectB.left + rectB.width / 2;

  const distance = Math.abs(centerA - centerB);

  return distance;
}
