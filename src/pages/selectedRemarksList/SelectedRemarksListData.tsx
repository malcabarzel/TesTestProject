import { SelecedRemark } from "../../models/SelectedRemark";


export interface SelectedRemarksListData{
    selectedRemarks:SelecedRemark[],
    deleteRemark:(remarkId:number)=>void
}