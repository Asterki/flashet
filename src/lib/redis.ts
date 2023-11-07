import { logError } from "@/util/logs";
import Redis, { RedisOptions } from "ioredis";

const options: RedisOptions = {
    host: process.env.REDIS_HOST as string,
    lazyConnect: true,
    showFriendlyErrorStack: true,
    enableAutoPipelining: true,
    maxRetriesPerRequest: 0,
    retryStrategy: (times: number) => {
        if (times > 3) {
            throw new Error(
                `⚠ Could not connect to redis after ${times} attempts`
            );
        }

        return Math.min(times * 200, 1000);
    },
};

if (process.env.REDIS_PORT) {
    options.port = parseInt(process.env.REDIS_PORT as string);
}

if (process.env.REDIS_password) {
    options.password = process.env.REDIS_PASSWORD as string;
}

const redis = new Redis(options);

redis.on("error", (error: unknown) => {
    logError("Error Trying To Connect To Redis");
    console.log(error);
});

export default redis;
