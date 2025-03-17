import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconSettings,
  IconReceipt2,
  IconLogout,
  IconSwitchHorizontal,
  IconMoon,
  IconSun,
  IconUsers,
} from "@tabler/icons-react";
import { SegmentedControl, Text, useMantineColorScheme } from "@mantine/core";
import "./Navbar.css";
import { useAuth } from "../../Context/AuthContext";
import { USER_ROLES } from "../../Helpers/constants";

// Define role-based accessible routes
const roleBasedTabs = {
  [USER_ROLES.ADMIN]: [
    { link: "/", label: "Dashboard", icon: IconBellRinging },
    { link: "/area", label: "Areas", icon: IconReceipt2 },
    { link: "/resource_type", label: "Resource Types", icon: IconFingerprint },
    { link: "/resource", label: "Resources", icon: IconKey },
    { link: "/team", label: "Teams", icon: IconUsers },
    { link: "/user", label: "Users", icon: IconDatabaseImport },
    { link: "/reservation", label: "Reservations", icon: Icon2fa },
    { link: "/complaint", label: "Complaints", icon: IconSettings },
  ],
  [USER_ROLES.EMPLOYEE]: [
    { link: "/", label: "Dashboard", icon: IconBellRinging },
    { link: "/complaint", label: "Complaints", icon: IconSettings },
  ],
  [USER_ROLES.END_USER]: [
    { link: "/", label: "Dashboard", icon: IconBellRinging },
    { link: "/reservation", label: "Reservations", icon: Icon2fa },
    { link: "/complaint", label: "Complaints", icon: IconSettings },
  ],
  [USER_ROLES.VENDOR]: [
    { link: "/", label: "Dashboard", icon: IconBellRinging },
  ],
};

function NavbarSegmented() {
  const location = useLocation();
  const { logout, user } = useAuth(); // Get user from AuthContext
  const [active, setActive] = useState("");

  // Mantine hooks for color scheme
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // Get user's allowed links
  const allowedLinks = roleBasedTabs[user?.role] || [];

  // Update the active tab based on location
  useEffect(() => {
    const currentTab = allowedLinks.find(
      (item) => item.link === location.pathname
    );
    if (currentTab) {
      setActive(currentTab.label);
    }
  }, [location, allowedLinks]);

  // Toggle between light and dark mode using Mantine's setColorScheme
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const links = allowedLinks.map((item) => (
    <Link
      className="link"
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className="linkIcon" stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className="navbar">
      <div>
        <Text fw={500} size="sm" className="title" c="dimmed" mb="xs">
          CLOUD.IN DEV TEAM PRODUCT
        </Text>

        <SegmentedControl
          value={colorScheme}
          onChange={toggleColorScheme} // Use Mantine color scheme toggle
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: <IconMoon />, value: "dark" },
            { label: <IconSun />, value: "light" },
          ]}
        />
      </div>

      <div className="navbarMain">{links}</div>

      <div className="footer">
        <Link className="link" to="/change-account">
          <IconSwitchHorizontal className="linkIcon" stroke={1.5} />
          <span>Change account</span>
        </Link>

        {/* ✅ Call AuthContext logout function */}
        <Link className="link" to="#" onClick={logout}>
          <IconLogout className="linkIcon" stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavbarSegmented;
