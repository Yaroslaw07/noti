import { Box, Button, Grid, Icon } from "@mui/material";
import HR from "../../../components/ui/HR";
import { Icons } from "../../../components/Icons";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/router";
import { FC } from "react";
import useThemeStore from "@/lib/stores/themeStore";

interface VaultsActionsProps {
  handleNewVault: () => void;
}

const VaultsActions: FC<VaultsActionsProps> = ({ handleNewVault }) => {
  const router = useRouter();

  const { currentTheme, toggleCurrentTheme } = useThemeStore();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <Box sx={{ width: "100%", height: "9rem", alignSelf: "flex-end" }}>
      <HR />
      <Grid container spacing={1} sx={{ marginTop: "6px", width: "102%" }}>
        <Grid item xs>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<Icons.Plus />}
            sx={{
              flex: "1",
              fontSize: "1.1rem",
              height: "45px",
              lineHeight: "1.05",
            }}
            onClick={handleNewVault}
          >
            New Vault
          </Button>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{
              height: "45px",
              borderColor: "primary.main",
            }}
            onClick={toggleCurrentTheme}
          >
            {currentTheme === "dark" ? <Icons.LightMode /> : <Icons.DarkMode />}
          </Button>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{
              height: "45px",
              borderColor: "primary.main",
            }}
            onClick={handleLogout}
          >
            <Icons.Logout />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VaultsActions;
