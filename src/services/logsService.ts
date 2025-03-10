const logs: string[] = [];

export function addLog(message: string) {
  logs.push(message);
  console.log('Новый лог:', message);
}

export function getLogs() {
  return [...logs]; // Возвращаем копию массива логов
}

export function clearLogs() {
  logs.length = 0; // Очищаем массив логов
}