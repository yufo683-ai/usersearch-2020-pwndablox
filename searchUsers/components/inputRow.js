import searchUsersStore from "../stores/searchUsersStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const InputRow = props => {
  const store = searchUsersStore.useContainer();
  const [query, setQuery] = useState('');
  const router = useRouter();

  
  useEffect(() => {
    const urlKeyword = router.query.keyword;
    if (urlKeyword !== undefined && urlKeyword !== store.keyword) {
      store.setKeyword(urlKeyword);
    }
  }, [router.query.keyword]);

  
  useEffect(() => {
    if (store.keyword === query && query !== '') return;
    setQuery(store.keyword || '');
  }, [store.keyword]);

  const onSearch = () => {
    if (store.locked) return;
    
    store.setKeyword(query);
    router.push({
      pathname: '/search/users',
      query: { keyword: query },
    }, undefined, { shallow: true });
  }

  return (
    <div className="search-header-2020">
      <div className="input-group">
        <input 
          disabled={store.locked} 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="roblox-input-2020" 
          type="text" 
          placeholder="Search Users" 
        />
        <div className="search-icon-inside" onClick={onSearch}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fillRule="evenodd" clipRule="evenodd" d="M11.7422 10.3439C12.5329 9.2673 13 7.9382 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C7.93858 13 9.26801 12.5327 10.3448 11.7415L10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439ZM11 6.5C11 8.98528 8.98528 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5Z" fill="#656666"/>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .search-header-2020 {
          padding-bottom: 20px;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .input-group {
          position: relative;
          display: flex;
          width: 100%;
          max-width: 100%; 
        }
        .roblox-input-2020 {
          flex: 1;
          height: 38px;
          padding: 0 40px 0 12px;
          font-size: 16px;
          background: #FFFFFF;
          border: 1px solid #B8B8B8;
          border-radius: 4px;
          color: #393B3D;
          outline: none;
        }
        .roblox-input-2020:focus {
          border-color: #A1A1A1;
        }
        .search-icon-inside {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          opacity: 0.7;
        }
        .search-icon-inside:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default InputRow;