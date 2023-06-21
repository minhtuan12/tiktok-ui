import {Wrapper as PopperWrapper} from "~/components/Popper";
import AccountItem from "~/components/AccountItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faMagnifyingGlass, faSpinner} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames/bind";
import styles from "~/layouts/components/Search/Search.module.scss";
import {useDebounce} from "~/hooks";
import httpRequest from "~/utils/httpRequest";
import * as searchService from "~/apiServices/services";
import {search} from "~/apiServices/services";
import onClickOutside from "react-onclickoutside";

const cx = classNames.bind(styles)

function Search() {

    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const debounceValue = useDebounce(searchValue, 500)
    const inputRef = useRef()

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([])
            return
        }

        // setSearchResult(arr)

        const fetchApi = async () => {
            setLoading(true)

            const result = await searchService.search(debounceValue)
            setSearchResult(result)
            setLoading(false)
        }

        fetchApi()

    }, [debounceValue])
    //
    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' '))
            setSearchValue(searchValue)
    }
    // console.log(showResult)
    // console.log(searchResult)

    return (
        <Tippy
            interactive
            appendTo={() => document.body}
            visible={showResult && searchResult.length > 0}
            onClickOutside={handleHideResult}
            zIndex={(showResult && searchResult.length > 0) ? 9999 : -1}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs} >
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result}/>
                        ))}
                    </PopperWrapper>
                </div>
            )}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search"
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={() => {
                        setSearchValue('')
                        inputRef.current.focus()
                    }}>
                        <FontAwesomeIcon icon={faCircleXmark}/>
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>}
                <span className={cx('splitter')}></span>
                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
            </div>
        </Tippy>
    )
}

export default Search