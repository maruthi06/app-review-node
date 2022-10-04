export class Logger {

    private colorMapping = {
        "red": "\x1b[31m",
        "yellow": "\x1b[33m",
        "blue": "\x1b[34m",
        "cyan": "\x1b[36m"
    };

    constructor() { }

    private logDetails(details: any) {
        return {
            timestamp: new Date(),
            details: details
                ? typeof details === "object"
                    ? JSON.stringify(details)
                    : details
                : ""
        }
    }

    info(message: string, details?: any) {
        if (process.env.MODE !== 'test') {
            console.log(
                'INFO:',
                `${this.colorMapping.blue}${message}\x1b[0m`,
                this.logDetails(details)
            );
        }
    }

    error(message: string, details?: any) {
        if (process.env.MODE !== 'test') {
            console.log(
                'ERROR:',
                `${this.colorMapping.red}${message}\x1b[0m`,
                this.logDetails(details)
            );
        }
    }

    warn(message: string, details?: any) {
        if (process.env.MODE !== 'test') {
            console.log(
                'WARN:',
                `${this.colorMapping.yellow}${message}\x1b[0m`,
                this.logDetails(details)
            );
        }
    }

    degug(message: string, details?: any) {
        if (process.env.MODE !== 'test') {
            console.log(
                'DEBUG:',
                `${this.colorMapping.cyan}${message}\x1b[0m`,
                this.logDetails(details)
            );
        }
    }
}
