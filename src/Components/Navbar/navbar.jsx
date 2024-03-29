import "./navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import Popup from "reactjs-popup";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "@material-ui/core";
import { MdWifiCalling3 } from "react-icons/md";
import { Link } from "react-router-dom";

import "reactjs-popup/dist/index.css";
import Sidebar from "./Sidebar/sidebar";
import NavElementsBar from "../NavElementsBar";
import logo from "../../Utils/logo.png";
import { useNavigate } from "react-router";
import SlideDown from "react-slidedown";
import SearchItem from "../SearchItem/SearchItem";
import Scrollbars from "react-custom-scrollbars";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const [isPopupOpen, setPopup] = useState(false);
  const [isMenuopen, setMenubar] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const isMobileScreen = useMediaQuery("(max-width: 1250px)");
  const [searchValue, setSearchValue] = useState("");
  const isWebScreen = useMediaQuery("(min-width: 1250px)");
  const navigate = useNavigate();

  const getSearchData = async (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    const searchBody = {
      text: inputValue,
      cart_type: "ecommerce",
    };

    const searchFormData = new FormData();

    Object.entries(searchBody).forEach(([key, value]) => {
      searchFormData.append(key, value);
    });

    const api = `${baseUrl}searchData`;
    const options = {
      method: "POST",
      body: searchFormData,
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const emptySearch = () => {
    setSearchValue("");
    console.log("empty searcj called ");
  };

  return (
    <>
      {isMobileScreen && (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {isMenuopen && (
            <Sidebar setMenuOpen={setMenubar} isMenuopen={isMenuopen} />
          )}
          <div className="mbl-navbar-main-container">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mbl-navbar-logo"
              viewBox="0 0 197.4 44.93"
            >
              <path
                d="M67.07 9.52a7.39 7.39 0 0 1 5.39 2.17 7.13 7.13 0 0 1 2.2 5.31 7.12 7.12 0 0 1-2.19 5.26 7.39 7.39 0 0 1-5.39 2.17h-3.26v6.83h-5V9.52Zm0 10.23a2.46 2.46 0 0 0 1.93-.81 3 3 0 0 0 0-4 2.46 2.46 0 0 0-1.93-.72h-3.25v5.58Zm14.26-1.27a3.81 3.81 0 0 1 1.76-2.26 5.53 5.53 0 0 1 2.9-.79v5.27a4.66 4.66 0 0 0-3.18.57 3.14 3.14 0 0 0-1.47 3v7h-4.66V15.72h4.65ZM101 29.28a8.2 8.2 0 1 1 2.43-5.81 7.88 7.88 0 0 1-2.43 5.81Zm-8.37-3.18a3.67 3.67 0 0 0 5.08 0 3.56 3.56 0 0 0 1-2.63 3.57 3.57 0 0 0-1-2.63 3.67 3.67 0 0 0-5.08 0 3.57 3.57 0 0 0-1 2.63 3.56 3.56 0 0 0 1 2.64Zm22.66-10.82a6.85 6.85 0 0 1 5.24 2.37 8.3 8.3 0 0 1 2.17 5.81 8.3 8.3 0 0 1-2.17 5.81 6.85 6.85 0 0 1-5.24 2.37 5.79 5.79 0 0 1-4.62-1.89v7.67H106v-21.7h4.65v1.5a5.79 5.79 0 0 1 4.6-1.93Zm-3.62 10.94a3.94 3.94 0 0 0 5.3 0 3.69 3.69 0 0 0 1-2.76 3.69 3.69 0 0 0-1-2.76 3.94 3.94 0 0 0-5.3 0 3.7 3.7 0 0 0-1 2.76 3.7 3.7 0 0 0 1 2.76Zm22.71-10.94a5.54 5.54 0 0 1 4.14 1.72 6.47 6.47 0 0 1 1.66 4.71v9.52h-4.65v-8.84a2.76 2.76 0 0 0-.76-2.09 2.69 2.69 0 0 0-1.94-.73 2.79 2.79 0 0 0-2.11.81 3.32 3.32 0 0 0-.77 2.39v8.45h-4.65V9.52h4.7v7.7a5.14 5.14 0 0 1 4.42-1.93Zm20.24.43h4.65v15.51h-4.65v-1.46a5.79 5.79 0 0 1-4.62 1.89 6.85 6.85 0 0 1-5.24-2.37 8.3 8.3 0 0 1-2.17-5.81 8.3 8.3 0 0 1 2.17-5.81 6.85 6.85 0 0 1 5.24-2.37 5.79 5.79 0 0 1 4.62 1.93Zm-6.36 10.51a4 4 0 0 0 5.33 0 3.73 3.73 0 0 0 1-2.76 3.73 3.73 0 0 0-1-2.76 4 4 0 0 0-5.33 0 3.73 3.73 0 0 0-1 2.76 3.73 3.73 0 0 0 1 2.76Zm19.06-7.75a3.81 3.81 0 0 1 1.76-2.25 5.52 5.52 0 0 1 2.9-.79v5.27a4.66 4.66 0 0 0-3.18.57 3.14 3.14 0 0 0-1.47 3v7h-4.65V15.72h4.65Zm24.18-3.19a5.54 5.54 0 0 1 4.28 1.72 6.62 6.62 0 0 1 1.61 4.67v9.52h-4.65v-9.08a2.8 2.8 0 0 0-.57-1.86 2 2 0 0 0-1.66-.68 2.18 2.18 0 0 0-1.78.78 3.28 3.28 0 0 0-.63 2.14v8.73h-4.65v-9.11a2.8 2.8 0 0 0-.57-1.86 2 2 0 0 0-1.66-.68 2.18 2.18 0 0 0-1.78.78 3.28 3.28 0 0 0-.63 2.14v8.73h-4.65v-15.5h4.65v1.43a4.66 4.66 0 0 1 4.19-1.86 4.56 4.56 0 0 1 4.06 2 5.09 5.09 0 0 1 4.45-2Z"
                style={{ fill: "#184363" }}
              ></path>
              <path
                d="M40.4 14.37h-7.64V6.72A6.72 6.72 0 0 0 26 0h-4.9a6.73 6.73 0 0 0-6.73 6.72v7.64H6.72A6.72 6.72 0 0 0 0 21.08V26a6.73 6.73 0 0 0 6.72 6.73h7.65c0 4.31-.5 7.25-2.14 10.17a1.39 1.39 0 0 0 1.53 2c5.32-1.23 15.48-4.53 19-12.2h7.65a6.72 6.72 0 0 0 6.72-6.7v-4.9a6.73 6.73 0 0 0-6.72-6.73Zm-18.64 15a2.31 2.31 0 0 1-1.64-.68l-4.47-4.47a2.32 2.32 0 0 1 3.28-3.28l2.83 2.83 6.43-6.43a2.32 2.32 0 0 1 3.28 3.28l-8.07 8.07a2.31 2.31 0 0 1-1.64.65Z"
                style={{ fill: "#15a9e3" }}
              ></path>
            </svg> */}
            <div className="mbl-navbar-logo" onClick={() => navigate("/")}>
              <Link to="/">
                <img src={logo} className="navbar-logo" />
              </Link>
              <div className="navbar-logo-content-container">
                <p style={{ margin: 0 }}>Bachat Guruu</p>
                <p style={{ margin: 0 }}>ISSE SASTA AUR KAHAN</p>
              </div>
            </div>
            <div className="mbl-navbar-icons-container">
              <CiSearch
                className="mbl-navbar-icons"
                onClick={() => setPopup(!isPopupOpen)}
              />
              <RxHamburgerMenu
                className="mbl-navbar-icons"
                onClick={() => setMenubar(!isMenuopen)}
              />
            </div>

            <Popup
              open={isPopupOpen}
              overlayStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }}
              contentStyle={{
                background: "transparent",
                border: "none",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "90%",
                width: "100%",
              }}
            >
              <div className="mbl-search-close-popup-icon-container">
                <AiOutlineClose
                  className="mbl-search-close-popup-icon"
                  onClick={() => setPopup(!isPopupOpen)}
                />
              </div>
              <div className="mbl-search-modal">
                <input
                  className="mbl-category-search"
                  placeholder="What are you looking for ?"
                  style={{ padding: "20px" }}
                  type="search"
                  value={searchValue}
                  onChange={(event) => getSearchData(event)}
                />
                <button className="mbl-search-btn">Search</button>
              </div>
              {searchResults && searchValue && (
                <SlideDown className="navbar-search-slide-down-container">
                  <Scrollbars>
                    {searchResults.map((el) => (
                      <>
                        <SearchItem
                          details={el}
                          emptySearch={emptySearch}
                          key={el.id}
                        />
                      </>
                    ))}
                  </Scrollbars>
                </SlideDown>
              )}
            </Popup>
          </div>
        </div>
      )}
      {isWebScreen && (
        <div className="navbar">
          <div className="navbar-main-container">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="navbar-logo"
              viewBox="0 0 197.4 44.93"
            >
              <path
                d="M67.07 9.52a7.39 7.39 0 0 1 5.39 2.17 7.13 7.13 0 0 1 2.2 5.31 7.12 7.12 0 0 1-2.19 5.26 7.39 7.39 0 0 1-5.39 2.17h-3.26v6.83h-5V9.52Zm0 10.23a2.46 2.46 0 0 0 1.93-.81 3 3 0 0 0 0-4 2.46 2.46 0 0 0-1.93-.72h-3.25v5.58Zm14.26-1.27a3.81 3.81 0 0 1 1.76-2.26 5.53 5.53 0 0 1 2.9-.79v5.27a4.66 4.66 0 0 0-3.18.57 3.14 3.14 0 0 0-1.47 3v7h-4.66V15.72h4.65ZM101 29.28a8.2 8.2 0 1 1 2.43-5.81 7.88 7.88 0 0 1-2.43 5.81Zm-8.37-3.18a3.67 3.67 0 0 0 5.08 0 3.56 3.56 0 0 0 1-2.63 3.57 3.57 0 0 0-1-2.63 3.67 3.67 0 0 0-5.08 0 3.57 3.57 0 0 0-1 2.63 3.56 3.56 0 0 0 1 2.64Zm22.66-10.82a6.85 6.85 0 0 1 5.24 2.37 8.3 8.3 0 0 1 2.17 5.81 8.3 8.3 0 0 1-2.17 5.81 6.85 6.85 0 0 1-5.24 2.37 5.79 5.79 0 0 1-4.62-1.89v7.67H106v-21.7h4.65v1.5a5.79 5.79 0 0 1 4.6-1.93Zm-3.62 10.94a3.94 3.94 0 0 0 5.3 0 3.69 3.69 0 0 0 1-2.76 3.69 3.69 0 0 0-1-2.76 3.94 3.94 0 0 0-5.3 0 3.7 3.7 0 0 0-1 2.76 3.7 3.7 0 0 0 1 2.76Zm22.71-10.94a5.54 5.54 0 0 1 4.14 1.72 6.47 6.47 0 0 1 1.66 4.71v9.52h-4.65v-8.84a2.76 2.76 0 0 0-.76-2.09 2.69 2.69 0 0 0-1.94-.73 2.79 2.79 0 0 0-2.11.81 3.32 3.32 0 0 0-.77 2.39v8.45h-4.65V9.52h4.7v7.7a5.14 5.14 0 0 1 4.42-1.93Zm20.24.43h4.65v15.51h-4.65v-1.46a5.79 5.79 0 0 1-4.62 1.89 6.85 6.85 0 0 1-5.24-2.37 8.3 8.3 0 0 1-2.17-5.81 8.3 8.3 0 0 1 2.17-5.81 6.85 6.85 0 0 1 5.24-2.37 5.79 5.79 0 0 1 4.62 1.93Zm-6.36 10.51a4 4 0 0 0 5.33 0 3.73 3.73 0 0 0 1-2.76 3.73 3.73 0 0 0-1-2.76 4 4 0 0 0-5.33 0 3.73 3.73 0 0 0-1 2.76 3.73 3.73 0 0 0 1 2.76Zm19.06-7.75a3.81 3.81 0 0 1 1.76-2.25 5.52 5.52 0 0 1 2.9-.79v5.27a4.66 4.66 0 0 0-3.18.57 3.14 3.14 0 0 0-1.47 3v7h-4.65V15.72h4.65Zm24.18-3.19a5.54 5.54 0 0 1 4.28 1.72 6.62 6.62 0 0 1 1.61 4.67v9.52h-4.65v-9.08a2.8 2.8 0 0 0-.57-1.86 2 2 0 0 0-1.66-.68 2.18 2.18 0 0 0-1.78.78 3.28 3.28 0 0 0-.63 2.14v8.73h-4.65v-9.11a2.8 2.8 0 0 0-.57-1.86 2 2 0 0 0-1.66-.68 2.18 2.18 0 0 0-1.78.78 3.28 3.28 0 0 0-.63 2.14v8.73h-4.65v-15.5h4.65v1.43a4.66 4.66 0 0 1 4.19-1.86 4.56 4.56 0 0 1 4.06 2 5.09 5.09 0 0 1 4.45-2Z"
                style={{ fill: "#184363" }}
              ></path>
              <path
                d="M40.4 14.37h-7.64V6.72A6.72 6.72 0 0 0 26 0h-4.9a6.73 6.73 0 0 0-6.73 6.72v7.64H6.72A6.72 6.72 0 0 0 0 21.08V26a6.73 6.73 0 0 0 6.72 6.73h7.65c0 4.31-.5 7.25-2.14 10.17a1.39 1.39 0 0 0 1.53 2c5.32-1.23 15.48-4.53 19-12.2h7.65a6.72 6.72 0 0 0 6.72-6.7v-4.9a6.73 6.73 0 0 0-6.72-6.73Zm-18.64 15a2.31 2.31 0 0 1-1.64-.68l-4.47-4.47a2.32 2.32 0 0 1 3.28-3.28l2.83 2.83 6.43-6.43a2.32 2.32 0 0 1 3.28 3.28l-8.07 8.07a2.31 2.31 0 0 1-1.64.65Z"
                style={{ fill: "#15a9e3" }}
              ></path>
            </svg> */}
            <div
              className="navbar-logo-container"
              onClick={() => navigate("/")}
            >
              <Link to="/">
                {" "}
                <img src={logo} className="navbar-logo" />
              </Link>
              <div className="navbar-logo-content-container">
                <p style={{ margin: 0 }}>Bachat Guruu</p>
                <p style={{ margin: 0 }}>ISSE SASTA AUR KAHAN</p>
              </div>
            </div>
            <div className="search-bar-container">
              <div className="navbar-icons-container">
                <input
                  className="category-search"
                  type="search"
                  placeholder="What are you looking for ?"
                  value={searchValue}
                  onChange={(event) => getSearchData(event)}
                />
                <div className="navbar-search-icon-container">
                  <CiSearch className="navbar-icons" />
                </div>
              </div>
            </div>
            <div className="contact-details-container">
              <div>
                <MdWifiCalling3 className="navbar-contact-icon" />
              </div>
              <div>
                <p className="navbar-contact-details-para">
                  Sales & Service Support
                </p>
                <p className="navbar-contact-details-para">123-456789</p>
              </div>
            </div>
          </div>
          {searchValue && (
            <SlideDown className="navbar-search-slide-down-container">
              <Scrollbars>
                {searchResults && searchResults.length > 0 ? (
                  <>
                    {searchResults.map((el) => (
                      <>
                        <SearchItem details={el} emptySearch={emptySearch} />
                      </>
                    ))}
                  </>
                ) : (
                  <p style={{ textAlign: "center" }}>No Results Found</p>
                )}
              </Scrollbars>
            </SlideDown>
          )}
          <hr className="navbar-hr-line" />
          <NavElementsBar />
        </div>
      )}
    </>
  );
};

export default Navbar;
