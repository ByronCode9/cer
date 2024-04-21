import React, { useState, useEffect } from "react";
import "./style.css";
import Cookies from "js-cookie";
import { getUserById } from "../../services/api";
import AppHeader from "../Header";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    twitter: "",
    discord: "",
    telegram: "",
    instagram: "",
  });
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       setLoading(true);
  //       const userCookie = Cookies.get("user");
  //       const storedUser = JSON.parse(userCookie);
  //       const id = storedUser._id;

  //       // Fetch user data
  //       const response = await getUserById(id);
  //       const userDataFromAPI = response.data;

  //       // Update the state with fetched user data
  //       setUserData({
  //         ...userData,
  //         firstName: userDataFromAPI.firstName,
  //         lastName: userDataFromAPI.lastName,
  //         email: userDataFromAPI.email,
  //         twitter: userDataFromAPI.twitter,
  //         discord: userDataFromAPI.discord,
  //         telegram: userDataFromAPI.telegram,
  //         instagram: userDataFromAPI.instagram,
  //       });

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Perform API call to update user data
      //   await fetch("API_ENDPOINT", {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(userData)
      //   });
      setLoading(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      setLoading(false);
    }
  };
  const userCookie = Cookies.get("user");
  const storedUser = JSON.parse(userCookie);

  return (
    <>
      {/* {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="text"
              name="twitter"
              value={userData.twitter}
              onChange={handleInputChange}
              placeholder="Twitter"
            />
          </div>
          <div>
            <input
              type="text"
              name="discord"
              value={userData.discord}
              onChange={handleInputChange}
              placeholder="Discord"
            />
          </div>
          <div>
            <input
              type="text"
              name="telegram"
              value={userData.telegram}
              onChange={handleInputChange}
              placeholder="Telegram"
            />
          </div>
          <div>
            <input
              type="text"
              name="instagram"
              value={userData.instagram}
              onChange={handleInputChange}
              placeholder="Instagram"
            />
          </div>
          <button type="submit">Save changes</button>
        </form>
      )} */}
      <div>
        <AppHeader />
      </div>
      <div class="p-8 w-full md:max-w-[75%] m-auto snipcss-H1LdI">
        <div class="mb-6 mt-6">
          <h1 class="text-zinc-500 text-xl font-[500] w-[70%]">
            Hello,{""}
            <span class="ml-2 text-neutral-200 text-ellipsis">
              {storedUser.username}
            </span>
          </h1>
        </div>
        <div class="flex profile-page max-md:flex-col gap-2">
          <div class=" max-md:justify-center max-md:w-full flex flex-col gap-4">
            <div
              class="border border-zinc-900 p-4 pb-6 flex flex-col gap-3 items-center justify-center style-os3Vo"
              id="style-os3Vo"
            >
              <img
                alt=""
                loading="lazy"
                width="131"
                height="100"
                decoding="async"
                data-nimg="1"
                src="https://app.aiaegis.org/icons/credits.svg"
                id="style-OocdJ"
                class="style-OocdJ"
              />
              <p class="text-zinc-50 font-[600] text-3xl">
                <span>0</span>
              </p>
              <p class="text-zinc-400 font-[400] text-sm">Credit Balance</p>
            </div>
            <div className="w-full">
              <nav class="flex md:flex-col max-md:w-full py-2 text-sm font-medium gap-1">
                <span class="flex max-md:w-1/3 items-center font-[500] justify-center gap-1 px-3 py-2 text-[16px] transition-all  bg-blue-600 text-zinc-50">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-[36px]"
                  >
                    <path
                      d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Profile
                </span>
                <span class="flex max-md:w-1/3 items-center justify-center font-[500] gap-1 px-3 py-2 text-[16px] transition-all  bg-zinc-900 text-zinc-600 hover:text-zinc-400">
                  <img
                    alt="token-audit"
                    loading="lazy"
                    width="20"
                    height="20"
                    decoding="async"
                    data-nimg="1"
                    src="https://app.aiaegis.org/icons/nav/token-audit.svg"
                    id="style-1K4ss"
                    class="style-1K4ss"
                  />
                  Audits
                </span>
                <span
                  class="flex max-md:w-1/3 items-center justify-center font-[500] gap-1 px-3 py-2 text-[16px] transition-all bg-zinc-900 text-zinc-600 hover:text-zinc-400"
                  href="#"
                >
                  <img
                    alt="token-audit"
                    loading="lazy"
                    width="20"
                    height="20"
                    decoding="async"
                    data-nimg="1"
                    src="https://app.aiaegis.org/icons/purchase.svg"
                    id="style-FC7Mb"
                    class="style-FC7Mb"
                  />
                  Payments
                </span>
              </nav>
            </div>
          </div>
          <main class="flex flex-1 flex-col gap-4 pt-0  md:gap-8 md:pt-0 md:p-6">
            <div class="w-full overflow-x-auto">
              <div class="flex flex-col pb-4">
                <h1 class="mt-3 text-lg font-semibold">Your profile</h1>
              </div>
              <div class="border shadow-sm bg-[#0b0b0c] border-zinc-800 p-4 mb-4">
                <h2 class="text-md pb-3 mb-4 border-b border-zinc-800">
                  Personal Information
                </h2>
                <div class="grid max-md:grid-cols-1 gap-6 md:flex-row md:gap-8 text-zinc-50">
                  <div class="col-span-1 space-y-2">
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center"
                      for="name"
                    >
                      First name
                    </label>
                    <input
                      class="profile-inputs flex h-10 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 style-wVM3z"
                      disabled=""
                      placeholder="First name"
                      id="style-wVM3z"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      name="firstName"
                    />
                  </div>
                  <div class="col-span-1 space-y-2">
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center"
                      for="phone"
                    >
                      Last name
                    </label>
                    <input
                      class="profile-inputs flex h-10 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 style-wVM3z"
                      disabled=""
                      placeholder="Last name"
                      id="lastName"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      name="lastName"
                      style={{ backgroundColor: "#27272A" }}
                    />
                  </div>
                  <div class="col-span-1 space-y-2">
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center"
                      for="email"
                    >
                      Email
                    </label>
                    <input
                      class="profile-inputs flex h-10 w-full rounded-md border border-zinc-200  px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 style-siQOW"
                      disabled="true"
                      placeholder="Enter your email address"
                      id="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      name="email"
                    />
                  </div>
                </div>
              </div>
              <div class="border shadow-sm bg-[#0b0b0c] border-zinc-800 p-4 mb-4">
                <h2 class="text-md pb-3 mb-4 border-b border-zinc-800">
                  Socials
                </h2>
                <div class="grid grid-cols-1 gap-6 md:flex-row md:gap-8 text-zinc-50">
                  <div class="col-span-1 grid max-md:grid-cols-1 grid-cols-2 gap-6">
                    <div class="col-span-1 space-y-2">
                      <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center"
                        for="name"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 512 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                        </svg>
                        X (formerly twitter)
                      </label>
                      <input
                        class="profile-inputs flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 style-GDxVT"
                        disabled="true"
                        placeholder="@username"
                        id="style-GDxVT"
                      />
                    </div>
                    <div class="col-span-1 space-y-2">
                      <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center"
                        for="email"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 512 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M464 66.52A50 50 0 00414.12 17L97.64 16A49.65 49.65 0 0048 65.52V392c0 27.3 22.28 48 49.64 48H368l-13-44 109 100zM324.65 329.81s-8.72-10.39-16-19.32C340.39 301.55 352.5 282 352.5 282a139 139 0 01-27.85 14.25 173.31 173.31 0 01-35.11 10.39 170.05 170.05 0 01-62.72-.24 184.45 184.45 0 01-35.59-10.4 141.46 141.46 0 01-17.68-8.21c-.73-.48-1.45-.72-2.18-1.21-.49-.24-.73-.48-1-.48-4.36-2.42-6.78-4.11-6.78-4.11s11.62 19.09 42.38 28.26c-7.27 9.18-16.23 19.81-16.23 19.81-53.51-1.69-73.85-36.47-73.85-36.47 0-77.06 34.87-139.62 34.87-139.62 34.87-25.85 67.8-25.12 67.8-25.12l2.42 2.9c-43.59 12.32-63.44 31.4-63.44 31.4s5.32-2.9 14.28-6.77c25.91-11.35 46.5-14.25 55-15.21a24 24 0 014.12-.49 205.62 205.62 0 0148.91-.48 201.62 201.62 0 0172.89 22.95s-19.13-18.15-60.3-30.45l3.39-3.86s33.17-.73 67.81 25.16c0 0 34.87 62.56 34.87 139.62 0-.28-20.35 34.5-73.86 36.19z"></path>
                          <path d="M212.05 218c-13.8 0-24.7 11.84-24.7 26.57s11.14 26.57 24.7 26.57c13.8 0 24.7-11.83 24.7-26.57.25-14.76-10.9-26.57-24.7-26.57zm88.38 0c-13.8 0-24.7 11.84-24.7 26.57s11.14 26.57 24.7 26.57c13.81 0 24.7-11.83 24.7-26.57S314 218 300.43 218z"></path>
                        </svg>
                        Discord
                      </label>
                      <input
                        class="profile-inputs flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 style-DIS5A"
                        disabled="true"
                        placeholder="@username"
                        id="style-DIS5A"
                      />
                    </div>
                  </div>
                  <div class="col-span-1 grid max-md:grid-cols-1 grid-cols-2 gap-6">
                    <div class="space-y-2 col-span-1">
                      <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center"
                        for="name"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 496 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path>
                        </svg>
                        Telegram
                      </label>
                      <input
                        class="profile-inputs flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 style-8Be49"
                        disabled="true"
                        placeholder="@username"
                        id="style-8Be49"
                      />
                    </div>
                    <div class="space-y-2 col-span-1">
                      <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-2 items-center"
                        for="email"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                        </svg>
                        Instagram
                      </label>
                      <input
                        class="profile-inputs flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 style-X4GJh"
                        disabled="true"
                        placeholder="@username"
                        id="style-X4GJh"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class=" shadow-sm">
                <button
                  class="save-button inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 style-ZRvOf"
                  id="style-ZRvOf"
                >
                  <img
                    alt="save-icon"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    src="https://app.aiaegis.org/icons/save.svg"
                    id="style-EL3kN"
                    class="style-EL3kN"
                  />
                  <p class="text-zinc-600 text-[16px] ml-1 font-semibold">
                    Save changes
                  </p>
                </button>
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
