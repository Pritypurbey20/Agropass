import { DB_USERNAME,DB_PASSWORD,DB_HOST,DB_PORT,DB_DATABASE,ATLAS_HOST, ATLAS_USERNAME, ATLAS_PASSWORD, ATLAS_DB } from '../config/index';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
};
