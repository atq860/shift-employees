import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./sidebar.scss";
import { userType } from "../../constants/userType";
import { logout } from "../../actions/userActions";

const adminSidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    to: "/",
    section: "",
  },
  {
    display: "Users",
    icon: <i className="bx bx-group"></i>,
    to: "/users",
    section: "users",
  },
  {
    display: "Requests",
    icon: <i className="bx bx-receipt"></i>,
    to: "/requests",
    section: "requests",
  },
  {
    display: "Profile",
    icon: <i className="bx bx-user"></i>,
    to: "/profile",
    section: "profile",
  },
];

const managerSidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    to: "/",
    section: "",
  },
  {
    display: "Employees",
    icon: <i className="bx bx-group"></i>,
    to: "/employees",
    section: "employees",
  },
  {
    display: "Announcements",
    icon: <i className="bx bx-news"></i>,
    to: "/announcements",
    section: "announcements",
  },
  {
    display: "Requests",
    icon: <i className="bx bx-receipt"></i>,
    to: "/requests",
    section: "requests",
  },
  {
    display: "Profile",
    icon: <i className="bx bx-user"></i>,
    to: "/profile",
    section: "profile",
  },
];

const employeeSidebarNavItems = [
  {
    display: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    to: "/",
    section: "",
  },
  {
    display: "My Schedule",
    icon: <i className="bx bx-calendar"></i>,
    to: "/mySchedule",
    section: "mySchedule",
  },
  {
    display: "Announcements",
    icon: <i className="bx bx-news"></i>,
    to: "/announcements",
    section: "announcements",
  },
  {
    display: "Requests",
    icon: <i className="bx bx-receipt"></i>,
    to: "/requests",
    section: "requests",
  },
  {
    display: "Profile",
    icon: <i className="bx bx-user"></i>,
    to: "/profile",
    section: "profile",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];

    if (userInfo && userInfo.type === userType.ADMIN) {
      const activeItem = adminSidebarNavItems.findIndex(
        (item) => item.section === curPath
      );
      setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    } else if (userInfo && userInfo.type === userType.MANAGER) {
      const activeItem = managerSidebarNavItems.findIndex(
        (item) => item.section === curPath
      );
      setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    } else if (userInfo && userInfo.type === userType.EMPLOYEE) {
      const activeItem = employeeSidebarNavItems.findIndex(
        (item) => item.section === curPath
      );
      setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }
  }, [location]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        {userInfo && userInfo.firstName}{" "}
        <div className="sidebar__type"> ({userInfo.type})</div>
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>

        {userInfo &&
          userInfo.type === userType.ADMIN &&
          adminSidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          ))}

        {userInfo &&
          userInfo.type === userType.MANAGER &&
          managerSidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          ))}

        {userInfo &&
          userInfo.type === userType.EMPLOYEE &&
          employeeSidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          ))}

        <div
          className="sidebar__menu__item"
          type="submit"
          style={{ margin: "5rem 2.3rem" }}
          onClick={logoutHandler}
        >
          <div className="sidebar__menu__item__icon"><i className="bx bx-log-out"></i></div>
          <div className="sidebar__menu__item__text">Logout</div>
        </div>

        {/*                 
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            } */}
      </div>
    </div>
  );
};

export default Sidebar;
