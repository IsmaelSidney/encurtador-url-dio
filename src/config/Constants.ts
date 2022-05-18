require('dotenv').config()

export const config = {
    API_URL: process.env.API_LINK,
    MONGO_CONNECTION: process.env.DB_CONNECTION
}