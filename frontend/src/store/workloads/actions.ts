import { ActionTree } from 'vuex';
import { RootState } from '../types/RootState';
import { WorkloadsState } from '../types/Workloads/WorkloadsState';
import { workloadsTransformer } from './transformers';
import { Workload } from '../types/Workloads/Workload';
import { WorkloadStatuses } from '../types/Workloads/WorkloadStatuses';
import axios from 'axios';
import { Tag } from '../types/Workloads/Tag';

export const actions: ActionTree<WorkloadsState, RootState> = {
    changeSearchTerm: ({commit}, searchTerm: string) => commit('CHANGE_SEARCH_TERM', searchTerm),
    updateWorkloadStatus:  ({commit}, payload) => commit('UPDATE_WORKLOAD_STATUS', payload),
    updateSelectedTag:  ({commit}, payload) => commit('UPDATE_SELECTED_TAG', payload),
    fetchWorkloads: ({commit}, namespace: string): any => axios.get('/workloads/' + namespace).then(
        (response: any) => {
            const workloads = workloadsTransformer(response.data);
            commit('UPDATE_WORKLOADS', workloads);
        },
    ),
    releaseVersion: ({dispatch}, {workload, releaseData}): any => axios.post('/release', releaseData).then(
      ()  => dispatch('updateWorkloadStatus', {workload, status: WorkloadStatuses.releasing}),
    ),
};
