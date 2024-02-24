import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GeneratedForm = () => {
  const Nav = useNavigate()
  // const formData = [
  //   {
  //     type: "text",
  //     label: "First Name",
  //   },
  //   {
  //     type: "text",
  //     label: "Last Name",
  //   },
  //   {
  //     type: "text",
  //     label: "Mobile number",
  //   },
  //   {
  //     type: "email",
  //     label: "Email",
  //   },

  //   {
  //     type: "checkbox",
  //     label: "Gender",
  //     check1: "male",
  //     check2: "female",
  //   },
  //   {
  //     type: "select",
  //     label: "Car",
  //     options: ["bmw", "Audi", "Ferrari"],
  //   },
  // ];
  const[formData,setFormData] = useState([])
  const AllKeys = formData?.map((i) => i.label);
  // console.log(AllKeys);
  let seVal;
  const clearedText = {};
  AllKeys?.forEach((key) => {
    clearedText[key] = "";
  });

  // setText(clearedText);
  const [errorval, setErrorval] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [text, setText] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(text).length != formData.length) {
      setErrorval(true);
    } else {
      setErrorval(false);
      setText(clearedText);
      const obj = {Objdata:text}
      console.log(obj);
      axios.post("https://formbuilder-api.onrender.com/form/addadmindata",obj)
      axios.delete("https://formbuilder-api.onrender.com/form/deleteformdata")
      Nav('/')
      // console.log(text);
    }
    setText({});
    // console.log(text);
  };
  useEffect(()=>{
    (async()=>{
    const data = await axios.get("https://formbuilder-api.onrender.com/form/getdata")
      console.log(data.data)
      setFormData(data.data)
    })()
  },[])
  console.log(formData);
  return (
    <div className="grid justify-center items-center py-10">
      <h1 className="text-center py-5 text-4xl w-[20rem] uppercase font-bold text-cyan-700">
        Form
      </h1>
      {
        formData.length == 0 ?<p className="text-3xl font-bold text-gray-300 py-60">No Form Created ....</p>
        :
        <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {formData.map((i, n) => {
          return (
            <>
              {i.type !== "checkbox" && i.type !== "select" && (
                <>
                  <FormControl fullWidth>
                    <TextField
                      error={errorval}
                      helperText={errorval ? "All Field is mendatory" : ""}
                      type={i.type}
                      id="outlined-basic"
                      label={i.label}
                      name={i.label}
                      value={text[i.label] || ""}
                      variant="outlined"
                      onChange={(e) =>
                        setText({ ...text, [e.target.name]: e.target.value })
                      }
                    />
                  </FormControl>
                </>
              )}
              {i.type == "checkbox" && (
                <div className="flex items-center gap-4">
                  <FormLabel component="legend" error={errorval}>
                    {i.label}
                  </FormLabel>
                  <FormControlLabel
                    helperText={errorval ? "All Field are mendatory" : ""}
                    name={i.label}
                    checked={checked}
                    onChange={(e) => {
                      setChecked(!checked);
                      setText({ ...text, [e.target.name]: e.target.value });
                    }}
                    control={<Checkbox value={i.check1} />}
                    label={i.check1}
                  />
                  <FormControlLabel
                    name={i.label}
                    checked={checked1}
                    onChange={(e) => {
                      setChecked1(!checked1);
                      setText({ ...text, [e.target.name]: e.target.value });
                    }}
                    control={<Checkbox value={i.check2} />}
                    label={i.check2}
                  />
                  <FormHelperText>
                    {errorval ? (
                      <p className="text-red-500">All Field are mendatory</p>
                    ) : (
                      ""
                    )}{" "}
                  </FormHelperText>
                </div>
              )}
              {i.type == "select" && (
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {i.label}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={i.label}
                      name={i.label}
                      onChange={(e) =>
                        setText({ ...text, [e.target.name]: e.target.value })
                      }
                      value={seVal}
                      error={errorval}
                    >
                      {i.options.map((k) => {
                        seVal = k;
                        return (
                          <MenuItem value={k} key={k}>
                            {k}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {errorval ? (
                        <p className="text-red-500">All Field are mendatory</p>
                      ) : (
                        ""
                      )}{" "}
                    </FormHelperText>
                  </FormControl>
                </div>
              )}
            </>
          );
        })}
        <button className="border-2 bg-cyan-500 text-white">
          <p className="text-xl py-1">SUBMIT</p>
        </button>
      </form>
        </>
      }
    </div>
  );
};

export default GeneratedForm;
