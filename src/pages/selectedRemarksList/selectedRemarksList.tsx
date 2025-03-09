import { PropsWithChildren, useMemo } from "react";
import { SelectedRemarksListData } from "./SelectedRemarksListData";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import IcecreamIcon from '@mui/icons-material/Icecream';
import { RemarkContect, RemarksList } from "./selectedRemarksStyle";
import { useDispatch, useSelector } from "react-redux";
import { Remark } from "../../models/Remark";
import { SelecedRemark } from "../../models/SelectedRemark";
import { addRemark, deleteRemark } from "../../state/remarks.slice";
import { reducePoints } from "../../state/testParts.slice";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function SelectedRemarksList() {
  const selectedRemarks = useSelector((state: any) => state.remarks.selectedRemarks);
  const dispatch = useDispatch();
  const { isPrintMode } = useSelector((state: any) => state.testParts);
  

  const remarksToPresent: SelecedRemark[] = useMemo(() => {
    if (!selectedRemarks)
      return [];
    
    let arr: SelecedRemark[] = [...selectedRemarks];
    if(!isPrintMode){
        arr = [...arr.reverse()];
    }
  
    return arr;
  }, [selectedRemarks, isPrintMode]);

  const deleteSelectedRemark = (remark: SelecedRemark) => {
    dispatch(reducePoints({ testPart: remark.Remark.TestPartId, pointsToReduce: -(remark.Remark.RemarkPoints || 0) }))
    dispatch(deleteRemark(remark.Remark.RemarkId));
  }

  const addSelectedRemark = (remark: SelecedRemark) => {
    dispatch(reducePoints({ testPart: remark.Remark.TestPartId, pointsToReduce: (remark.Remark.RemarkPoints || 0) }))
    dispatch(addRemark(remark.Remark));
  }

  return (
    <>
      <RemarksList>
        <List dense={false}>
          {remarksToPresent?.map((remark: SelecedRemark) => (
            <ListItem
              key={remark.Remark.RemarkId}
              secondaryAction={
                <>
                  {!isPrintMode &&
                    <>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteSelectedRemark(remark)}
                      >
                        <HighlightOffIcon/>
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => addSelectedRemark(remark)}
                      >
                        <IcecreamIcon />
                      </IconButton>
                    </>

                  }
                </>
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
                   {/* {remark.Remark.RemarkPoints + " נקודות"} */}
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
