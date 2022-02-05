import winston from 'winston';

const IsJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const Colors = {
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  FgDarkCyan: '\x1B[38;2;32;178;170m',
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'dev';
  return env === 'dev'? 'debug' : 'warn';
};

const colorizedDate = (date: string) => `${Colors['FgDarkCyan']}${date}\x1b[0m`;

const customTimestampFormat = () => {
  const date = new Date();
  const dayName = date.toLocaleDateString('en-us', { weekday: 'short' });
  const monthName = date.toLocaleDateString('en-us', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  const finalFormat = `${dayName} ${monthName} ${day} ${year}`;
  return finalFormat;
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const levelColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(levelColors);

// Chose the aspect of your log customizing the log format.
const format = [
  winston.format.timestamp({ format: customTimestampFormat }),
  winston.format((info) => {
    info.level = info.level.toUpperCase();

    if(typeof info.message === 'object'){
      info.message = JSON.stringify(info.message, null, 2);
    }

    return info;
  })(),
];

const colorizedLoggingFormat = [
  ...format,
  winston.format.colorize({ level: true }),
  winston.format.printf(
    (info) => `[${colorizedDate(info.timestamp)}] [${info.level}] ${info.message}`,
  ),
];

const rawLoggingFormat = [
  ...format,
  winston.format.printf((info) => `[${info.timestamp}] [${info.level}] ${info.message}`),
];

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [

  // Allow the use the console to print the messages
  new winston.transports.Console({
    level: level(),
    format: winston.format.combine(...colorizedLoggingFormat),
  }),

  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.combine(...rawLoggingFormat),
  }),

  // Allow to print all the messages inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new winston.transports.File({
    filename: 'logs/all.log',
    level: 'debug',
    format: winston.format.combine(...rawLoggingFormat),
  }),
];

// Create the logger instance that has to be exported
// and used to log messages.
const Logger = winston.createLogger({
  level: level(),
  levels,
  transports,
});

export default Logger;