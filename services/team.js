import axios from "@/lib/axios";
import { deleteTeamLogo, uploadTeamLogo } from "@/lib/firebase/storage";

export const getTeams = async () => {
  try {
    const res = await axios.get("/api/teams", {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const getTeamsByUser = async () => {
  try {
    const res = await axios.get("/api/teams?user", {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const getTeamsWithPagination = async (paginationUrl) => {
  try {
    const res = await axios.get(paginationUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const createTeam = async (team) => {
  try {
    const preRes = await axios.post(
      "/api/teams",
      { ...team, logo: "" },
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const logoUrl = await uploadTeamLogo(preRes.data.id, team.logo);
    const res = await axios.put(
      `/api/teams/${preRes.data.id}`,
      { ...team, logo: logoUrl },
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updateTeam = async (team, updateTeam) => {
  try {
    let newLogoUrl = "";
    if (team.logo !== updateTeam.logo) {
      newLogoUrl = await uploadTeamLogo(team.id, updateTeam.logo);
    }
    updateTeam.logo = newLogoUrl ? newLogoUrl : team.logo;
    const res = await axios.put(`/api/teams/${team.id}`, updateTeam, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const deleteTeam = async (teamId) => {
  try {
    await deleteTeamLogo(teamId);
    const response = await axios.delete(`/api/teams/${teamId}`, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getMatchGames = async () => {
  try {
    const res = await axios.get(`/api/match-games`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const getMatchGamesWithPagination = async (paginationUrl) => {
  try {
    const res = await axios.get(paginationUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const getMatchGamesByUser = async () => {
  try {
    const res = await axios.get(`/api/match-games?user`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const getMatchGamesBySport = async () => {
  try {
    const res = await axios.get(`/api/match-games?user`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const createMatchGame = async (matchGame) => {
  try {
    const res = await axios.post("/api/match-games", matchGame, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const updateMatchGame = async (matchGameId, matchGame) => {
  try {
    const res = await axios.put(`/api/match-games/${matchGameId}`, matchGame, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.error(e.response);
    return e.response;
  }
};
