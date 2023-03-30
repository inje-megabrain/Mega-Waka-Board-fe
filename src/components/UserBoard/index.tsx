import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { Bar, Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import getMemberInfo from "../../apis/getMemberInfo";
import "chart.js/auto";
import timeParser from "../../utils/timeParser";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const UserBoard = () => {
  let { day, id } = useParams();
  day = day.replace("day", "");
  const { data, isLoading } = useQuery([day, id], () => getMemberInfo(day, id));
  console.log(data);
  const parseBarChartWeek = (data) => {
    const newData = {
      labels: data.weekData.label,
      datasets: [
        {
          label: "Hours",
          data: data.weekData.data.map((item) => (item / 3600).toFixed(2)),
        },
      ],
    };
    return newData;
  };

  const parseChartLanguages = (data) => {
    data.languages.sort((a, b) => b.seconds - a.seconds);
    let newData = {
      labels: data.languages.map((item) => item.name),
      datasets: [
        {
          label: " Hours",
          data: data.languages.map((item) => (item.seconds / 3600).toFixed(2)),
        },
      ],
    };
    return newData;
  };

  const parseChartProjects = (data) => {
    data.projects.sort((a, b) => b.seconds - a.seconds);
    let newData = {
      labels: data.projects.map((item) => item.name),
      datasets: [
        {
          label: " Hours",
          data: data.projects.map((item) => (item.seconds / 3600).toFixed(2)),
        },
      ],
    };
    return newData;
  };

  const parseChartEditors = (data) => {
    data.editors.sort((a, b) => b.seconds - a.seconds);
    let newData = {
      labels: data.editors.map((item) => item.name),
      datasets: [
        {
          label: " Hours",
          data: data.editors.map((item) => (item.seconds / 3600).toFixed(2)),
        },
      ],
    };
    return newData;
  };

  return (
    <Container maxWidth="xl">
      <Toolbar />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{ mt: 4 }}
          columns={{ xs: 4, md: 12 }}
          rowGap={10}
          columnGap={20}
        >
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">{`${
              data.username
            }님은 지난 ${day}일간 ${data.day_7_info.digital.replace(
              ":",
              "시간 "
            )}분 코딩하셨습니다.`}</Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Box width="90vw" maxWidth={1200} display="inline-block">
              <Bar options={options} data={parseBarChartWeek(data)} />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
              Languages
            </Typography>
            <Doughnut data={parseChartLanguages(data)} />
          </Grid>
          <Grid item xs={5}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>언어 (Language)</TableCell>
                    <TableCell>시간 (Time)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.languages.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{timeParser(row.seconds)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
              Projects
            </Typography>
            <Doughnut data={parseChartProjects(data)} />
          </Grid>
          <Grid item xs={5}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>프로젝트 (Projects)</TableCell>
                    <TableCell>시간 (Time)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.projects.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{timeParser(row.seconds)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
              Editors
            </Typography>
            <Doughnut data={parseChartEditors(data)} />
          </Grid>
          <Grid item xs={5}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>에디터 (IDE)</TableCell>
                    <TableCell>시간 (Time)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.editors.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{timeParser(row.seconds)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default UserBoard;
