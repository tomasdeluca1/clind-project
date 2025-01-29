type LogLevel = "info" | "warn" | "error";

interface LogData {
  message: string;
  [key: string]: any;
}

function formatLog(level: LogLevel, data: LogData): string {
  const timestamp = new Date().toISOString();
  const { message, ...rest } = data;
  return `[${timestamp}] ${level.toUpperCase()}: ${message} ${JSON.stringify(
    rest
  )}`;
}

export const logger = {
  info: (data: LogData) => {
    console.log(formatLog("info", data));
  },
  warn: (data: LogData) => {
    console.warn(formatLog("warn", data));
  },
  error: (data: LogData) => {
    console.error(formatLog("error", data));
  },
};
