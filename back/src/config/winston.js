import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

const logDir = "logs";
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};
winston.addColors(colors);

const logFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  colorize({ all: true }),
  printf(({ timestamp, level, message }) => {
    return `[${level}] ${message} /${timestamp}`;
  })
);

const logger = createLogger({
  format: logFormat,
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
      level: "debug",
      colorize: true,
      format: logFormat,
    })
  );
}
export { logger };
