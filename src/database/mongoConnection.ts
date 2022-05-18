
import mongoose, { ConnectOptions } from "mongoose";
import { config } from '../config/Constants'

export class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose
                .connect(config.MONGO_CONNECTION, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                } as ConnectOptions)
                .then((res) => {
                    console.log(
                        'Connected to Distribution API Database - Initial Connection'
                    );
                })
        } catch (err) {
            console.error(err.message)
            process.exit(1)
        }
    }
}