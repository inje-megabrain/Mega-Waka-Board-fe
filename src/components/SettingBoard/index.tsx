import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import postAddMember from "../../apis/postAddMember";

export type PersonData = {
  apiKey: string;
  userName: string;
  organization: string;
};

const SettingBoard = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [personData, setPersonData] = useState<PersonData>({
    apiKey: "",
    userName: "",
    organization: "",
  });

  const [toastText, setToastText] = useState("");

  const handleRegister = async () => {
    setFetchLoading(true);
    if (
      personData.userName.length === 0 ||
      personData.apiKey.length === 0 ||
      personData.organization.length === 0
    ) {
      setToastText("모든 항목을 입력해주세요");
      setFetchLoading(false);
      return;
    }
    const result = await postAddMember(
      personData.userName,
      personData.apiKey,
      personData.organization
    );
    setToastText(result);
    setFetchLoading(false);
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastText("");
  };
  return (
    <div>
      <Toolbar />
      <Snackbar
        open={toastText.length > 0}
        autoHideDuration={3000}
        onClose={handleClose}
        message={toastText}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Container>
        <Typography variant="h4" sx={{ mt: 5 }} fontWeight="700" align="center">
          Add Person
        </Typography>
        <Box textAlign={"center"} sx={{ mt: 2 }}>
          <TextField
            value={personData.userName}
            onChange={(text) => {
              setPersonData({
                ...personData,
                userName: text.target.value,
              });
            }}
            id="standard-basic"
            label="이름"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
          />
        </Box>

        <Box textAlign={"center"} sx={{ mt: 2 }}>
          <TextField
            value={personData.apiKey}
            onChange={(text) =>
              setPersonData({
                ...personData,
                apiKey: text.target.value,
              })
            }
            id="standard-basic"
            label="api key"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
          />
        </Box>
        <Box textAlign={"center"}>
          <Link
            href="https://wakatime.com/settings/api-key"
            rel="noopener"
            target={"_blank"}
          >
            Wakatime API KEY 확인하러 가기
          </Link>
        </Box>
        <Box textAlign={"center"} sx={{ mt: 2 }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select">Organization</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={personData.organization}
              label="Organization"
              sx={{ width: "28ch" }}
              onChange={(text) =>
                setPersonData({
                  ...personData,
                  organization: text.target.value as string,
                })
              }
            >
              <MenuItem value={"Megabrain"}>Megabrain</MenuItem>
              <MenuItem value={"Dotgabi"}>Dotgabi</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box textAlign={"center"} sx={{ mt: 8 }}>
          <Button
            disabled={fetchLoading}
            variant="contained"
            sx={{ pr: 10, pl: 10 }}
            onClick={handleRegister}
          >
            등록
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SettingBoard;
