import { constVariable } from '../utils/const';
class APIFeatures {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = constVariable.EXCLUDEDFIELS;
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(constVariable.QUERYSTR, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  count() {
    this.query = this.query.countDocuments();
    return this;
  }

  search() {
    if (this.queryString.search) {
      const search: any = this.queryString.search.split(',').join(' ');
      const modelName = this.queryString.modelName || 'users';
      let query: any = {}
      query.$and = []

      let searchArray: any = []
      if (modelName == 'roles') {
        searchArray = [{ name: new RegExp(search) }]
        searchArray.push({ slug: search })
      }
      if (modelName == 'permission') {
        searchArray = [{ name: new RegExp(search) }]
        searchArray.push({ roles_name: search })
      }

      if (modelName == 'users') {
        searchArray = [{ firstName: new RegExp(search) }]
        searchArray.push({ email: search })
      }

      if (modelName == 'crops') {
        searchArray = [{ cropName: new RegExp(search) }]
        searchArray.push({ cropType: new RegExp(search) })
      }

      if (modelName == 'farms') {
        searchArray = [{ farmOwnerId: new RegExp(search) }]
        searchArray.push({ farmOwnerId: new RegExp(search) })
      }

      if (modelName == 'area') {
        searchArray = [{ areaName: new RegExp(search) }]
        searchArray.push({ state: new RegExp(search) })
        searchArray.push({ district: new RegExp(search) })
      }

      if (modelName == 'croptype') {
        searchArray = [{ cropTypeName: new RegExp(search) }]
        searchArray.push({ cropTypeName: new RegExp(search) })
      }

      if (modelName == 'survey') {
        searchArray = [{ surveyName: new RegExp(search) }]
        searchArray.push({ surveyName: new RegExp(search) })
      }

      if (modelName == 'users') {
        searchArray = [{ firstName: new RegExp(search) }]
        searchArray.push({ email: new RegExp(search) })
      }

      if(modelName == 'distillery'){
        searchArray = [{ distilleryBatchFor: new RegExp(search) }]
        searchArray.push({ distilleryBatchFor: new RegExp(search) })
      }

      if(modelName == 'purchase'){
        searchArray = [{ distilleryBatch: new RegExp(search) }]
        searchArray.push({ distilleryBatch: new RegExp(search) })
      }

      if (search.length > 0) {
        query.$and.push({ $or: searchArray })
      }
      this.query = this.query.find(query);
    }
    return this;
  }
}

export default APIFeatures;
