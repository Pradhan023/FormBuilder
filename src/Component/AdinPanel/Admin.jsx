import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin = () => {
  // data from db will save here
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const dataadmin = await axios.get(
        "https://formbuilder-api.onrender.com/form/getadmindata"
      );
      setData(dataadmin.data);
    })();
  }, []);

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
          <>
            {data?.map((i) => {
              const newData = Object.values(i.Objdata);
              const keyobj = Object.keys(i.Objdata);
              // console.log(newData);
              return (
                <>
                  <div className="flex gap-10 pt-5 justify-evenly">
                    {keyobj.map((i, n) => {
                      return (
                        <div key={n}>
                          <p>{i}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex border-2 bg-cyan-200 justify-evenly leading-loose text-lg capitalize">
                    {newData?.map((i, n) => {
                      console.log(i);
                      return (
                        <div className="text-center" key={n}>
                          <p className="w-[10rem]">{i.slice(0, 15)}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
