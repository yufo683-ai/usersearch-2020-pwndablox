import searchUsersStore from "../stores/searchUsersStore";
import { useEffect } from "react";
import { createUseStyles } from "react-jss";
import InputRow from "./inputRow";
import UsersRow from "./usersRow";

const useStyles = createUseStyles({
  pageWrapper: {
    background: '#e3e3e3', 
    minHeight: '100vh',
    padding: '20px 0',
    fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  innerContainer: {
    maxWidth: '1000px', 
    margin: '0 auto',
    padding: '0 20px',
  },
  headerText: {
    fontSize: '24px',
    fontWeight: 400, 
    color: '#393b3d',
    marginBottom: '15px',
  },
  resultsSection: {
    marginTop: '10px',
  }
});

const Container = (props) => {
  const store = searchUsersStore.useContainer();
  const s = useStyles();

  useEffect(() => {
    store.setData(null);
    store.setKeyword(props.keyword);
  }, [props.keyword]);

  return (
    <div className={s.pageWrapper}>
      <div className={s.innerContainer}>
        <h1 className={s.headerText}>
          Player Results for <strong>{props.keyword}</strong>
        </h1>
        <InputRow />
        <div className={s.resultsSection}>
          <UsersRow />
        </div>
      </div>
    </div>
  );
};

export default Container;
