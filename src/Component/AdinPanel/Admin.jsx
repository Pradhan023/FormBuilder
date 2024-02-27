import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Admin = () => {
  // data from db will save here
  const [data, setData] = useState([]);
  const token = localStorage.getItem("formtoken");
  const [val, setVal] = useState();

  const deleteItem = async (i) => {
    const id = i._id;
    // console.log(data);
    const data = await axios.post(
      "https://formbuilder-api.onrender.com/form/admindeletefield",
      { id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setVal(data.data);
  };

  useEffect(() => {
    (async () => {
      const dataadmin = await axios.get(
        "https://formbuilder-api.onrender.com/form/getadmindata",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setData(dataadmin.data);
    })();
  }, [val]);

  return (
    <div className="bg-slate-200 h-screen px-12">
      <h1 className="text-center text-5xl font-bold text-cyan-600">
        Admin Panel
      </h1>

      {/* dashbord */}
      <div className=" bg-slate-50 h-[90%] px-5 pt-3 rounded-xl mt-2">
        <div className=" flex text-xl ">
          No. of Form Created :{" "}
          <span className="font-bold pl-4">{data.length}</span>
        </div>
        {data.length == 0 ? (
          <p className="text-3xl font-bold text-gray-300 text-center pt-24">
            No Data ...
          </p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              {data?.map((i) => {
                const newData = Object.values(i.Objdata); //getting the values of object
                const keyobj = Object.keys(i.Objdata); //getting the keys of object
                return (
                  <>
                    <TableHead>
                      <TableRow>
                        {keyobj.map((i, n) => {
                          return <TableCell align="center">{i}</TableCell>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className="bg-gray-100">
                        {newData?.map((i, n) => {
                          console.log(i);
                          return (
                            <TableCell align="center">
                              {i.slice(0, 15)}
                            </TableCell>
                          );
                        })}
                        <div
                          className="wi-fit  flex items-center justify-center h-[3rem]"
                          onClick={() => deleteItem(i)}
                        >
                          <DeleteIcon />
                        </div>
                      </TableRow>
                    </TableBody>
                  </>
                );
              })}
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Admin;
