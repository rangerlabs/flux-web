import { MutationTree } from 'vuex';
import { WorkloadsState } from '../types/Workloads/WorkloadsState';
import { Workload } from '../types/Workloads/Workload';

export const mutations: MutationTree<WorkloadsState> = {
    CHANGE_SEARCH_TERM: (state: WorkloadsState, searchTerm: string) => state.searchTerm = searchTerm,
    UPDATE_WORKLOADS: (state: WorkloadsState, workloads: Workload[]) => state.workloads = workloads,
    UPDATE_SELECTED_TAG: (state: WorkloadsState, {workload, tag}) =>  {
        const w = state.workloads.find((w: Workload) => (workload.id == w.id && w.container == workload.container));
        if (!w) {
            throw new Error(`Unable to update workload, workload (${workload.id}) not found`);
        }
        w.selected_tag = tag;
    },
    UPDATE_WORKLOAD_STATUS: (state: WorkloadsState, {workload, status}) => {
        console.log(workload, status);
        const workloadInst = state.workloads.find((w) => w.id == workload.id && w.container == workload.container);
        if (!workloadInst) {
            throw new Error(`Unable to update workload, workload (${workload.id}) not found`);
        }
        workloadInst.status = status;
    },
};
