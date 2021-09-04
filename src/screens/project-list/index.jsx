import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";

import * as qs from "qs";
import { cleanObject } from "../utils";
import pipe from "lodash/fp/pipe";

import styled from "styled-components";

const apiURL = process.env.REACT_APP_API_URL;

const StyledScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProjectSearchListScreen = () => {
  const [param, setParam] = useState({ project_name: "", manager_id: "" }); // manager_id project_name
  const [managers, setManagers] = useState([]); // all of the managers
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/managers`).then(async (response) => {
      if (response.ok) {
        setManagers(await response.json());
      }
    });
  }, []);

  const changeParamProjectName = (object) => {
    const result = { ...object };
    const value = result["project_name"];
    if (value) {
      result["name"] = value;
      delete result["project_name"];
    }
    return result;
  };
  // qs.stringify(changeParamProjectName(cleanObject(param)))

  useEffect(() => {
    const combineSearch = pipe(
      cleanObject,
      changeParamProjectName,
      qs.stringify
    ); // return a func
    fetch(`${apiURL}/projects?${combineSearch(param)}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);

  return (
    <StyledScreen>
      <SearchPanel param={param} setParam={setParam} managers={managers} />
      <List list={list} managers={managers} />
    </StyledScreen>
  );
};
