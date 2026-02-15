import searchUsersStore from "../stores/searchUsersStore";
import {createUseStyles} from "react-jss";
import PlayerImage from "../../playerImage";
import Link from "../../link";

const useStyles = createUseStyles({
  container: {
    width: '100%',
    maxWidth: '970px',
    margin: '0 auto',
    paddingTop: '10px',
  },
  resultStats: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '10px',
    display: 'block',
  },
  userGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '15px', 
    width: '100%',
  },
  userCard: {
    background: '#fff',
    border: '1px solid #dcdcdc',
    display: 'flex',
    flexDirection: 'column', 
    textDecoration: 'none',
    color: 'inherit',
    height: '140px', 
    '&:hover': { 
      borderColor: '#b8b8b8' 
    },
  },
  cardMain: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px', 
    flex: 1,
  },
  avatarCircle: {
    width: '80px', 
    height: '80px',
    borderRadius: '50%',
    border: '1px solid #e1e1e1',
    overflow: 'hidden',
    marginRight: '20px',
    background: '#f2f4f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  usernameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  username: {
    fontSize: '18px', 
    fontWeight: 400,
    color: '#343434',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  verifiedIcon: {
    width: '16px', 
    height: '16px',
    flexShrink: 0,
  },
  userStatus: {
    fontSize: '14px',
    color: '#999',
    marginTop: '2px',
  },
  cardFooter: {
    height: '28px', 
    background: '#f2f2f2',
    borderTop: '1px solid #dcdcdc',
    width: '100%',
  }
});

const UserCard = ({v, s}) => {
  return (
    <Link href={v.UserProfilePageUrl}>
      <a className={s.userCard}>
        <div className={s.cardMain}>
          <div className={s.avatarCircle}>
            <PlayerImage id={v.UserId} />
          </div>
          <div className={s.info}>
            <div className={s.usernameWrapper}>
              <span className={s.username}>{v.Name}</span>
              {v.IsVerified && (
                <img 
                  src="https://pwndab.xyz/images/verified.svg" 
                  className={s.verifiedIcon} 
                  alt="Verified"
                />
              )}
            </div>
            <span className={s.userStatus}>{v.IsOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <div className={s.cardFooter} />
      </a>
    </Link>
  );
};

const UsersRow = () => {
  const store = searchUsersStore.useContainer();
  const s = useStyles();

  if (!store.data?.UserSearchResults) return null;

  const results = store.data.UserSearchResults;

  return (
    <div className={s.container}>
      <span className={s.resultStats}>
        1 - {results.length} of {results.length}
      </span>
      
      <div className={s.userGrid}>
        {results.map(v => (
          <UserCard key={v.UserId} v={v} s={s} />
        ))}
      </div>
    </div>
  );
};

export default UsersRow;