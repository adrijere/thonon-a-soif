import { AsyncStorage } from "react-native";
import config from '../config/config';
import BackendRequest from '../utils/backendRequest';

export const ProductService = {
  /**
   *  Get my products
   *
   *  @return {Promise}
  */
  async getProducts() {
    const request = await new BackendRequest({
      method: 'get',
      route: config.products + '/values/A1:Z14',
      withAuthorization: true,
      withAPIVersionMatching: false,
    })
    await request.initialize()
    const data = await request.exec();

    return data
  },

  /**
   *  Get my filters
   *
   *  @return {Promise}
  */
  async getFilters() {
    const request = await new BackendRequest({
      method: 'get',
      route: config.filters + '/values/A1:Z14',
      withAuthorization: true,
      withAPIVersionMatching: false,
    })
    await request.initialize()
    const data = await request.exec();

    return data
  },
}
