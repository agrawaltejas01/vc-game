const LOADING_VERBS = [
  "Analyzing",
  "Decoding",
  "Generating",
  "Processing",
  "Preparing"
];

let currentIndex = 0;

export function getNextLoadingMessage(): string {
  const verb = LOADING_VERBS[currentIndex];
  currentIndex = (currentIndex + 1) % LOADING_VERBS.length;
  return `${verb}...`;
}

export function resetLoadingMessages(): void {
  currentIndex = 0;
}
