import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = winston.format;

const logDir = "logs";
const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level} : ${message}`;
});
const logger = createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),

  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(format.colorize(), format.simple()),
    })
  );
}
export { logger };
