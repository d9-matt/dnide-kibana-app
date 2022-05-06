import store from '../redux/store';
import { updatePortal9NotReadyYet } from '../redux/actions/appStateActions';
import { WzRequest } from '../react-services/wz-request';

export class CheckDaemonsStatus {
  constructor($rootScope, $timeout) {
    this.$rootScope = $rootScope;
    this.tries = 10;
    this.$timeout = $timeout;
    this.busy = false;
  }

  async makePing() {
    try {
      if (this.busy) return;

      this.busy = true;

      let isValid = false;
      while (this.tries--) {
        await this.$timeout(1200);
        const result = await WzRequest.apiReq('GET', '/ping', {});
        isValid = ((result || {}).data || {}).isValid;
        if (isValid) {
          const updateNotReadyYet = updatePortal9NotReadyYet(false);
          store.dispatch(updateNotReadyYet);

          this.$rootScope.portal9NotReadyYet = false;
          this.$rootScope.$applyAsync();
          break;
        }
      }

      if (!isValid) {
        throw new Error('Not recovered');
      }

      this.tries = 10;
    } catch (error) {
      this.tries = 10;

      const updateNotReadyYet = updatePortal9NotReadyYet(
        'Portal9 could not be recovered.'
      );
      store.dispatch(updateNotReadyYet);

      this.$rootScope.portal9NotReadyYet = 'Portal9 could not be recovered.';
      this.$rootScope.$applyAsync();
    }

    this.busy = false;
  }
}
