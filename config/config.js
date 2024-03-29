import dotenv from 'dotenv'
dotenv.config()

const config =  {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    LOCAL_HOST: process.env.LOCAL_HOST,
    SALT_ROUND: process.env.SALT_ROUND
}

export default config;