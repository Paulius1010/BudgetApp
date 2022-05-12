import http from "../http-common";



  
class PaginationDataService {
  getAll(params) {
    return http.get("/income", { params });
  }
  // other CRUD methods
}
export default new PaginationDataService();