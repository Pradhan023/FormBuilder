import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Taskcomp from "./Taskcomp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formData = [
  {
    type: "text",
    label: "First Name",
  },
  {
    type: "text",
    label: "Last Name",
  },
  {
    type: "text",
    label: "Mobile number",
  },
  {
    type: "email",
    label: "Email",
  },
];
const Fieldcreate = () => {
  const Nav = useNavigate();

  // dropdown menu 
  const [fieldtext, setFieldtext] = useState({
    type: "",
  });

  // text input 
  const [inputtext, setInputtext] = useState({
    type: "",
    label: "",
  });

  // checkbox
  const [checkbox, setCheckbox] = useState({
    type: "",
    label: "",
    check1: "",
    check2: "",
  });

  // select
  const [selectoption, setOption] = useState({
    type: "",
    label: "",
    options: [],
  });

  // option data will save inside it 
  const [optionstring, setOptionstring] = useState("");

  // type of dropdown menu
  const [typesave, setType] = useState("");

  // drop down value
  const typeVal = ["text", "checkbox", "select"];

  // onChange
  const handleChange = (e) => {
    e.preventDefault();
    setType(e.target.value);
    setFieldtext({ ...fieldtext, type: e.target.value });
  };

  // it will push option value to option array as much as you want
  const pushString = () => {
    selectoption.options.push(optionstring);
    setOptionstring("");
  };

  // function for to add input data in formData array
  const enterData = () => {
    if (typesave == "text") {

      // making the shallow copy to add type key
      const newObj = { ...inputtext, type: fieldtext.type };
      formData.push(newObj);
      setInputtext({
        type: "",
        label: "",
      });
      setFieldtext({ type: "" });
    } 
    else if (typesave == "checkbox") {
      const newObj = { ...checkbox, type: fieldtext.type };
      formData.push(newObj);
      setCheckbox({
        type: "",
        label: "",
        check1: "",
        check2: "",
      });
    }
    if (typesave == "select") {
      // this statement will check if option field is have value if yes then it will show the alert
      if (optionstring) {
        alert("Add Option");
      } 
      else {
        const newObj = { ...selectoption, type: fieldtext.type };
        // console.log(newObj);
        formData.push(newObj);
        setOption({
          type: "",
          label: "",
          options: [],
        });
      }
    }
  };

  // this function will generate the form and push to database and render the generated form 
  const generateForm = async () => {
    const data = await axios.post(
      "https://formbuilder-api.onrender.com/form/adddata",
      formData
    );
    Nav("/gereratedform");
  };

  return (
    <div className="bg-slate-200 px-8 h-[100%] min-h-screen">
      <div className="flex flex-col items-center pb-3">
        <h1 className="font-bold text-4xl text-cyan-700">Form Builder</h1>
        <p className=" text-red-800 font-bold">Build Your Custom Form</p>
      </div>

      {/* colm grid form and edit input */}

      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 py-14 bg-white rounded-xl">
        {/* form colm */}
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-xl text-gray-500">Preview</h1>
          {formData.map((i, n) => (
            // dummy form component
            <Taskcomp data={i} index={n} id={i.id} key={n} />
          ))}
        </div>

        {/* edit input */}
        <div className="">
          <h1 className="text-xl pb-3">Add field Input</h1>
          <div className="flex flex-col gap-4 w-1/2">
            {/* label */}
            <FormControl>
              <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type Input"
                name="type"
                value={fieldtext.type}
                onChange={handleChange}
              >
                {typeVal.map((i) => {
                  return (
                    <MenuItem value={i} key={i}>
                      {i}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {fieldtext.type == "text" && (
              <>
                <TextField
                  id="outlined-basic"
                  label="Label Input"
                  name="label"
                  value={inputtext.label}
                  onChange={(e) =>
                    setInputtext({ ...inputtext, label: e.target.value })
                  }
                  variant="outlined"
                />
              </>
            )}
            {fieldtext.type == "checkbox" && (
              <>
                <TextField
                  id="outlined-basic"
                  label="Label Input"
                  name="checklabel"
                  value={checkbox.label}
                  onChange={(e) =>
                    setCheckbox({ ...checkbox, label: e.target.value })
                  }
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Checkbox1"
                  name="check1"
                  value={checkbox.check1}
                  onChange={(e) =>
                    setCheckbox({ ...checkbox, check1: e.target.value })
                  }
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Checkbox2"
                  name="check2"
                  value={checkbox.check2}
                  onChange={(e) =>
                    setCheckbox({ ...checkbox, check2: e.target.value })
                  }
                  variant="outlined"
                />
              </>
            )}
            {fieldtext.type == "select" && (
              <>
                <TextField
                  id="outlined-basic"
                  label="Label Input"
                  name="selectlabel"
                  value={selectoption.label}
                  onChange={(e) =>
                    setOption({ ...selectoption, label: e.target.value })
                  }
                  variant="outlined"
                />
                <div className="flex gap-2">
                  <TextField
                    id="outlined-basic"
                    label="Enter Options"
                    // name="selectoption"
                    value={optionstring}
                    onChange={(e) => setOptionstring(e.target.value)}
                    variant="outlined"
                  />
                  <Button onClick={pushString} variant="contained">
                    Add options
                  </Button>
                </div>
              </>
            )}
            <Button onClick={enterData} variant="contained">
              <p className="text-xl py-1">Add</p>
            </Button>
            <Button onClick={generateForm} variant="contained">
              <p className="text-xl py-1">Generate</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fieldcreate;
