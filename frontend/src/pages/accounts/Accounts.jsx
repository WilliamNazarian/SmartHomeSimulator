import { useLoaderData } from "react-router-dom";
import { IoIosMan } from "react-icons/io";
import { PiBabyBold } from "react-icons/pi";
import { FaPlus, FaUserSecret } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Accounts() {
  let userProfiles = useLoaderData();
  const [profiles, setProfiles] = useState(userProfiles);
  const navigate = useNavigate();

  const deleteHandler = async (event) => {
    const profileUsername = event.target.name;

    try {
      const response = await fetch(`/api/profile/deleteprofile`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileUsername: profileUsername,
          email: localStorage.getItem("email"),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      setProfiles(result);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };

  const profileComponents = profiles.map((profile, index) => {
    let circleColor = "";
    let IconComponent = null;

    switch (profile.profile_type) {
      case "parent":
        circleColor = "bg-blue-400";
        IconComponent = <IoIosMan className="w-8 h-8" />;
        break;
      case "child":
        circleColor = "bg-lime-400";
        IconComponent = <PiBabyBold className="w-8 h-8" />;
        break;
      case "guest":
        circleColor = "bg-yellow-400";
        IconComponent = <FaPersonWalkingLuggage className="w-8 h-8" />;
        break;
      case "stranger":
        circleColor = "bg-red-400";
        IconComponent = <FaUserSecret className="w-8 h-8" />;
        break;
      default:
        break;
    }

    return (
      <div key={index} className="flex flex-col p-4">
        <div className={`flex items-center justify-center m-2 ${circleColor} rounded-full w-20 h-20`}>{IconComponent}</div>
        <p className="text-center">
          {profile.profile_username}: {profile.profile_type}
        </p>
        <button onClick={deleteHandler} name={profile.profile_username} className="text-center text-red-600 hover:text-red-400">
          delete
        </button>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      
      <h2 className="font-medium text-3xl mb-4">
        
        Here Are Your User Profiles <span className="text-blue-600 text-4xl">{localStorage.getItem("username")}</span>
      </h2>
      <button onClick={() => navigate("/")} className=" text-slate-700 hover:text-slate-400 mb-10 underline">
        go back to homepage
      </button>
      <div className="flex flex-row">{profileComponents}</div>
      <button onClick={() => navigate("/addprofile")} className="flex items-center justify-center bg-gray-400 hover:bg-gray-300 rounded-full w-20 h-20 p-4 ">
        <FaPlus className="w-8 h-8" />
      </button>
    
    </div>
  );
}

export default Accounts;
