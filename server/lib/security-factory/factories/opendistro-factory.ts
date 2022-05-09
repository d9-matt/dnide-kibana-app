import { ISecurityFactory } from '../'
import { KibanaRequest, RequestHandlerContext } from 'src/core/server';
import { PORTAL9_SECURITY_PLUGIN_OPEN_DISTRO_FOR_ELASTICSEARCH } from '../../../../common/constants';

export class OpendistroFactory implements ISecurityFactory {
  platform: string = PORTAL9_SECURITY_PLUGIN_OPEN_DISTRO_FOR_ELASTICSEARCH;

  constructor(private opendistroSecurityKibana: any) {
  }

  async getCurrentUser(request: KibanaRequest, context:RequestHandlerContext) {
    try {
      const params = {
        path: `/_opendistro/_security/api/account`,
        method: 'GET',
      };

      const {body: authContext} = await context.core.elasticsearch.client.asCurrentUser.transport.request(params);
      const username = this.getUserName(authContext);
      return {username, authContext};
    } catch (error) {
      throw error; 
    }
  }

  getUserName(authContext:any) {
    return authContext['user_name']
  }
}