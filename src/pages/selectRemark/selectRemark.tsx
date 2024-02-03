import React, { ChangeEvent, PropsWithChildren, useCallback, useState } from "react";
import { TextField, Grid, Button, Typography } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason
} from "@mui/material/Autocomplete";
import { useEffect } from "react";
import { SelectRemarkData } from "./SelectRemarkData";
import { Remark } from "../../models/Remark";
import TestPart, { GetTestPart } from "../../models/TestPart";
import { RootGrid } from "../pagesStyle";
import { useDispatch, useSelector } from "react-redux";
import { addRemark } from "../../state/remarks.slice";
import { reducePoints } from "../../state/testParts.slice";
import { createSelector } from "@reduxjs/toolkit";

function SelectRemark(props: PropsWithChildren<SelectRemarkData>) {
  const remarksData = useSelector((state: any) => state.remarks.remarksData);
  const testPartsData = useSelector((state: any) => state.testParts.testPartsData);
  console.log({ remarksData });
  const dispatch = useDispatch();
  //

  const [filteredRemarks, setFilteredRemarks] = useState<Remark[]>([]);
  const [testParts, setTestParts] = useState<TestPart[]>([]);

  const [selectedRemark, setSelectedRemark] = useState<Remark | null>(null);
  const [selectedTestPart, setSelectedTestPart] = useState<TestPart | null>(
    null
  );

  useEffect(() => {
    setFilteredRemarks(remarksData);
  }, [remarksData]);

  useEffect(() => {
    setTestParts(testPartsData);
    console.log({ testPartsData });
  }, [testPartsData]);

  const remarkSelected = (
    event: ChangeEvent<{}>,
    value: Remark | null,
    reason: AutocompleteChangeReason
  ) => {
    setSelectedRemark(value);
    if (value != null) {
      setSelectedTestPart(GetTestPart(value.TestPartId, testParts));
    }
  };

  useEffect(() => {
    if (selectedRemark) {
      addRemarkToList();
      setTimeout(() => {
        changeSelectedTestPart(null);
        setSelectedRemark(null);
      }, 2000);
    }
  }, [selectedRemark]);

  const changeSelectedTestPart = (value: TestPart | null) => {
    setSelectedTestPart(value);
    if (value != null) {
      setSelectedRemark(null);
      setFilteredRemarks(
        remarksData?.filter((r: Remark) => r.TestPartId === value.TestPartId)
      );
    } else {
      setFilteredRemarks(remarksData);
    }
  }

  const testPartSelected = (
    event: ChangeEvent<{}>,
    value: TestPart | null,
    reason: AutocompleteChangeReason
  ) => {
    changeSelectedTestPart(value);
  };

  const addRemarkToList = () => {
    if (selectedRemark != null) {
      dispatch(addRemark(selectedRemark));
      dispatch(reducePoints({ testPart: selectedRemark.TestPartId, pointsToReduce: (selectedRemark.RemarkPoints || 0) }))
    }
  };

  return (
    <RootGrid container spacing={2}>
      <Grid item xs={8}>
        {/* <Typography align={"center"} variant="h5" gutterBottom>
                אנא בחרי את ההערות למבחן
            </Typography> */}
      </Grid>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            value={selectedTestPart}
            // inputValue={selectedTestPart.TestPartDsc}
            onChange={testPartSelected}
            options={testParts}
            getOptionLabel={(option) => option.TestPartDsc}
            style={{ width: 150 }}
            renderInput={(params) => (
              <TextField {...params} label="תחום הערה" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            value={selectedRemark}
            onChange={remarkSelected}
            options={filteredRemarks}
            getOptionLabel={(option) =>
              option.RemarkId + " " + option.RemarkDsc
            }
            style={{ width: 800 }}
            renderInput={(params) => (
              <TextField {...params} label="הערה" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
    </RootGrid>
  );
}

export default SelectRemark;
