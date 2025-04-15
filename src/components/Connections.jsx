import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addConnection } from "../utils/store/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections", {
        withCredentials: true,
      });
      // console.log("Connections", res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    console.log("No connections found");
    return;
  }
  if (connections.length === 0)
    return (
      <h1 className="mx-auto my-0 text-7xl text-white">
        {" "}
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, imgURL, gender, about, age } =
          connection.user;
        return (
          <div
            key={_id}
            className=" m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto flex items-center justify-between"
          >
            <div className="flex items-center">
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover"
                  src={imgURL}
                />
              </div>
              <div className="text-left mx-4 ">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                <div className="flex gap-2">
                  {" "}
                  {age && <p className="font-bold text-sm ">{age},</p>}
                  {gender && <p className="text-sm"> {gender}</p>}
                </div>
                <p>{about}</p>
              </div>
            </div>{" "}
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
