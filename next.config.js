/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_LOCAL_URI:
      "mongodb+srv://atulprakash:mongoDB2023@cluster0.o5rbfwo.mongodb.net/bookit",
    DB_URI: "",
  },
};

module.exports = nextConfig;
