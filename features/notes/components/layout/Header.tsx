import {
  AppBar,
  Menu,
  MenuItem,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { Icons } from "../../../../components/Icons";
import useNoteStore from "../../stores/notesStore";
import { useTheme } from "next-themes";
import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";
import { useState } from "react";

const getToolbarSx = (theme: Theme) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "50px",
    [theme.breakpoints.up("sm")]: {
      minHeight: "50px",
      paddingX: "12px",
    },
  };
};

const Header = () => {
  const { currentNoteId, currentNoteTitle } = useNoteStore();
  const { resolvedTheme, theme, setTheme } = useTheme();
  const themeConfig = getCurrentTheme(resolvedTheme);

  const [alignment, setAlignment] = useState<string>(theme || "system");
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const isModalOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setTheme(value);
  };

  return (
    <AppBar component="nav" position="static" sx={{ height: "40px" }}>
      <Toolbar sx={getToolbarSx(themeConfig)}>
        <Typography
          variant="subtitle1"
          sx={{ paddingTop: "0px", fontSize: "1.15rem", fontWeight: "500" }}
        >
          {currentNoteId === null && "No note open"}
          {currentNoteId !== null && currentNoteTitle == ""
            ? "Untitled"
            : currentNoteTitle}
        </Typography>
        <Icons.More
          sx={{
            fontSize: "38px",
            marginTop: "-3px",
            borderRadius: "8px",
            color: themeConfig.palette.primary.light,
            "&:hover": {
              color: themeConfig.palette.primary.dark,
              background: themeConfig.palette.additional?.dark,
            },
          }}
          onClick={(e) => handleMenuOpen(e)}
        />
        <Menu anchorEl={anchorEl} open={isModalOpen} onClose={handleMenuClose}>
          <MenuItem
            sx={{
              "&:hover": {
                backgroundColor: "inherit",
              },
            }}
            disableRipple
          >
            <ToggleButtonGroup
              value={theme}
              exclusive
              onChange={handleThemeChange}
            >
              <ToggleButton value="light">
                <Icons.LightTheme />
              </ToggleButton>
              <ToggleButton value="dark">
                <Icons.DarkTheme />
              </ToggleButton>
              <ToggleButton value="system">
                <Icons.DeviceTheme />
              </ToggleButton>
            </ToggleButtonGroup>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
