export function logWithDate(message: string) {
  const now = new Date();

  const formatted = now.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  console.log(`[${formatted}] ${message}`);
}
