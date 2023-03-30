import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import GoldMedal from "../../images/goldmedal.webp";
import SilverMedal from "../../images/silvermedal.webp";
import BronzeMedal from "../../images/bronzemedal.webp";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import fireStore from "../../settings/Firebase";
import { useEffect, useState } from "react";

type dto = {
  username: string;
  "7days": string;
  "14days": string;
  "30days": string;
  organization: string;
};

type Props = {
  day: number;
  isLoading: boolean;
};
const parseDate = (date: string) => {
  const newDate = date.replace(":", "시간 ");
  return newDate + "분";
};
const LeaderBoardList = ({ day, isLoading }: Props) => {
  const [data, setData] = useState(null);
  const dayReplaceFunc = (sortData) => {
    if (day === 7) {
      return sortData["7days"];
    } else if (day === 14) {
      return sortData["14days"];
    } else {
      return sortData["30days"];
    }
  };

  const knowDaysValue = (data) => {
    return data.sort((a: dto, b: dto) => {
      const sortA = dayReplaceFunc(a);
      const sortB = dayReplaceFunc(b);

      if (sortA.indexOf(":") === -1) return 1;
      if (sortB.indexOf(":") === -1) return -1;
      return parseInt(sortB.split(":")[0]) < parseInt(sortA.split(":")[0])
        ? -1
        : parseInt(sortB.split(":")[0]) > parseInt(sortA.split(":")[0])
        ? 1
        : parseInt(sortB.split(":")[1]) < parseInt(sortA.split(":")[1])
        ? -1
        : 1;
    });
  };
  const getSnapShot = async () => {
    const querySnapshot = await getDocs(collection(fireStore, "users"));
    const array = [];
    querySnapshot.forEach((doc) => {
      array.push({
        "7days": doc.data()["7days"],
        "14days": doc.data()["14days"],
        "30days": doc.data()["30days"],
        username: doc.data().username,
        organization: doc.data().organization,
        id: doc.id,
      });
    });
    setData(array);
  };

  useEffect(() => {
    getSnapShot();
  }, [isLoading]);

  return (
    <Container id="profile">
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
        data != null &&
        knowDaysValue(data).map((value, index) => {
          return (
            <Link
              key={value.id}
              to={`/user/${day}day/${value.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Grid container sx={{ mt: 5 }}>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {index + 1 === 1 ? (
                    <img src={GoldMedal} width={60} alt="금메달"></img>
                  ) : index + 1 === 2 ? (
                    <img src={SilverMedal} width={60} alt="은메달"></img>
                  ) : index + 1 === 3 ? (
                    <img src={BronzeMedal} width={60} alt="동메달"></img>
                  ) : (
                    <Typography variant="h6">{index + 1}등</Typography>
                  )}
                </Grid>
                <Grid
                  item
                  xs={8}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={`https://avatars.dicebear.com/api/croodles-neutral/${value.username}.svg`}
                    alt=""
                    style={{ width: 80, borderRadius: "50%" }}
                  />
                  <div>
                    <h3 className="name text-dark">{value.username}</h3>
                    <span>{value.organization}</span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography>{parseDate(dayReplaceFunc(value))}</Typography>
                </Grid>
              </Grid>
            </Link>
          );
        })
      )}
    </Container>
  );
};

export default LeaderBoardList;
