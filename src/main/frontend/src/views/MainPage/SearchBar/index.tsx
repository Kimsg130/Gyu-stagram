import React, {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface SearchingUser {
    image: string | null;
    userId: string;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const SearchBar = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly SearchingUser[]>([]);
    const [searchText, setSearchText] = React.useState('');
    const [searchingUser, setSearchingUser] = React.useState<SearchingUser[]>([]);
    const loading = open && options.length === 0;
    const movePage = useNavigate();

    React.useEffect(() => {
        axios.get('http://localhost:8082/searchUser',{
            params: {
                userId: searchText
            }
        })
        .then(response => {
            // console.log(response.data);
            setSearchingUser(response.data);
        })
        .catch(error => console.log(error));
    }, [searchText])

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...searchingUser]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
            // setSearchingUser([]);
        }
    }, [open]);


    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: '50%', padding: 0}}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.userId === value.userId}
            getOptionLabel={(option) => option.userId} //option.userId
            options={options}
            loading={loading}
            onChange={(event, value) => {
                console.log(value);
                {value && movePage("/"+value.userId);}
            }}
            renderInput={(params) => ( //TODO: 이미지 옆에 띄우기 https://mui.com/material-ui/react-autocomplete/
                <TextField
                    {...params}
                    placeholder={"검색어를 입력하세요..."}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    onChange={(event) => {setSearchText(event.currentTarget.value);} }
                />
            )}
        />
    );
};

export default SearchBar;