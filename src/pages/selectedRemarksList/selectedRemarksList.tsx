import { PropsWithChildren } from "react";
import { SelectedRemarksListData } from "./SelectedRemarksListData";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { RemarkContect, RemarksList } from "./selectedRemarksStyle";
import { useDispatch, useSelector } from "react-redux";
import { Remark } from "../../models/Remark";
import { SelecedRemark } from "../../models/SelectedRemark";
import { addRemark, deleteRemark } from "../../state/remarks.slice";
import { reducePoints } from "../../state/testParts.slice";

function SelectedRemarksList() {
  const selectedRemarks = useSelector((state: any) => state.remarks.selectedRemarks);
  const dispatch = useDispatch();
  const { isPrintMode } = useSelector((state: any) => state.testParts);

  const deleteSelectedRemark = (remark:SelecedRemark)=>{
    dispatch(reducePoints({testPart:remark.Remark.TestPartId, pointsToReduce:-(remark.Remark.RemarkPoints||0)}))
    dispatch(deleteRemark(remark.Remark.RemarkId));
  }

  return (
    <>
      <RemarksList>
        <List dense={false}>
          {selectedRemarks?.map((remark: SelecedRemark) => (
            <ListItem
              key={remark.Remark.RemarkId}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={()=>deleteSelectedRemark(remark)}
                >
               {!isPrintMode &&  <DeleteIcon />}  
                </IconButton>
              }
            >
                 <ListItemAvatar>
                <Avatar>{remark.Sum}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  remark.Remark.RemarkId + " " + remark.Remark.RemarkName
                }
                secondary={
                  <RemarkContect>
                    {remark.Remark.RemarkDsc} <br />{" "}
                    {remark.Remark.RemarkPoints + " נקודות"}
                  </RemarkContect>
                }
              />
           
            </ListItem>
          ))}
        </List>
      </RemarksList>
    </>
  );
}

export default SelectedRemarksList;
