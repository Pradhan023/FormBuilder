import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const Taskcomp = ({ data, index }) => {
  let seVal;
  return (
    <div key={index}>
      {data.type !== "checkbox" && data.type !== "select" && (
        <div key={index}>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <TextField
              type={data.type}
              id="outlined-basic"
              label={data.label}
              variant="outlined"
            />
          </FormControl>
        </div>
      )}
      {data.type == "checkbox" && (
        <div className="flex items-center gap-4">
          <FormLabel component="legend">{data.checklabel}</FormLabel>
          <FormControlLabel
            control={<Checkbox name={data.check1} value={data.check1} />}
            label={data.check1}
          />
          <FormControlLabel
            control={<Checkbox name={data.check2} value={data.check2} />}
            label={data.check2}
          />
        </div>
      )}
      {data.type == "select" && (
        <div>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-label">
              {data.selectlabel}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={data.selectlabel}
              value={seVal}
            >
              {data.options.map((k) => {
                seVal = k;
                return (
                  <MenuItem value={k} key={k}>
                    {k}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default Taskcomp;
