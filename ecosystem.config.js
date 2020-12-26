module.exports = {
  apps: [
    {
      name: "campus-backend",
      script: "index.js",
      env: {
        MONGO_URI:
          "mongodb+srv://playstore:12345@campus-rp24n.mongodb.net/campusDb?retryWrites=true&w=majority",
        secretKey: "campus",
        environment: "production",
        SECRET_ACCESS_KEY: "r/hU1PcRPwn10VFk4B2jxznwmCK/UmcslQBGLTJx",
        ACCESS_KEY_ID: "AKIAICSNQCHC6N7A2ULQ",
        REGION: "ap-south-1",
        BUCKET: "campus-jobs",
        SQL_HOST: "localhost",
        SQL_USER: "root",
        SQL_PASSWORD: "",
        SQL_DATABASE: "campus",
        SQL_PORT: 3306,
      },
    },
  ],
};
